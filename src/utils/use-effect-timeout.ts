import React, { useState } from 'react';

/**
 * Fixes the async useEffect problem.
 * https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
 * @param callbackFn
 * @param timeout
 */
export const useEffectTimeout = (callbackFn: () => void, timeout: number) => {
	const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout | undefined>();

	React.useEffect(() => {
		let mounted = true;
		if (timeoutState) {
			setTimeoutState(setTimeout(() => {
				if (mounted) {
					callbackFn();
				}
			}, timeout));
		}
		return () => {
			timeoutState && clearTimeout(timeoutState);
			mounted = false;
		};
	}, [callbackFn, timeout, timeoutState]);

};
