# Solutions for the Programming Guide for a Zombie Apocalypse

Here you'll find the solutions to every exercise and challenge in the *Programming Guide for a Zombie Apocalypse*.

> 🚧 **Work in progress.** The book is being translated from Spanish, and the solutions are added here as each chapter is translated.

## Before you look at a solution

Try each exercise first, even if you get stuck. If you've fought with it for a while and it still won't work, look at the solution, close it, and write the code again yourself from scratch.

Your solution doesn't have to match the one in this repository. If it does what the exercise asks, it's valid.

## Structure

```text
solutions/
├── block01/              Chapters 1 to 6 and challenge 1
│   ├── exercise1.1.ts    Exercise 1.1
│   ├── ...
│   └── challenge1.ts     Challenge 1
├── block02/              Chapters 7 to 12 and challenge 2
├── block03/              Chapters 13 to 18 and challenge 3
├── block04/              Chapters 19 to 21 and challenge 4
├── exercise-runner.ts    Solution runner
├── package.json
└── tsconfig.json
```

Each solution is a standalone file: you can open it, read it, and run it on its own.

## Solutions with tests

The solutions for exercises 21.1, 21.2, and 21.3, and the one for challenge 4, include their tests in the same file, written with `node:test`. With Deno, `deno test` checks the types and runs the tests:

```bash
deno test block04/exercise21.1.ts
```

With Node.js, use `node --test block04/exercise21.1.ts`. `deno run` doesn't run the tests, so in challenge 4 it only shows you the night itself: `deno run block04/challenge4.ts`.

## Running a solution with Deno (recommended)

This is how the book does it. With [Deno](https://deno.com) installed, you don't need anything else:

```bash
deno run block02/exercise7.1.ts
```

`deno run` doesn't check the types. To check them, use `deno check`:

```bash
deno check block02/exercise7.1.ts
```

## Running a solution with Node.js

You need [Node.js](https://nodejs.org) 22 or later. Install the dependencies once, from this folder:

```bash
npm install
```

Then you can use the solution runner:

```bash
npm start                  # Interactive mode: type 7.1, challenge2, or list.
npm start -- 7.1           # Runs exercise 7.1.
npm start -- challenge2    # Runs challenge 2.
npm run check              # Checks the types of every solution.
```

Recent versions of Node.js can run TypeScript directly with `node block01/exercise1.1.ts`, but they don't support `enum`, which some solutions use. That's why the runner uses [tsx](https://tsx.is).
