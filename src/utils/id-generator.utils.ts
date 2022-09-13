

const ids: Record<string, number> = {};

export const createIdGenerator = (): string => {
	const generatorId = '2234234';
	ids[generatorId] = 0;
	return generatorId;
};

export const nextId = (generatorId: string): number => ids[generatorId]++;

export function generateRandomId() {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return (
		'uuid:' +
		Math.random()
			.toString(36)
			.substr(2, 9)
	);
}
