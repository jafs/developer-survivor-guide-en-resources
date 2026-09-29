// Exercise 19.2: Inspecting the generator room.

type PowerGenerator = {
    name: string;
    liters: number;
    engineTemperature: number;
};

class OutOfDieselError extends Error {
    public readonly generator: string;

    public constructor(generator: string) {
        super(`The ${generator} generator is out of diesel`);
        this.name = "OutOfDieselError";
        this.generator = generator;
    }
}

class FrozenEngineError extends Error {
    public readonly generator: string;
    public readonly temperature: number;

    public constructor(generator: string, temperature: number) {
        super(`The engine of the ${generator} generator is frozen`);
        this.name = "FrozenEngineError";
        this.generator = generator;
        this.temperature = temperature;
    }
}

const MIN_ENGINE_TEMPERATURE = -10;

function startGenerator(generator: PowerGenerator): void {
    if (generator.liters <= 0) {
        throw new OutOfDieselError(generator.name);
    }
    if (generator.engineTemperature < MIN_ENGINE_TEMPERATURE) {
        throw new FrozenEngineError(
            generator.name,
            generator.engineTemperature
        );
    }
    console.log(`${generator.name} generator running`);
}

function inspectRoom(generators: PowerGenerator[]): void {
    console.log("Room light on");
    let started = 0;

    try {
        for (const generator of generators) {
            try {
                startGenerator(generator);
                started++;
            } catch (error) {
                // Only the lack of diesel is handled. The rest carries on.
                if (!(error instanceof OutOfDieselError)) {
                    throw error;
                }
                console.log(`${error.message}. Moving on to the next one`);
            }
        }
    } finally {
        console.log(`Room light off. Generators running: ${started}`);
    }
}

const generatorRoom: PowerGenerator[] = [
    { name: "Main", liters: 40, engineTemperature: 2 },
    { name: "Auxiliary", liters: 0, engineTemperature: 1 },
    { name: "Towers", liters: 25, engineTemperature: -14 },
    { name: "Infirmary", liters: 30, engineTemperature: 3 },
];

try {
    inspectRoom(generatorRoom);
} catch (error) {
    if (error instanceof FrozenEngineError) {
        console.log(
            `Inspection interrupted at the ${error.generator} generator: ` +
            `engine at ${error.temperature} °C`
        );
    } else {
        console.log("Inspection interrupted by an unexpected error:", error);
    }
}
