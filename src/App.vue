<template>
    <Header />
    <div class="container">
        <router-view />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from "./components/Header.vue";

export default {
    name: "App",
    components: {
        Header,
    },
    mounted() {
        this.getNewsList();
    },
    computed: {},
    methods: {
        ...mapActions(["getNewsList"]),
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
