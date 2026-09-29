// Challenge 2: Shelter management system.
// It only uses what blocks 1 and 2 cover.

// === INITIAL SETUP ===

enum ResourceType {
    WATER = "water",
    FOOD = "food",
    MEDICINE = "medicine",
    FUEL = "fuel",
}

enum ShelterStatus {
    SAFE = "safe",
    ALERT = "alert",
    COMPROMISED = "compromised",
    EVACUATING = "evacuating",
}

enum SkillLevel {
    BASIC = 1,
    COMPETENT = 2,
    ADVANCED = 3,
    ELITE = 4,
}

enum MissionType {
    RECONNAISSANCE = "reconnaissance",
    RESCUE = "rescue",
    SUPPLIES = "supplies",
}

type SurvivorStatus = "available" | "on_mission" | "injured";

type Shelter = {
    readonly location: readonly [number, number]; // [latitude, longitude]
    status: ShelterStatus;
    maxCapacity: number;
    currentSurvivors: number;
};

type Survivor = {
    currentShelter: string;
    skills: Record<string, SkillLevel>;
    status: SurvivorStatus;
};

type Mission = {
    type: MissionType;
    originShelter: string;
    assignedSurvivors: string[];
    priority: number; // From 1 to 5: 5 is the most urgent.
    description: string;
};

// === INITIAL DATA ===

const shelters: Record<string, Shelter> = {
    "North Shelter": {
        location: [41.2, -75.1],
        status: ShelterStatus.SAFE,
        maxCapacity: 15,
        currentSurvivors: 12,
    },
    "South Shelter": {
        location: [40.8, -74.9],
        status: ShelterStatus.ALERT,
        maxCapacity: 20,
        currentSurvivors: 8,
    },
    "Central Shelter": {
        location: [41.0, -75.0],
        status: ShelterStatus.SAFE,
        maxCapacity: 30,
        currentSurvivors: 18,
    },
};

const shelterInventory = new Map<string, Map<ResourceType, number>>([
    ["North Shelter", new Map([
        [ResourceType.WATER, 45],
        [ResourceType.FOOD, 23],
        [ResourceType.MEDICINE, 8],
        [ResourceType.FUEL, 12],
    ])],
    ["South Shelter", new Map([
        [ResourceType.WATER, 28],
        [ResourceType.FOOD, 41],
        [ResourceType.MEDICINE, 15],
        [ResourceType.FUEL, 8],
    ])],
    ["Central Shelter", new Map([
        [ResourceType.WATER, 67],
        [ResourceType.FOOD, 89],
        [ResourceType.MEDICINE, 34],
        [ResourceType.FUEL, 23],
    ])],
]);

// Registered survivors, with their skills.
const survivors = new Map<string, Survivor>([
    ["Ana", {
        currentShelter: "North Shelter",
        skills: {
            exploration: SkillLevel.ADVANCED,
            surveillance: SkillLevel.COMPETENT,
        },
        status: "available",
    }],
    ["Marcos", {
        currentShelter: "North Shelter",
        skills: {
            exploration: SkillLevel.ELITE,
            stealth: SkillLevel.ADVANCED,
        },
        status: "available",
    }],
    ["Diego", {
        currentShelter: "South Shelter",
        skills: {
            engineering: SkillLevel.ELITE,
            logistics: SkillLevel.COMPETENT,
        },
        status: "available",
    }],
    ["Julia", {
        currentShelter: "Central Shelter",
        skills: {
            medicine: SkillLevel.ELITE,
            logistics: SkillLevel.ADVANCED,
        },
        status: "on_mission",
    }],
]);

// Active missions, by code.
const activeMissions = new Map<string, Mission>();

// === CONSTANTS OF THE SOLUTION ===

const ALL_RESOURCES: ResourceType[] = [
    ResourceType.WATER,
    ResourceType.FOOD,
    ResourceType.MEDICINE,
    ResourceType.FUEL,
];

const ESSENTIAL_RESOURCES: ResourceType[] = [
    ResourceType.WATER,
    ResourceType.FOOD,
    ResourceType.MEDICINE,
];

const SHORTAGE_THRESHOLD: number = 10;

// === PART 1: RESOURCE ANALYSIS ===

function calculateTotalResource(type: ResourceType): number {
    let total = 0;
    for (const inventory of shelterInventory.values()) {
        total += inventory.get(type) ?? 0;
    }
    return total;
}

function identifyCriticalShortages(): string[] {
    const inCrisis: string[] = [];
    for (const [shelterName, inventory] of shelterInventory) {
        const hasShortage = ESSENTIAL_RESOURCES.some(
            (resource) => (inventory.get(resource) ?? 0) < SHORTAGE_THRESHOLD,
        );
        if (hasShortage) {
            inCrisis.push(shelterName);
        }
    }
    return inCrisis;
}

function sumInventory(inventory: Map<ResourceType, number>): number {
    let total = 0;
    for (const quantity of inventory.values()) {
        total += quantity;
    }
    return total;
}

function findBestSuppliedShelter(): string {
    let maximum = -1;
    let bestSupplied: string[] = [];

    for (const [shelterName, inventory] of shelterInventory) {
        const total = sumInventory(inventory);
        if (total > maximum) {
            maximum = total;
            bestSupplied = [shelterName];
        } else if (total === maximum) {
            bestSupplied.push(shelterName);
        }
    }
    return bestSupplied.join(", ");
}

// === PART 2: SURVIVORS AND MISSIONS ===

function findSpecialists(
    skill: string,
    minLevel: SkillLevel,
): string[] {
    const found: string[] = [];
    for (const [survivorName, survivor] of survivors) {
        const hasLevel = skill in survivor.skills &&
            survivor.skills[skill] >= minLevel;
        if (survivor.status === "available" && hasLevel) {
            found.push(survivorName);
        }
    }
    return found;
}

function assignMission(code: string, mission: Mission): boolean {
    const assigned = mission.assignedSurvivors;
    if (activeMissions.has(code) || assigned.length === 0) {
        return false;
    }

    // The whole team is checked first, so no change is left half done.
    const everyoneCan = assigned.every((survivorName) => {
        const survivor = survivors.get(survivorName);
        return survivor !== undefined &&
            survivor.status === "available" &&
            survivor.currentShelter === mission.originShelter;
    });
    if (!everyoneCan) {
        return false;
    }

    activeMissions.set(code, mission);
    for (const survivorName of assigned) {
        const survivor = survivors.get(survivorName);
        if (survivor !== undefined) {
            survivor.status = "on_mission";
        }
    }
    return true;
}

function completeMission(
    code: string,
    resourcesObtained: Map<ResourceType, number>,
): boolean {
    const mission = activeMissions.get(code);
    if (mission === undefined) {
        return false;
    }

    const inventory = shelterInventory.get(mission.originShelter);
    if (inventory !== undefined) {
        for (const [resource, quantity] of resourcesObtained) {
            inventory.set(resource, (inventory.get(resource) ?? 0) + quantity);
        }
    }

    for (const survivorName of mission.assignedSurvivors) {
        const survivor = survivors.get(survivorName);
        if (survivor !== undefined) {
            survivor.status = "available";
        }
    }

    activeMissions.delete(code);
    return true;
}

// === PART 3: ALERTS AND REPORTING ===

function assessThreat(
    zombiesDetected: number,
    distanceKm: number,
): ShelterStatus {
    const zombiePoints = Math.floor(zombiesDetected / 5);
    const distancePoints = Math.max(0, 5 - Math.floor(distanceKm));
    const points = zombiePoints + distancePoints;

    if (points > 8) {
        return ShelterStatus.EVACUATING;
    }
    if (points >= 6) {
        return ShelterStatus.COMPROMISED;
    }
    if (points >= 3) {
        return ShelterStatus.ALERT;
    }
    return ShelterStatus.SAFE;
}

function transferEmergencyResources(
    origin: string,
    destination: string,
    percentage: number,
): boolean {
    const originInventory = shelterInventory.get(origin);
    const destinationInventory = shelterInventory.get(destination);

    if (
        !(origin in shelters) ||
        originInventory === undefined ||
        destinationInventory === undefined ||
        origin === destination ||
        percentage < 1 ||
        percentage > 100 ||
        shelters[origin].status === ShelterStatus.SAFE
    ) {
        return false;
    }

    for (const [resource, quantity] of originInventory) {
        const sent = Math.floor((quantity * percentage) / 100);
        const atDestination = destinationInventory.get(resource) ?? 0;
        originInventory.set(resource, quantity - sent);
        destinationInventory.set(resource, atDestination + sent);
    }
    return true;
}

function generateReport(): string {
    let report = "=== SHELTER NETWORK REPORT ===\n";

    report += "\nShelters:\n";
    for (const [shelterName, shelter] of Object.entries(shelters)) {
        const occupancy =
            `${shelter.currentSurvivors}/${shelter.maxCapacity}`;
        report += `- ${shelterName}: ${shelter.status}, ${occupancy} people\n`;
    }

    report += "\nTotal resources:\n";
    for (const resource of ALL_RESOURCES) {
        report += `- ${resource}: ${calculateTotalResource(resource)}\n`;
    }

    const byStatus = new Map<SurvivorStatus, number>();
    for (const survivor of survivors.values()) {
        const quantity = byStatus.get(survivor.status) ?? 0;
        byStatus.set(survivor.status, quantity + 1);
    }
    report += "\nSurvivors by status:\n";
    for (const [survivorStatus, quantity] of byStatus) {
        report += `- ${survivorStatus}: ${quantity}\n`;
    }

    // Each element is a [code, mission] pair.
    const sortedMissions = Array.from(activeMissions).toSorted(
        (first, second) => second[1].priority - first[1].priority,
    );
    report += "\nActive missions:\n";
    if (sortedMissions.length === 0) {
        report += "- None\n";
    }
    for (const [code, mission] of sortedMissions) {
        report += `- ${code} (priority ${mission.priority}): ` +
            `${mission.description}\n`;
    }

    const inCrisis = identifyCriticalShortages();
    const crisisText = inCrisis.length === 0 ? "none" : inCrisis.join(", ");
    report += `\nCritical shortages: ${crisisText}`;

    return report;
}

// === BONUS ===

function startEvacuation(origin: string, destination: string): boolean {
    if (
        !(origin in shelters) ||
        !(destination in shelters) ||
        origin === destination
    ) {
        return false;
    }

    const originShelter = shelters[origin];
    const destinationShelter = shelters[destination];
    const people = originShelter.currentSurvivors;
    const freeSpots =
        destinationShelter.maxCapacity - destinationShelter.currentSurvivors;

    // Nobody is evacuated to a shelter that is being evacuated too.
    if (
        destinationShelter.status === ShelterStatus.EVACUATING ||
        freeSpots < people
    ) {
        return false;
    }

    destinationShelter.currentSurvivors += people;
    originShelter.currentSurvivors = 0;
    originShelter.status = ShelterStatus.EVACUATING;

    for (const survivor of survivors.values()) {
        if (survivor.currentShelter === origin) {
            survivor.currentShelter = destination;
        }
    }

    const originInventory = shelterInventory.get(origin);
    const destinationInventory = shelterInventory.get(destination);
    if (originInventory !== undefined && destinationInventory !== undefined) {
        for (const [resource, quantity] of originInventory) {
            const atDestination = destinationInventory.get(resource) ?? 0;
            destinationInventory.set(resource, atDestination + quantity);
            originInventory.set(resource, 0);
        }
    }
    return true;
}

function recommendTransfers(): string[] {
    const recommendations: string[] = [];

    for (const resource of ALL_RESOURCES) {
        const average = calculateTotalResource(resource) /
            shelterInventory.size;

        // Shelter that has the most of this resource.
        let richestShelter = "";
        let maxQuantity = -1;
        for (const [shelterName, inventory] of shelterInventory) {
            const quantity = inventory.get(resource) ?? 0;
            if (quantity > maxQuantity) {
                maxQuantity = quantity;
                richestShelter = shelterName;
            }
        }

        for (const [shelterName, inventory] of shelterInventory) {
            const quantity = inventory.get(resource) ?? 0;
            if (shelterName !== richestShelter && quantity < average / 2) {
                recommendations.push(
                    `Send ${resource} from ${richestShelter} to ` +
                    `${shelterName} (it has ${quantity} and the average ` +
                    `is ${average.toFixed(1)})`,
                );
            }
        }
    }
    return recommendations;
}

// === TESTS ===

console.log("=== TESTS OF THE SHELTER MANAGEMENT SYSTEM ===");

// Part 1: resource analysis.
console.log("\n--- Resource analysis ---");
console.log(
    `Total water: ${calculateTotalResource(ResourceType.WATER)} liters`,
);
console.log(`Critical shortages: ${identifyCriticalShortages().join(", ")}`);
console.log(`Best supplied: ${findBestSuppliedShelter()}`);

// Part 2: survivors and missions.
console.log("\n--- Survivors and missions ---");
const explorers = findSpecialists(
    "exploration",
    SkillLevel.ADVANCED,
);
console.log(`Exploration available: ${explorers.join(", ")}`);

const reconnaissance = assignMission("MIS-001", {
    type: MissionType.RECONNAISSANCE,
    originShelter: "North Shelter",
    assignedSurvivors: ["Ana", "Marcos"],
    priority: 3,
    description: "Explore the abandoned industrial area",
});
console.log(`MIS-001 assigned: ${reconnaissance}`);

// Ana is already on a mission, and she isn't in the South Shelter either.
const supplies = assignMission("MIS-002", {
    type: MissionType.SUPPLIES,
    originShelter: "South Shelter",
    assignedSurvivors: ["Diego", "Ana"],
    priority: 4,
    description: "Pick up fuel drums at the gas station",
});
console.log(`MIS-002 assigned: ${supplies}`);

const rescue = assignMission("MIS-003", {
    type: MissionType.RESCUE,
    originShelter: "South Shelter",
    assignedSurvivors: ["Diego"],
    priority: 5,
    description: "Look for the stragglers at the bridge",
});
console.log(`MIS-003 assigned: ${rescue}`);

const completed = completeMission("MIS-001", new Map([
    [ResourceType.WATER, 10],
    [ResourceType.MEDICINE, 4],
]));
console.log(`MIS-001 completed: ${completed}`);

// Part 3: alerts and reporting.
console.log("\n--- Alerts ---");
shelters["South Shelter"].status = assessThreat(12, 3.5);
console.log(`Status of the South Shelter: ${shelters["South Shelter"].status}`);
console.log(`Horde 800 meters away: ${assessThreat(35, 0.8)}`);

const fromCentral = transferEmergencyResources(
    "Central Shelter",
    "South Shelter",
    20,
);
console.log(`Transfer from the Central Shelter: ${fromCentral}`);

const fromSouth = transferEmergencyResources(
    "South Shelter",
    "Central Shelter",
    50,
);
console.log(`Transfer from the South Shelter: ${fromSouth}`);

console.log("\n--- Network report ---");
console.log(generateReport());

// Bonus.
console.log("\n--- Bonus ---");
for (const recommendation of recommendTransfers()) {
    console.log(recommendation);
}
console.log(`Evacuate South to Central: ${startEvacuation(
    "South Shelter",
    "Central Shelter",
)}`);
console.log(`Evacuate North to South: ${startEvacuation(
    "North Shelter",
    "South Shelter",
)}`);
