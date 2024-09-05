class Level {
    enemies;
    clouds;
    bottles;
    backgroundObjects;
    level_end_x = 8000;

    constructor(enemies, clouds, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}