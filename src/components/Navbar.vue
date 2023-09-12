<template>
    <nav class="navbar">
        <div class="logo">
            <p @click="redirectToHomePage">News App</p>
        </div>
        <div class="navbar-content">
            <router-link class="link" to="/topnews"
                >Top News</router-link
            >
            <router-link class="link" to="/bookmarks"
                >Bookmarks</router-link
            >
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        redirectToHomePage() {
            this.$router.push("/");
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
.navbar-content > p:nth-child(2) {
    margin-left: 10px;
}
</style>
