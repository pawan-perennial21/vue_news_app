<template>
    <nav class="navbar">
        <div>
            <p @click="redirectToHomePage">News App</p>
        </div>
        <div class="navbar-content">
            <p>Top News</p>
            <router-link to="/bookmarks">Bookmarks</router-link>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
    background: #053b50;
    color: #ffffff;
}
.navbar-content {
    display: flex;
    align-items: center;
}
.navbar-content > p:nth-child(2) {
    margin-left: 10px;
}
</style>
