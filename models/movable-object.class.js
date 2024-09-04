class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;

    lastHit = 0;

    offset = {
        top:0,
        left:0,
        right:20,
        bottom:0
    };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    isColliding(mo) {
        return (this.x + this.width - this.offset.right > mo.x + mo.offset.left) &&
               (this.x + this.offset.left < mo.x + mo.width - mo.offset.right) &&
               (this.y + this.height - this.offset.bottom > mo.y + mo.offset.top) &&
               (this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom);
    }

    hit() {
        this.hurt_sound.play();
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
            this.dead_sound.play();
            this.world.isGameOver = true;
            this.world.clearGameObjects();
            this.gameOverScreen();
        } else {
            this.lastHit = new Date().getTime();

        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    gameOverScreen() {
        document.getElementById('gameOverMenu').classList.remove('d-none'); 
        this.clearAllIntervals();
        muteSound();
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
      }

      winScreen(){
        document.getElementById('win-screen').classList.remove('d-none'); 
        this.clearAllIntervals();
      }
}

