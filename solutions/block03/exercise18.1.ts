// Exercise 18.1: Supply squads.

class Gear {
    public readonly name: string;
    private durability: number = 100;

    public constructor(name: string) {
        this.name = name;
    }

    public get currentDurability(): number {
        return this.durability;
    }

    public use(): void {
        this.durability = Math.max(0, this.durability - 20);
    }

    public repair(): void {
        this.durability = 100;
    }
}

class Fighter {
    public readonly name: string;
    // Optional association: null while the fighter carries no gear.
    private gear: Gear | null = null;

    public constructor(name: string) {
        this.name = name;
    }

    public equip(gear: Gear): void {
        this.gear = gear;
    }

    public get assignedGear(): Gear | null {
        return this.gear;
    }

    public act(order: string): void {
        if (this.gear === null) {
            console.log(`  ${this.name}: ${order}, no gear`);
            return;
        }
        this.gear.use();
        console.log(`  ${this.name}: ${order}, with ${this.gear.name}`);
    }

    public describe(): string {
        if (this.gear === null) {
            return `${this.name} (no gear)`;
        }
        const durability = this.gear.currentDurability;
        return `${this.name} (${this.gear.name}, ${durability})`;
    }
}

// One-to-many association: a squad groups several fighters.
class Squad {
    public readonly name: string;
    private fighters: Fighter[] = [];

    public constructor(name: string) {
        this.name = name;
    }

    public addFighter(fighter: Fighter): void {
        this.fighters.push(fighter);
    }

    public removeFighter(name: string): Fighter | undefined {
        const position = this.fighters.findIndex(
            (fighter) => fighter.name === name,
        );
        if (position === -1) {
            return undefined;
        }
        return this.fighters.splice(position, 1)[0];
    }

    public act(order: string): void {
        console.log(`${this.name} squad:`);
        for (const fighter of this.fighters) {
            fighter.act(order);
        }
    }

    // Returns a copy so nobody changes the list from outside.
    public getFighters(): Fighter[] {
        return [...this.fighters];
    }
}

// Dependency: the workshop uses the squad, but doesn't store it.
class Workshop {
    public repairGear(squad: Squad): void {
        console.log(`\nThe workshop repairs the gear of ${squad.name} squad`);
        for (const fighter of squad.getFighters()) {
            fighter.assignedGear?.repair();
        }
    }
}

// Bonus: association class with the data of each transfer.
class Transfer {
    private readonly fighter: Fighter;
    private readonly origin: Squad;
    private readonly destination: Squad;

    public constructor(
        fighter: Fighter,
        origin: Squad,
        destination: Squad,
    ) {
        this.fighter = fighter;
        this.origin = origin;
        this.destination = destination;
    }

    public describe(): string {
        return `${this.fighter.name}: from ${this.origin.name} ` +
            `to ${this.destination.name}`;
    }
}

class Commander {
    private readonly name: string;
    private squads: Squad[] = [];
    private transfers: Transfer[] = [];

    public constructor(name: string) {
        this.name = name;
    }

    public addSquad(squad: Squad): void {
        this.squads.push(squad);
    }

    private findSquad(name: string): Squad | undefined {
        return this.squads.find(
            (squad) => squad.name === name,
        );
    }

    public generalOrder(order: string): void {
        console.log(`\n${this.name} orders everyone: ${order}`);
        for (const squad of this.squads) {
            squad.act(order);
        }
    }

    public specificOrder(squadName: string, order: string): void {
        const squad = this.findSquad(squadName);
        if (squad === undefined) {
            console.log(`\nThere's no squad called ${squadName}`);
            return;
        }
        console.log(`\n${this.name} orders ${squadName}: ${order}`);
        squad.act(order);
    }

    public transferFighter(
        fighterName: string,
        originName: string,
        destinationName: string,
    ): void {
        const origin = this.findSquad(originName);
        const destination = this.findSquad(destinationName);
        if (origin === undefined || destination === undefined) {
            console.log("\nTransfer canceled: a squad is missing");
            return;
        }

        const fighter = origin.removeFighter(fighterName);
        if (fighter === undefined) {
            console.log(`\n${fighterName} isn't in ${originName}`);
            return;
        }

        destination.addFighter(fighter);
        this.transfers.push(new Transfer(fighter, origin, destination));
        console.log(
            `\n${fighterName} moves from ${originName} to ${destinationName}`
        );
    }

    public showReport(): void {
        console.log(`\n=== REPORT FROM ${this.name.toUpperCase()} ===`);
        for (const squad of this.squads) {
            console.log(`${squad.name} squad:`);
            for (const fighter of squad.getFighters()) {
                console.log(`  - ${fighter.describe()}`);
            }
        }
        if (this.transfers.length > 0) {
            console.log("Transfers:");
            for (const transfer of this.transfers) {
                console.log(`  - ${transfer.describe()}`);
            }
        }
    }
}

const commander = new Commander("Marcos");
const alpha = new Squad("Alpha");
const bravo = new Squad("Bravo");

const ana = new Fighter("Ana");
ana.equip(new Gear("Machete"));
const amaiaFighter = new Fighter("Amaia");
amaiaFighter.equip(new Gear("Crossbow"));

alpha.addFighter(ana);
alpha.addFighter(amaiaFighter);
bravo.addFighter(new Fighter("Julia"));

commander.addSquad(alpha);
commander.addSquad(bravo);

commander.generalOrder("secure the perimeter");
commander.specificOrder("Alpha", "gather firewood");
commander.transferFighter("Amaia", "Alpha", "Bravo");
commander.showReport();

new Workshop().repairGear(alpha);
commander.showReport();
