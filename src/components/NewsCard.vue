<template>
    <div class="news-card">
        <img
            class="news-image"
            :src="getNewsImg(imageSrc)"
            alt="News Image"
        />
        <h2 class="news-title">{{ title }}</h2>
        <p class="news-description">{{ description }}</p>
        <div class="news-footer">
            <button class="btn" @click="goToPage">Go to Page</button>
            <button class="btn" @click="toggleBookmark">
                {{ isBookmarked ? "Remove Bookmark" : "Bookmark" }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        imageSrc: String,
        isBookmarked: Boolean,
        newsId: Number,
    },

    // data() {
    //     return {
    //         id: this.newsId,
    //     };
    // },

    methods: {
        getNewsImg(img) {
            return img ?? "https://dummyimage.com/600x400/000/fff";
        },
        goToPage() {
            console.log(">>>>>>>>>>>>>>>>>>", this.newsId);
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

.btn {
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}
</style>
