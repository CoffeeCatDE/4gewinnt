

/**
 * TEST hasOneWonVertical FUNCTION
 */
describe('test the hasOneWonVertical function', () => {
        it('winning gameField (left Border)', () => {
            // arrange
          // let bool = false;
          gameField = [
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [2, 0, 0, 0, 0, 0, 0],
              [2, 0, 0, 0, 0, 0, 0],
              [2, 0, 0, 0, 0, 0, 0],
              [2, 0, 0, 0, 0, 0, 0]
          ];

          

            // act
            let result1 = hasOneWonVertical(2);
            expect(result1).toBe(2);

           
        });

        it('winnig GameField (right Border)', () => {
          gameField = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 2]
          ];

          let result2 = hasOneWonVertical(2);
          expect(result2).toBe(2);
        });

        it('winnig GameField (left top Border)', () => {
          gameField = [
            [2, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0]
          ];

          let result2 = hasOneWonVertical(2);
          expect(result2).toBe(2);
        });

         it('winnig GameField (right top Border)', () => {
          gameField = [
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1]
          ];

          let result2 = hasOneWonVertical(2);
          expect(result2).toBe(2);
        });
    });

/**
 * TEST hasOneWonHorizontal FUNCTION
 */
    describe('test the hasOneWonHorizontal function', () => {
      it('winning gameField (left Border)', () => {
          // arrange
        // let bool = false;
        gameField = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 0, 0, 0]
        ];

          // act
          let result1 = hasOneWonHorizontal(2);
          expect(result1).toBe(2);

         
      });

      it('winnig GameField (right Border)', () => {
        gameField = [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 2, 2, 2, 2]
        ];

        let result2 = hasOneWonHorizontal(2);
        expect(result2).toBe(2);
      });

      it('winnig GameField (left top Border)', () => {
        gameField = [
          [2, 2, 2, 2, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0]
        ];

        let result2 = hasOneWonHorizontal(2);
        expect(result2).toBe(2);
      });

       it('winnig GameField (right top Border)', () => {
        gameField = [
          [0, 0, 0, 2, 2, 2, 2],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0]
        ];

        let result2 = hasOneWonHorizontal(2);
        expect(result2).toBe(2);
      });
  });