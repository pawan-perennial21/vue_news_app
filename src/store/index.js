import { apiKey, newsUrl, topNewsUrl } from "@/constants";
import { getCountryCode } from "@/helper";
import axios from "axios";
import { createStore } from "vuex";
const store = createStore({
    state() {
        return {
            loading: false,
            newsLists: [],
            bookmarks: [],
            topNewsList: [],
            newsDetails: {},
            totalResults: 0,
            pageSize: 21,
            selectedCountry: "",
            selectedCategory: "",
            textInputMessage: "",
        };
    },
    mutations: {
        setNewsList(state, data1) {
            state.newsLists = data1;
        },
        setTopNewsList(state, data1) {
            state.topNewsList = data1;
        },
        setNewsDetails(state, data1) {
            state.newsLists = data1;
        },
        setLoading(state, data1) {
            state.loading = data1;
        },
        setTotalResults(state, totalResults) {
            state.totalResults = totalResults;
        },

        setPageSize(state, payload) {
            state.pageSize = payload;
        },
        addBookMarks: (state, article) => {
            state.bookmarks.push(article);
            localStorage.setItem(
                "bookmarks",
                JSON.stringify(state.bookmarks)
            );
        },
        removeBookMarks: (state, article) => {
            const index = state.bookmarks.findIndex(
                (bookmark) => bookmark.id === article.id
            );
            if (index !== -1) {
                state.bookmarks.splice(index, 1);
                localStorage.setItem(
                    "bookmarks",
                    JSON.stringify(state.bookmarks)
                );
            }
        },
        setBookMarks: (state, bookmarks) => {
            state.bookmarks = bookmarks;
        },
    },
    actions: {
        async updatePageSize({ commit }, payload) {
            commit("setPageSize", payload);
        },
        async fetchAllData({ commit }, payload) {
            commit("setLoading", true);
            if (!payload) {
                try {
                    const res = await axios.get(
                        `${newsUrl}?q=all&pageSize=${this.state.pageSize}&apiKey=${apiKey}`
                    );
                    const articlesWithUUID = res.data.articles.map(
                        (article, index) => ({
                            ...article,
                            id: index,
                            isBookmarked: false,
                        })
                    );
                    commit("setNewsList", articlesWithUUID);
                    commit("setTotalResults", res.data.totalResults);
                    commit("setLoading", false);
                } catch (error) {
                    commit("setLoading", false);
                }
            } else {
                const { searchQuery, searchCountry, searchCategory } =
                    payload;
                if (
                    searchQuery !== "" ||
                    searchCategory !== "" ||
                    searchCountry !== ""
                ) {
                    let countryCode = getCountryCode(searchCountry);
                    const url = `${topNewsUrl}?country=${countryCode}&category=${searchCategory}&q=${searchQuery}&apiKey=${apiKey}`;
                    try {
                        const res = await axios.get(url);
                        const articlesWithUUID =
                            res.data.articles.map(
                                (article, index) => ({
                                    ...article,
                                    id: index,
                                })
                            );
                        commit("setNewsList", articlesWithUUID);
                        commit(
                            "setTotalResults",
                            res.data.totalResults
                        );
                        commit("setLoading", false);
                    } catch (error) {
                        commit("setLoading", false);
                    }
                }
            }
        },
        fetchBookMarks({ commit }, bookMarks) {
            commit("setBookMarks", bookMarks);
        },
        async fetchTopHeading({ commit }) {
            const res = await axios.get(
                `${topNewsUrl}?country=in&category=business&apiKey=${apiKey}`
            );
            commit("setLoading", false);
            const articlesWithUUID = res.data.articles.map(
                (article, index) => ({
                    ...article,
                    id: index,
                })
            );
            commit("setTotalResults", res.data.totalResults);
            commit("setNewsList", articlesWithUUID);
            if (res.data.articles.length === 0) {
                commit("setErrorMessage", "");
            }
        },
        toggleBookmarkArticle({ commit, getters }, article) {
            if (getters.isArticleBookmarked(article)) {
                commit("removeBookMarks", article);
            } else {
                commit("addBookMarks", article);
            }
        },
        loadBookmarks({ commit }) {
            const bookmarks =
                JSON.parse(localStorage.getItem("bookmarks")) || [];
            commit("setBookMarks", bookmarks);
        },
    },
    getters: {
        getNewsList: (state) => {
            return state.newsLists;
        },
        isArticleBookmarked: (state) => (article) => {
            return state.bookmarks.some(
                (bookmark) => bookmark.id === article.id
            );
        },
        getBookmarks: (state) => {
            return state.bookmarks;
        },
        getTopNewsList: (state) => {
            return state.topNewsList;
        },
        getPageCount(state) {
            return state.pageSize;
        },
        getArticlesById: (state) => (id) => {
            let result = state.newsLists?.filter((article) => {
                return article.id === +id;
            });
            console.log("resultresult", result);

            return result[0];
        },
        getTotalResults(state) {
            return state.totalResults;
        },
    },
});

export default store;
