<template>
    <div class="header">
        <SearchBar @getSearchParams="getSearchParams" />
    </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
export default {
    components: {
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
    top: 38px;
    left: 0px;
}
</style>
