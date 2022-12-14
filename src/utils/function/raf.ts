// eslint-disable-next-line @typescript-eslint/ban-types
export const raf = <F extends Function>(cb: F): F & { cancel: () => void } => {
	let id: number | undefined;

	const invoke = (ctx: object, args: any[]) => () => {
		id = undefined;
		cb.apply(ctx, args);
	};

	//use function to save original context
	function synced(this: any, ...args: any[]) {
		if (typeof id === 'undefined') {
			id = requestAnimationFrame(invoke(this, args));
		}
	}

	synced['cancel'] = () => {
		if (id) {
			cancelAnimationFrame(id);
		}
	};

	// eslint-disable-next-line no-restricted-syntax
	return synced as any;
};