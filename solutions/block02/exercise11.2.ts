// Exercise 11.2: Communication system between shelters.

// System of shelters with Maps.
const communicationStatus: Map<string, string> = new Map([
    ["ALPHA", "Clear communication"],
    ["BRAVO", "Weak signal"],
    ["CHARLIE", "No response"],
]);

const shelterDistances: Map<string, number> = new Map([
    ["ALPHA", 12.8],
    ["BRAVO", 7.2],
    ["CHARLIE", 27.9],
]);

// A Set doesn't store duplicates, even if you add the same name twice.
const newShelters: Set<string> = new Set();
const fallenShelters: Set<string> = new Set();

function connectShelter(
    name: string,
    status: string,
    distance: number,
): void {
    communicationStatus.set(name, status);
    shelterDistances.set(name, distance);
    newShelters.add(name);
    console.log(`New shelter "${name}" connected: ${status}`);
}

function changeStatus(name: string, status: string): void {
    if (!communicationStatus.has(name)) {
        console.log(`There's no shelter called "${name}"`);
        return;
    }
    communicationStatus.set(name, status);
    console.log(`Shelter "${name}" changes to: ${status}`);
}

function removeShelter(name: string): void {
    communicationStatus.delete(name);
    shelterDistances.delete(name);
    fallenShelters.add(name);
    console.log(`Shelter "${name}" taken off the network`);
}

function getStatus(name: string): string {
    return communicationStatus.get(name) ?? "Unknown shelter";
}

function showReport(): void {
    console.log("\n=== STATUS OF THE SHELTER NETWORK ===");

    let distanceSum = 0;
    for (const [name, status] of communicationStatus) {
        const distance = shelterDistances.get(name) ?? 0;
        distanceSum += distance;
        console.log(`${name}: ${status} (${distance} km)`);
    }

    const activeShelters = communicationStatus.size;
    const average = activeShelters === 0 ? 0 : distanceSum / activeShelters;
    console.log(`Average distance: ${average.toFixed(1)} km`);
    console.log(`New shelters: ${Array.from(newShelters).join(", ")}`);
    console.log(`Fallen shelters: ${Array.from(fallenShelters).join(", ")}`);
}

console.log("=== UPDATING THE SHELTER NETWORK ===");

connectShelter("DELTA", "Clear communication", 18.4);
changeStatus("BRAVO", "Communication with interference");
removeShelter("CHARLIE");
removeShelter("CHARLIE");
console.log(`Status of ECHO: ${getStatus("ECHO")}`);

showReport();
