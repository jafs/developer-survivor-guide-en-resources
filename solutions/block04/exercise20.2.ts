// Exercise 20.2: Three teams to the industrial park.

let storeroomBoxes = 0;

const wait = (milliseconds: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

async function exploreWarehouse(
    team: string,
    milliseconds: number,
    boxes: number,
): Promise<void> {
    const onBlackboard = storeroomBoxes;
    await wait(milliseconds); // Go to the warehouse and come back loaded.
    storeroomBoxes = onBlackboard + boxes;
    console.log(
        `${team} is back. The blackboard shows ${storeroomBoxes} boxes`
    );
}

function roundToHundreds(milliseconds: number): number {
    return Math.round(milliseconds / 100) * 100;
}

console.log("=== SIMULTANEOUS OUTING ===");
let departure = Date.now();

const explorations = [
    exploreWarehouse("Amaia", 300, 4),
    exploreWarehouse("Marcos", 500, 6),
    exploreWarehouse("Ana", 200, 3),
];
for (const exploration of explorations) {
    await exploration;
}

let duration = roundToHundreds(Date.now() - departure);
console.log(
    `Total on the blackboard: ${storeroomBoxes} boxes (${duration} ms)`
);

// The total isn't 13 because the three teams read the blackboard on the
// way out, while it still shows 0, and on the way back each one writes its
// figure over the previous one. The last one back, Marcos, wins with his
// 6 boxes.

async function exploreWarehouseWithoutRace(
    team: string,
    milliseconds: number,
    boxes: number,
): Promise<void> {
    await wait(milliseconds);
    storeroomBoxes += boxes; // Reads and writes with no await in between.
    console.log(
        `${team} is back. The blackboard shows ${storeroomBoxes} boxes`
    );
}

console.log("\n=== SIMULTANEOUS OUTING, FIXED ===");
storeroomBoxes = 0;
departure = Date.now();

const fixedExplorations = [
    exploreWarehouseWithoutRace("Amaia", 300, 4),
    exploreWarehouseWithoutRace("Marcos", 500, 6),
    exploreWarehouseWithoutRace("Ana", 200, 3),
];
for (const exploration of fixedExplorations) {
    await exploration;
}

duration = roundToHundreds(Date.now() - departure);
console.log(
    `Total on the blackboard: ${storeroomBoxes} boxes (${duration} ms)`
);

// Bonus: one at a time, each team leaves when the previous one is back.
console.log("\n=== BONUS: ONE AT A TIME ===");
storeroomBoxes = 0;
departure = Date.now();

await exploreWarehouse("Amaia", 300, 4);
await exploreWarehouse("Marcos", 500, 6);
await exploreWarehouse("Ana", 200, 3);

duration = roundToHundreds(Date.now() - departure);
console.log(
    `Total on the blackboard: ${storeroomBoxes} boxes (${duration} ms)`
);

// One at a time, the total is 13 even with the version that has the race,
// because nobody reads the blackboard while another team is out. In
// exchange, the outing lasts the sum of the three trips, about 1000 ms,
// and not as long as the slowest one, about 500 ms.
