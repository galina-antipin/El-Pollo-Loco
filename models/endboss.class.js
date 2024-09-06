class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -20;
    x = 6200;
    energy = 100;
    speed = 1.5;
    endboss_dead = false;
    isHurt = false;



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
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.statusBar = new EndbossStatusBar();
        this.hurt_sound = new Audio('audio/chicken-sound.mp3');
        this.win_sound = new Audio('audio/win-sound.mp3');
        this.animate();
        this.movement();
    }

    /**
     * Animate the endboss of the game
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);

                if (this.isHurt) {
                    this.playAnimation(this.IMAGES_HURT);
                }
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 1000 / 120);
    }

    /**
        * Animate the endboss movement and actions
        */
    movement() {
        this.endbossMovementInterval = setInterval(() => {
            const distance = this.x - world.character.x;

            if (distance < 600 && distance > 150) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } else if (distance <= 150) {
                this.playAnimation(this.IMAGES_ATTACK);
            }

        }, 1000 / 120);
    }

    hit() {
        this.hurt_sound.play();
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
            this.endboss_dead = true;
            this.playAnimation(this.IMAGES_DEAD);
            this.win_sound.play();
            this.winScreen();
        } else {
            this.lastHit = new Date().getTime();
            this.isHurt = true;
            this.statusBar.setPercentage(this.energy);
        }
    }

}