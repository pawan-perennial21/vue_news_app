<template>
    <nav class="navbar">
        <div class="logo">
            <p @click="redirectToHomePage">News App</p>
        </div>
        <div class="navbar-content">
            <p @click="handleTopNews">Top News</p>
            <router-link class="link" to="/bookmarks"
                >Bookmarks</router-link
            >
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        redirectToHomePage() {
            this.$router.push("/");
            this.$store.dispatch("fetchAllData");
        },
        handleTopNews() {
            this.$store.dispatch("fetchTopHeading");
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
    margin-left: 10px;
}
.navbar-content > p {
    cursor: pointer;
}
</style>
