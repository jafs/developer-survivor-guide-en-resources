// Challenge 4: The night of the north wall.
// Run the night with: deno run block04/challenge4.ts
// Run the tests with: deno test block04/challenge4.ts

import { test } from "node:test";
import assert from "node:assert/strict";

// === PART 1: ERRORS ===

class FaultySensorError extends Error {
    public readonly tower: string;
    public readonly reading: number;

    public constructor(tower: string, reading: number) {
        super(`Faulty sensor at the ${tower} tower: ${reading} zombies`);
        this.name = "FaultySensorError";
        this.tower = tower;
        this.reading = reading;
    }
}

class UnresponsiveTowerError extends Error {
    public readonly tower: string;
    public readonly milliseconds: number;

    public constructor(tower: string, milliseconds: number) {
        super(`The ${tower} tower hasn't responded after ${milliseconds} ms`);
        this.name = "UnresponsiveTowerError";
        this.tower = tower;
        this.milliseconds = milliseconds;
    }
}

// === PART 2: TOWERS ===

type Report = {
    tower: string;
    zombies: number;
    ammo: number;
};

interface Tower {
    readonly name: string;
    report(): Promise<Report>;
}

class SimulatedTower implements Tower {
    public readonly name: string;
    private milliseconds: number;
    private zombies: number;
    private ammo: number;

    public constructor(
        name: string,
        milliseconds: number,
        zombies: number,
        ammo: number,
    ) {
        this.name = name;
        this.milliseconds = milliseconds;
        this.zombies = zombies;
        this.ammo = ammo;
    }

    public report(): Promise<Report> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // A frozen counter gives negative readings.
                if (this.zombies < 0) {
                    reject(new FaultySensorError(this.name, this.zombies));
                    return;
                }
                resolve({
                    tower: this.name,
                    zombies: this.zombies,
                    ammo: this.ammo,
                });
            }, this.milliseconds);
        });
    }
}

function withTimeLimit(
    tower: Tower,
    milliseconds: number,
): Promise<Report> {
    // A promise that has been fulfilled or rejected doesn't change:
    // whatever arrives first wins.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new UnresponsiveTowerError(tower.name, milliseconds));
        }, milliseconds);
        tower.report().then(resolve).catch(reject);
    });
}

// === PART 3: COORDINATING THE LINE ===

type Round = {
    towers: number;
    reports: Report[];
    faulty: string[];
    unresponsive: string[];
};

type LineStatus = "holding" | "requesting reinforcements" | "about to break";

// Puts the result of a tower in the round. It handles the tower's errors
// here so that none is left unhandled while waiting for the others, and
// it returns the error it doesn't know how to handle, or null if there
// isn't one.
async function askTower(
    tower: Tower,
    milliseconds: number,
    round: Round,
): Promise<unknown> {
    try {
        round.reports.push(await withTimeLimit(tower, milliseconds));
    } catch (error) {
        if (error instanceof FaultySensorError) {
            round.faulty.push(error.tower);
        } else if (error instanceof UnresponsiveTowerError) {
            round.unresponsive.push(error.tower);
        } else {
            return error;
        }
    }
    return null;
}

async function collectReports(
    towers: Tower[],
    milliseconds: number,
): Promise<Round> {
    const round: Round = {
        towers: towers.length,
        reports: [],
        faulty: [],
        unresponsive: [],
    };

    // All the towers at the same time: first they're asked, then awaited.
    const questions = towers.map(
        (tower) => askTower(tower, milliseconds, round),
    );

    let unexpected: unknown = null;
    for (const question of questions) {
        const error = await question;
        if (error !== null && unexpected === null) {
            unexpected = error;
        }
    }
    if (unexpected !== null) {
        // The two errors from part 1 are the ones we know how to handle.
        throw unexpected;
    }

    return round;
}

function assessLine(round: Round): LineStatus {
    let zombies = 0;
    let ammo = 0;
    for (const report of round.reports) {
        zombies += report.zombies;
        ammo += report.ammo;
    }

    const reported = round.reports.length;
    if (reported === 0 || reported < round.towers / 2) {
        return "about to break";
    }
    if (zombies > ammo) {
        return "about to break";
    }

    const hasFailures =
        round.faulty.length > 0 || round.unresponsive.length > 0;
    if (hasFailures || zombies > ammo / 2) {
        return "requesting reinforcements";
    }
    return "holding";
}

// === BONUS: WARNINGS TO THE BARRICADE ===

// The higher the number, the worse the line is doing.
const SEVERITY: Map<LineStatus, number> = new Map([
    ["holding", 0],
    ["requesting reinforcements", 1],
    ["about to break", 2],
]);

// === PART 4: THE NIGHT ===

const RESPONSE_LIMIT_MS = 500;

function showRound(time: string, round: Round, lineStatus: LineStatus): void {
    console.log(`\n=== ${time} ROUND ===`);
    for (const report of round.reports) {
        console.log(
            `${report.tower} tower: ${report.zombies} zombies, ` +
            `${report.ammo} ammo`
        );
    }
    if (round.faulty.length > 0) {
        console.log(`Faulty sensors: ${round.faulty.join(", ")}`);
    }
    if (round.unresponsive.length > 0) {
        console.log(`No response: ${round.unresponsive.join(", ")}`);
    }
    console.log(`Status of the line: ${lineStatus}`);
}

async function watchNight(rounds: [string, Tower[]][]): Promise<void> {
    let previousSeverity = 0;

    for (const [time, towers] of rounds) {
        const round = await collectReports(towers, RESPONSE_LIMIT_MS);
        const lineStatus = assessLine(round);
        showRound(time, round, lineStatus);

        const severity = SEVERITY.get(lineStatus) ?? 0;
        if (severity > previousSeverity) {
            console.log(
                `[${time}] Warning to Ana and Marcos: ` +
                `the line is ${lineStatus}`
            );
        }
        previousSeverity = severity;

        if (lineStatus === "about to break") {
            console.log(
                "\nThis is the prison. " +
                "The second line on the north wall is about to"
            );
            console.log("(Transmission cut off)");
            return;
        }
    }

    console.log("\nThe line has held all night");
}

const nightRounds: [string, Tower[]][] = [
    ["22:00", [
        new SimulatedTower("North", 200, 12, 40),
        new SimulatedTower("East", 100, 8, 30),
        new SimulatedTower("West", 300, 5, 30),
        new SimulatedTower("Main gate", 150, 10, 20),
    ]],
    ["23:00", [
        new SimulatedTower("North", 250, 20, 25),
        new SimulatedTower("East", 100, -1, 30),
        new SimulatedTower("West", 300, 10, 20),
        new SimulatedTower("Main gate", 200, 15, 10),
    ]],
    ["23:50", [
        new SimulatedTower("North", 900, 45, 4),
        new SimulatedTower("East", 100, -900, 0),
        new SimulatedTower("West", 300, 40, 6),
        new SimulatedTower("Main gate", 200, 60, 2),
    ]],
];

await watchNight(nightRounds);

// === PART 5: TESTS ===

function createRound(
    towers: number,
    reports: Report[],
    faulty: string[] = [],
    unresponsive: string[] = [],
): Round {
    return {
        towers: towers,
        reports: reports,
        faulty: faulty,
        unresponsive: unresponsive,
    };
}

test("with ammo to spare and no failures, the line is holding", () => {
    const round = createRound(2, [
        { tower: "North", zombies: 10, ammo: 40 },
        { tower: "East", zombies: 5, ammo: 30 },
    ]);
    assert.equal(assessLine(round), "holding");
});

test("a faulty tower means requesting reinforcements", () => {
    const round = createRound(
        3,
        [
            { tower: "North", zombies: 10, ammo: 40 },
            { tower: "West", zombies: 5, ammo: 30 },
        ],
        ["East"],
    );
    assert.equal(assessLine(round), "requesting reinforcements");
});

test("with more zombies than ammo, the line is about to break", () => {
    const round = createRound(1, [
        { tower: "North", zombies: 50, ammo: 10 },
    ]);
    assert.equal(assessLine(round), "about to break");
});

test("with no reports at all, the line is about to break", () => {
    assert.equal(assessLine(createRound(0, [])), "about to break");
});

test("a fast tower delivers its report in time", async () => {
    const report = await withTimeLimit(
        new SimulatedTower("West", 20, 3, 15),
        100,
    );
    assert.deepEqual(report, { tower: "West", zombies: 3, ammo: 15 });
});

test("a slow tower is rejected with UnresponsiveTowerError", async () => {
    await assert.rejects(
        withTimeLimit(new SimulatedTower("North", 200, 5, 10), 50),
        UnresponsiveTowerError,
    );
});

test("collectReports puts each tower in its place", async () => {
    const round = await collectReports(
        [
            new SimulatedTower("North", 20, 6, 12),
            new SimulatedTower("East", 20, -1, 30),
            new SimulatedTower("West", 300, 4, 8),
        ],
        100,
    );
    assert.equal(round.towers, 3);
    assert.deepEqual(round.reports, [
        { tower: "North", zombies: 6, ammo: 12 },
    ]);
    assert.deepEqual(round.faulty, ["East"]);
    assert.deepEqual(round.unresponsive, ["West"]);
});
