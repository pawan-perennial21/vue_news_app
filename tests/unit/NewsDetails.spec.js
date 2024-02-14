// Import necessary libraries and the component
import { expect } from "chai";
import { mount } from "@vue/test-utils";
import NewsDetails from "@/components/NewsDetails.vue"; // Assuming your component path

describe("NewsDetails.vue", () => {
    // Test case to check if the component renders correctly
    it("renders the component", () => {
        const wrapper = mount(NewsDetails);
        expect(wrapper.exists()).to.be.true;
    });

    // Test case to check if the component contains the "goto-card" class
    it('contains the "goto-card" class', () => {
        const wrapper = mount(NewsDetails);
        expect(wrapper.classes()).to.include("goto-card");
    });

    // // Test case to check if the component contains an image
    // it("contains an image element", () => {
    //     const wrapper = mount(NewsDetails);
    //     expect(wrapper.find("img").exists()).to.be.true;
    // });

    // // Test case to check if the component renders article title
    // it("renders the article title", () => {
    //     const wrapper = mount(NewsDetails, {
    //         data() {
    //             return {
    //                 article: {
    //                     title: "Test Article Title",
    //                 },
    //             };
    //         },
    //     });
    //     expect(wrapper.find(".news-headline").text()).to.equal(
    //         "Test Article Title"
    //     );
    // });

    // // Test case to check if the component renders article content
    // it("renders the article content", () => {
    //     const wrapper = mount(NewsDetails, {
    //         data() {
    //             return {
    //                 article: {
    //                     content: "Test Article Content",
    //                 },
    //             };
    //         },
    //     });
    //     expect(wrapper.find(".news-content p").text()).to.equal(
    //         "Test Article Content"
    //     );
    // });
});
