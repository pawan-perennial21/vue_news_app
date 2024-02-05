<template>
    <div class="news-card">
        <div class="news-img">
            <img
                class="news-image"
                :src="getNewsImg(article?.urlToImage)"
                alt="News Image"
            />
        </div>
        <div class="news-content">
            <h3 class="news-headline">{{ article?.title }}</h3>
            <h4 class="web-link">
                {{ getWebsiteLink(article?.website) }}
            </h4>
            <p class="sub-content">
                {{ article?.content }}
            </p>
        </div>
        <div class="publish-date">
            <!-- <p>
                Published :
                {{ formatArticleDatearticle(article?.publishDate) }}
            </p> -->
        </div>
        <div class="news-footer">
            <button class="go-btn" @click="goToPage">Go Page</button>
            <div class="delete-bookmark">
                <img
                    :src="
                        isBookmark ? bookmarkFilledIcon : bookmarkIcon
                    "
                    alt="News Image"
                    class="delete-bookmark"
                    @click="toggleIcons"
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
export default {
    data() {
        return {
            allBookMark: [],
            isBookmark: false,
            bookmarkIcon,
            bookmarkFilledIcon,
        };
    },
    props: {
        article: Object,
        newsId: Number,
    },

    methods: {
        ...mapActions(["fetchBookMarks", "toggleBookmarkArticle"]),
        getNewsImg(img) {
            return img ?? "https://dummyimage.com/600x400/000/fff";
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
            this.toggleBookmarkArticle(this.article);
        },

        formatArticleDate(date) {
            return getPublishDate(date);
        },
        getWebsiteLink(link) {
            return link?.split("/")[2];
        },
    },
    computed: {
        isBookmark() {
            return this.$store.getters.isArticleBookmarked(
                this.article
            );
        },
    },
};
</script>

<style scoped>
.news-card {
    width: 300px;
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
.delete-bookmark > img {
    width: 28px;
    height: 28px;
}
@media (max-width: 768px) {
    .news-card {
        width: 500px;
    }
}
</style>
