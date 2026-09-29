// Challenge 3: Prison defense towers.

// === COMMON INTERFACE ===

// Everything that shows up in the battle report.
interface Reportable {
    generateReport(): string;
}

// === PART 1: ZOMBIES ===

abstract class Zombie implements Reportable {
    protected health: number;
    protected distance: number; // Meters to the wall.

    public constructor(health: number, distance: number) {
        this.health = health;
        this.distance = distance;
    }

    public get isAlive(): boolean {
        return this.health > 0;
    }

    public get metersToWall(): number {
        return this.distance;
    }

    public takeDamage(amount: number): void {
        this.health = Math.max(0, this.health - amount);
    }

    // Moves forward without going past the wall.
    protected moveCloser(meters: number): void {
        this.distance = Math.max(0, this.distance - meters);
    }

    public generateReport(): string {
        return `${this.getType()}: ${this.health} health, ` +
            `${this.distance} m away`;
    }

    public abstract advance(): void;
    public abstract getType(): string;
}

class WalkerZombie extends Zombie {
    public constructor(distance: number) {
        super(120, distance);
    }

    public override advance(): void {
        this.moveCloser(5);
    }

    public override getType(): string {
        return "Walker";
    }
}

class RunnerZombie extends Zombie {
    public constructor(distance: number) {
        super(60, distance);
    }

    public override advance(): void {
        this.moveCloser(15);
    }

    public override getType(): string {
        return "Runner";
    }
}

class AthleteZombie extends Zombie {
    private turns: number = 0;

    public constructor(distance: number) {
        super(90, distance);
    }

    // Every three turns, a sprint.
    public override advance(): void {
        this.turns++;
        this.moveCloser(this.turns % 3 === 0 ? 20 : 10);
    }

    public override getType(): string {
        return "Athlete";
    }
}

// === PART 2: TOWERS ===

abstract class DefenseTower implements Reportable {
    protected readonly name: string;
    protected readonly damage: number;
    protected readonly range: number;
    protected ammo: number;
    protected kills: number = 0;

    public constructor(
        name: string,
        damage: number,
        range: number,
        ammo: number,
    ) {
        this.name = name;
        this.damage = damage;
        this.range = range;
        this.ammo = ammo;
    }

    public get isOperational(): boolean {
        return this.ammo > 0;
    }

    public get remainingAmmo(): number {
        return this.ammo;
    }

    public reload(amount: number): void {
        this.ammo += amount;
    }

    // Living zombies within its range.
    protected findTargets(zombies: Zombie[]): Zombie[] {
        return zombies.filter(
            (zombie) =>
                zombie.isAlive && zombie.metersToWall <= this.range,
        );
    }

    protected hit(zombie: Zombie): void {
        zombie.takeDamage(this.damage);
        if (!zombie.isAlive) {
            this.kills++;
        }
    }

    public generateReport(): string {
        return `${this.name}: ${this.ammo} ammo, ` +
            `${this.kills} kills`;
    }

    public abstract shoot(zombies: Zombie[]): void;
}

// Shoots the closest living zombie within its range.
class LongRangeTower extends DefenseTower {
    public constructor(name: string, ammo: number) {
        super(name, 40, 100, ammo);
    }

    public override shoot(zombies: Zombie[]): void {
        const targets = this.findTargets(zombies).toSorted(
            (first, second) =>
                first.metersToWall - second.metersToWall,
        );
        if (targets.length === 0 || !this.isOperational) {
            return;
        }
        this.ammo--;
        this.hit(targets[0]);
    }
}

// One shot at each zombie within its range, while it has ammo left.
class MachineGunTower extends DefenseTower {
    public constructor(name: string, ammo: number) {
        super(name, 15, 40, ammo);
    }

    public override shoot(zombies: Zombie[]): void {
        for (const zombie of this.findTargets(zombies)) {
            if (!this.isOperational) {
                return;
            }
            this.ammo--;
            this.hit(zombie);
        }
    }
}

// A burst of flame reaches every nearby zombie and uses up 1 ammo.
class FlamethrowerTower extends DefenseTower {
    public constructor(name: string, ammo: number) {
        super(name, 50, 15, ammo);
    }

    public override shoot(zombies: Zombie[]): void {
        const targets = this.findTargets(zombies);
        if (targets.length === 0 || !this.isOperational) {
            return;
        }
        this.ammo--;
        for (const zombie of targets) {
            this.hit(zombie);
        }
    }
}

// === PART 3: PROTOCOLS AND DEFENSE SYSTEM ===

class DefenseProtocols {
    public static readonly CRITICAL_AMMO = 5;
    public static readonly EMERGENCY_RELOAD = 10;
    public static readonly DANGER_DISTANCE = 20;

    public static assessWave(zombies: Zombie[]): string {
        const alive = zombies.filter((zombie) => zombie.isAlive);
        const zombiesNearby = alive.some(
            (zombie) =>
                zombie.metersToWall < DefenseProtocols.DANGER_DISTANCE,
        );
        if (zombiesNearby) {
            return "high";
        }
        if (alive.length > 5) {
            return "medium";
        }
        return "low";
    }
}

type BattleResult = "victory" | "defeat" | null;

class DefenseSystem {
    private towers: DefenseTower[] = [];
    private wave: Zombie[] = [];
    private ammoReserve: number;
    private turn: number = 0;

    public constructor(ammoReserve: number) {
        this.ammoReserve = ammoReserve;
    }

    public deployTower(tower: DefenseTower): void {
        this.towers.push(tower);
    }

    public receiveWave(zombies: Zombie[]): void {
        this.wave = zombies;
    }

    public runTurn(): void {
        this.turn++;

        // 1. The operational towers shoot.
        for (const tower of this.towers) {
            if (tower.isOperational) {
                tower.shoot(this.wave);
            }
        }

        // 2. The zombies that are still alive advance.
        for (const zombie of this.wave) {
            if (zombie.isAlive) {
                zombie.advance();
            }
        }

        // 3. The towers that are low on ammo get some from the reserve.
        this.resupply();
    }

    private resupply(): void {
        for (const tower of this.towers) {
            const lowAmmo =
                tower.remainingAmmo < DefenseProtocols.CRITICAL_AMMO;
            if (lowAmmo && this.ammoReserve > 0) {
                const amount = Math.min(
                    DefenseProtocols.EMERGENCY_RELOAD,
                    this.ammoReserve,
                );
                tower.reload(amount);
                this.ammoReserve -= amount;
            }
        }
    }

    public checkResult(): BattleResult {
        const alive = this.wave.filter((zombie) => zombie.isAlive);
        if (alive.length === 0) {
            return "victory";
        }
        if (alive.some((zombie) => zombie.metersToWall === 0)) {
            return "defeat";
        }
        return null;
    }

    public showStatus(): void {
        const threat = DefenseProtocols.assessWave(this.wave);
        console.log(`\n--- Turn ${this.turn} (${threat} threat) ---`);

        // Towers and zombies are handled alike thanks to the common
        // interface.
        const reportables: Reportable[] = [
            ...this.towers,
            ...this.wave.filter((zombie) => zombie.isAlive),
        ];
        for (const element of reportables) {
            console.log(`  ${element.generateReport()}`);
        }
        console.log(`  Ammo reserve: ${this.ammoReserve}`);
    }
}

// === PART 4: THE BATTLE ===

const MAX_TURNS: number = 30;

const system = new DefenseSystem(40);
system.deployTower(new LongRangeTower("North Tower", 15));
system.deployTower(new MachineGunTower("East Tower", 30));
system.deployTower(new FlamethrowerTower("Main gate", 6));

system.receiveWave([
    new WalkerZombie(45),
    new WalkerZombie(60),
    new WalkerZombie(80),
    new RunnerZombie(90),
    new RunnerZombie(120),
    new RunnerZombie(150),
    new AthleteZombie(70),
    new AthleteZombie(100),
]);

console.log("=== DEFENSE OF THE PRISON ===");

let result: BattleResult = null;
for (let turn = 1; turn <= MAX_TURNS && result === null; turn++) {
    system.runTurn();
    system.showStatus();
    result = system.checkResult();
}

if (result === "victory") {
    console.log("\nThe horde has fallen. The prison holds.");
} else if (result === "defeat") {
    console.log("\nThe zombies have reached the wall. Time to evacuate.");
} else {
    console.log("\nThe battle goes on after the last turn.");
}

// === BONUS: A NEW ZOMBIE WITHOUT TOUCHING THE SYSTEM ===

class MutantZombie extends Zombie {
    public constructor(distance: number) {
        super(150, distance);
    }

    // Advances slowly and regenerates, without going over its initial
    // health.
    public override advance(): void {
        this.moveCloser(8);
        this.health = Math.min(150, this.health + 5);
    }

    public override getType(): string {
        return "Mutant";
    }
}

console.log("\n=== BONUS: A MUTANT SHOWS UP ===");

const westSystem = new DefenseSystem(20);
westSystem.deployTower(new LongRangeTower("West Tower", 20));
westSystem.receiveWave([new MutantZombie(90), new WalkerZombie(70)]);

let westResult: BattleResult = null;
let westTurns = 0;
while (westResult === null && westTurns < MAX_TURNS) {
    westSystem.runTurn();
    westResult = westSystem.checkResult();
    westTurns++;
}
westSystem.showStatus();
console.log(`Result in the west wing: ${westResult}`);
