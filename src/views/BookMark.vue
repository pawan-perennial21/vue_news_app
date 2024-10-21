<template>
    <div class="page-container">
        <h2 class="page-header">
            {{ bookmarks.length }} News Result(s)
        </h2>
        <div class="news-grid" v-if="bookmarks.length">
            <NewsCard
                v-for="(article) in bookmarks"
                :key="article.title"
                :article="article"
                :newsId="article.id"
            />
        </div>
        <div v-else class="no-news">
            <h3>No news found.</h3>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewsCard from "../components/NewsCard.vue";

export default {
    components: {
        NewsCard,
    },
    computed: {
        ...mapGetters(["getBookmarks"]),
        bookmarks() {
            return this.getBookmarks;
        },
    },
    methods: {
        ...mapActions(["toggleBookmarkArticle"]),
        removeBookmark(article) {
            // Toggle the bookmark status to remove it from bookmarks
            this.toggleBookmarkArticle(article);
        },
    },
};
</script>

<style scoped>
.page-header {
    text-align: center;
    padding-top: 50px;
    padding-bottom: 20px;
}

.no-news {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.no-news h3 {
    text-align: center;
    font-size: 1.5rem;
    margin-top: -200px;
}

.news-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    justify-items: center;
    padding-bottom: 60px;
}

.news-card {
    width: 100%;
}

@media (max-width: 1400px) {
    .news-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        justify-items: center;
    }
}

@media (max-width: 1024px) {
    .news-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        justify-items: center;
    }
}

@media (max-width: 698px) {
    .news-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px;
        justify-items: center;
    }
}
</style>
