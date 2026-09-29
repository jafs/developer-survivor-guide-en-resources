// Exercise 10.2: Corrupted inventory processor.

const corruptedData: string =
    "Water:45.5L;Food:23kilos;medicine:156units;FUEL:8.9 liters";

console.log("=== INVENTORY RECOVERY ===");
console.log("Trying to recover data from the damaged system...");
console.log("Corrupted data:", corruptedData);

// Turns the unit, however it's written, into its abbreviation.
function standardizeUnit(unit: string): string {
    switch (unit.trim().toLowerCase()) {
        case "kilos":
        case "kg":
            return "KG";
        case "liters":
        case "l":
            return "L";
        case "units":
        case "u":
            return "U";
        default:
            return unit.trim().toUpperCase();
    }
}

let highestName = "";
let highestQuantity = -1;

console.log("\n=== RECOVERED INVENTORY REPORT ===");

for (const item of corruptedData.split(";")) {
    const parts = item.split(":");
    if (parts.length !== 2) {
        console.log(`Invalid format in "${item}"`);
        continue;
    }

    const rawName = parts[0].trim();
    const supplyName = rawName.slice(0, 1).toUpperCase() +
        rawName.slice(1).toLowerCase();

    // The quantity is the number at the start and the unit is what's left.
    const numberFound = parts[1].match(/[\d.]+/);
    if (numberFound === null) {
        console.log(`No quantity in "${item}"`);
        continue;
    }
    const quantity = parseFloat(numberFound[0]);
    const unit = standardizeUnit(parts[1].replace(numberFound[0], ""));

    console.log(`${supplyName}: ${quantity} ${unit}`);

    // The comparison doesn't take the unit into account.
    if (quantity > highestQuantity) {
        highestQuantity = quantity;
        highestName = supplyName;
    }
}

console.log(`\nSupply with the highest quantity: ${highestName}`);
