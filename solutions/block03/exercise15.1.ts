// Exercise 15.1: Resource calculator.

type Resources = {
    ammo: number;
    bandages: number;
    water: number;
};

class ResourceCalculator {
    public static readonly AMMO_PER_PERSON = 30;
    public static readonly BANDAGES_PER_PERSON = 5;
    public static readonly WATER_PER_PERSON = 2;

    public static calculateNeeds(survivors: number): Resources {
        return {
            ammo: survivors * ResourceCalculator.AMMO_PER_PERSON,
            bandages: survivors * ResourceCalculator.BANDAGES_PER_PERSON,
            water: survivors * ResourceCalculator.WATER_PER_PERSON,
        };
    }

    // Returns the missing resources, or an empty array if nothing is.
    public static validateResources(
        available: Resources,
        survivors: number,
    ): string[] {
        const needed = ResourceCalculator.calculateNeeds(survivors);
        const missing: string[] = [];

        if (available.ammo < needed.ammo) {
            missing.push("ammo");
        }
        if (available.bandages < needed.bandages) {
            missing.push("bandages");
        }
        if (available.water < needed.water) {
            missing.push("water");
        }
        return missing;
    }
}

console.log("=== RESOURCE CALCULATOR FOR THE ASSAULT ===");

const needs = ResourceCalculator.calculateNeeds(12);
console.log(
    `For 12 people: ${needs.ammo} bullets, ` +
    `${needs.bandages} bandages, and ${needs.water} liters of water`
);

const fullStoreroom: Resources = { ammo: 400, bandages: 70, water: 30 };
const missingWhenFull = ResourceCalculator.validateResources(fullStoreroom, 12);
console.log(`Missing with the storeroom full: ${missingWhenFull.length}`);

const littleWater: Resources = { ammo: 400, bandages: 70, water: 10 };
const missingWater = ResourceCalculator.validateResources(littleWater, 12);
console.log(`Missing with little water: ${missingWater.join(", ")}`);

// Bonus: automatic identifiers.
class Survivor {
    private static idCounter = 0;
    public static readonly ID_PREFIX = "SURV";

    public readonly id: string;
    public readonly name: string;

    public constructor(name: string) {
        Survivor.idCounter++;
        const number = Survivor.idCounter.toString().padStart(4, "0");
        this.id = `${Survivor.ID_PREFIX}-${number}`;
        this.name = name;
    }
}

console.log("\n=== SURVIVOR REGISTER ===");
const registered = [
    new Survivor("Ana"),
    new Survivor("Marcos"),
    new Survivor("Amaia"),
];
for (const survivor of registered) {
    console.log(`${survivor.id}: ${survivor.name}`);
}
