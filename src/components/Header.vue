<template>
    <div class="header">
        <Navbar />
        <SearchBar @getSearchParams="getSearchParams" />
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import SearchBar from "./SearchBar.vue";
export default {
    components: {
        Navbar,
        SearchBar,
    },
    methods: {
        getSearchParams(payload) {
            this.extraParams = payload;
            this.$store.dispatch("fetchAllData", this.extraParams);
        },
        async fetch() {
            this.$store.dispatch("fetchAllData", this.extraParams);
        },
    },
};
</script>

<style>
.header {
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
}
</style>
