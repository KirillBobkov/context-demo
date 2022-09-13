import React, { useCallback, useEffect, useRef } from 'react';

export function useResizeObserver(element: React.RefObject<HTMLElement | null>, callback: ResizeObserverCallback) {
	const observer: React.MutableRefObject<ResizeObserver | null> = useRef(null);

	const currentElement = element.current;

	const observe = useCallback(() => {
		if (currentElement && observer.current) {
			observer.current.observe(currentElement);
		}
	}, [currentElement]);

	useEffect(() => {
		// unobserve prev element
		if (observer.current && currentElement) {
			observer.current.unobserve(currentElement);
		}

		observer.current = new ResizeObserver(callback);
		observe();

		return () => {
			if (observer.current && currentElement) {
				observer.current.unobserve(currentElement);
			}
		};
	}, [currentElement, callback, observe]);
}
