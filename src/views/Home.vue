<template>
    <div class="news-list">
        <div v-for="news in newsList" :key="news.id">
            <!-- <router-link :to="'/news-details/' + news.id"> -->
                <NewsCard
                    :title="news.title"
                    :description="news.description"
                    :imageSrc="news.urlToImage"
                    isBookmarked="true"
                    :newsId="news.id"
                />
            <!-- </router-link> -->
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import NewsCard from "../components/NewsCard.vue";
export default {
    components: {
        NewsCard,
    },
    computed: {
        ...mapState({
            newsList: (state) => state.newsLists,
        }),
        ...mapGetters(['getNewsList'])
    },
    mounted () {
        console.log('>>>>>>>>>>>>>>>>>', this.getNewsList)
    },
    methods: {
        async getNewsListData() {
            await this.$store.dispatch("getNewsList");
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
</style>
