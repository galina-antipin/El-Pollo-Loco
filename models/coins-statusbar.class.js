/** 
 * Represents the status bar that displays the number of coins collected in the game.
 * Inherits from the DrawableObject class.
 */
class CoinsStatusbar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png ',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png ',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png ',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png ',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png ',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png ',
    ];

    percentage = 0;
    /**
    * Creates an instance of the CoinsStatusbar.
    * Initializes the status bar by loading images and setting initial position and size.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 45;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
   * Sets the percentage of coins collected and updates the corresponding image.
   * 
   * @param {number} percentage - The percentage of coins collected (0 to 100).
   */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
   * Resolves the image index in the IMAGES array based on the current percentage.
   * 
   * @returns {number} The index of the image corresponding to the current percentage.
   */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}