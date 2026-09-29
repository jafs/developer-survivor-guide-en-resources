// Exercise 4.3: Survival logic.

// Current conditions.
let generatorWorking: boolean = true;
let perimeterSafe: boolean = true;
let stableWeather: boolean = false;
let radioWorking: boolean = true;
let availableRations: number = 6;
let fuelLiters: number = 9;
let signalZoneSafe: boolean = false;

// Details of the trip to the source of the signal.
let hoursAway: number = 8;
let generatorConsumptionPerHour: number = 1; // Liters per hour.

let canGoOut: boolean =
    perimeterSafe && (stableWeather || radioWorking);
let shelterInCriticalMode: boolean =
    !generatorWorking || availableRations < 3;
let enoughFuel: boolean =
    fuelLiters >= hoursAway * generatorConsumptionPerHour;
let worthInvestigating: boolean =
    canGoOut &&
    !shelterInCriticalMode &&
    enoughFuel &&
    (signalZoneSafe || availableRations >= 4);

console.log("=== DISTRESS SIGNAL ANALYSIS ===");
console.log(`You can go out: ${canGoOut}`);
console.log(`Shelter in critical mode: ${shelterInCriticalMode}`);
console.log(`Enough fuel: ${enoughFuel}`);
console.log(`Worth investigating: ${worthInvestigating}`);
