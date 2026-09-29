// Exercise 9.2: Expedition tally.

// Liters of water brought back by each expedition, in order.
const litersPerExpedition: number[] = [
    12, 0, 7, 25, 3, 0, 18, 31, 9, 0, 14, 22,
];

console.log("=== EXPEDITION TALLY ===");

const withoutWater = litersPerExpedition
    .filter((liters) => liters === 0).length;
console.log(`Expeditions without water: ${withoutWater}`);

const totalLiters = litersPerExpedition.reduce(
    (total, liters) => total + liters,
    0,
);
console.log(`Total liters: ${totalLiters}`);

const jugs = litersPerExpedition.map((liters) => Math.floor(liters / 5));
console.log(`5-liter jugs: ${jugs.join(", ")}`);

const firstBig = litersPerExpedition.find((liters) => liters > 20);
const bigPosition = litersPerExpedition.findIndex((liters) => liters > 20);
if (firstBig === undefined) {
    console.log("No expedition brought more than 20 liters.");
} else {
    console.log(
        `First one over 20 liters: ${firstBig} ` +
        `(position ${bigPosition})`
    );
}

const anyVeryGood = litersPerExpedition.some((liters) => liters > 30);
const allBroughtWater = litersPerExpedition.every((liters) => liters > 0);
console.log(`Any brought more than 30 liters: ${anyVeryGood}`);
console.log(`All brought water: ${allBroughtWater}`);

// toSorted() returns a copy, so the original doesn't change.
const best = litersPerExpedition
    .toSorted((first, second) => second - first)
    .slice(0, 5);
console.log(`The five best: ${best.join(", ")}`);

const sumWithWater = litersPerExpedition
    .filter((liters) => liters > 0)
    .reduce((total, liters) => total + liters, 0);
const averageWithWater =
    sumWithWater / (litersPerExpedition.length - withoutWater);
console.log(`Average with water: ${averageWithWater.toFixed(1)} liters`);
