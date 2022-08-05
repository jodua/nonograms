import Field from "./Field";

class GameState {
    constructor(nonogram) {
        this.nonogram = nonogram;
        this.fields = this.convertToFields(nonogram);
        this.clues = this.convertToClues(nonogram);
    }

    convertToFields(nonogram) {
        let fields = [];
        for (let i = 0; i < nonogram.length; i++) {
            let row = [];
            for (let j = 0; j < nonogram[i].length; j++) {
                row.push(new Field(i, j));
            }
            fields.push(row);
        }
        return fields;
    }

    convertToClues(nonogram) {
        let clues = {
            horizontal: [],
            vertical: []
        }

        for (const row of nonogram) {
            let rowClues = [];
            let clueValue = 0;
            for (const cell of row) {
                if (cell === 1) {
                    clueValue++;
                }
                else {
                    if (clueValue > 0) {
                        rowClues.push(clueValue);
                        clueValue = 0;
                    }
                }
            }
            clueValue !== 0 && rowClues.push(clueValue)
            clues.vertical.push(rowClues);
        }

        const transposed = nonogram[0].map((_, colIndex) => nonogram.map(row => row[colIndex]));

        for (const row of transposed) {
            let rowClues = [];
            let clueValue = 0;
            for (const cell of row) {
                if (cell === 1) {
                    clueValue++;
                }
                else {
                    if (clueValue > 0) {
                        rowClues.push(clueValue);
                        clueValue = 0;
                    }
                }
            }
            clueValue !== 0 && rowClues.push(clueValue)
            clues.horizontal.push(rowClues);
        }

        return clues;
    }
}

export default GameState;