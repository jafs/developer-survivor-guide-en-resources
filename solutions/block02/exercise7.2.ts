// Exercise 7.2: Watch shift system.

const SAFE_ZONE_GEAR: string = "flashlight";
const MEDIUM_RISK_ZONE_GEAR: string = "flashlight and crossbow";
const DANGEROUS_ZONE_GEAR: string = "flashlight, crossbow, and flares";

function assignShift(
    name: string,
    hour: number,
    duration: number = 4,
    gear: string = SAFE_ZONE_GEAR,
): string {
    // Check for errors before preparing the message.
    if (name === "") {
        return "Error: you haven't said who is taking the shift";
    }
    if (hour < 0 || hour > 23) {
        return "Error: the hour must be between 0 and 23";
    }
    if (duration < 1) {
        return "Error: the duration must be at least 1 hour";
    }

    return `${name} starts the watch shift at ${hour}:00.\n` +
        `  Patrol time: ${duration} hours\n` +
        `  Gear: ${gear}`;
}

console.log("=== WATCH SHIFT SYSTEM ===");

console.log(assignShift("Ana", 14, 6, MEDIUM_RISK_ZONE_GEAR));
console.log(assignShift("Diego", 2)); // Default duration and gear.
console.log(assignShift("Julia", 22, 3, DANGEROUS_ZONE_GEAR));
console.log(assignShift("", 8, 2)); // Error: no name.
console.log(assignShift("Marcos", 25)); // Error: wrong hour.
console.log(assignShift("Julia", 10, 0)); // Error: wrong duration.
