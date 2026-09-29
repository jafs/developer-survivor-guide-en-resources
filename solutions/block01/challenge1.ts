// Challenge 1: 7-day survival simulator.
// It only uses what block 1 covers: variables, operators, conditionals,
// and loops.

// Basic daily consumption to stay alive.
const DAILY_WATER_CONSUMPTION: number = 2;
const DAILY_FOOD_CONSUMPTION: number = 1;
const DAILY_ENERGY_CONSUMPTION: number = 15;

// Energy cost of each activity.
const WATER_SEARCH_ENERGY: number = 5;
const FOOD_SEARCH_ENERGY: number = 8;

// Rest and energy limit.
const MIN_REST_ENERGY: number = 20;
const MAX_ENERGY: number = 100;

// Chances of success.
const WATER_FIND_PROBABILITY: number = 0.4; // 40% success.
const FOOD_FIND_PROBABILITY: number = 0.5; // 50% success.

// Initial state.
let availableWater: number = 8;
let availableFood: number = 5;
let currentEnergy: number = 100;
let daysSurvived: number = 0;

console.log("=== SURVIVAL SIMULATOR: 7 CRITICAL DAYS ===");
console.log(
    "The city has fallen. Hold out for 7 days until the rescue convoy arrives."
);
console.log("");
console.log("=== INITIAL SITUATION ===");
console.log(`- Available water: ${availableWater} liters`);
console.log(`- Available food: ${availableFood} rations`);
console.log(`- Current energy: ${currentEnergy}/${MAX_ENERGY}`);

for (let day = 1; day <= 7; day++) {
    console.log("");
    console.log(`--- DAY ${day} ---`);

    // If any resource has run out, the simulation ends.
    if (availableWater <= 0) {
        console.log("You died of dehydration.");
        break;
    }
    if (availableFood <= 0) {
        console.log("You died of hunger.");
        break;
    }
    if (currentEnergy <= 0) {
        console.log("You died of exhaustion.");
        break;
    }

    console.log("You wake up at dawn. Another day ahead...");

    // Look for water if there are fewer than 3 liters left.
    if (availableWater < 3) {
        let waterFound: boolean = false;
        while (!waterFound && currentEnergy >= WATER_SEARCH_ENERGY) {
            currentEnergy -= WATER_SEARCH_ENERGY;
            if (Math.random() < WATER_FIND_PROBABILITY) {
                // From 2 to 5 liters: 4 possible values, starting at 2.
                let liters: number = Math.floor(Math.random() * 4) + 2;
                availableWater += liters;
                waterFound = true;
                console.log(`You find ${liters} liters of water.`);
            } else {
                console.log("You look for water with no luck.");
            }
        }
    } else {
        console.log(
            `You have enough water (${availableWater} liters). ` +
            "No need to look for more."
        );
    }

    // Look for food if there are fewer than 2 rations left.
    if (availableFood < 2) {
        let foodFound: boolean = false;
        while (!foodFound && currentEnergy >= FOOD_SEARCH_ENERGY) {
            currentEnergy -= FOOD_SEARCH_ENERGY;
            if (Math.random() < FOOD_FIND_PROBABILITY) {
                // From 1 to 3 rations: 3 possible values, starting at 1.
                let rations: number = Math.floor(Math.random() * 3) + 1;
                availableFood += rations;
                foodFound = true;
                console.log(`You find ${rations} rations of food.`);
            } else {
                console.log("You look for food with no luck.");
            }
        }
    } else {
        console.log(
            `You have enough food (${availableFood} rations). ` +
            "No need to look for more."
        );
    }

    // Rest: between 20 and 30 points, without going over the maximum.
    console.log("Time to rest and get your energy back...");
    let energyBefore: number = currentEnergy;
    currentEnergy += Math.floor(Math.random() * 11) + MIN_REST_ENERGY;
    if (currentEnergy > MAX_ENERGY) {
        currentEnergy = MAX_ENERGY;
    }
    let energyRecovered: number = currentEnergy - energyBefore;
    console.log(`You recovered ${energyRecovered} energy points`);

    // Consumption at the end of the day.
    console.log("At the end of the day, you use up your daily resources...");
    availableWater -= DAILY_WATER_CONSUMPTION;
    availableFood -= DAILY_FOOD_CONSUMPTION;
    currentEnergy -= DAILY_ENERGY_CONSUMPTION;

    console.log(`Status at the end of day ${day}:`);
    console.log(`  - Water: ${availableWater} liters`);
    console.log(`  - Food: ${availableFood} rations`);
    console.log(`  - Energy: ${currentEnergy}/${MAX_ENERGY}`);

    daysSurvived++;
}

console.log("");
console.log("=== END OF THE SIMULATION ===");
if (daysSurvived === 7) {
    console.log("You held out for 7 days. The rescue convoy picks you up.");
} else {
    console.log(`You survived ${daysSurvived} days out of 7.`);
}
