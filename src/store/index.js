import { apiKey, newsUrl } from "@/constants";
import { getCountryCode } from "@/helper";
import axios from "axios";
import { createStore } from "vuex";
// import { v4 as uuidv4 } from "uuid";
const store = createStore({
    state() {
        return {
            loading: false,
            newsLists: [],
            newsDetails: {},
            selectedCountry: "",
            selectedCategory: "",
            textInputMessage: "",
        };
    },
    mutations: {
        setNewsList(state, data1) {
            state.newsLists = data1;
        },
        setNewsDetails(state, data1) {
            state.newsLists = data1;
        },
        setLoading(state, data1) {
            state.loading = data1;
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
    },
    actions: {
        async getNewsList({ commit }) {
            commit("setLoading", true);
            try {
                const res = await axios.get(
                    `${newsUrl}?q=india&apiKey=${apiKey}`
                );
                console.log("res", res);
                const articlesWithUUID = res.data.articles.map(
                    (article, index) => ({
                        ...article,
                        id: index, // Generate a UUID for each article
                    })
                );
                commit("setNewsList", articlesWithUUID);
                commit("setLoading", false);
            } catch (error) {
                console.log(error);
                commit("setLoading", false);
            }
        },
        async fetchTopHeading(
            { commit },
            { country, category, keyword }
        ) {
            let countryCode = getCountryCode(country);
            console.log("countryCodecountryCode", countryCode);
            const res = await axios.get(
                `${newsUrl}?country=${countryCode}&category=${category}&q=${keyword}&apiKey=${apiKey}`
            );
            console.log('resrerssrrrrrrrrrrrrrrrrrrr',res)
            commit("setLoading", false);
            commit("setNewsList", res.data.articles);
            if (res.data.articles.length === 0) {
                commit("setErrorMessage", "");
            }
        },
        // fetchTopHeading(
        //     { commit },
        //     { country , category, keyword }
        //   ) {
        //     let countryCode = getCountryCode(country);
        //     console.log("countryCodecountryCode",countryCode)
        //     fetch(
        //       `${newsUrl}?country=${countryCode}&category=${category}&q=${keyword}&apiKey=${apiKey}`
        //     )
        //       .then((response) => response.json())
        //       .then((data) => {
        //         commit('setLoading', false);
        //         commit("setArticles", data.articles);
        //         if(data.articles.length === 0){
        //           commit("setErrorMessage", "");
        //         }
        //       })
        //       .catch((error) => {
        //         commit("setError", error);
        //       });
        //   },
    },
    getters: {
        getNewsList: (state) => {
            return state.newsLists;
        },
        getArticlesById: (state) => (id) => {
            let result = state.newsLists?.filter((article) => {
                return article.id === +id;
            });

            return result[0];
        },
    },
});

export default store;
