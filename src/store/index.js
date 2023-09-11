import { apiKey, newsUrl, topNewsUrl } from "@/constants";
import { getCountryCode } from "@/helper";
import axios from "axios";
import { createStore } from "vuex";
const store = createStore({
    state() {
        return {
            loading: false,
            newsLists: [],
            newsDetails: {},
            totalResults: 0,
            pageSize: 21,
            selectedCountry: "",
            selectedCategory: "",
            textInputMessage: "",
        };
    },
    mutations: {
        updateBookmark(state, id) {
            state.newsLists = state.newsLists.map((article) =>
                article.id == id
                    ? {
                          ...article,
                          isBookmarked: !article.isBookmarked,
                      }
                    : article
            );
        },
        setNewsList(state, data1) {
            state.newsLists = data1;
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
        setSelectedOption(state, country) {
            state.selectedCountry = country;
        },
        setSelectedCategory(state, category) {
            state.selectedCategory = category;
        },
        setTextInputMessage(state, message) {
            state.textInputMessage = message;
        },
        setBookMarks(state, bookMarks) {
            state.bookMarks = [...state.bookMarks, bookMarks];
        },
        setPageSize(state, payload) {
            state.pageSize = payload;
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
                    console.log(error);
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
                    console.log("searchQuery",searchQuery)
                    const url = `https://newsapi.org/v2/${
                        searchCountry || searchQuery
                            ? "top-headlines"
                            : searchCategory
                            ? "top-headlines"
                            : "everything"
                    }?${
                        searchCountry
                            ? `country=${searchCountry}&`
                            : ""
                    }${
                        searchCategory
                            ? `category=${searchCategory}&`
                            : ""
                    }${
                        searchQuery ? `q=${searchQuery}&` : ""
                    }pageSize=${
                        this.state.pageSize
                    }&apiKey=${apiKey}`;
                    try {
                        const res = await axios.get(url);
                        console.log("Ggagagagaga=>>>>>",res)
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
                        console.log(error);
                        commit("setLoading", false);
                    }
                }
            }
        },
        fetchBookMarks({ commit }, bookMarks) {
            commit("setBookMarks", bookMarks);
        },
        async fetchTopHeading(
            { commit },
            { country, category, keyword }
        ) {
            let countryCode = getCountryCode(country);
            const res = await axios.get(
                `${topNewsUrl}?country=${countryCode}&category=${category}&q=${keyword}&apiKey=${apiKey}`
            );
            commit("setLoading", false);
            commit("setNewsList", res.data.articles);
            if (res.data.articles.length === 0) {
                commit("setErrorMessage", "");
            }
        },
    },
    getters: {
        getNewsList: (state) => {
            return state.newsLists;
        },
        getPageCount(state) {
            return state.pageSize;
        },
        getArticlesById: (state) => (id) => {
            let result = state.newsLists?.filter((article) => {
                return article.id === +id;
            });

            return result[0];
        },
        getTotalResults(state) {
            return state.totalResults;
        },
        getBookMarks(state) {
            return state.newsLists.filter(
                (article) => article.isBookmarked
            );
        },
    },
});

export default store;
