// Exercise 12.3: Navigation system between shelters.

// [name, latitude, longitude]
type Shelter = readonly [string, number, number];

const northShelter: Shelter = ["North Shelter", 41.2, -75.1];
const centralShelter: Shelter = ["Central Shelter", 41.0, -75.0];
const southShelter: Shelter = ["South Shelter", 40.8, -74.9];
const shelters: Shelter[] = [northShelter, centralShelter, southShelter];

// Differences in degrees, never negative.
function calculateDifference(
    start: Shelter,
    destination: Shelter,
): [number, number] {
    const latitudeDifference = Math.abs(start[1] - destination[1]);
    const longitudeDifference = Math.abs(start[2] - destination[2]);
    return [latitudeDifference, longitudeDifference];
}

function northernmostShelter(list: Shelter[]): string {
    if (list.length === 0) {
        return "No shelters registered";
    }

    let northernmost = list[0];
    for (const shelter of list) {
        if (shelter[1] > northernmost[1]) {
            northernmost = shelter;
        }
    }
    return northernmost[0];
}

console.log("=== SHELTER NAVIGATION SYSTEM ===");
console.log("Calculating routes and distances for safe expeditions...");

console.log("Shelters registered in the system:");
for (const shelter of shelters) {
    const [shelterName, latitude, longitude] = shelter;
    console.log(
        `- ${shelterName}: latitude ${latitude}, longitude ${longitude}`
    );
}

const [latitudeDifference, longitudeDifference] = calculateDifference(
    northShelter,
    southShelter,
);
console.log(
    `\nNorth - South: ${latitudeDifference.toFixed(1)} degrees of latitude ` +
    `and ${longitudeDifference.toFixed(1)} of longitude`
);
console.log(`Northernmost shelter: ${northernmostShelter(shelters)}`);
