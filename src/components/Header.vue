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
    top: 40px;
    left: 0px;
    @media only screen and (max-width: 320px) {
        top: 58px;

    }
   
}
</style>
