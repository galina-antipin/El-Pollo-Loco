class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    coinsStatusBar = new CoinsStatusbar();
    throwableObject = [];
    game_sound = new Audio('audio/taratata.mp3');
    coins = [];
    collectedCoins = 0;
    collect_sound = new Audio('audio/collect-coin.mp3');
    bottles = [];
    collectedBottles = 0;
    bottlesStatusBar = new BottlesStatusBar();
    endbossStatusBar = new EndbossStatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.populateCoins();
        this.populateBottles();
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
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
            this.bottlesStatusBar.setPercentage((this.collectedBottles / 10) * 100);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {

            if (enemy.isDead) {
                return; 
            }
            if (this.character.isColliding(enemy)) {
                if (this.character.y + this.character.height  < enemy.y + enemy.height || this.isDead) {
                    enemy.changeToDeadImage();
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });

        this.throwableObject.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    enemy.changeToDeadImage(); 
                    this.throwableObject.splice(bottleIndex, 1); 
                }
            });
        });
    }
    
    populateCoins() {
        let numberOfCoins = 70;
        let levelEndX = 5000;
        const spacing = levelEndX / numberOfCoins;

        for (let i = 0; i < numberOfCoins; i++) {
            let coin = new Coins();
            coin.x = i * spacing + Math.random() * spacing;
            coin.y = Math.random() * (this.canvas.height - coin.height - 20) + 20;
            this.coins.push(coin);
        }
    }

    collectCoin() {
        if (this.collectedCoins < 50) {
            this.collectedCoins += 1;
            this.coinsStatusBar.setPercentage((this.collectedCoins / 50) * 100);
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

    populateBottles() {
        let numberOfBottles = 10;
        const levelEndX = 5000;
        const levelHeight = this.canvas.height - 100;

        for (let i = 0; i < numberOfBottles; i++) {
            let bottle = new Bottles();
            bottle.x = Math.random() * levelEndX;
            bottle.y = Math.random() * levelHeight;
            this.bottles.push(bottle);
        }
    }

    collectBottle() {
        if (this.collectedBottles < 10) {
            this.collectedBottles += 1;
            this.bottlesStatusBar.setPercentage((this.collectedBottles / 10) * 100);
        }
    }

    checkBottleCollisions() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle();
                this.bottles.splice(index, 1);
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

        if (this.character.isDead()) {
            this.showGameOver();
            return; }

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
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

    showGameOver() {
        const gameOverImage = new Image();
        gameOverImage.src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
        gameOverImage.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 

            const imgX = this.character.x - (gameOverImage.width * 0.50 / 2) +289; 
            const imgY = this.character.y - (gameOverImage.height * 0.50 / 2) + 80; 
        
            const scaledWidth = gameOverImage.width * 0.50;
            const scaledHeight = gameOverImage.height * 0.50;

            this.ctx.drawImage(gameOverImage, imgX, imgY, scaledWidth, scaledHeight);
        };
        
        this.level.enemies = [];
        this.coins = [];
        this.bottles = [];
        this.throwableObject = [];}

}