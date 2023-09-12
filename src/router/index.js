import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NewsDetails from "../components/NewsDetails.vue";
import BookMarks from "../views/BookMark.vue";
import TopNews from "../views/TopNews.vue";
const routes = [
    { path: "/", name: "home", component: Home },
    {
        path: "/news-details/:newsId",
        name: "newsDetails",
        component: NewsDetails,
    },
    {
        path: "/bookmarks",
        name: "bookmarks",
        component: BookMarks,
    },

    {
        path: "/topnews",
        name: "topnews",
        component: TopNews,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
