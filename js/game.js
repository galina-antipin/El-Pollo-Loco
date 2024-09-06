let canvas;
let world;
let keyboard = new Keyboard();
let character;

/**
 * Initializes the game by hiding the start screen, displaying the canvas,
 * playing background sound, and setting up the game level and world.
 */
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('mute-btn-overlay').classList.remove('d-none');

    const gameSound = document.getElementById('game-sound');
    gameSound.play();
    setTimeout(() => {
        gameSound.pause();
        gameSound.currentTime = 0;
    }, 7001);
    initLevel();
    init();
}

/**
 * Initializes the game world, creating a new instance of World 
 * and assigning the character.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    character = world.character;
}

/**
 * Handles keyboard down events, setting the appropriate keys in the keyboard object,
 * and starting the game when the Enter key is pressed.
 * 
 * @param {KeyboardEvent} e - The keyboard event that triggered this function.
 */
window.addEventListener('keydown', (e) => {
    if (character.isDead()) return;
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }

    if (e.keyCode == 13) {
        keyboard.ENTER = true;
        startGame();
    }
});

/**
 * Handles keyboard up events, releasing the appropriate keys in the keyboard object.
 * 
 * @param {KeyboardEvent} e - The keyboard event that triggered this function.
 */
window.addEventListener('keyup', (e) => {
    if (character.isDead()) return;
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }

    if (e.keyCode == 13) {
        keyboard.ENTER = false;
    }
});

/**
 * Initializes touch event listeners for the game control elements.
 * These listeners enable users to control the game using touch buttons 
 * on mobile devices.
 * 
 * @event
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    const jumpButton = document.getElementById('jump-button');
    const throwButton = document.getElementById('throw-button');

    /**
 * Starts moving left when the left arrow button is touched.
 * 
 * @param {TouchEvent} event - The touch event triggered by the touch interaction.
 */
    leftArrow.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
        moveLeft();
    });

    /**
  * Stops moving left when the left arrow button is released.
  * 
  * @param {TouchEvent} event - The touch event triggered by the touch interaction.
  */
    leftArrow.addEventListener('touchend', (event) => {
        keyboard.LEFT = false;
        stopMoving();
    });

    /**
      * Starts moving right when the right arrow button is touched.
      * 
      * @param {TouchEvent} event - The touch event triggered by the touch interaction.
      */
    rightArrow.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
        moveRight();
    });

    /**
    * Stops moving right when the right arrow button is released.
    * 
    * @param {TouchEvent} event - The touch event triggered by the touch interaction.
    */
    rightArrow.addEventListener('touchend', (event) => {
        keyboard.RIGHT = false;
        stopMoving();
    });

/**
  * Executes the jump function when the jump button is touched.
  * 
  * @param {TouchEvent} event - The touch event triggered by the touch interaction.
  */
    jumpButton.addEventListener('touchstart', (event) => {
        event.preventDefault();
        jump();
    });

/**
 * (Currently empty) Handles the end of the jump when the jump button is released.
 * 
 * @param {TouchEvent} event - The touch event triggered by the touch interaction.
 */
    jumpButton.addEventListener('touchend', (event) => {
    });

/**
 * Executes the throw function when the throw button is touched.
 * 
 * @param {TouchEvent} event - The touch event triggered by the touch interaction.
 */
    throwButton.addEventListener('touchstart', (event) => {
        event.preventDefault();
        throwItem();
    });

/**
 * (Currently empty) Handles the end of the throw when the throw button is released.
 * 
 * @param {TouchEvent} event - The touch event triggered by the touch interaction.
 */
    throwButton.addEventListener('touchend', (event) => {
    });
})

/**
 * Stops the character from moving left or right by setting the corresponding keys to false.
 */
function stopMoving(event) {
    event.preventDefault();
    if (character.isDead()) return;
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
}

let soundsMuted = false;

/**
 * Toggles the sound mute status for all audio elements on the page 
 * and updates the mute button image accordingly.
 */
function muteSound() {
    soundsMuted = !soundsMuted;
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.muted = soundsMuted;
        world.muteAllSounds();

    });

    const muteButton = document.getElementById('mute-button');
    if (soundsMuted) {
        muteButton.src = './img/sound-off.svg';
    } else {
        muteButton.src = './img/sound-on.svg';
        world.unmuteAllSounds();
    }
}

/**
 * Checks the orientation of the window and displays a warning if the
 * window is in portrait mode on a mobile device.
 */
function checkOrientation() {
    const rotateWarning = document.getElementById('rotate-warning');
    if (window.innerWidth < 720 && window.innerHeight > window.innerWidth) {
        rotateWarning.style.opacity = 1;
    } else {
        rotateWarning.style.opacity = 0;
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation); 