// Exercise 10.1: Emergency message decoder.

const interceptedMessages: string[] = [
    "  SHELTER alpha - COMPROMISED  ",
    "survivors ana,diego,julia - 3   ",
    " Coordinates 40.7128,-74.0060 - abandoned warehouse",
    "   FUEL 15.7 - refill ",
];

// Leaves the first letter in uppercase and the rest in lowercase.
function capitalize(text: string): string {
    return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase();
}

function processShelter(mainData: string, detail: string): void {
    console.log(`  Shelter: ${capitalize(mainData)}`);
    console.log(`  Status: ${detail.toLowerCase()}`);
}

function processSurvivors(mainData: string, detail: string): void {
    const names = mainData.split(",").map((name) => capitalize(name.trim()));
    console.log(`  Survivors: ${names.join(", ")}`);
    console.log(`  Total: ${detail}`);
}

function processCoordinates(mainData: string, detail: string): void {
    const coordinates = mainData.split(",");
    if (coordinates.length !== 2) {
        console.log("  Error: invalid coordinate format");
        return;
    }

    const latitude = coordinates[0].trim();
    const longitude = coordinates[1].trim();
    console.log(`  Coordinates: Latitude ${latitude} - Longitude ${longitude}`);
    console.log(`  Location: ${capitalize(detail)}`);
}

function processFuel(mainData: string, detail: string): void {
    console.log(`  Fuel: ${mainData} liters left`);
    console.log(`  Action: ${detail}`);
}

function decodeMessage(message: string): void {
    // Format: "TYPE main_data - detailed_information".
    const parts = message.trim().split(" - ");
    if (parts.length !== 2) {
        console.log("  Error: invalid message format");
        return;
    }

    const header = parts[0].trim();
    const detail = parts[1].trim();

    // The type is the first word and the main data is the rest.
    const spacePosition = header.indexOf(" ");
    if (spacePosition === -1) {
        console.log("  Error: the main data is missing");
        return;
    }
    const messageType = header.slice(0, spacePosition).toLowerCase();
    const mainData = header.slice(spacePosition + 1).trim();

    console.log(`Type: ${messageType.toUpperCase()}`);
    switch (messageType) {
        case "shelter":
            processShelter(mainData, detail);
            break;
        case "survivors":
            processSurvivors(mainData, detail);
            break;
        case "coordinates":
            processCoordinates(mainData, detail);
            break;
        case "fuel":
            processFuel(mainData, detail);
            break;
        default:
            console.log("  The type of message couldn't be identified");
    }
}

console.log("=== MESSAGE DECODING ===");
console.log("Processing intercepted transmissions...");

interceptedMessages.forEach((message, index) => {
    console.log(`\n--- Message ${index + 1} ---`);
    decodeMessage(message);
});
