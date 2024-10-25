<template>
    <nav class="navbar">
        <div class="logo">
            <p @click="handleTopNews">News App</p>
        </div>
        <div class="navbar-content">
            <router-link to="/" class="link" @click="handleTopNews">
                Top News
            </router-link>
            <router-link
                class="link"
                to="/bookmarks"
                @click="handleBookmarks"
                >Bookmarks</router-link
            >
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        handleTopNews() {
            this.$router.push("/");
        },
        handleBookmarks() {
            this.isActiveTopNews = false; // Deactivate "Top News" when Bookmarks is active
        },
        isActive(route) {
            return this.$route.path === route;
        },
    },
};
</script>

<style>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
    background: #053b50;
    color: #ffffff;
    border: 1px solid #053b50;
}
.logo > p {
    cursor: pointer;
}
.navbar-content {
    display: flex;
    align-items: center;
}
.link {
    text-decoration: none;
    color: #ffffff;
}
.link:nth-child(1) {
    margin-right: 20px;
}
.navbar-content > p {
    cursor: pointer;
    margin-right: 25px;
}
.router-link-exact-active {
    color: #ffd700;
}
</style>
