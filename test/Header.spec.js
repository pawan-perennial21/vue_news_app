// test/example.spec.js
import { mount } from '@vue/test-utils';
import Header from "../src/components/Header.vue"
import { expect } from 'chai';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = mount(Header, {
      props: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});
