// @TODO clever and simple enemy AI::::
//  HORIZONTAL L->R  [x]
//  HORIZONTAL R->L  [ ]
//  VERTICAL   U->D  [ ]
//  DIAGONAL   L->R  [ ]
//  DIAGONAL   R->L  [ ]


// @TODO CodeDoc for functions and Game
// @TODO Steuerung für Mobile Endgeräte (byCLICK)
// @TODO README.md ERSTELLEN





/**
 * GAME LOGIC VARIABLES
 * 1 == playerid | 2 == computerid
 */
var gameField;
var gamefieldWidth = 7;
var gamefieldHeight = 6;
var markerPositionX = 0;
var markerPositionY = 0;
var fieldSelector = 0;
var gameOver = false;
var whoHasWonTheGame = 0;
var player = 1;
var playerid = 1;
var computerid = 2;
var p;

// GAME PHYSICS (COLLECTION)
var particlesApples;
var particlesFish;
var physicsApples;
var physicsFishes;

/**
 * GFX VARIABLES FOR LOOK
 */
// icon graphics must have the same size in pixel!
var iconsize = 100;
var offsetx = 50;
var offsety = 150;
var selectingPicture;
var fieldSelectorImage;

// GAME PICTURE OBJECTS (COLLECTION)
var apples;
var fishes;

var config = {
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 2800 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true
    }
};




var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/bg.png');
    this.load.image('apple', 'assets/apple.png');
    this.load.image('apple2', 'assets/apple.png');
    this.load.image('fish', 'assets/fish.png');
    this.load.image('empty', 'assets/empty.png');
    this.load.image('select', 'assets/select.png');
    this.load.image('selectPlayer', 'assets/selectPlayer.png');

    this.load.audio('theme', 'assets/audio/ping.mp3');
    this.load.audio('win', 'assets/audio/win.mp3');
    this.load.audio('lost', 'assets/audio/lost.mp3');
    this.load.audio('restart', 'assets/audio/restart-riff.mp3');






}


function create() {

    physicsApples = this.physics.add.staticGroup();
    physicsFishes = this.physics.add.staticGroup();




    this.fieldSelectorImage = this.add.image(750, 495, 'background');


    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('apple', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });


    //this.impact.add.image(0, 0, 'bg').setFixedCollision().setGravity(0).setBodyScale(0.5);

    //this.impact.world.setBounds();

    gameField = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    
    // ALL OTHER GAMEFIELDS ARE JUST FOR TESTING DIFFERENT GAME STATES!
    gameField2221 = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0], 
        [0, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0]
    ];

    gameField222 = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0]
    ];

    gameFieldTest3 = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    gameFieldTest4 = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, computerid, computerid, computerid, 0, 0]
    ];
    gameFieldTest5 = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, playerid, playerid, playerid, 0, 0, 0]
    ];
    gameFieldTest6 = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2]
    ];
    gameFieldTest7 = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2]
    ];
    gameFieldTest8 = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 2]
    ];

    // END OF TESTING GAME FIELDS



    // DRAW THE EMPTY GAMEFIELD 
    for (var y = 0; y < gamefieldHeight; y += 1) {
        for (var x = 0; x < gamefieldWidth; x += 1) {
            if (gameField[y][x] == 0) {
                this.add.image((x * iconsize) + offsetx, (y * iconsize) + offsety - 65, 'empty');
            }
            else if (gameField[y][x] == 1) {
                this.add.image((x * iconsize) + offsetx, (y * iconsize) + offsety - 65, 'apple');

            }
            else if (gameField[y][x] == 2) {
                this.add.image((x * iconsize) + offsetx, (y * iconsize) + offsety - 65, 'fish');

            }
            else if (gameField[y][x] == 3) {
                this.add.image((x * iconsize) + offsetx, (y * iconsize) + offsety - 65, 'select');

            }
        }
    }
    this.fieldSelectorImage = this.add.image((markerPositionX * iconsize) + offsetx, iconsize - 13, 'select');

    particlesApples = this.add.particles('apple');
    particlesFishes = this.add.particles('fish');
}

function particleEnd(player) {

    if (player == playerid) {

        var emitter = particlesApples.createEmitter();
        var h = getHeigthOfColumn(markerPositionX);

        console.log(getHeigthOfColumn("EMITTER AT " + markerPositionX));
        emitter.setPosition((markerPositionX + 0.5) * iconsize, (h + 2) * iconsize);
        emitter.setSpeed(300);
        emitter.setLifespan(2000);
        emitter.setScale(0.7);
    }
    else {
        var emitter = particlesFishes.createEmitter();
        var h = getHeigthOfColumn(markerPositionX);

        console.log(getHeigthOfColumn("EMITTER AT " + markerPositionX));
        emitter.setPosition((p.x + 0.5) * iconsize, (p.y + 1) * iconsize);
        emitter.setSpeed(300);
        emitter.setLifespan(2000);
        emitter.setScale(0.7);
    }
}


function hasOneWonHorizontal(whoIsPlayer) {

    /**
    TEST HORIZONTAL WIN SUCCESS
    **/
    for (var y = 0; y < gamefieldHeight; y++) {
        for (var x = 0; x < gamefieldWidth; x++) {
            if ((gameField[y][x] == whoIsPlayer) &&
                (gameField[y][x + 1] == whoIsPlayer) &&
                (gameField[y][x + 2] == whoIsPlayer) &&
                (gameField[y][x + 3] == whoIsPlayer)) {

                if (whoIsPlayer == 1) {
                    console.log("You won!  (horizontal)");
                    whoHasWonTheGame = 1;
                }

                if (whoIsPlayer == 2) {
                    console.log("You lost. (horizontal)");
                    whoHasWonTheGame = 2;
                }

                gameOver = true;
                return whoIsPlayer;
            }

        }
    }


}


// PREDICT AI
function hasNearlyOneWonHorizontal() {

    /**
    TEST HORIZONTAL WIN SUCCESS
    **/
    for (var y = 0; y < gamefieldHeight; y++) {
        for (var x = 0; x < gamefieldWidth; x++) {
            if ((gameField[y][x] == computerid) &&
                (gameField[y][x + 1] == computerid) &&
                (gameField[y][x + 2] == computerid) 
                
                &&

                (y == getHeigthOfColumn(x+3))
                )
                {
                    console.log("You NEARLY lost. (horizontal) : Y->" + y + "X->" + (x+3));
                    gameOver = true;
                    var thisStoneWins = new Phaser.Geom.Point(x+3,y);
                    return thisStoneWins;
            }
        }
    }


}


// IS ROW FREE OR FULL
/***
 *
 * @returns {boolean}
 *  true = free
 *  false = full
 */
function isRowFree(row) {

    // ROW IS FULL
    if (gameField[0][row] == 1 ||
        gameField[0][row] == 2) {
        console.log(gameField);
        console.log("ROW (" + row + ") is full!");
        return false;
    }
    // ROW IS FREE
    else {
        var hh = getHeigthOfColumn(row);
        console.log("Free Stones: " + hh);
        return true;
    }
}

function getHeigthOfColumn(column) {
    var stones = 5;
    for (stones; stones >= 0; stones = stones - 1) {
        // FREE FOR MIN. 1 STONE
        if (gameField[stones][column] == 0) {
            break;
        }
        // NOT FREE
        if (gameField[stones][column] == 1 || gameField[stones][column] == 2) {
            if (stones == 5) {
            }
        }
    }

    console.log("Free Stones in Column(" + column + "): " + stones);

    return stones;

}
function printXY() {
    console.log("X" + markerPositionX);
    console.log("Y" + markerPositionY);
    console.log(gameField);
}

function searchForHorizontalDanger() {
    for (var y = 0; y < heigth; y++) {
        for (var x = 0; x < width; x++) {

        }
    }
}

/**
**/
function hasWonDiagonal(whoIsPlayer) {
    for (var y = 5; y >= 3; y--) {
        console.log("AA" + y);
        for (var x = 0; x <= 4; x++) {
            console.log("BB" + x);

            if (
                (
                    gameField[y][x + 3] == whoIsPlayer
                )
                &&
                (
                    gameField[y - 1][x + 2] == whoIsPlayer
                )
                &&
                (
                    gameField[y - 2][x + 1] == whoIsPlayer
                )
                &&
                (
                    gameField[y - 3][x] == whoIsPlayer
                )
            ) {
                console.log("DIAGONAL WON R->L" + whoIsPlayer);
                whoHasWonTheGame = computerid;
                gameOver = true;

                return whoIsPlayer;
            }
        }
    }

    for (var x = 0; x < 4; x++) {
        if ((
            (
                gameField[5][x] == whoIsPlayer
            )
            &&
            (
                gameField[4][x + 1] == whoIsPlayer
            )
            &&
            (
                gameField[3][x + 2] == whoIsPlayer
            )
            &&
            (
                gameField[2][x + 3] == whoIsPlayer
            )
        )

        ) {
            console.log("DIAGONAL WON" + whoIsPlayer);
            whoHasWonTheGame = whoIsPlayer;
            gameOver = true;

            return whoIsPlayer;
        }
    }

}

/**
 * @TODO
 * @returns {Phaser.Geom.Point}
 */
function letAIplay() {
    // SELECT COLUMN
    var tries = 0;

    var thisCol = Math.floor(Math.random() * 7);
    console.log("<<< COLUMN: " + thisCol);


    do {
        if (isRowFree(thisCol)) {
            console.log("C::: " + thisCol);
            // GET ROW
            var heigthOfCol = getHeigthOfColumn(thisCol);
            //gameField[heigthOfCol][thisCol] = computerid;

            var newStone = new Phaser.Geom.Point(thisCol, heigthOfCol);
            console.log("_______//AI_______");

            tries = 1;
        }
        else {
            thisCol = Math.floor(Math.random() * 7);
        }

    }
    while (tries != 1);

    return newStone;
}

/**
 * 
 * @param {*} player 
 */
function checkWin(player) {

    if (
        hasOneWonHorizontal(player) == player ||
        hasOneWonVertical(player) == player ||
        hasWonDiagonal(player) == player
    ) {
        console.log("@@@: " + player + "has won");
        particleEnd(player);
    }



}


function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
async function update(time, delta) {

    if (whoHasWonTheGame == 1) {
        this.add.text(10, 0, '||| Good! You have won this game! |||', { fontSize: '20px', fill: '#0f0' });
    }
    else if (whoHasWonTheGame == 2) {
        this.add.text(10, 0, '||| Sorry, you lost this game! |||', { fontSize: '20px', fill: '#f00' });
    }
    else {

    }

    // NEW ROUND
    if ((whoHasWonTheGame == playerid || whoHasWonTheGame == computerid) && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {
        var music = this.sound.add('restart');
        music.play();

        whoHasWonTheGame = 0;
        gameOver = false;
        markerPositionX = 0;
        this.scene.restart();
    }

    if (!gameOver) {

        // KEYBOARD RIGHT PRESSED
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT))
            && (markerPositionX <= gamefieldWidth - 2)) {
            // CHANGE SELECT POSITION IN GAMEFIELD ( -> )
            markerPositionX += 1;
            // CHANGE X-POSITION -> IN IMAGE
            this.fieldSelectorImage.x = (markerPositionX * iconsize) + offsetx;
            printXY();
        }
        // KEYBOARD LEFT PRESSED
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT))
            && (markerPositionX > 0)) {
            // CHANGE SELECT POSITION IN GAMEFIELD ( <- )
            markerPositionX -= 1;
            // CHANGE X-POSITION <- IN IMAGE
            this.fieldSelectorImage.x = (markerPositionX * iconsize) + offsetx;
            printXY();
        }

        // KEYBOARD SPACE PRESSED --> New ROUND
        // ONE ROUND ++
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {

            var music = this.sound.add('theme');
            music.play();

            // THIS ROUND IS FOR PLAYER
            if (player == playerid) {
                if (isRowFree(markerPositionX)) {
                    console.log("Row is free!");
                    var h = getHeigthOfColumn(markerPositionX);
                    console.log("h: -> " + h);
                    gameField[h][markerPositionX] = playerid;

                    apples = this.physics.add.sprite((markerPositionX * iconsize) + offsetx, 0, 'apple');
                    apples.setCollideWorldBounds(true);
                    apples.setBounce(0.2);
                    physicsApples.create((markerPositionX * iconsize) + offsetx, ((h) * iconsize) + offsety, 'selectEnemy').setAlpha(0);

                    this.physics.add.collider(apples, physicsApples);

                    printXY();

                }
                checkWin(player);
                player = computerid;
                console.log(":::::::::::::::::::::player: " + player);

            }
            // THIS ROUND IS FOR COMPUTER
            if (player == computerid) {

                var newStoneInForAIwin = hasNearlyOneWonHorizontal();
                //console.log ("NEUUUUU: " + newStoneInForAIwin.y + newStoneInForAIwin.x);

                if (!newStoneInForAIwin){
                    console.log(">>>>AI<<<<<");
                    p = letAIplay();
                    console.log("NEW POINT (AI) X:" + p.x + "Y: " + p.y);

                }
                else {                  
                    p  = newStoneInForAIwin;
                    console.log("NEW STONE WITH AI WIN");
                    whoHasWonTheGame = computerid;
                }

                gameField[p.y][p.x] = computerid;

                fishes = this.physics.add.sprite((p.x * iconsize) + offsetx, 0, 'fish').setScale(1);
                fishes.setCollideWorldBounds(true);
                fishes.setBounce(0.1);
                physicsFishes.create((p.x * iconsize) + offsetx, ((p.y) * iconsize) + offsety, 'selectEnemy').setAlpha(0);

                this.physics.add.collider(fishes, physicsFishes);

                checkWin(player);
                player = playerid;
            }
        }

        // Zeichnet die Steine ein, die gewonnen haben bei GameOver.
        if (gameOver == true) {
            if (whoHasWonTheGame == playerid) {
                var music = this.sound.add('win');
                music.play();
            }

            if (whoHasWonTheGame == computerid) {
                var music = this.sound.add('lost');
                music.play();
            }
        }
    }
}


