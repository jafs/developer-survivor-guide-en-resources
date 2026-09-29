// Exercise 17.1: New equipment without touching the manager.

// === FROM THE CHAPTER, UNCHANGED ===

interface Usable {
    use(user: string): void;
}

class FirstAidKit implements Usable {
    public use(user: string): void {
        console.log(`${user} gives first aid`);
    }
}

class EquipmentManager {
    private equipment: Usable[] = [];

    public addEquipment(item: Usable): void {
        this.equipment.push(item);
    }

    public useAllEquipment(user: string): void {
        console.log(`${user} using all the available equipment:`);
        this.equipment.forEach((item) => item.use(user));
    }
}

// === NEW CLASSES ===

class LongRangeRadio implements Usable {
    private battery: number = 100;

    public use(user: string): void {
        if (this.battery < 40) {
            console.log(`${user}: the radio has no battery left to transmit`);
            return;
        }
        this.battery -= 40;
        console.log(`${user} transmits by radio. Battery: ${this.battery}%`);
    }
}

class PortableGenerator implements Usable {
    private fuelLiters: number = 2;

    public use(user: string): void {
        if (this.fuelLiters === 0) {
            console.log(`${user}: the generator won't start, no fuel`);
            return;
        }
        this.fuelLiters--;
        console.log(
            `${user} starts the generator. ` +
            `${this.fuelLiters} liters left`
        );
    }
}

const controlRoomManager = new EquipmentManager();
controlRoomManager.addEquipment(new LongRangeRadio());
controlRoomManager.addEquipment(new PortableGenerator());
controlRoomManager.addEquipment(new FirstAidKit());

controlRoomManager.useAllEquipment("Diego");
controlRoomManager.useAllEquipment("Ana");
controlRoomManager.useAllEquipment("Marcos");
