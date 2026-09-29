// Exercise 16.1: Combat specialists.

type Action = "attack" | "ability" | "assess";

abstract class CombatSpecialist {
    protected name: string;
    protected health: number = 100;
    protected energy: number = 100;
    protected experience: number = 0;

    public constructor(name: string) {
        this.name = name;
    }

    // Experience according to the action carried out.
    protected gainExperience(action: Action): void {
        switch (action) {
            case "attack":
                this.experience += 2;
                break;
            case "ability":
                this.experience += 4;
                break;
            case "assess":
                this.experience += 1;
                break;
        }
    }

    protected spendEnergy(amount: number): void {
        this.energy = Math.max(0, this.energy - amount);
    }

    public showStatus(): void {
        console.log(
            `${this.name} | Health: ${this.health} | ` +
            `Energy: ${this.energy} | Experience: ${this.experience}`
        );
    }

    public abstract attack(target: string): void;
    public abstract specialAbility(): void;
    public abstract assessSituation(): string;
}

class LongRangeSpecialist extends CombatSpecialist {
    public override attack(target: string): void {
        console.log(`${this.name} takes a precise shot at ${target}`);
        this.spendEnergy(10);
        this.gainExperience("attack");
    }

    public override specialAbility(): void {
        console.log(`${this.name} scouts the area from the tower`);
        this.spendEnergy(15);
        this.gainExperience("ability");
    }

    public override assessSituation(): string {
        this.gainExperience("assess");
        return `${this.name}: three targets within range in the yard`;
    }
}

class MedicalSpecialist extends CombatSpecialist {
    public override attack(target: string): void {
        console.log(`${this.name} holds ${target} back with the spear`);
        this.spendEnergy(8);
        this.gainExperience("attack");
    }

    public override specialAbility(): void {
        this.health = Math.min(100, this.health + 20);
        console.log(`${this.name} treats the wounded in the infirmary`);
        this.spendEnergy(20);
        this.gainExperience("ability");
    }

    public override assessSituation(): string {
        this.gainExperience("assess");
        return `${this.name}: two people lightly wounded, nobody seriously`;
    }
}

class ExplosivesSpecialist extends CombatSpecialist {
    public override attack(target: string): void {
        console.log(`${this.name} throws a charge at ${target}`);
        this.spendEnergy(12);
        this.gainExperience("attack");
    }

    public override specialAbility(): void {
        console.log(`${this.name} brings down the wall of corridor B`);
        this.spendEnergy(25);
        this.gainExperience("ability");
    }

    public override assessSituation(): string {
        this.gainExperience("assess");
        return `${this.name}: the west wing can take one more blast`;
    }
}

// Test it by creating a mixed team.
const team: CombatSpecialist[] = [
    new LongRangeSpecialist("Ana"),
    new MedicalSpecialist("Julia"),
    new ExplosivesSpecialist("Diego"),
];

team.forEach((specialist) => {
    specialist.attack("a runner zombie");
    specialist.specialAbility();
    console.log(specialist.assessSituation());
    specialist.showStatus();
});
