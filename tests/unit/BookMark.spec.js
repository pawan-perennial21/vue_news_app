import { mount } from "@vue/test-utils";
import { expect } from "chai";
import BookmarksView from "../../src/views/BookMark.vue";
import store from "../../src/store/index";

const mockBookmarkedNews = {
    source: {
        id: "breitbart-news",
        name: "Breitbart News",
    },
    author: "Bradley Jaye",
    title: "'Internet Rumors' Proven True: Border Bill to Allow 8,500 Migrants per Day",
    description:
        'The authors of the border bill assured it would not permit 5,000 migrants or more per day, attributing those claims as "internet rumors."',
    url: "http://www.breitbart.com/politics/2024/02/04/internet-rumors-proven-true-border-bill-allow-8500-migrants-day/",
    urlToImage:
        "https://media.breitbart.com/media/2022/09/AP22241152762345-640x335.png",
    publishedAt: "2024-02-05T02:19:45Z",
    content:
        "Sometimes you can believe what you read on the internet.\r\nThe authors of the border bill repeatedly assured Americans that their bill would not permit 5,000 migrants or more per day, attributing thos… [+2091 chars]",
};
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key],
        setItem: (key, value) => (store[key] = value.toString()),
        removeItem: (key) => delete store[key],
        clear: () => (store = {}),
    };
})();

global.localStorage = localStorageMock;
describe("BookmarksView", () => {
    it('renders "No news found" when there are no bookmarked news articles', async () => {
        const wrapper = mount(BookmarksView, {
            global: {
                plugins: [store],
            },
        });
        expect(wrapper.find(".no-news").exists()).to.be.true;
    });

    it("renders news grid when there are bookmarked news articles", async () => {
        await store.dispatch(
            "toggleBookmarkArticle",
            mockBookmarkedNews
        );

        const wrapper = mount(BookmarksView, {
            global: {
                plugins: [store],
            },
        });
        expect(wrapper.find(".news-grid").exists()).to.be.true;
    });
});
