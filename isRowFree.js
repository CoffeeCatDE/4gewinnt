const app2 = require('./getHeigthOfColumn');

// IS ROW FREE OR FULL
    /***
     *
     * @returns {boolean}
     *  true = free
     *  false = full
     */
    module.exports = function (row) {

        // ROW IS FULL
        if (gameField[0][row] == 1 ||
            gameField[0][row] == 2){
                console.log(gameField);
                console.log("ROW (" + row + ") is full!");
                return false;
        }
        // ROW IS FREE
        else {
            var hh = app2(row);
            console.log ("Free Stones: " + hh);
            return true;
        }
    }