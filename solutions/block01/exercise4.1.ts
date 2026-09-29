// Exercise 4.1: Resource calculator.

// Initial state of the camp after three days of getting organized.
let totalWaterLiters: number = 45;
let totalFoodRations: number = 30;
let missionDays: number = 8;
let dailyWaterConsumption: number = 2; // Liters per day.
let dailyFoodConsumption: number = 1.5; // Rations per day.

// Days that each resource lasts on its own.
let daysOfWater: number = totalWaterLiters / dailyWaterConsumption;
let daysOfFood: number = totalFoodRations / dailyFoodConsumption;

// What you need for the whole mission.
let waterNeeded: number = dailyWaterConsumption * missionDays;
let foodNeeded: number = dailyFoodConsumption * missionDays;

// What you have minus what you need. If it's negative, you're short.
let waterDifference: number = totalWaterLiters - waterNeeded;
let foodDifference: number = totalFoodRations - foodNeeded;

// Percentage of each resource that you use up in a day.
let dailyWaterPercentage: number =
    (dailyWaterConsumption / totalWaterLiters) * 100;
let dailyFoodPercentage: number =
    (dailyFoodConsumption / totalFoodRations) * 100;

console.log("=== SHELTER RESOURCE ANALYSIS ===");
console.log(`The water lasts ${daysOfWater} days and the food, ${daysOfFood}.`);
console.log(`Water needed for ${missionDays} days: ${waterNeeded} liters.`);
console.log(`Food needed: ${foodNeeded} rations.`);
console.log(`Water difference: ${waterDifference} liters.`);
console.log(`Food difference: ${foodDifference} rations.`);
console.log(`Daily water use: ${dailyWaterPercentage.toFixed(2)}%`);
console.log(`Daily food use: ${dailyFoodPercentage.toFixed(2)}%`);
