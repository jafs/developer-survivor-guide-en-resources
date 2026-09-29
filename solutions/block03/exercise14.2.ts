// Exercise 14.2: The scouting corps.

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

class Scout extends Survivor {
    knownRoutes: string[] = [];
    scoutingGear: string[];
    energy: number = 120;

    constructor(name: string, scoutingGear: string[]) {
        super(name, "scouting corps");
        this.scoutingGear = scoutingGear;
    }

    exploreRoute(routeName: string): void {
        // Exploring a route spends 15 energy.
        if (this.energy < 15) {
            console.log(`${this.name} has no energy for: ${routeName}`);
            return;
        }
        this.energy -= 15;
        this.knownRoutes.push(routeName);
        console.log(`${this.name} has explored the route: ${routeName}`);
    }

    override takeDamage(amount: number): void {
        // A scout moves without being exposed: 10% less damage.
        super.takeDamage(amount * 0.9);
    }

    override getStatus(): string {
        return (
            `${super.getStatus()} | ` +
            `Known routes: ${this.knownRoutes.length} | ` +
            `Energy: ${this.energy}`
        );
    }
}

// Test: a scout surveying the terrain.
const scout = new Scout("Amaia", ["compass", "binoculars"]);
scout.exploreRoute("Lost town");
console.log(scout.getStatus());

// With 120 energy there's enough for 8 routes: the ninth isn't explored.
for (let route = 2; route <= 9; route++) {
    scout.exploreRoute(`Route ${route}`);
}
console.log(scout.getStatus());

console.log("\n=== DAMAGE REDUCTION TEST ===");
const normalSurvivor = new Survivor("Ana", "soldier");
normalSurvivor.takeDamage(50);
console.log(`Ana takes 50 damage: ${normalSurvivor.getStatus()}`);

const scoutWithReduction = new Scout("Amaia", ["compass"]);
scoutWithReduction.takeDamage(50);
console.log(`Amaia only takes 45: ${scoutWithReduction.getStatus()}`);
