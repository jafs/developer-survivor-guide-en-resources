// Exercise 3.1: Classifying supplies.

let shelterName: string = "Alpha Shelter";
let currentTemperature: number = -8.5;
let isSafeZone: boolean = true;
// There's no radio contact yet.
let lastRadioMessage: string | null = null;

console.log("=== SHELTER STATUS ===");
console.log(`Shelter: ${shelterName}`);
console.log(`Temperature: ${currentTemperature} degrees`);
console.log(`Type of the temperature: ${typeof currentTemperature}`);
console.log(`Safe zone: ${isSafeZone}`);
console.log(`Last message: ${lastRadioMessage}`);

// A message comes in at last.
lastRadioMessage = "Safe zone in Abenójar";
console.log(`Last message: ${lastRadioMessage}`);
