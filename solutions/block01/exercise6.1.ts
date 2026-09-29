// Exercise 6.1: Night patrol.

// Initial state of the patrol.
let energy: number = 8;
let zonesChecked: number = 0;
let threatsDetected: number = 0;
let startHour: number = 22; // 22:00 (10 p.m.).

console.log("=== STARTING NIGHT PATROL ===");
console.log(`Start time: ${startHour}:00`);
console.log("Gear checked. Starting the round...");

while (energy > 0) {
    // Each zone takes one hour. After 23:00 comes 0:00.
    let checkHour: number = (startHour + zonesChecked) % 24;
    zonesChecked++;
    energy--;
    console.log(`${checkHour}:00 - Checking zone ${zonesChecked}`);

    if (Math.random() < 0.2) {
        threatsDetected++;
        energy--;
        console.log("  Zombie threat detected. You spend extra energy.");
    }

    // The energy never drops below 0.
    if (energy < 0) {
        energy = 0;
    }
    console.log(`  Remaining energy: ${energy}`);
}

console.log("=== PATROL COMPLETED ===");
console.log(`Zones checked: ${zonesChecked}`);
console.log(`Zombie threats detected: ${threatsDetected}`);
