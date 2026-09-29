// Exercise 8.3: Shelter resource manager.

const WATER_LITERS_PER_PERSON_PER_DAY: number = 2.5;
const FOOD_KILOS_PER_PERSON_PER_DAY: number = 1;

let waterLiters: number = 96;
const foodKilos: number = 43.8;
const survivors: number = 6;

const dailyWaterConsumption = survivors * WATER_LITERS_PER_PERSON_PER_DAY;
const dailyFoodConsumption = survivors * FOOD_KILOS_PER_PERSON_PER_DAY;

// The resource that runs out first sets how long the shelter holds out.
function calculateSurvivalDays(water: number): number {
    const daysOfWater = Math.floor(water / dailyWaterConsumption);
    const daysOfFood = Math.floor(foodKilos / dailyFoodConsumption);
    return Math.min(daysOfWater, daysOfFood);
}

function classifySurvivalDays(days: number): string {
    if (days >= 7) {
        return "Optimal status";
    }
    if (days >= 3) {
        return "Caution - Plan an expedition";
    }
    return "CRITICAL! Urgent expedition";
}

console.log("=== SHELTER STATUS ===");
console.log(`Analyzing resources for ${survivors} survivors...`);
console.log(`Water: ${waterLiters.toLocaleString("es-ES")} liters`);
console.log(`Food: ${foodKilos.toLocaleString("es-ES")} kilos`);
console.log(
    `Daily consumption: ${dailyWaterConsumption.toFixed(1)} liters and ` +
    `${dailyFoodConsumption.toFixed(1)} kilos`
);

let survivalDays = calculateSurvivalDays(waterLiters);
console.log(
    `The shelter can hold out ${survivalDays} days. ` +
    classifySurvivalDays(survivalDays)
);

// Tonight it rains: the drums collect between 0 and 10 liters.
const rainLiters = Math.floor(Math.random() * 11);
waterLiters += rainLiters;
survivalDays = calculateSurvivalDays(waterLiters);

console.log(`\nThe rain leaves ${rainLiters} liters in the drums.`);
console.log(`Water: ${waterLiters.toLocaleString("es-ES")} liters`);
console.log(
    `The shelter can hold out ${survivalDays} days. ` +
    classifySurvivalDays(survivalDays)
);
