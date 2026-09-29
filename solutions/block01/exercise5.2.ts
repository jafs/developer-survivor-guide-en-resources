// Exercise 5.2: Emergency protocol.

// Type of emergency detected.
let emergencyType: string = "intrusion"; // Change this value to test.

// Response variables.
let requiredGear: string = "";
let immediateAction: string = "";

switch (emergencyType) {
    // The horde and the intrusion share a response.
    case "horde":
    case "intrusion":
        requiredGear = "weapon";
        immediateAction = "block the entrances";
        break;
    case "fire":
        requiredGear = "fire extinguisher";
        immediateAction = "put out the fire";
        break;
    case "storm":
        requiredGear = "boards";
        immediateAction = "reinforce the barricades";
        break;
    default:
        requiredGear = "flashlight";
        immediateAction = "assess the situation";
        break;
}

let alertLevel: string = requiredGear === "weapon" ? "maximum" : "normal";

console.log("=== EMERGENCY PROTOCOL ACTIVATED ===");
console.log(`Emergency: ${emergencyType}`);
console.log(`Required gear: ${requiredGear}`);
console.log(`Immediate action: ${immediateAction}`);
console.log(`Alert level: ${alertLevel}`);
