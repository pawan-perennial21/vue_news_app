import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NewsDetails from "../components/NewsDetails.vue";
const routes = [
    { path: "/", name: "home", component: Home },
    {
        path: "/news-details/:newsId",
        name: "newsDetails",
        component: NewsDetails,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
