<template>
  <div class="news-card">
    <div class="news-img">
      <img
        class="news-image"
        :src="getNewsImg(article?.urlToImage)"
        alt="News Image"
        loading="lazy"
      />
    </div>
    <div class="news-content">
      <h3 class="news-headline">{{ article?.title === "[Removed]" ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry." : article?.title }}</h3>
      <h4 class="web-link">{{ getWebsiteLink(article?.website || article?.url) }}</h4>
      <p class="sub-content">{{ article?.content === "[Removed]" ? "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." : article?.content }}</p>
    </div>
    <div class="publish-date">
      <p>Published: {{ formatArticleDate(article?.publishedAt) }}</p>
    </div>
    <div class="news-footer">
      <button class="go-btn" @click="goToPage">Go Page</button>
      <div class="delete-bookmark">
        <img
          :src="isBookmark ? bookmarkFilledIcon : bookmarkIcon"
          alt="Bookmark Icon"
          class="delete-bookmark-icon"
          @click="debouncedToggleBookmark"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getPublishDate } from "@/helper";
import { mapActions } from "vuex";
import bookmarkIcon from "../assets/bookmark-white.png";
import bookmarkFilledIcon from "../assets/bookmark.png";
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      isBookmark: false,
      bookmarkIcon,
      bookmarkFilledIcon,
    };
  },
  props: {
    article: Object,
    newsId: Number,
  },
  mounted() {
    this.isBookmark = this.$store.getters.isArticleBookmarked(this.article);
  },
  methods: {
    ...mapActions(["toggleBookmarkArticle"]),
    getNewsImg(img) {
      return img || "https://dummyimage.com/600x400/000/fff";
    },
    goToPage() {
      this.$router.push({
        name: "newsDetails",
        params: {
          newsId: this.newsId,
        },
      });
    },
    toggleIcons() {
      const finalArtical = {...this.article,id:this.newsId}
      this.toggleBookmarkArticle(finalArtical);
      this.isBookmark = !this.isBookmark;
    },
    debouncedToggleBookmark: debounce(function () {
      this.toggleIcons();
    }, 300),
    formatArticleDate(date) {
      return getPublishDate(date);
    },
    getWebsiteLink(link) {
      return link?.split("/")[2] || "Unknown";
    },
  },
};
</script>

<style scoped>
.news-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.publish-date > p {
  color: grey;
  margin-top: 5px;
}
.news-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

.news-title {
  font-size: 1.2rem;
  margin-top: 10px;
  margin-bottom: 10px;
}

.news-description {
  color: #555;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.go-btn {
  background-color: #64ccc5;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: #000000;
}
.delete-bookmark {
  cursor: pointer;
}
.delete-bookmark-icon {
  width: 28px;
  height: 28px;
}
@media (max-width: 768px) {
  .news-card {
    width: 100%;
  }
}
</style>

