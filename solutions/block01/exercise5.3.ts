// Exercise 5.3: Shelter evaluator.

// Features of the shelter you found.
let structureMaterial: string = "wood"; // "wood", "stone", "metal"
let areaMeters: number = 25; // Square meters.
let hasWater: boolean = true;
let hasRoof: boolean = true;
let overallCondition: string = "fair"; // "excellent", "good", "fair"...

let score: number = 0;

// Material.
if (structureMaterial === "stone" || structureMaterial === "metal") {
    score += 30;
} else if (structureMaterial === "wood") {
    score += 20;
} else {
    score += 10;
}

// Area.
if (areaMeters > 30) {
    score += 20;
} else if (areaMeters >= 20) {
    score += 15;
} else if (areaMeters >= 10) {
    score += 10;
} else {
    score += 5;
}

// Water and roof.
score += hasWater ? 15 : 0;
score += hasRoof ? 15 : 0;

// Overall condition.
if (overallCondition === "excellent") {
    score += 20;
} else if (overallCondition === "good") {
    score += 15;
} else if (overallCondition === "fair") {
    score += 10;
} else {
    score += 5;
}

// Recommendation based on the total score.
let recommendation: string = "";
if (score >= 80) {
    recommendation = "Ideal shelter - set up a permanent base";
} else if (score >= 60) {
    recommendation = "Good shelter - suitable for a long stay";
} else if (score >= 40) {
    recommendation = "Acceptable shelter - use temporarily";
} else {
    recommendation = "Unsuitable shelter - look for an alternative";
}

console.log("=== SHELTER EVALUATION ===");
console.log(`Score: ${score}/100`);
console.log(`Recommendation: ${recommendation}`);
