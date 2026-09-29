// Exercise 8.1: Distance calculator.

// Coordinates of the shelters on the map, in kilometers.
const mainShelterX: number = 3;
const mainShelterY: number = -4;
const secondaryShelterX: number = 14;
const secondaryShelterY: number = 9;

const MINUTES_PER_KILOMETER: number = 12;

console.log("=== DISTANCE ANALYSIS ===");
console.log("Calculating the route between shelters...");

const differenceX = secondaryShelterX - mainShelterX;
const differenceY = secondaryShelterY - mainShelterY;

// Once they're squared, the sign of the differences doesn't matter.
const distance = Math.sqrt(differenceX ** 2 + differenceY ** 2);
const hypotDistance = Math.hypot(differenceX, differenceY);

console.log(`Exact distance: ${distance.toFixed(1)} km`);
console.log(`With Math.hypot(): ${hypotDistance.toFixed(1)} km`);
console.log(`Rounded distance: ${Math.round(distance)} km`);

// Walking time in hours and minutes.
const totalMinutes = Math.floor(distance * MINUTES_PER_KILOMETER);
const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60;
console.log(`Walking time: ${hours} h ${minutes} min`);
