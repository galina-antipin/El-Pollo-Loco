/**
 * Represents the status bar for the end boss in the game.
 * Displays the boss's health percentage visually using images.
 * @extends {DrawableObject}
 */
class EndbossStatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    percentage = 100;

    /**
     * Constructs a new EndbossStatusBar instance.
     * Initializes the status bar's position, dimensions, 
     * loads the images, and sets the initial percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
   * Sets the current health percentage of the end boss.
   * Updates the displayed image based on the new percentage.
   * 
   * @param {number} percentage - The new health percentage to set (0-100).
   */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Resolves the appropriate image index based on the current health percentage.
    * 
    * @returns {number} - The index of the image to use based on health percentage.
    */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else { }
        return 0;
    }
}