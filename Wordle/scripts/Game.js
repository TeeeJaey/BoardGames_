const ColorConstant = {
    yes: "#538d4e",
    maybe: "#c9b458",
    no: "#787c7e",
};

class Game {
    buildNewGame() {
        this.correctWord = WordLibrary.getRandomWord();
        this.currentWord = "";
        this.attempt = 0;

        const fullBoard = [];

        for (let i = 0; i < 7; i += 1) {
            fullBoard.push([]);
            for (let j = 0; j < 5; j += 1) {
                fullBoard[i].push(new Cell(i, j));
            }
        }

        this.board = fullBoard;

        const keys = ["qwertyuiop".split(""), "asdfghjkl".split(""), "zxcvbnm".split("")];
        keys[2] = ["bksp", ...keys[2], "enter"];

        this.keyboard = [[], [], []];
        let k = 0;
        keys.forEach(row => {
            row.forEach(key => {
                this.keyboard[k].push(new Key(key));
            });
            k++;
        });
    }

    colorKeyboard() {
        const maybes = [];
        const nos = [];
        for (let i = 0; i < this.attempt; i += 1) {
            for (let j = 0; j < 5; j += 1) {
                if (this.board[i][j].background == ColorConstant.yes) {
                    maybes.push(this.board[i][j].value);
                } else if (this.board[i][j].background == ColorConstant.maybe) {
                    maybes.push(this.board[i][j].value);
                } else if (this.board[i][j].background == ColorConstant.no) {
                    nos.push(this.board[i][j].value);
                }
            }
        }

        this.keyboard.forEach(row => {
            row.forEach(key => {
                if (maybes.includes(key.value)) {
                    key.setKey(key.value, ColorConstant.maybe);
                } else if (nos.includes(key.value)) {
                    key.setKey(key.value, ColorConstant.no);
                }
            });
        });
    }

    hitLetter(input) {
        if (input == "bksp") {
            this.currentWord = this.currentWord.substring(0, this.currentWord.length - 1);
            this.refreshUI();
            return;
        }

        if (input == "enter") {
            if (this.currentWord.length == 5) {
                const isWordValid = WordLibrary.checkIfValid(this.currentWord);

                if (isWordValid) {
                    this.colorCurrentRow();
                    if (this.currentWord === this.correctWord) {
                        gameOver = true;
                        setToaster("You won in : " + (this.attempt + 1) + " attempts.");
                        this.refreshUI();
                        return;
                    }
                } else {
                    setToaster("Invalid Word!");
                    return;
                }

                if (this.attempt > 5) {
                    setToaster("You Lost!");
                    gameOver = true;
                    this.refreshUI();
                }

                this.currentWord = "";
                this.attempt++;
                this.colorKeyboard();

                return;
            } else {
                setToaster("You must fill up 5 letters!");
                return;
            }
        }

        if (this.currentWord.length < 5) {
            this.currentWord += input;
            this.refreshUI();
        }
    }

    colorCurrentRow() {
        for (let i = 0; i < 5; i += 1) {
            let letter = this.currentWord[i];
            if (letter == this.correctWord[i]) {
                this.board[this.attempt][i].setCell(letter, ColorConstant.yes);
            } else if (this.correctWord.includes(letter)) {
                this.board[this.attempt][i].setCell(letter, ColorConstant.maybe);
            } else {
                this.board[this.attempt][i].setCell(letter, ColorConstant.no);
            }
        }
    }

    refreshUI() {
        for (let i = 0; i < 5; i += 1) {
            let letter = this.currentWord[i];
            if (!letter) letter = "";
            this.board[this.attempt][i].setCell(letter);
        }

        mainContentVue.game = this;
        mainContentVue.gameOver = gameOver;
    }
}
