class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -20;
    energy = 100;
    speed = 1.5;
    endbossStatusBar = new EndbossStatusBar();

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5000; 
        this.animate();
        this.updateStatusBar();
        this.movement();
    }

    animate() {
        this.endbossAnimateInterval = setInterval(() => {
            if (this.isHurt){
                this.playAnimation(this.IMAGES_HURT);}
            if (this.energy <= 0) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
                this.endbossStatusBar.setPercentage(0);
            } else if (this.distanceTooClose()) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.checkDistancePepeEndboss() || this.checkIfEndbossMoved()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
            this.updateStatusBar();
        }, 300);
    }

    updateStatusBar() {
        const percentage = (this.energy / 100) * 100; 
        console.log(`Updating Status Bar. Energy: ${this.energy}, Percentage: ${percentage}`);
        this.endbossStatusBar.setPercentage(percentage);
    }

    distanceTooClose() {
        return this.x - world.character.x <= 150;
    }

    movement() {
        this.endbossMovementInverval = setInterval(() => {
            if (this.checkDistancePepeEndboss() || (this.checkIfEndbossMoved() && this.energy > 0)) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    checkDistancePepeEndboss() {
        return world.character.x > 1950;
    }

    checkIfEndbossMoved() {
        return this.x < 2300 || this.energy < 100; 
    }

    hit() {
        this.energy -= 25; 
        if (this.energy < 0) {
            this.energy = 0; 
        }
        
        this.updateStatusBar(); 
        this.playAnimation(this.IMAGES_HURT); 
    
        if (this.energy === 0) {
            this.playAnimation(this.IMAGES_DEAD);
            this.speed = 0; 
        }
    }}