class Level {
    enemies;
    clouds;
    bottles;
    backgroundObjects;
    level_end_x = 8000;
    coins;

    constructor(enemies, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins,
        this.backgroundObjects = backgroundObjects;
    }
}