export interface PriceDiffGeneratorConfig {
	// affects generator when it generates the diff in percents
	// diff = (1 - volatility / 2) + volatility * Math.random()
	readonly volatility?: number;
}

const DEFAULT_VOLATILITY = 0.05;

/**
 * Creates price diff generator which calculates diff according the following formula:
 * diff = (1 - volatility / 2) + volatility * Math.random()
 * @doc-tags tricky
 * @param config
 */
export function* createPriceDiffGenerator(config: PriceDiffGeneratorConfig = {}) {
	const volatility = config.volatility ?? DEFAULT_VOLATILITY;
	const minDiff = 1 - volatility / 2;
	for (;;) {
		yield minDiff + volatility * Math.random();
	}
}
