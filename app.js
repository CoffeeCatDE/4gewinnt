//import phaser from 'phaser'
var platforms;
var playerObj;
    var width = 7;
    var heigth = 6;
    var offsetx = 35;
    var offsety = 60;

    var iconsize = 64;

    var markerPositionX = 0;
    var markerPositionY = 0;

    var fieldSelector = 0;

    var gameOver = false;
    // 1 == playerid | 2 == computerid
    var whoHasWonTheGame = 0;

    var selectingPicture;

    // SWITCH FOR GAME LOGIC: 1 = user; 2 = AI
    var player = 1;
    var playerid = 1;
    var computerid = 2;
    var fieldSelectorImage;

    var updateFrames = 0;

    var config = {
        type: Phaser.AUTO,
        width: 460,
        height: 420,
		 physics: {
			default: "arcade",
			arcade: {
				gravity: { y: 150 },
				debug: true
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


    var gameField;

    var game = new Phaser.Game(config);

    function  preload ()
    {
        this.load.image('background', 'assets/bg.png');
        this.load.image('apple', 'assets/apple.png');
        this.load.image('apple2', 'assets/apple.png');
        this.load.image('fish', 'assets/fish.png');
        this.load.image('empty', 'assets/empty.png');
        this.load.image('select', 'assets/select.png');
        this.load.image('win', 'assets/win.png');
        this.load.image('lost', 'assets/lost.png');

        this.load.audio('theme', 'assets/audio/ping.mp3');
        this.load.audio('win', 'assets/audio/win.mp3');
        this.load.audio('lost', 'assets/audio/lost.mp3');
        this.load.audio('restart', 'assets/audio/restart-riff.mp3');




    }


    function create ()
    {
		  
		platforms = this.physics.add.staticGroup();
		platforms.create(iconsize/2, heigth*iconsize, 'select').setScale(1).refreshBody();
		
		this.physics.add.collider(player, platforms);



        this.fieldSelectorImage = this.add.image(750,495,'background');

		
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
        // TEST GAME FIELDS:
        gameFieldaa = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, computerid, computerid, computerid, 0, 0]
        ];
        gameField2  = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0,0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, playerid, playerid, playerid, 0, 0, 0]
        ];
        gameFieldLost  = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0,0],
            [2, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2]
        ];
        gameField22  = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0,0],
            [2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2]
        ];
        gameField33  = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 2]
        ];

        // END OF TEST GAME FIELDS

        // draw empty gamefield
        for (var y = 0; y < heigth;  y += 1){
          for (var x = 0; x < width; x += 1) {
              if (gameField[y][x] == 0){
                  this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'empty');
              }
              else if (gameField[y][x] == 1){
                  this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'apple');

              }
              else if (gameField[y][x] == 2){
                  this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'fish');

              }
              else if (gameField[y][x] == 3){
                  this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'select');

              }
          }
        }

        this.fieldSelectorImage = this.add.image((markerPositionX*iconsize)+offsetx, (markerPositionY*iconsize)+offsety, 'select');



    }


    function hasOneWonVertical (whoIsPlayer){

        for (var x = 0; x < width; x++){
            for (var y = 5; y >= 3; y--){
                if (
                   (gameField[y][x] == whoIsPlayer) &&
                   (gameField[y-1][x] == whoIsPlayer) &&
                   (gameField[y-2][x] == whoIsPlayer) &&
                   (gameField[y-3][x] == whoIsPlayer)
                   )
                {

                        whoHasWonTheGame = whoIsPlayer;
                        gameOver = true;
                        return whoIsPlayer;
                }





            }
        }
    }

    function hasOneWonHorizontal (whoIsPlayer){

        /**
        TEST HORIZONTAL WIN SUCCESS
        **/
        for (var y = 0;  y < heigth; y++){
            for (var x =0; x < width; x++ ){
                if ((gameField[y][x] == whoIsPlayer) &&
                    (gameField[y][x+1] == whoIsPlayer) &&
                        (gameField[y][x+2] == whoIsPlayer) &&
                            (gameField[y][x+3] == whoIsPlayer)){

                                if (whoIsPlayer == 1){
                                    console.log("You won!  (horizontal)");
                                    whoHasWonTheGame = 1;
                                }

                                if (whoIsPlayer == 2){
                                    console.log("You lost. (horizontal)");
                                    //var awinText = this.add.text(200, 0, 'SRY, you lost!', { fontSize: '40px', fill: '#f00' });
                                    whoHasWonTheGame = 2;
                                }



                                //var newStoneWon = new Phaser.Geom.Point(x,y);
                                gameOver = true;
                                return whoIsPlayer;

                                //return newStoneWon;
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
            gameField[0][row] == 2){
                console.log(gameField);
                console.log("ROW (" + row + ") is full!");
                return false;
        }
        // ROW IS FREE
        else {
            var hh = getHeigthOfColumn(row);
            console.log ("Free Stones: " + hh);
            return true;
        }
    }

    function getHeigthOfColumn(column){
        var stones = 5;
        for (stones; stones >= 0; stones = stones-1){
            // FREE FOR MIN. 1 STONE
            if (gameField[stones][column] == 0){
                break;
            }
            // NOT FREE
            if (gameField[stones][column] == 1 || gameField[stones][column] == 2 ){
                if (stones == 5){
                }
            }
        }

        console.log( "Free Stones in Column(" +  column+"): " + stones);

        return stones;

    }
    function printXY (){
        console.log("X" + markerPositionX);
        console.log("Y" + markerPositionY);
        console.log(gameField);

    }

    function searchForHorizontalDanger (){
            for (var y = 0; y < heigth; y++){
                for (var x = 0; x < width; x++){

                }
            }
    }

    /**
    **/
    function hasWonDiagonal (whoIsPlayer){

        for (var x =0; x < 4; x++){
            if (
            (
                gameField[5][x] == whoIsPlayer
            )
            &&
            (
                gameField[4][x+1] == whoIsPlayer
            )
             &&
            (
                gameField[3][x+2] == whoIsPlayer
            )
            &&
            (
                gameField[2][x+3] == whoIsPlayer
            )
        ){
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
    function letAIplay (){
        // SELECT COLUMN
        var tries = 0;

        var thisCol = Math.floor(Math.random() *7);
        console.log("<<< COLUMN: " + thisCol);


        do{
            if (isRowFree(thisCol)){
                console.log("C::: " + thisCol);
                // GET ROW
                var heigthOfCol = getHeigthOfColumn(thisCol);
                //gameField[heigthOfCol][thisCol] = computerid;

                var newStone = new Phaser.Geom.Point(thisCol, heigthOfCol);
                console.log("_______//AI_______");

                tries = 1;
            }
            else {
                thisCol = Math.floor(Math.random() *7);
            }

        }
        while (tries != 1);

    return newStone;
}

function checkWin (player){

    if (
        hasOneWonHorizontal(player) == player ||
        hasOneWonVertical(player)  == player ||
        hasWonDiagonal(player) == player
    )

     {
         console.log("@@@: " +player + "has won");


     }



}

function animateIconImage(){
	
	
	//bela.x += 1;
}

function update (time, delta){
	

  if (whoHasWonTheGame == 1){
    this.add.text(10, 0, '||| Good! You have won this game! |||', { fontSize: '20px', fill: '#fff' });
  }
  else if (whoHasWonTheGame == 2 ){
    this.add.text(23, 0, '||| Sorry, you lost this game! |||', { fontSize: '20px', fill: '#fff' });
  }
  else  {

  }

  // NEW ROUND
  if ((whoHasWonTheGame == playerid || whoHasWonTheGame == computerid) && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
    var music = this.sound.add('restart');
    music.play();

    whoHasWonTheGame = 0;
    gameOver = false;
    markerPositionX = 0;
    this.scene.restart();
  }

    if (!gameOver){

        
         // KEYBOARD RIGHT PRESSED
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT))
                && (markerPositionX < width-1)){
                // CHANGE SELECT POSITION IN GAMEFIELD ( -> )
                markerPositionX += 1;
                // CHANGE X-POSITION -> IN IMAGE
                this.fieldSelectorImage.x = (markerPositionX*iconsize)+offsetx;
                printXY();
            }
            // KEYBOARD LEFT PRESSED
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT))
                && (markerPositionX > 0)){
                // CHANGE SELECT POSITION IN GAMEFIELD ( <- )
                markerPositionX -= 1;
                // CHANGE X-POSITION <- IN IMAGE
                this.fieldSelectorImage.x = (markerPositionX*iconsize)+offsetx;
                printXY();
            }

            // KEYBOARD SPACE PRESSED --> New ROUND
            // ONE ROUND ++
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
				  
				
                var music = this.sound.add('theme');
                music.play();

               
                


                if(player == playerid){
                    if(isRowFree(markerPositionX)){
                        console.log("Row is free!");
                        var h =getHeigthOfColumn(markerPositionX);
                        console.log( "h: -> " + h);
                        gameField[h][markerPositionX] = playerid;


              

                        //var ii= this.add.image((markerPositionX*iconsize)+offsetx, (h*iconsize)+offsety, 'apple');
						 //HERE

						playerObj = this.physics.add.sprite((markerPositionX*iconsize)+offsetx, (h*iconsize)+offsety, 'apple', 0);
						//player.setBounce(0, 1);
						playerObj.setCollideWorldBounds(true);
						playerObj.setBounce(0.2);

						//this.physics.add.collider(playerObj, platforms);

                        printXY();
                        /**
                        if (hasOneWonVertical(player) == playerid ||
                            hasOneWonHorizontal(player) == playerid ||
                            hasWonDiagonal(player, 0,markerPositionX) == playerid
                        ){
                          console.log("WIN");
                          //winText = this.add.text(200, 0, 'You have won this game!', { fontSize: '40px', fill: '#0f0' });

                        }
                        if (hasOneWonVertical(player) == computerid ||
                            hasOneWonHorizontal(player) == computerid ||
                            hasWonDiagonal(player, 0,markerPositionX) == computerid
                        )
                        {
                          //winText = this.add.text(200, 0, 'Sorry, you lost!', { fontSize: '40px', fill: '#f00' });
                          console.log("LOST");

                        }

                        **/





                    }
                    checkWin(player);
                    player = computerid;
                    console.log(":::::::::::::::::::::player: " + player);

                }
                // LET AI PLAy
                if (player == computerid){
                    console.log(">>>>AI<<<<<");
                    var p =letAIplay();
                    console.log("NEW POINT (AI) X:" + p.x + "Y: " + p.y);

                    gameField[p.y][p.x] = computerid;

                    this.add.image((p.x*iconsize)+offsetx, (p.y*iconsize)+offsety, 'fish');

                    checkWin(player);
                    player = playerid;
                   // console.log(":::::::::::::::::::::player: " + player);

                }
            }




            // Zeichnet die Steine ein, die gewonnen haben bei GameOver.
            if (gameOver == true){
                if (whoHasWonTheGame == playerid){
                    var music = this.sound.add('win');
                    music.play();
                }

                if (whoHasWonTheGame == computerid){
                    var music = this.sound.add('lost');
                    music.play();
                }

                for (var y = 0; y < heigth;  y += 1){
                    for (var x = 0; x < width; x += 1) {
                            if (gameField[y][x] == playerid && whoHasWonTheGame == playerid){
                              this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'win');

                              //winText = this.add.text(200, 0, 'You have won this game!', { fontSize: '40px', fill: '#0f0' });

                            }
                            if (gameField[y][x] == computerid && whoHasWonTheGame == computerid ){
                                this.add.image((x*iconsize)+offsetx, (y*iconsize)+offsety, 'lost');

                                //winText = this.add.text(200, 0, 'Sorry, you lost!', { fontSize: '40px', fill: '#f00' });
                            }
                    }
                }



              }


        }










        // this.add.image((markerPositionX*(iconsize)+offsetx), (markerPositionY*(iconsize))+offsety, 'apple');




    }

    create();
