// Exercise 14.1: Specialist medical assistant.

class Survivor {
    name: string;
    rank: string;
    health: number;

    constructor(name: string, rank: string = "survivor") {
        this.name = name;
        this.rank = rank;
        this.health = 100;
    }

    heal(health: number): void {
        this.health = Math.min(100, this.health + health);
    }

    getStatus(): string {
        return `${this.name} [${this.rank}] - H:${this.health}`;
    }

    takeDamage(amount: number): void {
        this.health = Math.max(0, this.health - amount);
    }
}

class MedicalAssistant extends Survivor {
    static readonly ENERGY_PER_TREATMENT = 20;

    firstAidKits: number;
    energy: number = 100;

    constructor(name: string, firstAidKits: number = 3) {
        super(name, "medical assistant");
        this.firstAidKits = firstAidKits;
    }

    treatInjured(injured: Survivor, points: number): boolean {
        const energyNeeded = MedicalAssistant.ENERGY_PER_TREATMENT;

        if (this.firstAidKits < 1 || this.energy < energyNeeded) {
            console.log(`${this.name} can't heal anyone right now`);
            return false;
        }

        // The inherited method is used, which already limits health to 100.
        injured.heal(points);
        this.firstAidKits--;
        this.energy -= energyNeeded;

        console.log(`${this.name} has healed ${injured.name}`);
        return true;
    }

    override getStatus(): string {
        return (
            `${super.getStatus()} | First aid kits: ${this.firstAidKits} | ` +
            `Energy: ${this.energy}`
        );
    }
}

// Test of the implementation.
const assistant = new MedicalAssistant("Julia");
const injured = new Survivor("Marcos", "soldier");
injured.takeDamage(40); // Simulates an injury. Health goes down to 60.

assistant.treatInjured(injured, 30);

// Marcos will have 90 health and Julia, 2 first aid kits.
console.log(injured.getStatus());
console.log(assistant.getStatus());

// Edge case: with no first aid kits, there's no healing.
const assistantWithoutKits = new MedicalAssistant("Julia", 0);
const couldHeal = assistantWithoutKits.treatInjured(injured, 10);
console.log(`Could Julia heal? ${couldHeal ? "Yes" : "No"}`);
