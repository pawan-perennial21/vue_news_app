// Importing required libraries
import { expect } from "chai";
import { mount } from "@vue/test-utils";
import HelloWorld from "../../src/components/HelloWorld.vue"; // Assuming the component is in the same directory and named 'HelloWorld.vue'

describe("HelloWorld", () => {
    it('renders the component with "Hello world"', () => {
        // Mounting the component
        const wrapper = mount(HelloWorld);

        // Checking if the rendered text contains 'Hello world'
        expect(wrapper.text()).to.include("Hello world");
    });

    it('has the name "HelloWorld"', () => {
        // Creating a new instance of the component
        const wrapper = mount(HelloWorld);

        // Accessing the component's name property
        expect(wrapper.vm.$options.name).to.equal("HelloWorld");
    });
});
