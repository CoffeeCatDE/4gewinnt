var width = 460;
var gameField = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0]
        ];
var gameOver = false;
		
		

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
                        console.log("HUHU");
                        return whoIsPlayer;
                }





            }
        }
    }
