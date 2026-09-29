// Exercise 12.1: Personal tool inventory.

type ToolCondition = "working" | "worn" | "broken";

type Tool = {
    readonly kind: string;
    durability: number;
    weight: number;
    assignedTo: string;
    condition: ToolCondition;
    notes?: string;
};

const knife: Tool = {
    kind: "survival knife",
    durability: 85,
    weight: 0.3,
    assignedTo: "Ana",
    condition: "working",
    notes: "Sharpened yesterday",
};

const radio: Tool = {
    kind: "portable radio",
    durability: 60,
    weight: 1.2,
    assignedTo: "Diego",
    condition: "working",
};

const backpack: Tool = {
    kind: "tactical backpack",
    durability: 25,
    weight: 2.5,
    assignedTo: "Julia",
    condition: "worn",
};

function evaluateTool(tool: Tool): void {
    const { kind, durability, weight, assignedTo, condition, notes } = tool;
    console.log(`${kind} (${assignedTo})`);
    console.log(`  Durability: ${durability} - Condition: ${condition}`);
    console.log(`  Weight: ${weight} kg`);
    console.log(`  Notes: ${notes ?? "No notes"}`);
}

// Returns a worn copy: the original tool doesn't change.
function useTool(
    tool: Tool,
    wear: number,
): Tool {
    const newDurability = Math.max(0, tool.durability - wear);

    let newCondition: ToolCondition = "working";
    if (newDurability === 0) {
        newCondition = "broken";
    } else if (newDurability < 30) {
        newCondition = "worn";
    }

    return {
        ...tool,
        durability: newDurability,
        condition: newCondition,
    };
}

console.log("=== PERSONAL TOOL INVENTORY ===");
console.log("Shelter gear log");

evaluateTool(knife);
evaluateTool(radio);
evaluateTool(backpack);

const usedRadio = useTool(radio, 75);

console.log("\nRadio after heavy use:");
evaluateTool(usedRadio);
console.log("\nThe original radio is still the same:");
evaluateTool(radio);
