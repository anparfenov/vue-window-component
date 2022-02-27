export const isElement = (element: unknown) => element instanceof HTMLElement;

export function getTranslateXY(element: HTMLElement) {
	const style = window.getComputedStyle(element);
	const matrix = new DOMMatrixReadOnly(style.transform);
	return {
		translateX: matrix.m41,
		translateY: matrix.m42,
	};
}

export const clamp = (num: number, min: number, max: number) =>
	Math.min(Math.max(min, num), max);

export const noop = () => void 0;
