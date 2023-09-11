<template>
    <div class="book-marks-page">
        <div class="bookmark-nav">
            <nav-bar />
        </div>
        <div v-if="getBookMarkLength">
            <h2 class="nobookmark">No BookMarks Saved</h2>
        </div>
        <div class="bookmark-card">
            <div
                v-for="(item, index) in bookMarkList"
                :key="item.id + index"
            >
                <NewsCard
                    :imgSrc="item.urlToImage"
                    :title="item.title"
                    :website="item.url"
                    :content="item.content"
                    :publishDate="item.publishedAt"
                    :id="item.id"
                    :article="item"
                    @bookmark="bookmark(item.id)"
                    @deleteBookmark="deleteBookMark(item.id)"
                    :isBookmarked="!item.isBookmarked"
                />
              
            </div>
        </div>
    </div>
</template>

<script>
import NewsCard from "../components/NewsCard.vue";
import { mapGetters } from "vuex";
export default {
    name: "BookMarks",
    components: {
        NewsCard,
    },
    data() {
        return {
            bookMarkList: [],
        };
    },
    computed: {
        ...mapGetters(["getBookMarks"]),

        getBookMarkLength() {
            return this.bookMarkList?.length == 0;
        },
    },
    methods: {
        bookmark(id) {
            this.$store.commit("updateBookmark", id);
            this.bookMarkList = this.getBookMarks;
        },
        deleteBookMark(id) {
            this.$store.commit("updateDeleteBookmark", id);
        },
        getPublishDate(date) {
            return date.split("T")[0];
        },
    },
    mounted() {
        this.bookMarkList = this.getBookMarks;
    },
};
</script>

<style scoped>
.news-img img {
    width: 300px;
    height: 200px;
}

.news-content {
    padding: 15px;
    text-align: left;
}

.news-headline {
    margin: 0;
}

.goto-btn {
    background-color: #333;
    padding: 9px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin: 16px;
}

.card-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.publish-date {
    border-top: 1px solid gray;
}

.publish-date > p {
    text-align: left;
    padding-left: 15px;
}

.save-icon img {
    width: 24px;
    height: 24px;
}

.save-icon {
    height: 31px;
}

.bookmark-card {
    display: flex;
    flex-wrap: wrap;
    background: gainsboro;
    justify-content: center;
    margin-top: 30px;
}

.news-card {
    margin: 7px 16px 10px 16px;
}

.back-button {
    text-align: left;
}

.book-marks-page {
    height: 100vh;
    background: gainsboro;
}

.text-bookmark {
    text-align: center;
    margin-top: 47px;
}

img {
    width: 24px;
    height: 24px;
}

.bookmark-nav {
    top: 0;
    position: sticky;
}

@media only screen and (max-width: 768px) {
    .bookmark-card {
        justify-content: center;
    }

    .text-bookmark {
        padding-top: 10px;
        margin-top: 85px;
    }
}
</style>
