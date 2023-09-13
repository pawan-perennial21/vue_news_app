<template>
    <Header />
    <NoRecord v-if="getNewsList?.length === 0" />
    <div class="all-result">
        <p>All Results: {{ totalResults }}</p>
    </div>
    <div class="news-list">
        <div v-for="news in newsList" :key="news.id">
            <NewsCard
                :title="news.title"
                :description="news.description"
                :imageSrc="news.urlToImage"
                :newsId="news.id"
                :website="news.url"
                :content="news.content"
                :publishDate="news.publishedAt"
                @bookmark="bookmark(news.id)"
                @deleteBookmark="deleteBookMark(news.id)"
                :isBookmarked="!news.isBookmarked"
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import NewsCard from "../components/NewsCard.vue";
import NoRecord from "../components/NoRecord.vue";
import Header from "../components/Header.vue";
export default {
    components: {
        NoRecord,
        NewsCard,
        Header,
    },
    computed: {
        ...mapState({
            newsList: (state) => state.newsLists,
        }),
        ...mapGetters([
            "getNewsList",
            "getTotalResults",
            "getPageCount",
        ]),
        totalResults() {
            return this.getTotalResults;
        },
        getArticleLength() {
            return this.articles.length == 0;
        },
    },
    mounted() {
        this.scroll();
    },
    methods: {
        ...mapMutations["update"],
        bookmark(id) {
            this.$store.commit("updateBookmark", id);
        },

        deleteBookMark(id) {
            this.$store.commit("updateDeleteBookmark", id);
        },
        async getNewsListData() {
            await this.$store.dispatch("fetchAllData");
        },
        getSearchParams(payload) {
            this.extraParams = payload;
            this.$store.dispatch("fetchAllData", this.extraParams);
        },
        async fetch() {
            this.$store.dispatch("fetchAllData", this.extraParams);
        },

        setDisableButton() {
            return (
                this.getArticles.length < this.$store.state.totalCard
            );
        },
        scroll() {
            window.onscroll = () => {
                let bottomOfWindow =
                    Math.ceil(
                        document.documentElement.scrollTop +
                            window.innerHeight
                    ) >= document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    const currentpage = this.getPageCount + 21;
                    this.$store.dispatch(
                        "updatePageSize",
                        currentpage
                    );
                    this.$store.dispatch(
                        "fetchAllData",
                        this.extraParams
                    );
                }
            };
        },
    },
    async created() {
        await this.getNewsListData();
        this.loading = false;
    },
};
</script>

<style>
.news-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    justify-items: center;
}
.all-result {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 130px;
    margin-bottom: 10px;
}
@media (max-width: 768px) {
    .all-result {
        margin-top: 240px;
    }
}
</style>
