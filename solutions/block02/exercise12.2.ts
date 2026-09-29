// Exercise 12.2: Zombie threat classifier.

enum ZombieType {
    WALKER = "walker",
    RUNNER = "runner",
    MUTANT = "mutant",
}

const zombieDescriptions: Map<ZombieType, string> = new Map([
    [ZombieType.WALKER, "Moves slowly, very strong"],
    [ZombieType.RUNNER, "Very fast, about as strong as a human"],
    [ZombieType.MUTANT, "Variable speed, far too strong"],
]);

function identifyThreat(zombieType: ZombieType): string {
    return zombieDescriptions.get(zombieType) ?? "Unclassified threat";
}

console.log("=== ZOMBIE THREAT CLASSIFIER ===");
console.log("Identification system for defensive patrols");

console.log(`Walker: ${identifyThreat(ZombieType.WALKER)}`);
console.log(`Runner: ${identifyThreat(ZombieType.RUNNER)}`);
console.log(`Mutant: ${identifyThreat(ZombieType.MUTANT)}`);

// Sighting that a patrol reports over the radio.
const sighting = {
    zombieType: ZombieType.RUNNER,
    description: identifyThreat(ZombieType.RUNNER),
    zone: "north gate",
};
const radioMessage = JSON.stringify(sighting);
console.log(`\nSending over the radio: ${radioMessage}`);

// Another patrol receives the message. JSON.parse() returns any, so we
// state the shape we expect.
const receivedSighting: { zone: string } = JSON.parse(radioMessage);
console.log(`Sighting received at: ${receivedSighting.zone}`);
