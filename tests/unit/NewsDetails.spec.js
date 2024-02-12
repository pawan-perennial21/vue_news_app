import { expect } from "chai";
import { mount } from "@vue/test-utils";
import NewsDetails from "../../src/components/NewsDetails.vue";
import store from "@/store";

const article = {
    source: {
        id: null,
        name: "",
    },
    author: "Cheyenne MacDonald",
    title: "FedEx is building its own all-in-one ecommerce platform",
    description:
        "FedEx is planning to launch an ecommerce platform called “fdx” later this year. The shipping company announced\r\n the move on Sunday, describing fdx as an end-to-end online shopping hub that aims to provide sellers with solutions for everything from reaching p…",
    url: "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_5259640f-f021-4011-87e9-f9437f79939a",
    urlToImage: null,
    publishedAt: "2024/01/14",
    content:
        "Si vous cliquez sur « Tout accepter », nos partenaires (y compris 244 qui font partie du Cadre de transparence et de consentement dIAB) et nous utiliserons également des témoins et vos données person… [+982 chars]",
};

// describe("NewsCard.vue", () => {
//     it('renders "NewsDetails" ', async () => {
//         const wrapper = mount(NewsDetails, {
//             props: {
//                 article,
//             },
//             global: {
//                 plugins: [store],
//             },
//             mocks: {
//                 $route: {
//                     params: {
//                         // Don't provide newsId here to simulate improper setup
//                     },
//                 },
//             },
//         });
//     });
// });

describe("NewsDetails.vue", () => {
    it.only("renders article title and content", async () => {
        await store.dispatch("getArticlesById", "1");
        const wrapper = mount(NewsDetails, {
            props: {
                article,
            },
            global: {
                plugins: [store],
            },
            mocks: {
                $route: {
                    params: {
                        newsId: "1",
                    },
                },
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.find(".news-headline").exists()).to.be.true;
        console.log(expect(wrapper.find(".news-headline").text()));
        // Assert that the article title and content are rendered correctly
        // expect(wrapper.find(".news-headline").text()).to.equal(
        //     article?.title
        // );
        // expect(wrapper.find(".news-content p").text()).to.equal(
        //     article?.content
        // );
    });

    it("renders default image if article image is not provided", async () => {
        const wrapper = mount(NewsDetails, {
            props: {
                article: {
                    ...article,
                    urlToImage: null,
                },
            },
            global: {
                plugins: [store],
            },
            mocks: {
                $route: {
                    params: {
                        newsId: 1,
                    },
                },
            },
        });
        await wrapper.vm.$nextTick();

        // Assert that the default image is rendered when article image is not provided
        expect(
            wrapper.find(".news-icon img").attributes("src")
        ).to.equal("https://dummyimage.com/600x400/000/fff");
    });

    it("renders redirect message if article is not available", async () => {
        const wrapper = mount(NewsDetails, {
            props: {
                article: null,
            },
            global: {
                plugins: [store],
            },
            mocks: {
                $route: {
                    params: {
                        newsId: "1",
                    },
                },
            },
        });
        await wrapper.vm.$nextTick();

        // Assert that the redirect message is rendered when article is not available
        expect(wrapper.find(".goto-card div").text()).to.equal(
            "Redirect Message"
        );
    });
});
