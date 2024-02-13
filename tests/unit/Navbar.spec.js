import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";
import { createRouter, createWebHistory } from "vue-router";
import Vuex from "vuex";
import Sinon from "sinon";

describe("Navbar.vue", () => {
    let wrapper;
    let router;
    let store;

    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: [],
        });
        store = new Vuex.Store({
            state: {},
            mutations: {},
            actions: {
                fetchAllData: () => {}, // Mock fetchAllData action
                fetchTopHeading: () => {}, // Mock fetchTopHeading action
            },
        });

        wrapper = mount(Navbar, {
            global: {
                plugins: [router, store],
            },
        });
    });

    it("redirects to home page when logo is clicked", async () => {
        const redirectToHomePageStub = Sinon.stub(
            wrapper.vm,
            "redirectToHomePage"
        );
        await wrapper.find(".logo p").trigger("click");
        expect(redirectToHomePageStub.calledOnce).to.be.true;
    });

    it("dispatches fetchTopHeading action when top news link is clicked", async () => {
        const fetchTopHeadingStub = Sinon.stub(
            wrapper.vm.$store,
            "dispatch"
        );
        await wrapper.find(".navbar-content p").trigger("click");
        expect(fetchTopHeadingStub.calledOnceWith("fetchTopHeading"))
            .to.be.true;
    });

    // You can write more test cases for other interactions here
});
