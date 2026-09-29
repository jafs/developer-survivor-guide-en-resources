// Exercise 15.2: Singleton inventory manager.

class InventoryManager {
    private static instance: InventoryManager | null = null;

    private inventory: Map<string, number>;

    // Private constructor: nobody can use new from outside.
    private constructor() {
        this.inventory = new Map();
    }

    public static getInstance(): InventoryManager {
        if (InventoryManager.instance === null) {
            InventoryManager.instance = new InventoryManager();
        }
        return InventoryManager.instance;
    }

    public addResource(resource: string, quantity: number): void {
        const current = this.checkAvailability(resource);
        this.inventory.set(resource, current + quantity);
    }

    public consumeResource(resource: string, quantity: number): boolean {
        const available = this.checkAvailability(resource);
        if (quantity > available) {
            return false;
        }
        this.inventory.set(resource, available - quantity);
        return true;
    }

    public checkAvailability(resource: string): number {
        return this.inventory.get(resource) ?? 0;
    }

    public generateReport(): void {
        console.log("=== INVENTORY ===");
        for (const [resource, quantity] of this.inventory) {
            console.log(`${resource}: ${quantity}`);
        }
    }
}

console.log("=== CENTRALIZED INVENTORY MANAGER ===");

// Three people get the manager separately.
const anaManager = InventoryManager.getInstance();
const diegoManager = InventoryManager.getInstance();
const juliaManager = InventoryManager.getInstance();

anaManager.addResource("bullets", 360);

const anaHandout = anaManager.consumeResource("bullets", 150);
const diegoHandout = diegoManager.consumeResource("bullets", 150);
const juliaHandout = juliaManager.consumeResource("bullets", 150);
console.log(`Ana hands out 150: ${anaHandout}`);
console.log(`Diego hands out 150: ${diegoHandout}`);
console.log(`Julia hands out 150: ${juliaHandout}`);

const sameManager = anaManager === diegoManager &&
    diegoManager === juliaManager;
console.log(`All three use the same manager: ${sameManager}`);

juliaManager.generateReport();
