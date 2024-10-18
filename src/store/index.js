import { apiKey, newsUrl, topNewsUrl } from "@/constants";
import { getCountryCode } from "@/helper";
import axios from "axios";
import { createStore } from "vuex";

// Utility function for making API requests
const fetchData = async (url) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
};

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
        setNewsList(state, articles) {
            state.newsLists = articles;
        },
        setTopNewsList(state, articles) {
            state.topNewsList = articles;
        },
        setNewsDetails(state, article) {
            state.newsDetails = article;
        },
        setLoading(state, isLoading) {
            state.loading = isLoading;
        },
        setTotalResults(state, totalResults) {
            state.totalResults = totalResults;
        },
        setPageSize(state, pageSize) {
            state.pageSize = pageSize;
        },
        setBookMarks(state, bookmarks) {
            state.bookmarks = bookmarks;
        },
        addBookMark(state, article) {
            state.bookmarks.push(article);
            updateLocalStorageBookmarks(state.bookmarks);
        },
        removeBookMark(state, articleId) {
            state.bookmarks = state.bookmarks.filter(
                (bookmark) => bookmark.id !== articleId
            );
            updateLocalStorageBookmarks(state.bookmarks);
        },
    },
    actions: {
        async updatePageSize({ commit }, pageSize) {
            commit("setPageSize", pageSize);
        },
        async fetchAllData({ commit, state }, { searchQuery = "", searchCountry = "", searchCategory = "" } = {}) {
            commit("setLoading", true);
            const countryCode = getCountryCode(searchCountry);
            const url = searchQuery || searchCountry || searchCategory 
                ? `${topNewsUrl}?country=${countryCode}&category=${searchCategory}&q=${searchQuery}&apiKey=${apiKey}`
                : `${newsUrl}?q=all&pageSize=${state.pageSize}&apiKey=${apiKey}`;

            try {
                const data = await fetchData(url);
                const articlesWithUUID = data.articles.map((article, index) => ({
                    ...article,
                    id: index,
                    isBookmarked: false,
                }));
                commit("setNewsList", articlesWithUUID);
                commit("setTotalResults", data.totalResults);
            } finally {
                commit("setLoading", false);
            }
        },
        async fetchTopHeading({ commit }) {
            commit("setLoading", true);
            try {
                const data = await fetchData(`${topNewsUrl}?country=in&category=business&apiKey=${apiKey}`);
                const articlesWithUUID = data.articles.map((article, index) => ({
                    ...article,
                    id: index,
                }));
                commit("setTopNewsList", articlesWithUUID);
                commit("setTotalResults", data.totalResults);
            } finally {
                commit("setLoading", false);
            }
        },
        toggleBookmarkArticle({ commit, getters }, article) {
            if (getters.isArticleBookmarked(article)) {
                commit("removeBookMark", article.id);
            } else {
                commit("addBookMark", article);
            }
        },
        loadBookmarks({ commit }) {
            const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
            commit("setBookMarks", bookmarks);
        },
    },
    getters: {
        getNewsList: (state) => state.newsLists,
        isArticleBookmarked: (state) => (article) => state.bookmarks.some((bookmark) => bookmark.id === article.id),
        getBookmarks: (state) => state.bookmarks,
        getTopNewsList: (state) => state.topNewsList,
        getPageSize: (state) => state.pageSize,
        getArticlesById: (state) => (id) => state.newsLists.find((article) => article.id === +id),
        getTotalResults: (state) => state.totalResults,
    },
});

const updateLocalStorageBookmarks = (bookmarks) => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

export default store;
