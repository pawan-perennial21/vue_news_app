// Importing required libraries
import { expect } from "chai";
import { mount } from "@vue/test-utils";
import NoRecord from "../../src/components/NoRecord.vue"; // Assuming the component is in the same directory and named 'HelloWorld.vue'

describe("NoRecord", () => {
    it('has the name "NoRecord"', () => {
        // Creating a new instance of the component
        const wrapper = mount(NoRecord);

        // Accessing the component's name property
        expect(wrapper.vm.$options.name).to.equal("NoRecord");
    });
});
