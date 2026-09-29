// Exercise 21.3: The infirmary fridge.
// Run it with: deno test block04/exercise21.3.ts

import { test } from "node:test";
import assert from "node:assert/strict";

// === FRIDGE MONITOR ===

interface Thermometer {
    readDegrees(): Promise<number>;
}

class FaultyThermometerError extends Error {
    public readonly reading: number;

    public constructor(reading: number) {
        super(`Impossible reading from the thermometer: ${reading} °C`);
        this.name = "FaultyThermometerError";
        this.reading = reading;
    }
}

const MIN_DEGREES = 2;
const MAX_DEGREES = 8;

class FridgeMonitor {
    private thermometer: Thermometer;

    public constructor(thermometer: Thermometer) {
        this.thermometer = thermometer;
    }

    public async check(): Promise<string> {
        const degrees = await this.thermometer.readDegrees();
        if (degrees < -60 || degrees > 80) {
            throw new FaultyThermometerError(degrees);
        }
        if (degrees < MIN_DEGREES) {
            return "too cold";
        }
        if (degrees > MAX_DEGREES) {
            return "too warm";
        }
        return "correct";
    }
}

// === TEST DOUBLE ===

class FakeThermometer implements Thermometer {
    private degrees: number;
    private readings: number = 0;

    public constructor(degrees: number) {
        this.degrees = degrees;
    }

    // Bonus: how many times the thermometer has been read.
    public get timesRead(): number {
        return this.readings;
    }

    public async readDegrees(): Promise<number> {
        this.readings++;
        return this.degrees;
    }
}

function monitorWith(degrees: number): FridgeMonitor {
    return new FridgeMonitor(new FakeThermometer(degrees));
}

// === TESTS ===

test("at 5 °C the fridge is correct", async () => {
    assert.equal(await monitorWith(5).check(), "correct");
});

test("at 1 °C the fridge is too cold", async () => {
    assert.equal(await monitorWith(1).check(), "too cold");
});

test("at 9 °C the fridge is too warm", async () => {
    assert.equal(await monitorWith(9).check(), "too warm");
});

test("the limits of 2 and 8 °C are included", async () => {
    assert.equal(await monitorWith(2).check(), "correct");
    assert.equal(await monitorWith(8).check(), "correct");
});

test("just outside the limits it's no longer correct", async () => {
    assert.equal(await monitorWith(1.9).check(), "too cold");
    assert.equal(await monitorWith(8.1).check(), "too warm");
});

test("a reading of -900 °C means a faulty thermometer", async () => {
    await assert.rejects(monitorWith(-900).check(), FaultyThermometerError);
});

test("check reads the thermometer only once", async () => {
    const thermometer = new FakeThermometer(4);
    await new FridgeMonitor(thermometer).check();
    assert.equal(thermometer.timesRead, 1);
});
