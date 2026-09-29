// Exercise 8.2: Sensor data processor.

// Totals that recordReading() will keep updating.
let validReadings: number = 0;
let faultyReadings: number = 0;
let temperatureSum: number = 0;

function recordReading(reading: string): void {
    // parseFloat() reads the number at the start and discards the rest.
    const temperature = parseFloat(reading);

    if (Number.isNaN(temperature)) {
        faultyReadings++;
        console.log(`"${reading}": faulty sensor`);
        return;
    }

    validReadings++;
    temperatureSum += temperature;
    console.log(`"${reading}": ${temperature.toFixed(1)} degrees`);
}

console.log("=== SENSOR REPORT ===");
console.log("Processing the readings from the temperature sensors...");

recordReading("23.7");
recordReading("error");
recordReading("18.5 degrees");
recordReading("no signal");
recordReading("21.3");
recordReading("");
recordReading("-2.8");

console.log(`Valid readings: ${validReadings}`);
console.log(`Faulty readings: ${faultyReadings}`);

// Edge case: with no valid readings there's no average.
if (validReadings === 0) {
    console.log("No valid readings: the average can't be calculated.");
} else {
    const average = temperatureSum / validReadings;
    console.log(`Average temperature: ${average.toFixed(1)} degrees`);
}
