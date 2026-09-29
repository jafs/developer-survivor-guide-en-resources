// Exercise 4.2: Early warning system.

// Current sensor readings during the storm.
let temperature: number = -12;
let windKmh: number = 35;
let visibilityMeters: number = 150;
let fuelLevel: number = 18; // Percentage.
let currentHour: number = 22;

// One alert for each threshold.
let dangerousTemperature: boolean = temperature < -10;
let extremeWind: boolean = windKmh > 40;
let criticalVisibility: boolean = visibilityMeters < 100;
let fuelInReserve: boolean = fuelLevel < 20;
let highRiskHours: boolean = currentHour >= 21;

// Combined results.
let anyAlert: boolean = dangerousTemperature || extremeWind ||
    criticalVisibility || fuelInReserve || highRiskHours;
let immediateEvacuation: boolean =
    (dangerousTemperature && extremeWind) ||
    (fuelInReserve && highRiskHours);

console.log("=== EMERGENCY ALERT SYSTEM ===");
console.log(`Dangerous temperature: ${dangerousTemperature}`);
console.log(`Extreme wind: ${extremeWind}`);
console.log(`Critical visibility: ${criticalVisibility}`);
console.log(`Fuel in reserve: ${fuelInReserve}`);
console.log(`High-risk hours: ${highRiskHours}`);
console.log(`At least one alert is active: ${anyAlert}`);
console.log(`Immediate evacuation: ${immediateEvacuation}`);
