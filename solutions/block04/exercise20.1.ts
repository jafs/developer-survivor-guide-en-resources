// Exercise 20.1: Night patrol.

type Section = [string, number, boolean];

function checkSection(
    section: string,
    milliseconds: number,
    hasTracks: boolean,
): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hasTracks) {
                reject(new Error(`Fresh tracks: ${section}`));
                return;
            }
            resolve(`All clear: ${section}`);
        }, milliseconds);
    });
}

async function nightPatrol(sections: Section[]): Promise<void> {
    const start = Date.now();
    try {
        for (const [section, milliseconds, hasTracks] of sections) {
            const report = await checkSection(
                section,
                milliseconds,
                hasTracks,
            );
            console.log(report);
        }
        console.log("Patrol complete");
    } catch (error) {
        const reason = error instanceof Error ? error.message : "unknown";
        console.log(`ALERT: ${reason}. The patrol stops here`);
    } finally {
        const duration = Math.round((Date.now() - start) / 100) * 100;
        console.log(`The patrol lasted about ${duration} ms`);
    }
}

console.log("=== YARD SECTION ===");
await checkSection("yard", 200, false)
    .then((report) => console.log(report))
    .catch((error) => console.log(`ALERT: ${error.message}`));

console.log("\n=== PATROL WITH TRACKS ===");
const tonightsSections: Section[] = [
    ["south wall", 300, false],
    ["east wall", 200, false],
    ["north wall", 400, true],
    ["west wall", 300, false],
];
await nightPatrol(tonightsSections);

console.log("\n=== QUIET PATROL ===");
await nightPatrol([
    ["south wall", 200, false],
    ["west wall", 300, false],
]);
