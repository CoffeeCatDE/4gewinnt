var assert = require('chai').assert;
const app = require('../isRowFree');
const app2 = require('../getHeigthOfColumn');


describe('function', function(){
    it('should be free', function(){
        gameField = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1]
        ];

        var result = app(6);
        assert.equal(result, true);
    })
});