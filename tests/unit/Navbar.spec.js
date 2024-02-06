// Importing required libraries
import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Navbar from "../../src/components/Navbar.vue"; // Assuming the component is in the same directory and named 'HelloWorld.vue'

describe("Navbar", () => {
    // it("renders the component with Navbar", () => {
    //     // Mounting the component
    //     const wrapper = mount(Navbar);

    //     // Checking if the rendered text contains 'Hello world'
    //     expect(wrapper.text()).to.include("Hello world");
    // });

    it('has the name "Navbar"', () => {
        // Creating a new instance of the component
        const wrapper = mount(Navbar);

        // Accessing the component's name property
        expect(wrapper.vm.$options.name).to.equal("Navbar");
    });
});
