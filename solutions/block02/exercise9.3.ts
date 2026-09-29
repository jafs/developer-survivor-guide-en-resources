// Exercise 9.3: Planning safe routes.

const MAX_SAFE_RISK: number = 15;

// Danger map of the area near the shelter.
const dangerMap: number[][] = [
    [1, 2, 4, 3],
    [3, 5, 8, 6],
    [2, 4, 9, 7],
    [1, 3, 5, 4],
];

// Moves a coordinate one position closer to its destination.
function advance(current: number, destination: number): number {
    if (current < destination) {
        return current + 1;
    }
    if (current > destination) {
        return current - 1;
    }
    return current;
}

function planRoute(
    map: number[][],
    origin: number[],
    destination: number[],
): void {
    let row = origin[0];
    let column = origin[1];
    const path: number[][] = [[row, column]];
    let totalRisk = map[row][column];

    while (row !== destination[0] || column !== destination[1]) {
        row = advance(row, destination[0]);
        column = advance(column, destination[1]);
        path.push([row, column]);
        totalRisk += map[row][column];
    }

    const pathText = path
        .map((position) => `[${position.join(", ")}]`)
        .join(" - ");
    const isSafe = totalRisk <= MAX_SAFE_RISK;

    console.log(`Path: ${pathText}`);
    console.log(`Total risk: ${totalRisk}`);
    console.log(`${isSafe ? "Safe" : "Dangerous"} route`);
}

console.log("=== SAFE ROUTE PLANNER ===");
console.log("Analyzing routes for critical expeditions...");

console.log("\nRescue of a survivor:");
planRoute(dangerMap, [0, 0], [2, 3]);

console.log("\nExpedition for medical supplies:");
planRoute(dangerMap, [1, 1], [3, 2]);

console.log("\nFirewood run along the southern edge:");
planRoute(dangerMap, [3, 0], [3, 3]);
