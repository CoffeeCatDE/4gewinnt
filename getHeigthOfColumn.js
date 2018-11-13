module.exports = function (column) {
    var stones = 5;
    for (stones; stones >= 0; stones = stones-1){
        // FREE FOR MIN. 1 STONE
        if (gameField[stones][column] == 0){
            break;
        }
        if (gameField[stones][column] == 1 || gameField[stones][column] == 2 ){
        }
    }

    console.log( "Free Stones in Column(" +  column+"): " + stones);

    return stones;

}