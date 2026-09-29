// Exercise 19.1: Diesel distribution.

function distributeDiesel(liters: number, generators: number): number {
    if (liters < 0) {
        throw new Error(`The liters can't be negative: ${liters}`);
    }
    if (!Number.isInteger(generators) || generators <= 0) {
        throw new Error(
            `The generators have to be an integer greater than 0: ${generators}`
        );
    }
    return liters / generators;
}

const weeklyDistributions: [number, number][] = [
    [120, 4],
    [-20, 3],
    [50, 0],
    [0, 2],
    [60, 2.5],
    [100, 3],
];

let rejected = 0;

for (const [liters, generators] of weeklyDistributions) {
    try {
        const perGenerator = distributeDiesel(liters, generators);
        console.log(
            `${liters} liters among ${generators} generators: ` +
            `${perGenerator.toFixed(1)} liters each`
        );
    } catch (error) {
        rejected++;
        const reason = error instanceof Error ? error.message : "unknown";
        console.log(`Distribution rejected. ${reason}`);
    }
}

console.log(`Distributions rejected: ${rejected}`);
