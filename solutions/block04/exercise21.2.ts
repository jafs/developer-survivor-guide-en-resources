// Exercise 21.2: A drill for the earlier exercises.
// Run it with: deno test block04/exercise21.2.ts

import { test } from "node:test";
import assert from "node:assert/strict";

// === FROM EXERCISE 19.1 ===

function distributeDiesel(liters: number, generators: number): number {
    if (liters < 0) {
        throw new Error(`The liters can't be negative: ${liters}`);
    }
    if (!Number.isInteger(generators) || generators <= 0) {
        throw new Error(
            `The generators have to be an integer greater than 0: ${generators}`
        );
    }
    return liters / generators;
}

// === FROM EXERCISE 20.1 ===

function checkSection(
    section: string,
    milliseconds: number,
    hasTracks: boolean,
): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hasTracks) {
                reject(new Error(`Fresh tracks: ${section}`));
                return;
            }
            resolve(`All clear: ${section}`);
        }, milliseconds);
    });
}

// === DISTRIBUTION TESTS ===

test("120 liters among 4 generators is 30 for each one", () => {
    assert.equal(distributeDiesel(120, 4), 30);
});

test("distributing 0 liters gives 0 to each generator", () => {
    assert.equal(distributeDiesel(0, 2), 0);
});

test("negative liters are rejected", () => {
    assert.throws(() => distributeDiesel(-20, 3), /negative/);
});

test("0 generators are rejected", () => {
    assert.throws(() => distributeDiesel(50, 0), /integer greater than 0/);
});

test("2.5 generators are rejected", () => {
    assert.throws(() => distributeDiesel(60, 2.5), /integer greater than 0/);
});

// === PATROL TESTS ===

test("a section with no tracks is all clear", async () => {
    const report = await checkSection("south wall", 50, false);
    assert.equal(report, "All clear: south wall");
});

test("a section with tracks is rejected", async () => {
    // Bonus: without this await, the test finishes before the promise is
    // rejected. If the text you're looking for doesn't appear, this test
    // passes anyway and the failure shows up later: Deno blames another
    // test for it and Node.js, the file.
    await assert.rejects(
        checkSection("north wall", 50, true),
        /Fresh tracks: north wall/,
    );
});
