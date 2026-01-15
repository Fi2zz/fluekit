import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "../Button.vue";

describe("Button", () => {
  it("renders default slot content", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click Me",
      },
    });
    expect(wrapper.text()).toBe("Click Me");
  });

  it("renders text prop", () => {
    const wrapper = mount(Button, {
      props: {
        text: "Submit",
      },
    });
    expect(wrapper.text()).toBe("Submit");
  });

  it("prioritizes slot over text prop", () => {
    const wrapper = mount(Button, {
      props: {
        text: "Submit",
      },
      slots: {
        default: "Cancel",
      },
    });
    expect(wrapper.text()).toBe("Cancel");
  });
});
