const cols = 24;
const rows = 24;

class Game {
    constructor() {
        this.board = this.getNewBoard();
        this.gameOver = false;
        this.status = -1;
        this.score = 0;

        this.snake = new Snake();
    }

    moveUp = () => (this.snake.direction = this.snake.direction == "D" ? "D" : "U");
    moveDown = () => (this.snake.direction = this.snake.direction == "U" ? "U" : "D");
    moveLeft = () => (this.snake.direction = this.snake.direction == "R" ? "R" : "L");
    moveRight = () => (this.snake.direction = this.snake.direction == "L" ? "L" : "R");

    getNewBoard() {
        var newBoard = [];

        for (var i = 0; i < rows; i++) {
            newBoard.push([]);
            for (var j = 0; j < cols; j++) {
                newBoard[i].push(new Cell(i, j));
            }
        }

        return newBoard;
    }

    spawnFood() {
        let placeFood = false;

        while (!placeFood) {
            const foodRow = Math.floor(Math.random() * rows);
            const foodCol = Math.floor(Math.random() * cols);
            const foodCell = game.board[foodRow][foodCol];

            if (!foodCell.isDanger && !foodCell.isSnake) {
                placeFood = true;
                foodCell.setFood();
            }
        }
    }

    getBoardCellByID(cellID) {
        var i = cellID.split(":")[0];
        var j = cellID.split(":")[1];
        return game.board[i][j];
    }

    resetTimer() {
        var self = this;
        self.spawnFood();
        clearInterval(self.gameInterval);
        self.gameInterval = window.setInterval(function () {
            self.snake.move();
            self.snake.paint();
        }, self.snake.speed);
    }

    endGame() {
        clearInterval(this.gameInterval);
        this.gameOver = true;
        this.status = 1;
    }
}
