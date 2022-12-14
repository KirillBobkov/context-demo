/**
 * @typedef {Object} TThrottlingOptions
 * @property {Boolean} [leading]
 * @property {Boolean} [trailing]
 */

/**
 * Returns a function, that, when invoked, will only be triggered at most once during a given window of time.
 * Normally, the throttled function will run as much as it can, without ever going more than once per wait
 * duration; but if you’d like to disable the execution on the leading edge, pass {leading: false}.
 * To disable execution on the trailing edge, pass {trailing: false}.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function throttle<F extends Function>(func: F, wait: any = 0, options: any = {}): F {
	let context: any;
	let args: any;
	let result: any;
	let timeout: any = null;
	let previous: any = 0;

	const later = () => {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);

		if (!timeout) {
			context = args = null;
		}
	};

	// eslint-disable-next-line no-restricted-syntax
	return function(this: any) {
		const now = Date.now();
		if (!previous && options.leading === false) {
			previous = now;
		}

		const remaining = wait - (now - previous);
		context = this; //eslint-disable-line consistent-this
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);

			if (!timeout) {
				context = args = null;
			}
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	} as any;
}