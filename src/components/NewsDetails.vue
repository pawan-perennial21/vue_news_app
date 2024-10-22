<template>
  <div class="goto-card">
    <div v-if="getArticleLength">{{ redirect }}</div>
    <div v-else>
      <div class="news-icon">
        <img
          :src="getNewsImg(article?.urlToImage)"
          alt="newsPhoto"
          class="icon"
          loading="lazy"
        />
      </div>
      <div class="news-content">
        <h3 class="news-headline">{{ article?.title === "[Removed]" ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry." : article?.title }}</h3>
    <p class="sub-content">{{ article?.content === "[Removed]" ? "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." : article?.content }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      newsId: this.$route?.params.newsId,
    };
  },
  computed: {
    ...mapGetters(["getArticlesById"]),

    article() {
      return this.getArticlesById(this.newsId) || null;
    },
    getArticleLength() {
      return !this.article || Object.keys(this.article).length === 0;
    },
  },
  methods: {
    getNewsImg(img) {
      return img || "https://dummyimage.com/600x400/000/fff";
    },
    async getNewsDetailsData() {
      if (!this.article) {
        await this.$store.dispatch("getNewsDetails", this.newsId);
      }
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
  width: 800px;
  margin: auto;
  margin-top: 50px;
}

.news-icon img {
  width: 100%;
  height: auto;
}

.news-content {
  padding: 0 15px;
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
  .news-icon img {
    width: 200px;
    height: 150px;
  }
}
</style>
