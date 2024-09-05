class Chicken extends MovableObject {
    y = 370;
    height = 60;
    width = 60;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    
    isDead = false; 

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 6000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) { 
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) { 
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
    
    changeToDeadImage() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.isDead = true;
    }
}