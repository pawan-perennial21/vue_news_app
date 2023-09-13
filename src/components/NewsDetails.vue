<template>
    <div class="goto-card">
        <div v-if="getArticleLength">{{ redirect }}</div>
        <div class="news-icon">
            <img
                :src="getNewsImg(article?.urlToImage)"
                alt="newsPhoto"
                class="icon"
            />
        </div>
        <div class="news-content">
            <h3 class="news-headline">{{ article?.title }}</h3>
            <p>
                {{ article?.content }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            newsId: this.$route.params.newsId,
        };
    },
    computed: {
        ...mapGetters(["getArticlesById"]),
        article() {
            return this.getArticlesById(this.$route.params.newsId);
        },

        getArticleLength() {
            return this.article?.length == 0;
        },
    },
    methods: {
        getNewsImg(img) {
            return img ?? "https://dummyimage.com/600x400/000/fff";
        },
        async getNewsDetailsData() {
            await this.$store.dispatch("getNewsDetails", this.newsId);
        },
    },
    async created() {
        await this.getNewsDetailsData();
    },
};
</script>

<style scoped>
.goto-card {
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    display: flex;
    padding: 0px;
    width: 700px;
    margin: auto;
    margin-top: 50px;
}

/* .main-container > .nav-container {
  position: sticky;
  width: auto;
  top: 0;
} */

.news-icon img {
    width: 100%;
    height: auto;
}

.content-section {
    text-align: left;
}

.goto-btn {
    background-color: #333;
    padding: 9px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin: 16px;
}

.publish-date > p {
    font-size: 13px;
    color: #858889;
}

.news-content {
    padding: 0 15px;
}

@media only screen and (max-width: 768px) {
    .goto-card {
        margin: 0;
        width: auto;
        flex-direction: column;
    }

    .back-btn {
        text-align: left;
    }
}

@media only screen and (max-width: 768px) {
    .goto-card {
        margin: 50px 30px 0px 30px;
    }
}
@media only screen and (max-width: 280px) {
    .news-img img {
        width: 230px;
        height: 175px;
    }

    .news-icon img {
        width: 200px;
        height: 150px;
    }
}
</style>
