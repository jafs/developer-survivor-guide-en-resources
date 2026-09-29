// Exercise 7.1: Survival calculator.

const WATER_LITERS_PER_PERSON_PER_DAY: number = 2.5;
const RATIONS_PER_PERSON_PER_DAY: number = 3;

// Full days that the water lasts.
function calculateDaysOfWater(people: number, waterLiters: number): number {
    if (people === 0) {
        return 0;
    }
    const dailyConsumption = people * WATER_LITERS_PER_PERSON_PER_DAY;
    return Math.floor(waterLiters / dailyConsumption);
}

// Full days that the food lasts.
function calculateDaysOfFood(people: number, rations: number): number {
    if (people === 0) {
        return 0;
    }
    const dailyConsumption = people * RATIONS_PER_PERSON_PER_DAY;
    return Math.floor(rations / dailyConsumption);
}

// The resource that runs out first decides how long you can hold out.
const calculateSurvivalDays = (
    daysOfWater: number,
    daysOfFood: number,
): number => daysOfWater < daysOfFood ? daysOfWater : daysOfFood;

console.log("=== SURVIVAL CALCULATOR ===");

// Current data from the shelter, to run the tests.
const numberOfSurvivors: number = 6;
const availableWater: number = 97.5;
const availableRations: number = 67;

const daysOfWater = calculateDaysOfWater(numberOfSurvivors, availableWater);
const daysOfFood = calculateDaysOfFood(
    numberOfSurvivors,
    availableRations,
);
const survivalDays = calculateSurvivalDays(daysOfWater, daysOfFood);

console.log(`With ${numberOfSurvivors} survivors in the shelter:`);
console.log(`- The water lasts ${daysOfWater} days.`);
console.log(`- The food lasts ${daysOfFood} days.`);
console.log(`- You can really hold out for ${survivalDays} days.`);

// Edge case: nobody in the shelter.
console.log(`With no survivors: ${calculateDaysOfWater(0, 50)} days.`);
