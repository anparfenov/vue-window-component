<template>
	<div ref="frame" class="window">
		<div
			class="window__top window__border"
			@mousedown="handleTopMouseDown"
		/>
		<div
			class="window__bottom window__border"
			@mousedown="handleBottomMouseDown"
		/>
		<div
			class="window__left window__border"
			@mousedown="handleLeftMouseDown"
		/>
		<div
			class="window__right window__border"
			@mousedown="handleRightMouseDown"
		/>
		<div
			class="window__top-right window__border window__border--small"
			@mousedown="handleTopRightMouseDown"
		/>
		<div
			class="window__top-left window__border window__border--small"
			@mousedown="handleTopLeftMouseDown"
		/>
		<div
			class="window__bottom-right window__border window__border--small"
			@mousedown="handleBottomRightMouseDown"
		/>
		<div
			class="window__bottom-left window__border window__border--small"
			@mousedown="handleBottomLeftMouseDown"
		/>
		<div
			ref="titlebar"
			class="window__titlebar"
			@mousedown="handleTitleBarMouseDown"
		>
			<h2 class="window__title">{{ title }}</h2>
			<span class="window__controls">
				<button
					class="window__button window__button--maximize"
					aria-label="maximize"
					@click="maximizeWindow"
				/>
				<button
					class="window__button window__button--close"
					aria-label="close"
					@click="closeWindow"
				/>
			</span>
		</div>
		<div class="window__content">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { ref, onMounted, watchEffect, defineComponent, toRefs } from "vue";
import { useResizer, useMover, Position } from "../../use/useWindow";

import type { PropType } from "vue";
import type { Coordinates } from '../../use/useWindow';

import type { Ref } from "vue";

export default defineComponent({
	name: "VWindow",
	props: {
		initPos: { type: Object as PropType<Coordinates>, default: () => ({ top: 0, left: 0 }) },
		title: { type: String, default: "" },
	},
	emits: ["close"],
	setup(props, { emit }) {
		const { initPos } = toRefs(props);

		// template refs
		const frame: Ref<HTMLDivElement | null> = ref(null);
		const titlebar: Ref<HTMLDivElement | null> = ref(null);

		// TODO: move to Css object
		const frameActiveClass = "window--active";
		const windowMaxClass = "window--max";

		let handleTopMouseDown = ref();
		let handleBottomMouseDown = ref();
		let handleLeftMouseDown = ref();
		let handleRightMouseDown = ref();
		let handleTopRightMouseDown = ref();
		let handleBottomRightMouseDown = ref();
		let handleTopLeftMouseDown = ref();
		let handleBottomLeftMouseDown = ref();

		const { handleResizeMouseDown } = useResizer(frame, initPos);
		const { handleTitleBarMouseDown } = useMover(frame, titlebar, initPos);

		function closeWindow() {
			emit("close");
		}

		let memWidth = "auto";
		let memHeight = "auto";
		let memTransform = '';
		function maximizeWindow() {
			if (frame.value) {
				frame.value.classList.toggle(windowMaxClass);

				if (frame.value.classList.contains(windowMaxClass)) {
					memWidth = frame.value.style.width;
					memHeight = frame.value.style.height;
					memTransform = frame.value.style.transform;

					frame.value.style.width = "auto";
					frame.value.style.height = "auto";
					frame.value.style.transform = "none";
					frame.value.style.top = 0 + "px";
					frame.value.style.left = 0 + "px";
					frame.value.style.right = 0 + "px";
					frame.value.style.bottom = 0 + "px";
				} else {
					frame.value.style.width = memWidth;
					frame.value.style.height = memHeight;
					frame.value.style.transform = memTransform;
				}
			}
		}

		onMounted(() => {
			if (frame.value) {
				frame.value.style.top = initPos.value.top + "px";
				frame.value.style.left = initPos.value.left + "px";
				// TODO: do i need this?
				frame.value.classList.add(frameActiveClass);
				if (initPos.value.top > window.innerWidth - frame.value.clientWidth) {
					initPos.value.left = 0;
				}
				if (initPos.value.top > window.innerHeight - frame.value.clientHeight) {
					initPos.value.left = 0;
				}
			}
		});

		watchEffect(() => {
			// does not work in onMounted hook
			// TODO: maybe use only one event listener. Delegate events to handlers based on class
			handleTopMouseDown.value = handleResizeMouseDown(Position.Top);
			handleBottomMouseDown.value = handleResizeMouseDown(
				Position.Bottom
			);
			handleLeftMouseDown.value = handleResizeMouseDown(Position.Left);
			handleRightMouseDown.value = handleResizeMouseDown(Position.Right);
			handleTopRightMouseDown.value = handleResizeMouseDown(
				Position.TopRight
			);
			handleBottomRightMouseDown.value = handleResizeMouseDown(
				Position.BottomRight
			);
			handleTopLeftMouseDown.value = handleResizeMouseDown(
				Position.TopLeft
			);
			handleBottomLeftMouseDown.value = handleResizeMouseDown(
				Position.BottomLeft
			);
		});

		return {
			frame,
			titlebar,
			closeWindow,
			maximizeWindow,
			handleTitleBarMouseDown,
			handleTopMouseDown: handleTopMouseDown.value,
			handleBottomMouseDown: handleBottomMouseDown.value,
			handleLeftMouseDown: handleLeftMouseDown.value,
			handleRightMouseDown: handleRightMouseDown.value,
			handleTopRightMouseDown: handleTopRightMouseDown.value,
			handleTopLeftMouseDown: handleTopLeftMouseDown.value,
			handleBottomRightMouseDown: handleBottomRightMouseDown.value,
			handleBottomLeftMouseDown: handleBottomLeftMouseDown.value,
		};
	},
});
</script>

<style scoped>
.window {
	--color-main: white;
	--color-back: black;
	--color-border: gray;
	--color-drag: darkgray;
	--color-accent: green;
	--color-extra: red;

	--window-width: 24rem;
	--window-height: 14rem;
	--window-min-height: 5rem;
	--window-border-width: 4px;
	--window-border-radius: 6px;
	--window-border: 1px solid var(--color-border);
	--content-padding: 0.25rem 0.5rem;
	--titlebar-height: 2rem;
	--titlebar-font-family: monospace;
	--titlebar-border: 1px dashed var(--color-border);
	--title-font-size: 1.2rem;

	position: fixed;
	z-index: 10;
	background-color: var(--color-back);
	color: var(--color-main);
	width: var(--window-width);
	height: var(--window-height);
	min-height: var(--window-min-height);
	border-radius: 6px;
	display: none;
	border: var(--window-border);
	grid-template-columns: var(--window-border-width) 1fr var(
			--window-border-width
		);
	grid-template-rows: var(--window-border-width) var(--titlebar-height) 1fr var(
			--window-border-width
		);
	grid-template-areas:
		"top-left top top-right"
		"left titlebar right"
		"left content right"
		"bottom-left bottom bottom-right";
}
.window * {
	box-sizing: border-box;
}
.window--active {
	display: grid;
}
.window--max {
	width: 100%;
	height: 100%;
	max-height: 100vh;
	max-width: 100vw;
}

.window__top {
	grid-area: top;
	cursor: ns-resize;
}
.window__bottom {
	grid-area: bottom;
	cursor: ns-resize;
}
.window__left {
	grid-area: left;
	cursor: ew-resize;
}
.window__right {
	grid-area: right;
	cursor: ew-resize;
}
.window__top-right {
	grid-area: top-right;
	cursor: nesw-resize;
}
.window__bottom-right {
	grid-area: bottom-right;
	cursor: nwse-resize;
}
.window__top-left {
	grid-area: top-left;
	cursor: nwse-resize;
}
.window__bottom-left {
	grid-area: bottom-left;
	cursor: nesw-resize;
}
.window__border--small {
	width: var(--window-border-width);
	height: var(--window-border-width);
}

.window__title {
	font-size: var(--title-font-size);
	padding: 0 0.2rem;
	font-family: var(--titlebar-font-family);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 100%;
	justify-self: flex-start;
	text-align: left;
	margin: 0;
	user-select: text;
	--webkit-user-select: text;
}

.window__titlebar {
	height: var(--titlebar-height);
	width: 100%;
	border-top-left-radius: var(--window-border-radius);
	border-top-right-radius: var(--window-border-radius);
	border: var(--titlebar-border);
	cursor: grab;
	text-align: right;
	grid-area: titlebar;
	display: grid;
	grid-template-columns: minmax(30px, auto) auto;
	column-gap: 0.25rem;
	user-select: none;
	--webkit-user-select: none;
}
.window__titlebar--grabbing {
	cursor: grabbing;
	background: var(--color-drag);
	color: var(--color-text-inv);
}
.window__titlebar--grabbing .window__button {
	border: 1px solid var(--color-main);
}
.window__controls {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	padding-right: 0.25rem;
	cursor: auto;
	justify-self: end;
}
.window__button {
	width: 1rem;
	height: 1rem;
	padding: 0;
	border-radius: 100%;
	vertical-align: middle;
	border: 1px solid transparent;
	cursor: pointer;
}
.window__button:not(:first-of-type) {
	margin-left: 0.25rem;
}
.window__button--close {
	background-color: var(--color-extra);
}
.window__button--maximize {
	background-color: var(--color-accent);
}
.window__content {
	height: calc(100% - var(--titlebar-height));
	overflow: auto;
	padding: var(--content-padding);
	cursor: auto;
	grid-area: content;
}
</style>
