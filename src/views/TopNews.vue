<template>
    <NoRecord v-if="topNewsList?.length === 0" />
    <div class="news-list">
        <div v-for="news in topNewsList" :key="news.id">
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
export default {
    components: {
        NoRecord,
        NewsCard,
    },
    computed: {
        ...mapState({
            topNewsList: (state) => state.topNewsList,
        }),
        ...mapGetters(["getTopNewsList"]),

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
        async fetchTopData() {
            this.$store.dispatch("fetchTopHeading");
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
                    this.$store.dispatch("fetchTopHeading");
                }
            };
        },
    },
    async created() {
        await this.fetchTopData();
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
    margin-top: 50px;
}
</style>
