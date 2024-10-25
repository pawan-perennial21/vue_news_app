import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
const app = createApp(App);
app.use(store);
store.dispatch("loadBookmarks");
app.use(router);
app.mount("#app");
