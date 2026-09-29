// Exercise 20.3: Turns at the well.

// === OLD WALKIE-TALKIE (FROM THE EXERCISE) ===

class OldWalkie {
    public requestTurn(
        team: string,
        onResponse: (error: Error | null, turn: string) => void,
    ): void {
        setTimeout(() => {
            if (team === "") {
                onResponse(new Error("Unidentified walkie-talkie"), "");
                return;
            }
            onResponse(null, `Turn granted to ${team}`);
        }, 100);
    }
}

// === ADAPTER ===

class WalkieWithPromises {
    private walkie: OldWalkie;

    public constructor(walkie: OldWalkie) {
        this.walkie = walkie;
    }

    public requestTurn(team: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.walkie.requestTurn(team, (error, turn) => {
                if (error !== null) {
                    reject(error);
                    return;
                }
                resolve(turn);
            });
        });
    }
}

// === SEMAPHORE ===

class Semaphore {
    private readonly slots: number;
    private freeSlots: number;
    private waiting: (() => void)[] = [];

    public constructor(slots: number) {
        this.slots = slots;
        this.freeSlots = slots;
    }

    public get occupied(): number {
        return this.slots - this.freeSlots;
    }

    public async acquire(): Promise<void> {
        if (this.freeSlots > 0) {
            this.freeSlots--;
            return;
        }
        // release() hands over the slot when it calls this resolve.
        await new Promise<void>((resolve) => this.waiting.push(resolve));
    }

    public release(): void {
        const next = this.waiting.shift();
        if (next === undefined) {
            this.freeSlots++;
            return;
        }
        next();
    }
}

// === WELL ===

class Well {
    private liters: number = 200;

    public get availableLiters(): number {
        return this.liters;
    }

    // Reads and writes with no await in between: there's no race condition.
    public draw(liters: number): number {
        const drawn = Math.min(liters, this.liters);
        this.liters -= drawn;
        return drawn;
    }
}

// === TURNS ===

const wait = (milliseconds: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

const walkie = new WalkieWithPromises(new OldWalkie());
const wellSlots = new Semaphore(2);
const yardWell = new Well();

async function goToWell(
    team: string,
    liters: number,
    milliseconds: number,
): Promise<void> {
    console.log(await walkie.requestTurn(team));
    await wellSlots.acquire();
    try {
        console.log(
            `${team} goes down to the well. Teams at the well: ` +
            `${wellSlots.occupied}`
        );
        await wait(milliseconds);
        const drawn = yardWell.draw(liters);
        console.log(`${team} comes up with ${drawn} liters`);
    } finally {
        wellSlots.release();
    }
}

// The four teams leave at the same time, and then we wait for each one.
const trips = [
    goToWell("Ana", 40, 300),
    goToWell("Julia", 50, 200),
    goToWell("Marcos", 30, 100),
    goToWell("Amaia", 60, 200),
];
for (const trip of trips) {
    await trip;
}

console.log(`${yardWell.availableLiters} liters left in the well`);
