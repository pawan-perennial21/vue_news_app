<template>
    <div class="news-card">
        <div class="news-img">
            <img
                class="news-image"
                :src="getNewsImg(imageSrc)"
                alt="News Image"
            />
        </div>
        <div class="news-content">
            <h3 class="news-headline">{{ title }}</h3>
            <h4 class="web-link">{{ getWebsiteLink(website) }}</h4>
            <p class="sub-content">
                {{ content }}
            </p>
        </div>
        <div class="publish-date">
            <p>Published : {{ formatArticleDate(publishDate) }}</p>
        </div>
        <div class="news-footer">
            <button class="go-btn" @click="goToPage">Go Page</button>
            <div
                @click="$emit('bookmark')"
                v-if="isBookmarked"
                class="delete-bookmark"
            >
                Add Bookmark
            </div>
            <div
                v-else
                @click="$emit('bookmark')"
                class="delete-bookmark"
            >
                Remove Bookmark
            </div>
        </div>
    </div>
</template>

<script>
import { getPublishDate } from "@/helper";
import { mapActions } from "vuex";
export default {
    data() {
        return {
            allBookMark: [],
        };
    },
    props: {
        title: String,
        description: String,
        imageSrc: String,
        isBookmarked: Boolean,
        newsId: Number,
        website: String,
        content: String,
        publishDate: String,
    },

    methods: {
        ...mapActions(["fetchBookMarks"]),
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
        toggleBookmark() {
            // You can implement the bookmark functionality here
            this.$emit("toggle-bookmark");
        },
        formatArticleDate(date) {
            return getPublishDate(date);
        },
        getWebsiteLink(link) {
            return link?.split("/")[2];
        },
    },
};
</script>

<style scoped>
.news-card {
    width: 300px;
    border: 1px solid #ccc;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}
.delete-bookmark {
    color: #007bff;
    cursor: pointer;
}
</style>
