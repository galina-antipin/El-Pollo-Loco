let canvas;
let world;
let keyboard = new Keyboard();
let character;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    const gameSound = document.getElementById('game-sound');
    gameSound.play();
    setTimeout(() => {
        gameSound.pause();
        gameSound.currentTime = 0;
    }, 7001);
    init();
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    character = world.character;
}

window.addEventListener('keydown', (e) => {
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

window.addEventListener('keyup', (e) => {
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

function stopMoving() {
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
}

function stopJump() {
    keyboard.UP = false;
}

function stopThrow() {
    keyboard.D = false;
}

function moveLeft() {
   keyboard.LEFT = true;  
}

function moveRight() {
   keyboard.RIGHT = true;
}

function jump() {

       character.jump(); 
   
}

function throwItem() {
   if (world.collectedBottles > 0) {
       let bottle = new ThrowableObject(character.x, character.y); 
       world.throwableObject.push(bottle);
       world.collectedBottles--;
   }
}