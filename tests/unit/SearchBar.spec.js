import { expect } from "chai";
import { mount } from "@vue/test-utils";
import SearchContainer from "@/components/SearchBar.vue";
import store from "@/store";

describe("SearchContainer.vue", () => {
    it("updates search parameters and emits event on search button click", async () => {
        const wrapper = mount(SearchContainer, {
            global: {
                plugins: [store],
            },
        });

        await wrapper.setData({
            SearchQuery: "Test Query",
            SearchCountry: "Country Name",
            SearchCategory: "Category Name",
        });

        await wrapper.find(".cta-btn:first-child").trigger("click");

        expect(wrapper.vm.SearchQuery).to.equal("Test Query");
        expect(wrapper.vm.SearchCountry).to.equal("Country Name");
        expect(wrapper.vm.SearchCategory).to.equal("Category Name");

        // Check if the event with the updated search parameters is emitted
        expect(wrapper.emitted("getSearchParams")).to.exist;
        expect(
            wrapper.emitted("getSearchParams")[0][0]
        ).to.deep.equal({
            searchQuery: "Test Query",
            searchCountry: "Country Name",
            searchCategory: "Category Name",
        });
    });

    it("resets search parameters and fetches all data on reset button click", async () => {
        const wrapper = mount(SearchContainer, {
            global: {
                plugins: [store],
            },
        });

        // Set some initial values for the search parameters
        await wrapper.setData({
            SearchQuery: "Test Query",
            SearchCountry: "Country Name",
            SearchCategory: "Category Name",
        });

        // Click on the reset button
        await wrapper.find(".cta-btn:last-child").trigger("click");

        // Check if the search parameters are reset
        expect(wrapper.vm.SearchQuery).to.equal("");
        expect(wrapper.vm.SearchCountry).to.equal("");
        expect(wrapper.vm.SearchCategory).to.equal("");
    });
});
