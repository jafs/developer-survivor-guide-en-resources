// Exercise 14.3: Identifying roles.

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
    firstAidKits: number;
    energy: number = 100;

    constructor(name: string, firstAidKits: number = 3) {
        super(name, "medical assistant");
        this.firstAidKits = firstAidKits;
    }

    treatInjured(injured: Survivor, points: number): boolean {
        if (this.firstAidKits < 1 || this.energy < 20) {
            return false;
        }

        injured.heal(points);
        this.firstAidKits--;
        this.energy -= 20;
        return true;
    }

    override getStatus(): string {
        return `${super.getStatus()} | First aid kits: ${this.firstAidKits}`;
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
        this.knownRoutes.push(routeName);
    }

    override takeDamage(amount: number): void {
        super.takeDamage(amount * 0.9);
    }

    override getStatus(): string {
        return (
            `${super.getStatus()} | ` +
            `Known routes: ${this.knownRoutes.length}`
        );
    }
}

class TeamLeader extends Survivor {
    assignedTeam: Survivor[];
    completedMissions: number;

    constructor(name: string) {
        super(name, "team leader");
        this.assignedTeam = [];
        this.completedMissions = 0;
    }

    assignSurvivor(survivor: Survivor): boolean {
        if (this.assignedTeam.length >= 4) {
            console.log(`${this.name}: Team is full`);
            return false;
        }

        this.assignedTeam.push(survivor);
        console.log(`${survivor.name} was assigned to the team`);
        return true;
    }

    coordinateRetreat(destination: string): void {
        this.completedMissions++;
        console.log(`${this.name} led the retreat to ${destination}`);
    }

    override getStatus(): string {
        const baseStatus = super.getStatus();
        return (
            `${baseStatus} | Team: ${this.assignedTeam.length}/4 | ` +
            `Missions: ${this.completedMissions}`
        );
    }
}

function assignEmergencyTask(person: Survivor): string {
    if (person instanceof TeamLeader) {
        return "Coordinate the evacuation and lead the group";
    } else if (person instanceof MedicalAssistant) {
        return "Treat the injured and prepare medical supplies";
    } else if (person instanceof Scout) {
        return "Explore escape routes and survey the terrain";
    } else {
        return "Protect the group and follow the leader's orders";
    }
}

// Test: a mixed group during the evacuation.
const group = [
    new Survivor("Ana", "fighter"),
    new MedicalAssistant("Julia", 5),
    new Scout("Amaia", ["compass"]),
    new TeamLeader("Marcos")
];

console.log("=== EMERGENCY TASK ASSIGNMENT ===");
group.forEach(person => {
    console.log(`${person.name}: ${assignEmergencyTask(person)}`);
});

console.log("\n=== TYPE CHECK ===");
group.forEach(person => {
    const isLeader = person instanceof TeamLeader;
    const isMedic = person instanceof MedicalAssistant;
    const isScout = person instanceof Scout;
    const isSurvivor = person instanceof Survivor;

    console.log(
        `${person.name}: ` +
        `Leader=${isLeader}, Medic=${isMedic}, Scout=${isScout}, ` +
        `Survivor=${isSurvivor}`
    );
});
