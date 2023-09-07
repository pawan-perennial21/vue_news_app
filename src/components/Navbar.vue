<template>
    <nav class="navbar">
        <div>
            <p>News App</p>
        </div>
        <div class="navbar-content">
            <p>Top News</p>
            <p>Bookmarks</p>
        </div>
    </nav>
</template>

<script>
export default {};
</script>

<style>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
    background: #393646;
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
