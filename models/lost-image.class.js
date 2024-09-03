class LostImage extends DrawableObject {

    y = 0;
    width = 800;
    height = 600;

    constructor() {
        super().loadImage('img/9_intro_outro_screens/game_over/oh no you lost!.png');
    }

    drawBesideCharacter(ctx, characterX, characterY) {
        const x = characterX -100;
        const y = characterY - (this.height / 2) +50; 
        ctx.drawImage(this.img, x, y, this.width, this.height);
    }
}