// Solution runner for the Programming Guide for a Zombie Apocalypse.
//
// Usage:
//   npm start                  Interactive mode.
//   npm start -- 7.1           Runs the solution to exercise 7.1.
//   npm start -- challenge2    Runs the solution to challenge 2.

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";

const SOLUTIONS_FOLDER = import.meta.dirname;

// Block folders in order: block01, block02...
function listBlocks(): string[] {
    return readdirSync(SOLUTIONS_FOLDER)
        .filter((name) => /^block\d+$/.test(name))
        .sort();
}

// Looks for a solution file in every block folder.
function findSolution(fileName: string): string | undefined {
    for (const block of listBlocks()) {
        const path = join(SOLUTIONS_FOLDER, block, fileName);
        if (existsSync(path)) {
            return path;
        }
    }
    return undefined;
}

// Sorts "7.1", "10.2"... by chapter and then by exercise.
function compareExercises(first: string, second: string): number {
    const [chapterA, exerciseA] = first.split(".").map(Number);
    const [chapterB, exerciseB] = second.split(".").map(Number);
    return chapterA - chapterB || exerciseA - exerciseB;
}

function showList(): void {
    const blocks = listBlocks();
    if (blocks.length === 0) {
        console.log("\nThere are no solutions yet.");
        return;
    }

    console.log("\nAvailable solutions:");
    for (const block of blocks) {
        const fileNames = readdirSync(join(SOLUTIONS_FOLDER, block));
        const exercises = fileNames
            .filter((fileName) => /^exercise\d+\.\d+\.ts$/.test(fileName))
            .map((fileName) =>
                fileName.replace("exercise", "").replace(".ts", ""),
            )
            .sort(compareExercises);
        const challenges = fileNames
            .filter((fileName) => /^challenge\d+\.ts$/.test(fileName))
            .map((fileName) => fileName.replace(".ts", ""));

        console.log(`\n${block}`);
        console.log(`  Exercises: ${exercises.join(", ")}`);
        console.log(`  Challenge: ${challenges.join(", ")}`);
    }
}

// Turns what you type ("7.1", "challenge2") into the solution file.
function getFileName(command: string): string | undefined {
    const exercise = command.match(/^(\d+\.\d+)$/);
    if (exercise !== null) {
        return `exercise${exercise[1]}.ts`;
    }
    const challenge = command.match(/^challenge\s*(\d+)$/);
    if (challenge !== null) {
        return `challenge${challenge[1]}.ts`;
    }
    return undefined;
}

function run(command: string): void {
    const fileName = getFileName(command);
    if (fileName === undefined) {
        console.log(
            `I don't understand "${command}". Try 7.1 or challenge2.`,
        );
        return;
    }

    const path = findSolution(fileName);
    if (path === undefined) {
        console.log(`There is no solution for "${command}".`);
        return;
    }

    console.log(`\n--- ${fileName} ---`);
    // Node loads tsx to run TypeScript, including the solutions with enum.
    spawnSync(process.execPath, ["--import", "tsx", path], {
        stdio: "inherit",
    });
    console.log(`--- End of ${fileName} ---`);
}

async function interactiveMode(): Promise<void> {
    console.log("Solution runner");
    console.log("Programming Guide for a Zombie Apocalypse");
    console.log("Type 7.1 for an exercise, challenge2 for a challenge,");
    console.log("list to see every solution, or exit to quit.");

    const terminal = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "\n> ",
    });

    terminal.prompt();
    // The loop receives every line you type, without losing any.
    for await (const line of terminal) {
        const command = line.trim().toLowerCase();
        if (command === "exit") {
            break;
        }
        if (command === "list") {
            showList();
        } else if (command !== "") {
            run(command);
        }
        terminal.prompt();
    }
    terminal.close();
}

const argument = process.argv[2];
if (argument === undefined) {
    await interactiveMode();
} else {
    run(argument.toLowerCase());
}
