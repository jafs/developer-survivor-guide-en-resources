// Exercise 16.2: Modular equipment system.

interface Activatable {
    turnOn(): void;
    turnOff(): void;
    getStatus(): string;
}

interface Reloadable {
    reload(amount: number): void;
    getLevel(): number;
}

class Spotlight implements Activatable {
    private isOn: boolean = false;

    public turnOn(): void {
        this.isOn = true;
    }

    public turnOff(): void {
        this.isOn = false;
    }

    public getStatus(): string {
        return `Spotlight: ${this.isOn ? "on" : "off"}`;
    }
}

class AutomaticTurret implements Activatable, Reloadable {
    private isOn: boolean = false;
    private ammo: number = 0;

    public turnOn(): void {
        if (this.ammo === 0) {
            console.log("Turret: no ammo, it stays off");
            return;
        }
        this.isOn = true;
    }

    public turnOff(): void {
        this.isOn = false;
    }

    public getStatus(): string {
        return `Turret: ${this.isOn ? "on" : "off"}`;
    }

    public reload(amount: number): void {
        this.ammo += amount;
    }

    public getLevel(): number {
        return this.ammo;
    }
}

class AuxiliaryBattery implements Reloadable {
    private static readonly MAX_CHARGE = 100;
    private charge: number = 90;

    public reload(amount: number): void {
        this.charge = Math.min(
            AuxiliaryBattery.MAX_CHARGE,
            this.charge + amount,
        );
    }

    public getLevel(): number {
        return this.charge;
    }
}

class CentralControl {
    private devices: (Activatable | Reloadable)[] = [];

    public register(device: Activatable | Reloadable): void {
        this.devices.push(device);
    }

    public activateAll(): void {
        for (const device of this.devices) {
            // Interfaces don't exist at runtime: we check for the method.
            if ("turnOn" in device) {
                device.turnOn();
            }
        }
    }

    public reloadAll(amount: number): void {
        for (const device of this.devices) {
            if ("reload" in device) {
                device.reload(amount);
            }
        }
    }

    public showStatus(): void {
        console.log("--- Device status ---");
        for (const device of this.devices) {
            if ("getStatus" in device) {
                console.log(device.getStatus());
            }
            if ("getLevel" in device) {
                console.log(`  Level: ${device.getLevel()}`);
            }
        }
    }
}

const control = new CentralControl();
control.register(new Spotlight());
control.register(new AutomaticTurret());
control.register(new AuxiliaryBattery());

control.activateAll();
control.showStatus();

control.reloadAll(20);
control.activateAll();
control.showStatus();
