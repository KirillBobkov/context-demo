import { parsePeriod } from '../timeframe-parser';
import { AggregationPeriod } from '../../chart/model/aggregation.model';

describe('parsePeriod', () => {
	describe('parse minutes', () => {
		it("should return 1 m for ['1', '1m', '1min', '1 min', '1 m', '1 minute']", () => {
			const testStrings = ['1', '1m', '1min', '1 min', '1 m', '1 minute'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toStrictEqual({
					duration: 1,
					durationType: 'm',
				});
			});
		});
		it("should return 9 m for ['9', '9 minutes', 'nine minutes']", () => {
			const testStrings = ['9', '9 minutes', 'nine minutes'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toStrictEqual({
					duration: 9,
					durationType: 'm',
				});
			});
		});
	});
	describe('parse hours', () => {
		it("should return 1 h for ['1h', '1H', '1 hour']", () => {
			const testStrings = ['1h', '1H', '1 hour'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toStrictEqual({
					duration: 1,
					durationType: 'h',
				});
			});
		});
		it("should return 3 h for ['3 hours', '3 h', '3 H', 'three hours']", () => {
			const testStrings = ['3 hours', '3 h', '3 H', 'three hours'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toStrictEqual({
					duration: 3,
					durationType: 'h',
				});
			});
		});
	});
	describe('parse days', () => {
		it("should return 1 d for ['1d', '1D', '1 day', 'day']", () => {
			const testStrings = ['1d', '1D', '1 day', 'day'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toStrictEqual({
					duration: 1,
					durationType: 'd',
				});
			});
		});
		it("should return 3 d for ['3 days', '3days', 'three days']", () => {
			const testStrings = ['3 days', '3days', 'three days'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toStrictEqual({
					duration: 3,
					durationType: 'd',
				});
			});
		});
	});
	describe('parse weeks', () => {
		it("should return 1 w for ['1w', '1 w', '1 week', '1W', '1 W', 'one week']", () => {
			const testStrings = ['1w', '1 w', '1 week', '1W', '1 W', 'one weeks'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toStrictEqual({
					duration: 1,
					durationType: 'w',
				});
			});
		});
	});
	describe('parse months', () => {
		it("should return 1 w for ['1M', '1month', '1 months', 'one months', '1 momth', '1 monh', '1 monts']", () => {
			const testStrings = ['1M', '1month', '1 months', 'one months', '1 momth', '1 monh', '1 monts'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toStrictEqual({
					duration: 1,
					durationType: 'mo',
				});
			});
		});
	});
	describe('parse ranges', () => {
		it("should return 1 r for ['1r', '1 range']", () => {
			const testStrings = ['1r', '1 range'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toStrictEqual({
					duration: 1,
					durationType: 'r',
				});
			});
		});
	});
	describe('parse multi digit value', () => {
		it("should return 23 m for ['23 min', '23']", () => {
			const testStrings = ['23 min', '23'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toStrictEqual({
					duration: 23,
					durationType: 'm',
				});
			});
		});
	});
	describe('parse incorrect input values', () => {
		it("should return undefined for ['-1', '-1d', '-1 d', 'abcdf', 'абвгд', '', 0]", () => {
			const testStrings = ['-1', '-1d', '-1 d', 'abcdf', 'абвгд'];
			testStrings.forEach(test => {
				const result: AggregationPeriod | undefined = parsePeriod(test);
				expect(result).toBeUndefined();
			});
		});
	});
});
