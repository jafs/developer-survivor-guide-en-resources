// Exercise 7.3: Recursive exploration.

const EXTINGUISHERS_PER_SURVIVOR: number = 2;

function exploreBuilding(
    floor: number,
    topFloor: number,
    survivors: number,
    report: (floor: number, extinguishers: number) => void,
    extinguishers: number = 0,
): number {
    const capacity = survivors * EXTINGUISHERS_PER_SURVIVOR;

    // Base case: no floors left, or no room for another extinguisher.
    if (floor > topFloor || extinguishers >= capacity) {
        return extinguishers;
    }

    // Even floors: 2 extinguishers. Odd floors: 1. Take only what fits.
    const extinguishersOnFloor = floor % 2 === 0 ? 2 : 1;
    const spaceLeft = capacity - extinguishers;
    const collected =
        extinguishersOnFloor < spaceLeft ? extinguishersOnFloor : spaceLeft;
    const total = extinguishers + collected;
    report(floor, total);

    return exploreBuilding(
        floor + 1,
        topFloor,
        survivors,
        report,
        total,
    );
}

const reportFloor = (floor: number, extinguishers: number): void => {
    console.log(`  Floor ${floor}: ${extinguishers} extinguishers so far`);
};

console.log("=== RECURSIVE EXPLORATION ===");

console.log("--- Small building (3 floors, 3 survivors) ---");
const smallBuildingExtinguishers = exploreBuilding(1, 3, 3, reportFloor);
console.log(`Result: ${smallBuildingExtinguishers} extinguishers collected`);

console.log("\n--- Abandoned skyscraper (8 floors, 5 survivors) ---");
const skyscraperExtinguishers = exploreBuilding(1, 8, 5, reportFloor);
console.log(`Result: ${skyscraperExtinguishers} extinguishers collected`);

console.log("\n--- Exploration with only 2 survivors (6 floors) ---");
const pairExtinguishers = exploreBuilding(1, 6, 2, reportFloor);
console.log(`Result: ${pairExtinguishers} extinguishers collected`);
