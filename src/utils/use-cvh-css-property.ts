import { useCallback, useRef, useEffect } from 'react';
import throttle from './function/throttle.util';

/**
 * @doc-tags hooks
 */
export function useCVHCssProperty(): void {
	const mounted = useRef(false);

	// --cvh is a custom css property created to resolve the problem
	// of vh prop on a mobile devices
	// vh is calculated incorrectly on the mobiles because of url section
	const updateCVHCssProperty = useCallback(
		throttle(() => {
			const cvh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--cvh', `${cvh}px`);
		}, 100),
		[],
	);

	useEffect(() => {
		if (!mounted.current) {
			updateCVHCssProperty();
			mounted.current = true;
		}
	}, [updateCVHCssProperty]);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(updateCVHCssProperty);
		resizeObserver.observe(document.documentElement);
		return () => resizeObserver.unobserve(document.documentElement);
	}, [updateCVHCssProperty]);
}
