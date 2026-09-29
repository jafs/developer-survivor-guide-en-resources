// Exercise 13.1: Your first zombie class.

class BasicZombie {
    type: string;
    health: number;
    speed: number;

    constructor(type: string, speed: number) {
        this.type = type;
        this.speed = speed;
        // Random health between 80 and 100: 21 possible values.
        this.health = Math.floor(Math.random() * 21) + 80;
    }

    growl(): void {
        console.log(`${this.type}: Grrraaaah!`);
    }

    takeDamage(amount: number): void {
        this.health = Math.max(0, this.health - amount);
    }

    showInfo(): void {
        console.log(
            `${this.type} | Health: ${this.health} | ` +
            `Speed: ${this.speed}`
        );
    }
}

const walker = new BasicZombie("Walker", 2);
walker.growl();
walker.takeDamage(30);
walker.showInfo();

const sprinter = new BasicZombie("Sprinter", 8);
sprinter.growl();
sprinter.takeDamage(120); // The health stays at 0.
sprinter.showInfo();
