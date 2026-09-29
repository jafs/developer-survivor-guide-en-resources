// Exercise 9.1: Basic inventory management.

function addSupply(inventory: string[], supply: string): void {
    inventory.push(supply);
}

// Takes out the oldest supply, the first one in the inventory.
function useFirst(inventory: string[]): string | undefined {
    return inventory.shift();
}

function removeSupply(inventory: string[], supply: string): boolean {
    const position = inventory.indexOf(supply);
    if (position === -1) {
        return false;
    }
    inventory.splice(position, 1);
    return true;
}

function showInventory(inventoryName: string, inventory: string[]): void {
    console.log(`${inventoryName} (${inventory.length} items):`);
    if (inventory.length === 0) {
        console.log("  Empty");
        return;
    }
    inventory.forEach((supply, index) => {
        console.log(`  ${index + 1}. ${supply}`);
    });
}

// Inventories of the shelter, organized by category.
const medicalSupplies: string[] = [];
const repairTools: string[] = [];
const foodRations: string[] = [];

console.log("=== SHELTER INVENTORY MANAGEMENT ===");

console.log("Dawn: supplies arrive from the expedition.");
addSupply(medicalSupplies, "bandages");
addSupply(medicalSupplies, "antibiotics");
addSupply(repairTools, "adjustable wrench");
addSupply(repairTools, "electrical tape");
addSupply(foodRations, "lentils");

console.log("\nDuring the day: supplies are used and removed.");
console.log(`The ${useFirst(medicalSupplies)} are used to treat Ana.`);
console.log(`The ${useFirst(foodRations)} are cooked for dinner.`);
console.log(`There are no rations left: ${useFirst(foodRations)}`);

const hasTape = removeSupply(repairTools, "electrical tape");
console.log(`Electrical tape removed: ${hasTape}`);
const hasSaw = removeSupply(repairTools, "saw");
console.log(`Saw removed: ${hasSaw}`);

console.log("\nNightfall: final inspection.");
showInventory("Medical supplies", medicalSupplies);
showInventory("Repair tools", repairTools);
showInventory("Food rations", foodRations);
