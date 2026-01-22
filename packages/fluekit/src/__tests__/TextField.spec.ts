import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TextField from "../TextField.vue";
import { FloatingLabelBehavior } from "../InputDecoration";
import { EdgeInsets } from "../EdgeInsets";

describe("TextField.vue", () => {
  it("renders labelText", () => {
    const wrapper = mount(TextField, {
      props: {
        decoration: {
          labelText: "My Label",
        },
      },
    });
    expect(wrapper.text()).toContain("My Label");
  });

  it("renders icon outside the content", () => {
    const wrapper = mount(TextField, {
      slots: {
        icon: '<span class="test-icon">ICON</span>',
      },
    });
    expect(wrapper.find(".fluekit-input-icon .test-icon").exists()).toBe(true);
  });

  it("renders prefixIcon inside the container", () => {
    const wrapper = mount(TextField, {
      slots: {
        prefixIcon: '<span class="prefix-icon">P-ICON</span>',
      },
    });
    expect(wrapper.find(".fluekit-input-prefix-icon .prefix-icon").exists()).toBe(true);
  });

  it("floating label behavior: always", async () => {
    const wrapper = mount(TextField, {
      props: {
        decoration: {
          labelText: "Floating Label",
          floatingLabelBehavior: FloatingLabelBehavior.always,
        },
      },
    });
    // Label should have 'is-floating' class
    const label = wrapper.find(".fluekit-input-label");
    expect(label.classes()).toContain("is-floating");
  });

  it("floating label behavior: never", async () => {
    const wrapper = mount(TextField, {
      props: {
        modelValue: "Some text", // Has content, usually floats
        decoration: {
          labelText: "Static Label",
          floatingLabelBehavior: FloatingLabelBehavior.never,
        },
      },
    });

    // In our implementation, 'never' with content hides the label (since it would overlap)
    const label = wrapper.find(".fluekit-input-label");
    expect(label.exists()).toBe(false);
  });

  it("isDense applies smaller padding", () => {
    const wrapper = mount(TextField, {
      props: {
        decoration: {
          isDense: true,
          border: { isOutline: true }, // trigger outline logic
        },
      },
    });
    const container = wrapper.find(".fluekit-input-container");
    // We can't easily check computed style in jsdom unless we inspect style attribute if it's set inline
    // Our implementation sets style attribute.
    const style = container.attributes("style");
    // "padding: 8px 8px" might be normalized to "padding: 8px;"
    const hasCorrectPadding =
      style?.includes("padding: 8px 8px") || style?.includes("padding: 8px;");
    expect(hasCorrectPadding).toBe(true);
  });

  it("shows custom counter text", () => {
    const wrapper = mount(TextField, {
      props: {
        maxLength: 10,
        decoration: {
          counterText: "Custom Counter",
        },
      },
    });
    const counter = wrapper.find(".fluekit-input-counter");
    expect(counter.text()).toBe("Custom Counter");
  });

  it("supports EdgeInsets in contentPadding", () => {
    const wrapper = mount(TextField, {
      props: {
        decoration: {
          contentPadding: EdgeInsets.only({ top: 10, left: 20 }),
          border: { isOutline: true },
        },
      },
    });
    const container = wrapper.find(".fluekit-input-container");
    const style = container.attributes("style");
    // Vue style object might normalize properties or use shorthand 'padding'
    // Received: "... padding: 10px 0px 0px 20px;"
    // We should check for either the shorthand or specific properties
    const hasPadding =
      style?.includes("padding: 10px 0px 0px 20px") ||
      (style?.includes("padding-top: 10px") && style?.includes("padding-left: 20px"));
    expect(hasPadding).toBe(true);
  });
});
