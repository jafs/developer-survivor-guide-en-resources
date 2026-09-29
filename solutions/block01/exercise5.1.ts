// Exercise 5.1: Rationing system.

// State of the supplies.
let availableRations: number = 18;
let remainingDays: number = 6;

// Calculate the rations per day.
let rationsPerDay: number = 0;

console.log("=== RATIONING SYSTEM ===");

if (remainingDays === 0) {
    console.log("There are no days left to plan. Check the data.");
} else {
    rationsPerDay = availableRations / remainingDays;
    let rationingLevel: string = "";

    if (rationsPerDay >= 1.5) {
        rationingLevel = "plentiful";
    } else if (rationsPerDay >= 1.0) {
        rationingLevel = "normal";
    } else if (rationsPerDay >= 0.7) {
        rationingLevel = "reduced";
    } else {
        rationingLevel = "critical";
    }

    console.log(`Rations per day: ${rationsPerDay.toFixed(2)}`);
    console.log(`Rationing level: ${rationingLevel}`);
}
