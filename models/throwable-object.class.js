class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;

        this.rotationImages = [
            'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
        ];

        this.loadImages(this.rotationImages);
        this.currentFrame = 0;
        this.throw();
        this.startAnimation();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    startAnimation() {
        setInterval(() => {
            this.updateImage();
        }, 100);
    }

    updateImage() {
        this.currentImage = this.rotationImages[this.currentFrame];
        this.img = this.imageCache[this.currentImage];
        this.currentFrame = (this.currentFrame + 1) % this.rotationImages.length;
    }
}