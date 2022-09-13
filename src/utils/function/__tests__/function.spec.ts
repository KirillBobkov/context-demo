
import debounce from '../debounce.util';
import throttle from '../throttle.util';

const delay = async(time: number) => {
	return new Promise(resolve => {
		setTimeout(resolve, time);
	});
};

describe('function', () => {
	describe('debounce', () => {
		it('should invoke decorated func after timeout', async() => {
			const callback = jest.fn();
			const debounced = debounce(callback, 100);

			debounced();
			expect(callback).not.toBeCalled();

			await delay(100);
			expect(callback).toBeCalled();

			debounced();
			expect(callback.mock.calls.length).toBe(1);
		});
	});

	describe('throttle', () => {
		it('should invoke decorated func once during time interval', async() => {
			const callback = jest.fn();
			const throttled = throttle(callback, 1000);

			throttled();
			expect(callback).toBeCalled();

			throttled();
			expect(callback.mock.calls.length).toBe(1);

			await delay(1000);
			throttled();
			expect(callback.mock.calls.length).toBe(2);
		});
	});
});