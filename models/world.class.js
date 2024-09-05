class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    throwableObject = [];
    coins = [];
    collectedCoins = 0;
    bottles = [];
    collectedBottles = 0;
    game_sound = new Audio('audio/taratata.mp3');

    collect_sound = new Audio('audio/collect-coin.mp3');
    chicken_dead_sound = new Audio('audio/chicken-sound.mp3');
    win_sound = new Audio('audio/win-sound.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    small_chicken_dead = new Audio('audio/chicken-dead.mp3');


    bottlesStatusBar = new BottlesStatusBar();
    coinsStatusBar = new CoinsStatusbar();
    endbossStatusBar = new EndbossStatusBar();
    statusBar = new Statusbar();

    isGameOver = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level1;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.bottles = this.level.bottles;
        this.coins = this.level.coins;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.collectedBottles--;
            this.bottlesStatusBar.setPercentage((this.collectedBottles / 5) * 100);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead) return;

            if (this.character.isColliding(enemy)) {
                this.handleCharacterEnemyCollision(enemy);
            }
        });

        this.throwableObject.forEach((bottle, bottleIndex) => {
            const endboss = this.level.enemies.find(e => e instanceof Endboss);

            if (endboss && endboss.isColliding(bottle)) {
                endboss.hit();

                this.throwableObject.splice(bottleIndex, 1);
                this.bottle_sound.play();
            }

            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.handleBottleEnemyCollision(bottleIndex, enemy);
                }
            });
        });
    }

    handleCharacterEnemyCollision(enemy) {
        const isCharacterAboveEnemy = this.character.y + this.character.height < enemy.y + enemy.height;

        if (isCharacterAboveEnemy || this.isDead) {
            this.small_chicken_dead.play();
            enemy.changeToDeadImage();
            this.character.jump()
        } else {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    handleBottleEnemyCollision(bottleIndex, enemy) {
        this.bottle_sound.play();
        this.throwableObject.splice(bottleIndex, 1);
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            enemy.changeToDeadImage();
            this.small_chicken_dead.play();
        }
        if (enemy instanceof Endboss) {
            enemy.playAnimation(enemy.IMAGES_HURT);
            this.chicken_dead_sound.play();
        }
    }

    collectCoin() {
        if (this.collectedCoins < 5) {
            this.collectedCoins += 1;
            this.coinsStatusBar.setPercentage((this.collectedCoins / 5) * 100);
            this.collect_sound.play();
        }
    }

    checkCoinCollisions() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin();
                this.coins.splice(index, 1);
            }
        });
    }

    collectBottle() {
        if (this.collectedBottles < 5) {
            this.collectedBottles += 1;
            this.bottlesStatusBar.setPercentage((this.collectedBottles / 5) * 100);
        }
    }

    checkBottleCollisions() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                if (this.collectedBottles < 5) {
                    this.collectBottle();
                    this.bottles.splice(index, 1);
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsStatusBar);
        this.addToMap(this.bottlesStatusBar);
        this.addToMap(this.endbossStatusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    clearGameObjects() {
        this.level.enemies = [];
        this.coins = [];
        this.bottles = [];
        this.throwableObject = [];
        this.level.character = [];
    }

}