class Bottle extends MovableObject {
    width = 80;
    height = 80;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[this.randomImage()]);
        this.x = 200 + Math.random() * 8000;
        this.y = 360;
    }

    randomImage() {
        return Math.floor(Math.random() * this.IMAGES_BOTTLE.length)
    }
}