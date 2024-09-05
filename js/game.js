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
 * Stops the character from moving left or right by setting the corresponding keys to false.
 */
function stopMoving() {
    if (character.isDead()) return;
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
}

/**
 * Stops the character's jump by setting the UP key to false.
 */
function stopJump() {
    keyboard.UP = false;
}

/**
 * Stops the character's throwing action by setting the D key to false.
 */
function stopThrow() {
    keyboard.D = false;
}

/**
 * Initiates movement to the left by setting the LEFT key to true.
 */
function moveLeft() {
    keyboard.LEFT = true;
}

/**
 * Initiates movement to the right by setting the RIGHT key to true.
 */
function moveRight() {
    keyboard.RIGHT = true;
}

/**
 * Makes the character jump by calling the jump method on the character object.
 */
function jump() {
    character.jump();
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
    });

    const muteButton = document.getElementById('mute-button');
    if (soundsMuted) {
        muteButton.src = './img/sound-off.svg';
    } else {
        muteButton.src = './img/sound-on.svg';
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

// Event listeners for checking orientation
window.addEventListener('resize', checkOrientation); 
window.addEventListener('load', checkOrientation); 