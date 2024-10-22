// Import necessary libraries and the component
import { expect } from "chai";
import { mount } from "@vue/test-utils";
import NewsDetails from "@/components/NewsDetails.vue"; // Assuming your component path
import store from "@/store";

describe("NewsDetails.vue", () => {
    // Test case to check if the component renders correctly
    it("renders the component", () => {
        const wrapper = mount(NewsDetails);
        expect(wrapper.exists()).to.be.true;
    });

    it('contains the "goto-card" class', () => {
        const wrapper = mount(NewsDetails);
        expect(wrapper.classes()).to.include("goto-card");
    });

    // // Test case to check if the component contains an image
    it("contains an image element", () => {
        const wrapper = mount(NewsDetails);
        expect(wrapper.find("img").exists()).to.be.false;
    });
    // it("returns the article based on route params", () => {
    //     const wrapper = mount(NewsDetails, {
    //         mocks: {
    //             $route: {
    //                 params: {
    //                     newsId: "123",
    //                 },
    //             },
    //         },
    //         global: {
    //             plugins: [store],
    //         },
    //     });
    //     wrapper.setData({
    //         newsId: "0",
    //     });
    //     console.log("(wrapper.vm.article", wrapper.vm.article);
    //     expect(wrapper.vm.article).to.deep.equal({
    //         /* mock article object */
    //         title: "Substack’s moderation battle: all the latest news",
    //         content:
    //             "Filed under: ByEmma Roth, a news writer who covers the streaming wars, consumer tech, crypto, social media, and much more. Previously, she was a writer and editor at MUO. Since launching in 2017, … [+5808 chars]",
    //     });
    // });
});
