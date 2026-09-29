// Exercise 21.1: Days of food.
// Run it with: deno test block04/exercise21.1.ts

import { test } from "node:test";
import assert from "node:assert/strict";

const RATIONS_PER_PERSON_PER_DAY = 3;

// Fixed version. The original divided by 0 when there was nobody:
// return Math.floor(rations / (people * 3));
function daysOfFood(rations: number, people: number): number {
    // Bonus: negative data is a mistake by whoever wrote it down.
    if (rations < 0 || people < 0) {
        throw new Error(`Impossible data: ${rations} rations, ` +
            `${people} people`);
    }
    if (people === 0) {
        return 0;
    }
    return Math.floor(rations / (people * RATIONS_PER_PERSON_PER_DAY));
}

test("with 60 rations, 5 people eat for 4 days", () => {
    assert.equal(daysOfFood(60, 5), 4);
});

test("if the rations don't cover a full day, it's 0 days", () => {
    assert.equal(daysOfFood(14, 5), 0);
});

test("with no rations there are no days of food", () => {
    assert.equal(daysOfFood(0, 5), 0);
});

test("with nobody in the prison, the function returns 0", () => {
    assert.equal(daysOfFood(60, 0), 0);
});

test("negative rations throw an error", () => {
    assert.throws(() => daysOfFood(-10, 5), /Impossible data/);
});

test("negative people throw an error", () => {
    assert.throws(() => daysOfFood(60, -2), /Impossible data/);
});
