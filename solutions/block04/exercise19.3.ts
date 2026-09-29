// Exercise 19.3: Tower reports.

class UnreadableReportError extends Error {
    public readonly line: string;

    public constructor(line: string, reason: string) {
        super(`Unreadable report "${line}": ${reason}`);
        this.name = "UnreadableReportError";
        this.line = line;
    }
}

type TowerReport = {
    tower: string;
    temperature: number;
};

const MIN_TEMPERATURE = -60;
const MAX_TEMPERATURE = 80;

function parseReport(line: string): TowerReport | null {
    // A tower sending no report is normal: it isn't an error.
    if (line.trim() === "") {
        return null;
    }

    const parts = line.split(";");
    if (parts.length !== 2) {
        throw new UnreadableReportError(line, "expected tower and degrees");
    }

    const tower = parts[0].trim();
    const degreesText = parts[1].trim();
    if (tower === "") {
        throw new UnreadableReportError(line, "the tower name is missing");
    }

    // Number("") gives 0, so empty degrees are rejected first.
    const temperature = Number(degreesText);
    if (degreesText === "" || Number.isNaN(temperature)) {
        throw new UnreadableReportError(line, "the degrees aren't a number");
    }
    if (temperature < MIN_TEMPERATURE || temperature > MAX_TEMPERATURE) {
        throw new UnreadableReportError(
            line,
            `${temperature} °C is not possible`
        );
    }

    return { tower: tower, temperature: temperature };
}

function summarizeNight(lines: string[]): void {
    const valid: TowerReport[] = [];
    let empty = 0;
    let unreadable = 0;

    for (const line of lines) {
        try {
            const report = parseReport(line);
            if (report === null) {
                empty++;
            } else {
                valid.push(report);
            }
        } catch (error) {
            // An unreadable report is the only thing we know how to handle.
            if (!(error instanceof UnreadableReportError)) {
                throw error;
            }
            unreadable++;
            console.log(error.message);
        }
    }

    console.log(
        `Valid reports: ${valid.length}. ` +
        `Empty: ${empty}. Unreadable: ${unreadable}`
    );

    if (valid.length === 0) {
        console.log("No valid report has arrived");
        return;
    }

    let coldest = valid[0];
    for (const report of valid) {
        if (report.temperature < coldest.temperature) {
            coldest = report;
        }
    }
    console.log(
        `Lowest temperature: ${coldest.temperature} °C ` +
        `at the ${coldest.tower} tower`
    );
}

const nightReports: string[] = [
    "North;-3",
    "East;-900",
    "",
    "South;-2.5",
    "West;-4;-5",
    "North;minus five",
    "   ",
    "South;",
    "East;-1",
];

console.log("=== REPORTS OF THE NIGHT ===");
summarizeNight(nightReports);

console.log("\n=== NIGHT WITH NO REPORTS ===");
summarizeNight([]);
