import { expect } from "chai";
import { mount } from "@vue/test-utils";
import NewsCard from "../../src/components/NewsCard.vue";
import store from "@/store";

const article = {
    source: {
        id: null,
        name: "Yahoo Entertainment",
    },
    author: "Cheyenne MacDonald",
    title: "FedEx is building its own all-in-one ecommerce platform",
    description:
        "FedEx is planning to launch an ecommerce platform called “fdx” later this year. The shipping company announced\r\n the move on Sunday, describing fdx as an end-to-end online shopping hub that aims to provide sellers with solutions for everything from reaching p…",
    url: "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_5259640f-f021-4011-87e9-f9437f79939a",
    urlToImage: null,
    publishedAt: "2024-01-14T23:36:24Z",
    content:
        "Si vous cliquez sur « Tout accepter », nos partenaires (y compris 244 qui font partie du Cadre de transparence et de consentement dIAB) et nous utiliserons également des témoins et vos données person… [+982 chars]",
};

describe("NewsCard.vue", () => {
    it('renders "NewsCard" ', async () => {
        const wrapper = mount(NewsCard, {
            props: {
                article,
            },
            global: {
                plugins: [store],
            },
        });

        // Check if the news card element exists
        expect(wrapper.find(".news-card").exists()).to.be.true;

        // Check if the news image is rendered correctly
        expect(
            wrapper.find(".news-image").attributes("src")
        ).to.equal(article.urlToImage);

        // Check if the article title is rendered correctly
        expect(wrapper.find(".news-headline").text()).to.equal(
            article.title
        );

        // Check if the website link is rendered correctly
        expect(wrapper.find(".web-link").text()).to.equal(
            article.source.name
        );

        // Check if the content is rendered correctly
        expect(wrapper.find(".sub-content").text()).to.equal(
            article.content
        );

        // Check if the published date is rendered correctly
        expect(wrapper.find(".publish-date").text()).to.include(
            "Published"
        );
        expect(wrapper.find(".publish-date").text()).to.include(
            formatArticleDate(article.publishedAt)
        );

        // Check if the bookmark icon is rendered correctly
        // Assuming you have a computed property or method to determine if the article is bookmarked
        expect(
            wrapper.find(".delete-bookmark img").attributes("src")
        ).to.equal(isBookmark ? bookmarkFilledIcon : bookmarkIcon);
    });

    // Add more test cases as needed for other methods, computed properties, etc.
});
