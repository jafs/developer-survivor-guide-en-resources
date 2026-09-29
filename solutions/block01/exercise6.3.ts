// Exercise 6.3: Emergency shelter search.

// Emergency situation: the horde is getting closer.
let remainingEnergy: number = 10;
let buildingsChecked: number = 0;
let shelterFound: boolean = false;

console.log("=== EMERGENCY SHELTER SEARCH ===");

for (let building = 1; building <= 12; building++) {
    // The multiples of 4 have a collapsed entrance.
    if (building % 4 === 0) {
        console.log(`Building ${building}: collapsed entrance, you skip it.`);
        continue;
    }

    remainingEnergy -= 2;
    buildingsChecked++;
    console.log(`Building ${building}: checked. Energy: ${remainingEnergy}`);

    if (Math.random() < 0.25) {
        shelterFound = true;
        console.log(`Building ${building} is safe. You barricade yourself in.`);
        break;
    }

    if (remainingEnergy <= 0) {
        console.log("You have no strength left to keep looking.");
        break;
    }
}

console.log(`Buildings checked: ${buildingsChecked}`);
console.log(`Shelter found: ${shelterFound}`);
