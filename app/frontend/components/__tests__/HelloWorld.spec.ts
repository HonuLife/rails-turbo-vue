import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.text()).toContain(
      "Welcome to the Rails + Vue template app! ⚡️"
    );
  });
});
