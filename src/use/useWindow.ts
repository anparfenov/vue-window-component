import { onMounted, type Ref, onBeforeUnmount } from "vue";
import { getTranslateXY, noop, clamp } from "../utils";

export enum Position {
	Top = "top",
	Bottom = "bottom",
	Right = "right",
	Left = "left",
	TopRight = "top-right",
	TopLeft = "top-left",
	BottomRight = "bottom-right",
	BottomLeft = "botton-left",
}
type MoveProps = {
	pos: Position;
	elem: HTMLElement;
	startPos: StartPos;
	event: MouseEvent;
};

type ResizeProps = {
	frame: Ref<HTMLDivElement | null>;
	initHeight?: number;
	initWidth?: number;
	deltaX?: number;
	deltaY?: number;
	position?: Position;
	event?: MouseEvent;
	startPos?: StartPos;
};

type MouseEventListener = (e: MouseEvent) => void;

type StartPos = {
	left: number;
	top: number;
};

export function useResizer(
	frame: Ref<HTMLDivElement | null>,
	startPos: StartPos
) {
	let handleResizeMouseUpTop: MouseEventListener = noop;
	let handleResizeMouseUpBottom: MouseEventListener = noop;
	let handleResizeMouseUpLeft: MouseEventListener = noop;
	let handleResizeMouseUpRight: MouseEventListener = noop;
	let handleResizeMouseUpTopRight: MouseEventListener = noop;
	let handleResizeMouseUpBottomRight: MouseEventListener = noop;
	let handleResizeMouseUpTopLeft: MouseEventListener = noop;
	let handleResizeMouseUpBottomLeft: MouseEventListener = noop;

	let handleResizeMouseMoveTop: MouseEventListener = noop;
	let handleResizeMouseMoveBottom: MouseEventListener = noop;
	let handleResizeMouseMoveLeft: MouseEventListener = noop;
	let handleResizeMouseMoveRight: MouseEventListener = noop;
	let handleResizeMouseMoveTopRight: MouseEventListener = noop;
	let handleResizeMouseMoveBottomRight: MouseEventListener = noop;
	let handleResizeMouseMoveTopLeft: MouseEventListener = noop;
	let handleResizeMouseMoveBottomLeft: MouseEventListener = noop;

	let initWidth = 0;
	let initHeight = 0;
	let cursorX = 0;
	let cursorY = 0;
	let frameBbox: DOMRect | null = null;
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;

	function move({ pos, elem, event, startPos }: MoveProps) {
		if (frame.value) {
			if (pos === Position.Top) {
				const { translateX } = getTranslateXY(elem);
				frame.value.style.transform = `translate(
					${clamp(translateX, 0 - startPos.left, windowWidth)}px,
					${clamp(event.pageY - startPos.top, 0 - startPos.top, windowHeight)}px)`;
			} else if (pos === Position.Left) {
				const { translateY } = getTranslateXY(elem);
				frame.value.style.transform = `translate(
					${clamp(event.pageX - startPos.left, 0 - startPos.left, windowWidth)}px,
					${clamp(translateY, 0 - startPos.top, windowHeight)}px)`;
			}
		}
	}

	function resizeTop({
		frame,
		initHeight = 0,
		deltaY = 0,
		position = Position.Top,
		event,
		startPos = { left: 0, top: 0 },
	}: ResizeProps) {
		if (frame.value && event && frameBbox) {
			frame.value.style.height =
				clamp(initHeight + deltaY, 0, initHeight + frameBbox.top) +
				"px";

			move({
				pos: position,
				elem: frame.value,
				event,
				startPos,
			});
		}
	}

	function resizeBottom({ frame, initHeight = 0, deltaY = 0 }: ResizeProps) {
		if (frame.value && frameBbox) {
			frame.value.style.height =
				clamp(initHeight - deltaY, 0, windowHeight - frameBbox.top) +
				"px";
		}
	}

	function resizeLeft({
		frame,
		initWidth = 0,
		deltaX = 0,
		position = Position.Left,
		event,
		startPos = { left: 0, top: 0 },
	}: ResizeProps) {
		if (frame.value && event && frameBbox) {
			frame.value.style.width =
				clamp(initWidth + deltaX, 0, initWidth + frameBbox.left) + "px";

			move({
				pos: position,
				elem: frame.value,
				event,
				startPos,
			});
		}
	}

	function resizeRight({ frame, initWidth = 0, deltaX = 0 }: ResizeProps) {
		if (frame.value && frameBbox) {
			frame.value.style.width =
				clamp(initWidth - deltaX, 0, windowWidth - frameBbox.left) +
				"px";
		}
	}

	const handleResizeMouseMove = (position: Position) => (e: MouseEvent) => {
		const deltaX = cursorX - e.clientX; // distance between cursor and window
		const deltaY = cursorY - e.clientY; // distance between cursor and window

		if (frame.value) {
			switch (position) {
				case Position.Top:
					resizeTop({
						frame,
						initHeight,
						deltaY,
						event: e,
						startPos,
					});
					break;
				case Position.Bottom:
					resizeBottom({ frame, initHeight, deltaY });
					break;
				case Position.Left:
					resizeLeft({
						frame,
						initWidth,
						deltaX,
						event: e,
						startPos,
					});
					break;
				case Position.Right:
					resizeRight({ frame, initWidth, deltaX });
					break;
				case Position.TopRight:
					resizeTop({
						frame,
						initHeight,
						deltaY,
						event: e,
						startPos,
					});
					resizeRight({ frame, initWidth, deltaX });
					break;
				case Position.TopLeft:
					resizeTop({
						frame,
						initHeight,
						deltaY,
						event: e,
						startPos,
					});
					resizeLeft({
						frame,
						initWidth,
						deltaX,
						event: e,
						startPos,
					});
					break;
				case Position.BottomRight:
					resizeBottom({ frame, initHeight, deltaY });
					resizeRight({ frame, initWidth, deltaX });
					break;
				case Position.BottomLeft:
					resizeBottom({ frame, initHeight, deltaY });
					resizeLeft({
						frame,
						initWidth,
						deltaX,
						event: e,
						startPos,
					});
					break;
				default:
					throw new TypeError(
						"HANDLE_RESIZE_MOUSE_MOVE: no such position"
					);
			}
		}
	};

	const handleResizeMouseDown = (position: Position) => (e: MouseEvent) => {
		initWidth = frame.value?.offsetWidth ?? 0;
		initHeight = frame.value?.offsetHeight ?? 0;
		cursorX = e.clientX;
		cursorY = e.clientY;
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		frameBbox = frame.value?.getBoundingClientRect() ?? null;

		switch (position) {
			case Position.Top:
				window.addEventListener("mousemove", handleResizeMouseMoveTop);
				window.addEventListener("mouseup", handleResizeMouseUpTop);
				break;
			case Position.Bottom:
				window.addEventListener(
					"mousemove",
					handleResizeMouseMoveBottom
				);
				window.addEventListener("mouseup", handleResizeMouseUpBottom);
				break;
			case Position.Left:
				window.addEventListener("mousemove", handleResizeMouseMoveLeft);
				window.addEventListener("mouseup", handleResizeMouseUpLeft);
				break;
			case Position.Right:
				window.addEventListener(
					"mousemove",
					handleResizeMouseMoveRight
				);
				window.addEventListener("mouseup", handleResizeMouseUpRight);
				break;
			case Position.TopRight:
				window.addEventListener(
					"mousemove",
					handleResizeMouseMoveTopRight
				);
				window.addEventListener("mouseup", handleResizeMouseUpTopRight);
				break;
			case Position.TopLeft:
				window.addEventListener(
					"mousemove",
					handleResizeMouseMoveTopLeft
				);
				window.addEventListener("mouseup", handleResizeMouseUpTopLeft);
				break;
			case Position.BottomRight:
				window.addEventListener(
					"mousemove",
					handleResizeMouseMoveBottomRight
				);
				window.addEventListener(
					"mouseup",
					handleResizeMouseUpBottomRight
				);
				break;
			case Position.BottomLeft:
				window.addEventListener(
					"mousemove",
					handleResizeMouseMoveBottomLeft
				);
				window.addEventListener(
					"mouseup",
					handleResizeMouseUpBottomLeft
				);
				break;
			default:
				throw new TypeError(
					"HANDLE_RESIZE_MOUSE_DOWN: no such position"
				);
		}
	};

	const handleResizeMouseUp = (position: Position) => () => {
		switch (position) {
			case Position.Top:
				window.removeEventListener(
					"mousemove",
					handleResizeMouseMoveTop
				);
				window.removeEventListener("mouseup", handleResizeMouseUpTop);
				break;
			case Position.Bottom:
				window.removeEventListener(
					"mousemove",
					handleResizeMouseMoveBottom
				);
				window.removeEventListener(
					"mouseup",
					handleResizeMouseUpBottom
				);
				break;
			case Position.Left:
				window.removeEventListener(
					"mousemove",
					handleResizeMouseMoveLeft
				);
				window.removeEventListener("mouseup", handleResizeMouseUpLeft);
				break;
			case Position.Right:
				window.removeEventListener(
					"mousemove",
					handleResizeMouseMoveRight
				);
				window.removeEventListener("mouseup", handleResizeMouseUpRight);
				break;
			case Position.TopRight:
				window.removeEventListener(
					"mousemove",
					handleResizeMouseMoveTopRight
				);
				window.removeEventListener(
					"mouseup",
					handleResizeMouseUpTopRight
				);
				break;
			case Position.TopLeft:
				window.removeEventListener(
					"mousemove",
					handleResizeMouseMoveTopLeft
				);
				window.removeEventListener(
					"mouseup",
					handleResizeMouseUpTopLeft
				);
				break;
			case Position.BottomRight:
				window.removeEventListener(
					"mousemove",
					handleResizeMouseMoveBottomRight
				);
				window.removeEventListener(
					"mouseup",
					handleResizeMouseUpBottomRight
				);
				break;
			case Position.BottomLeft:
				window.removeEventListener(
					"mousemove",
					handleResizeMouseMoveBottomLeft
				);
				window.removeEventListener(
					"mouseup",
					handleResizeMouseUpBottomLeft
				);
				break;
			default:
				throw new TypeError("HANDLE_RESIZE_MOUSE_UP: no such position");
		}
	};

	onMounted(() => {
		handleResizeMouseUpTop = handleResizeMouseUp(Position.Top);
		handleResizeMouseUpBottom = handleResizeMouseUp(Position.Bottom);
		handleResizeMouseUpLeft = handleResizeMouseUp(Position.Left);
		handleResizeMouseUpRight = handleResizeMouseUp(Position.Right);
		handleResizeMouseUpTopRight = handleResizeMouseUp(Position.TopRight);
		handleResizeMouseUpTopLeft = handleResizeMouseUp(Position.TopLeft);
		handleResizeMouseUpBottomRight = handleResizeMouseUp(
			Position.BottomRight
		);
		handleResizeMouseUpBottomLeft = handleResizeMouseUp(
			Position.BottomLeft
		);

		handleResizeMouseMoveTop = handleResizeMouseMove(Position.Top);
		handleResizeMouseMoveBottom = handleResizeMouseMove(Position.Bottom);
		handleResizeMouseMoveLeft = handleResizeMouseMove(Position.Left);
		handleResizeMouseMoveRight = handleResizeMouseMove(Position.Right);
		handleResizeMouseMoveTopRight = handleResizeMouseMove(
			Position.TopRight
		);
		handleResizeMouseMoveTopLeft = handleResizeMouseMove(Position.TopLeft);
		handleResizeMouseMoveBottomRight = handleResizeMouseMove(
			Position.BottomRight
		);
		handleResizeMouseMoveBottomLeft = handleResizeMouseMove(
			Position.BottomLeft
		);
	});

	return {
		handleResizeMouseDown,
	};
}

export function useMover(
	frame: Ref<HTMLDivElement | null>,
	titlebar: Ref<HTMLDivElement | null>,
	startPos: StartPos
) {
	const grabbingClass = "window__titlebar--grabbing";
	const frameActiveClass = "window--active";
	let titleBarX = 0;
	let titleBarY = 0;
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;
	let frameBbox = frame.value?.getBoundingClientRect() ?? null;

	function handleTitleBarMouseMove(e: MouseEvent) {
		if (frame.value && frameBbox) {
			const x = e.pageX;
			const y = e.pageY;
			frame.value.style.transform = `translate(
				${clamp(
					x - titleBarX - startPos.left,
					0 - startPos.left,
					windowWidth - frameBbox.width - startPos.left
				)}px,
				${clamp(
					y - titleBarY - startPos.top,
					0 - startPos.top,
					windowHeight - frameBbox.height - startPos.top
				)}px)`;
		}
	}

	function handleTitleBarMouseDown(e: MouseEvent) {
		if (
			(e.target as HTMLButtonElement).tagName === "BUTTON" ||
			(e.target as HTMLDivElement).classList.contains("window__controls")
		) {
			return;
		}

		frameBbox = frame.value?.getBoundingClientRect() ?? null;
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;

		const BBox = titlebar.value?.getBoundingClientRect() ?? { x: 0, y: 0 };
		titleBarX = e.clientX - BBox.x; // x pos inside titlebar
		titleBarY = e.clientY - BBox.y; // y pos inside titlebar
		titlebar.value?.classList.add(grabbingClass);

		window.addEventListener("mousemove", handleTitleBarMouseMove);
		window.addEventListener("mouseup", handleTitleBarMouseUp);
	}

	function handleTitleBarMouseUp() {
		titlebar.value?.classList.remove(grabbingClass);
		window.removeEventListener("mousemove", handleTitleBarMouseMove);
		window.removeEventListener("mouseup", handleTitleBarMouseUp);
	}

	onBeforeUnmount(() => {
		window.removeEventListener("mousemove", handleTitleBarMouseMove);
		window.removeEventListener("mouseup", handleTitleBarMouseUp);
		if (frame.value) {
			frame.value.classList.remove(frameActiveClass);
		}
	});

	return {
		handleTitleBarMouseDown,
	};
}
