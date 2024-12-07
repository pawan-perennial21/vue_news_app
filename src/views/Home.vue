<template>
    <Header />
    <NoRecord v-if="getNewsList?.length === 0" />
    <div class="all-result">
        <h3>All Results: {{ totalResults }}</h3>
    </div>
    <div class="news-list">
        <NewsCard
            v-for="(article, index) in articles"
            :key="article.title"
            :article="article"
            :newsId="index"
        />
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
            "getPageSize",
        ]),
        articles() {
            return this.newsList?.slice(0, this.getPageSize);
        },
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
                    const currentpage = this.getPageSize + 6;
                    this.$store.dispatch(
                        "updatePageSize",
                        currentpage
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin: 0 30px;
    justify-items: center;
    padding-bottom: 60px;
}

.all-result {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 130px;
    margin-bottom: 10px;
}
@media (max-width: 1400px) {
    .news-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        justify-items: center;
        margin: 0 30px;
    }
    .all-result {
        margin-top: 130px;
    }
}

@media (max-width: 1024px) {
    .news-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        justify-items: center;
    }
}

@media (max-width: 768px) {
    .all-result {
        margin-top: 130px;
    }
}

@media (max-width: 698px) {
    .news-list {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px;
        margin: 0 15px;
        justify-items: center;
    }
    .all-result {
        margin-top: 280px;
    }
}

@media (max-width: 319px) {
    .all-result {
        margin-top: 300px;
    }
}
</style>
