// Exercise 17.2: Tactical command system.

abstract class BaseFighter {
    private readonly fighterName: string;
    private healthPoints: number = 100;

    public constructor(name: string) {
        this.fighterName = name;
    }

    public get name(): string {
        return this.fighterName;
    }

    public get health(): number {
        return this.healthPoints;
    }

    public takeDamage(amount: number): void {
        this.healthPoints = Math.max(0, this.healthPoints - amount);
    }

    public recoverHealth(points: number): void {
        this.healthPoints = Math.min(100, this.healthPoints + points);
    }

    public abstract executeOrder(order: string, target: string): void;
    public abstract specialMission(team: BaseFighter[]): void;
}

class LeaderFighter extends BaseFighter {
    public override executeOrder(order: string, target: string): void {
        console.log(`${this.name} leads "${order}" against ${target}`);
    }

    public override specialMission(team: BaseFighter[]): void {
        const names = team.map((fighter) => fighter.name);
        console.log(`${this.name} coordinates: ${names.join(", ")}`);
    }
}

class MedicalAssistantFighter extends BaseFighter {
    public override executeOrder(order: string, target: string): void {
        console.log(`${this.name} covers the group against ${target}`);
    }

    public override specialMission(team: BaseFighter[]): void {
        if (team.length === 0) {
            return;
        }
        // Look for whoever has the least health.
        const mostWounded = team.reduce(
            (worst, fighter) =>
                fighter.health < worst.health ? fighter : worst,
            team[0],
        );
        mostWounded.recoverHealth(30);
        console.log(
            `${this.name} heals ${mostWounded.name}. ` +
            `Health: ${mostWounded.health}`
        );
    }
}

class ScoutFighter extends BaseFighter {
    private readonly zone: string;

    public constructor(name: string, zone: string) {
        super(name);
        this.zone = zone;
    }

    public override executeOrder(order: string, target: string): void {
        console.log(`${this.name} flanks ${target} to "${order}"`);
    }

    // It doesn't need the unit to scout its zone.
    public override specialMission(): void {
        console.log(`${this.name} scouts the ${this.zone}: nothing to report`);
    }
}

class TacticalCommand {
    private fighters: BaseFighter[] = [];

    public addFighter(fighter: BaseFighter): void {
        this.fighters.push(fighter);
    }

    public generalOrder(order: string, target: string): void {
        console.log(`\nGeneral order: ${order}`);
        for (const fighter of this.fighters) {
            fighter.executeOrder(order, target);
        }
    }

    // No instanceof: each class implements its own special mission.
    public specializedMission(): void {
        console.log("\nSpecial missions:");
        for (const fighter of this.fighters) {
            fighter.specialMission(this.fighters);
        }
    }
}

const command = new TacticalCommand();
const amaia = new ScoutFighter("Amaia", "north yard");

command.addFighter(new LeaderFighter("Marcos"));
command.addFighter(new MedicalAssistantFighter("Julia"));
command.addFighter(amaia);

amaia.takeDamage(45);
command.generalOrder("attack", "zombie horde");
command.specializedMission();
