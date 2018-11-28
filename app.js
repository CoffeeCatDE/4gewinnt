//import phaser from 'phaser'

    var width = 7;
    var heigth = 6;
    var offsetx = 90;
    var offsety = 100;
    var iconsize = 120;
    var markerPositionX = 0;
    var markerPositionY = 0;
    var fieldSelector = 0;

    var gameOver = false;

    var selectingPicture;

    // SWITCH FOR GAME LOGIC: 1 = user; 2 = AI
    var player = 1;
    var playerid = 1;
    var computerid = 2;
    var fieldSelectorImage;

    var config = {
        type: Phaser.AUTO,
        width: 900,
        height: 800,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };


    var gameField;

    var game = new Phaser.Game(config);
        



     function Node(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }
     
    function Tree(data) {
        var node = new Node(data);
        this._root = node;
    }
     
    Tree.prototype.traverseDF = function(callback) {
     
        // this is a recurse and immediately-invoking function
        (function recurse(currentNode) {
            // step 2
            for (var i = 0, length = currentNode.children.length; i < length; i++) {
                // step 3
                recurse(currentNode.children[i]);
            }
     
            // step 4
            callback(currentNode);
     
            // step 1
        })(this._root);
     
    };
     
    Tree.prototype.traverseBF = function(callback) {
        var queue = new Queue();
     
        queue.enqueue(this._root);
     
        currentTree = queue.dequeue();
     
        while(currentTree){
            for (var i = 0, length = currentTree.children.length; i < length; i++) {
                queue.enqueue(currentTree.children[i]);
            }
     
            callback(currentTree);
            currentTree = queue.dequeue();
        }
    };
     
    Tree.prototype.contains = function(callback, traversal) {
        traversal.call(this, callback);
    };
     
    Tree.prototype.add = function(data, toData, traversal) {
        var child = new Node(data),
            parent = null,
            callback = function(node) {
                if (node.data === toData) {
                    parent = node;
                }
            };
     
        this.contains(callback, traversal);
     
        if (parent) {
            parent.children.push(child);
            child.parent = parent;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        }
    };
 
    Tree.prototype.remove = function(data, fromData, traversal) {
        var tree = this,
            parent = null,
            childToRemove = null,
            index;
     
        var callback = function(node) {
            if (node.data === fromData) {
                parent = node;
            }
        };
     
        this.contains(callback, traversal);
     
        if (parent) {
            index = findIndex(parent.children, data);
     
            if (index === undefined) {
                throw new Error('Node to remove does not exist.');
            } else {
                childToRemove = parent.children.splice(index, 1);
            }
        } else {
            throw new Error('Parent does not exist.');
        }
     
        return childToRemove;
    };
 
    function findIndex(arr, data) {
        var index;
     
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].data === data) {
                index = i;
            }
        }
     
        return index;
    }



    var tree = new Tree('CEO');
     
    tree.add('VP of Happiness', 'CEO', tree.traverseBF);
    tree.add('VP of Finance', 'CEO', tree.traverseBF);
    tree.add('VP of Sadness', 'CEO', tree.traverseBF);
     
    tree.add('Director of Puppies', 'VP of Finance', tree.traverseBF);
    tree.add('Manager of Puppies', 'Director of Puppies', tree.traverseBF);


     
    /*
     
     tree
     
     'CEO'
     ├── 'VP of Happiness'
     ├── 'VP of Finance'
     │   ├── 'Director of Puppies'
     │   └── 'Manager of Puppies'
     └── 'VP of Sadness'
     
     */


    function  preload ()
    {        
        this.load.image('background', 'assets/background.png');
        this.load.image('apple', 'assets/apple.png');
        this.load.image('fish', 'assets/fish.png');
        this.load.image('empty', 'assets/empty.png');
        this.load.image('select', 'assets/select.png');

    }


    function create ()
    {

        this.fieldSelectorImage = this.add.image(150,430,'background');

        gameField = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];

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


            for (var x = 0; x < width-1; x++){
                for (var y = 5; y >= 0; y--){
                    alert(y);
                    if (
                        (gameField[y][x] == whoIsPlayer) &&
                        (gameField[y-1][x] == whoIsPlayer) &&
                        (gameField[y-2][x] == whoIsPlayer) &&
                        (gameField[y-3][x] == whoIsPlayer)
                        )                    
                        {
                         gameOver = true;
                      
                        if (whoIsPlayer == 1){
                                    alert("You won!  (vertical)");
                                    gameOver = true;
                                }

                                if (whoIsPlayer == 2){
                                    gameOver = true;
                                    alert("You lost. (vertical)");
                                }
                         break;
                        }
                        if (
                        (gameField[y-1][x] == whoIsPlayer) &&
                        (gameField[y-2][x] == whoIsPlayer) &&
                        (gameField[y-3][x] == whoIsPlayer) &&
                        (gameField[y-4][x] == whoIsPlayer)
                        )
                        {
                        gameOver = true;
                      
                        if (whoIsPlayer == 1){
                                    alert("You won!  (vertical)");
                                    gameOver = true;
                                }

                                if (whoIsPlayer == 2){
                                    gameOver = true;
                                    alert("You lost. (vertical)");
                                }
                         break;

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
                                    alert("You won!  (horizontal)");
                                    gameOver = true;
                                }

                                if (whoIsPlayer == 2){
                                    gameOver = true;
                                    alert("You lost. (horizontal)");
                                }
                        }
                    
        }
    }






/**

        for (var x = 0; x < width-1; x++){
            for (var y = 7; y > (heigth-4); y++){
                 if (
                    (gameField[y][x] == playerid) &&
                    (gameField[y+1][x] == playerid) &&
                    (gameField[y+2][x] == playerid) &&
                    (gameField[y+3][x] == playerid)
                    ){

                        if (playerid == 1){
                                alert("Game Over! You won! (vertical)");
                                gameOver = true;
                                break;
                       }

                        if (playerid == 2){
                                gameOver = true;
                                alert("Game Over! You lost. (Vertical)");
                                break;
                        }
                    }
                
            }

        }

        **/
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

function update (){

    if (!gameOver){
         // KEYBOARD RIGHT PRESSED
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT))
                && (markerPositionX < width)){
                // CHANGE SELECT POSITION IN GAMEFIELD ( -> )
                markerPositionX += 1;
                // CHANGE X-POSITION -> IN IMAGE
                this.fieldSelectorImage.x = (markerPositionX*iconsize)+offsetx;
                printXY();
            }
            // KEYBOARD LEFT PRESSED
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT))
                && (markerPositionX >= 0)){
                // CHANGE SELECT POSITION IN GAMEFIELD ( <- )
                markerPositionX -= 1;
                // CHANGE X-POSITION <- IN IMAGE
                this.fieldSelectorImage.x = (markerPositionX*iconsize)+offsetx;
                printXY();
            }

            // KEYBOARD SPACE PRESSED
            // ONE ROUND ++
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
                if(player == playerid){
                    if(isRowFree(markerPositionX)){
                        console.log("Row is free!");
                        var h =getHeigthOfColumn(markerPositionX);
                        console.log( "h: -> " + h);
                        gameField[h][markerPositionX] = playerid;

                    

                        
                        this.add.image((markerPositionX*iconsize)+offsetx, (h*iconsize)+offsety, 'apple');

                        printXY();
                        hasOneWonHorizontal(player);
                        hasOneWonVertical(player);


                    }
                    player = computerid;

                }
                // LET AI PLAy
                if (player == computerid){
                    console.log(">>>>AI<<<<<");
                    var p =letAIplay();
                    console.log("NEW POINT (AI) X:" + p.x + "Y: " + p.y);

                    gameField[p.y][p.x] = computerid;

                    this.add.image((p.x*iconsize)+offsetx, (p.y*iconsize)+offsety, 'fish');
                    hasOneWonHorizontal(player);
                    hasOneWonVertical(player);



                    player = playerid;
                }
            }

        }

           








        // this.add.image((markerPositionX*(iconsize)+offsetx), (markerPositionY*(iconsize))+offsety, 'apple');




    }

    create();
