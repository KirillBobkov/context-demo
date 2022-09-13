import { mapKeys } from '../object.utils';

describe('object', () => {
	describe('mapKeys', () => {
		it('should return new object with keys mapped with template', () => {
			const testObject = {
				test: 'value',
				test2: 'value2',
			};
			const newObject = mapKeys(testObject, key => `data-${key}`);

			expect(newObject['data-test']).toEqual('value');
			expect(newObject['data-test2']).toEqual('value2');
		});
	});
});