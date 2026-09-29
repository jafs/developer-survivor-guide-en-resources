// Exercise 6.2: Weekly inventory.

// Weekly inventory: rations you need each day.
const DAILY_CONSUMPTION: number = 4;
let criticalDays: number = 0;
let totalConsumed: number = 0;

console.log("=== WEEKLY INVENTORY ===");

for (let day = 1; day <= 7; day++) {
    // In chapter 8 you'll see how this formula works.
    let rationsFound: number = Math.floor(Math.random() * 10);
    let isCritical: boolean = rationsFound < DAILY_CONSUMPTION;

    if (isCritical) {
        // You eat whatever there is.
        criticalDays++;
        totalConsumed += rationsFound;
    } else {
        totalConsumed += DAILY_CONSUMPTION;
    }

    console.log(`Day ${day}: ${rationsFound} rations found.`);
    console.log(`  Critical day: ${isCritical}`);
}

console.log(`\n=== WEEKLY SUMMARY ===`);
console.log(`Critical days: ${criticalDays}/7`);
console.log(`Total rations eaten: ${totalConsumed} rations`);

if (criticalDays > 2) {
    console.log("You're at risk: look for a shelter with more resources.");
}
