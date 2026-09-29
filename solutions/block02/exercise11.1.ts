// Exercise 11.1: Basic supply inventory.

// Inventory of the power plant before the expedition.
const plantInventory: Map<string, number> = new Map([
    ["canned food", 20],
    ["water", 30],
]);

// Supplies the expedition brings back.
const suppliesFound: Map<string, number> = new Map([
    ["canned food", 15],
    ["medical bandages", 8],
    ["batteries", 4],
    ["water", 12],
]);

// Adds what was found to what was already there, or adds it if it's new.
function addSupplies(
    inventory: Map<string, number>,
    newSupplies: Map<string, number>,
): void {
    for (const [supply, quantity] of newSupplies) {
        const current = inventory.get(supply) ?? 0;
        inventory.set(supply, current + quantity);
    }
}

function countUnits(inventory: Map<string, number>): number {
    let total = 0;
    for (const quantity of inventory.values()) {
        total += quantity;
    }
    return total;
}

// Returns 0 if the supply isn't registered.
function getQuantity(
    inventory: Map<string, number>,
    supply: string,
): number {
    return inventory.get(supply) ?? 0;
}

function showReport(inventory: Map<string, number>): void {
    console.log("\n=== EXPEDITION REPORT ===");
    for (const [supply, quantity] of inventory) {
        console.log(`${supply}: ${quantity}`);
    }
    console.log(`Kinds of supplies: ${inventory.size}`);
    console.log(`Total units: ${countUnits(inventory)}`);
}

console.log("=== CATALOGING THE SUPPLIES FOUND ===");

addSupplies(plantInventory, suppliesFound);
showReport(plantInventory);

console.log(`\nWater: ${getQuantity(plantInventory, "water")}`);
console.log(`Flashlights: ${getQuantity(plantInventory, "flashlights")}`);
