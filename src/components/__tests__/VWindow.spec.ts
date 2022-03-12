import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import VWindow from "../Window/VWindow.vue";

describe("VWindow", () => {
	it("renders with proper title", () => {
		const wrapper = mount(VWindow, { props: { title: "My Window" } });
		expect(wrapper.text()).toContain("My Window");
	});

	it("VWindow matches snapshot", () => {
		const wrapper = mount(VWindow, {
			props: { title: "My Window", initPos: { left: 30, top: 50 } },
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
