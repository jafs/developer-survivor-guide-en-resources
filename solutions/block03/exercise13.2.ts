// Exercise 13.2: Advanced threat analysis.

class AttackerZombie {
    type: string;
    health: number;
    speed: number;
    visitedLocations: string[];

    constructor(type: string, speed: number) {
        this.type = type;
        this.speed = speed;
        // Random health between 80 and 100.
        this.health = Math.floor(Math.random() * 21) + 80;
        this.visitedLocations = [];
    }

    calculateThreatLevel(): string {
        const score = this.health + this.speed * 10;
        if (score >= 130) {
            return "Critical";
        }
        if (score >= 80) {
            return "High";
        }
        if (score >= 40) {
            return "Medium";
        }
        return "Low";
    }

    isHighPriority(): boolean {
        return this.health >= 50 && this.speed >= 6;
    }

    moveTo(location: string): void {
        this.visitedLocations.push(location);
    }

    takeDamage(amount: number): void {
        this.health = Math.max(0, this.health - amount);
        if (this.health === 0) {
            console.log(`${this.type}: Threat eliminated`);
        }
    }

    generateReport(): void {
        console.log(`--- ${this.type} ---`);
        console.log(`Health: ${this.health} | Speed: ${this.speed}`);
        console.log(`Threat: ${this.calculateThreatLevel()}`);
        console.log(`High priority: ${this.isHighPriority()}`);
        console.log(`Route: ${this.visitedLocations.join(" - ")}`);
    }
}

// A day of reconnaissance.
const runner = new AttackerZombie("Runner", 9);
runner.moveTo("North Gate");
runner.moveTo("Central Yard");
console.log(`Threat: ${runner.calculateThreatLevel()}`);

const walker = new AttackerZombie("Walker", 2);
walker.moveTo("East Wall");
walker.takeDamage(60);

runner.generateReport();
walker.generateReport();

walker.takeDamage(100);
