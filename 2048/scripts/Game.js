class Game {
    constructor() {}

    setupBoard() {
        this.gameBoard = $("#theBoard")[0];
        this.grid = new Grid(this.gameBoard);
        this.grid.randomEmptyCell().tile = new Tile(this.gameBoard);
        this.grid.randomEmptyCell().tile = new Tile(this.gameBoard);
        this.moves = 0;
    }

    setupInput() {
        const options = { once: true };
        window.addEventListener("keydown", this.handleInput, options);

        $("#btnUp")[0].addEventListener("click", () => this.handleInput({ key: "ArrowUp" }), options);
        $("#btnLeft")[0].addEventListener("click", () => this.handleInput({ key: "ArrowLeft" }), options);
        $("#btnRight")[0].addEventListener("click", () => this.handleInput({ key: "ArrowRight" }), options);
        $("#btnDown")[0].addEventListener("click", () => this.handleInput({ key: "ArrowDown" }), options);
    }

    async handleInput(e) {
        switch (e.key) {
            case "ArrowUp":
            case "w":
                if (!game.canMoveUp()) {
                    game.setupInput();
                    return;
                }
                game.moves++;
                await game.moveUp();
                break;

            case "ArrowDown":
            case "s":
                if (!game.canMoveDown()) {
                    game.setupInput();
                    return;
                }
                game.moves++;
                await game.moveDown();
                break;

            case "ArrowLeft":
            case "a":
                if (!game.canMoveLeft()) {
                    game.setupInput();
                    return;
                }
                game.moves++;
                await game.moveLeft();
                break;

            case "ArrowRight":
            case "d":
                if (!game.canMoveRight()) {
                    game.setupInput();
                    return;
                }
                game.moves++;
                await game.moveRight();
                break;

            default:
                game.setupInput();
                return;
        }

        game.grid.cells.forEach(cell => cell.mergeTiles());

        const newTile = new Tile(game.gameBoard);
        game.grid.randomEmptyCell().tile = newTile;

        if (!game.canMoveUp() && !game.canMoveDown() && !game.canMoveLeft() && !game.canMoveRight()) {
            game.gameOver();

            return;
        }

        game.setupInput();
    }

    moveUp() {
        return this.slideTiles(this.grid.cellsByColumn);
    }

    moveDown() {
        return this.slideTiles(this.grid.cellsByColumn.map(column => [...column].reverse()));
    }

    moveLeft() {
        return this.slideTiles(this.grid.cellsByRow);
    }

    moveRight() {
        return this.slideTiles(this.grid.cellsByRow.map(row => [...row].reverse()));
    }

    slideTiles(cells) {
        return Promise.all(
            cells.flatMap(group => {
                const promises = [];
                for (let i = 1; i < group.length; i++) {
                    const cell = group[i];
                    if (cell.tile == null) continue;
                    let lastValidCell;
                    for (let j = i - 1; j >= 0; j--) {
                        const moveToCell = group[j];
                        if (!moveToCell.canAccept(cell.tile)) break;
                        lastValidCell = moveToCell;
                    }

                    if (lastValidCell != null) {
                        promises.push(cell.tile.waitForTransition());
                        if (lastValidCell.tile != null) {
                            lastValidCell.mergeTile = cell.tile;
                        } else {
                            lastValidCell.tile = cell.tile;
                        }
                        cell.tile = null;
                    }
                }
                return promises;
            }),
        );
    }

    canMoveUp() {
        return this.canMove(this.grid.cellsByColumn);
    }

    canMoveDown() {
        return this.canMove(this.grid.cellsByColumn.map(column => [...column].reverse()));
    }

    canMoveLeft() {
        return this.canMove(this.grid.cellsByRow);
    }

    canMoveRight() {
        return this.canMove(this.grid.cellsByRow.map(row => [...row].reverse()));
    }

    canMove(cells) {
        return cells.some(group => {
            return group.some((cell, index) => {
                if (index === 0) return false;
                if (cell.tile == null) return false;
                const moveToCell = group[index - 1];
                return moveToCell.canAccept(cell.tile);
            });
        });
    }

    gameOver() {
        $("#gameControls").css("display", "none");
        $("#endControls").css("display", "");

        let total = 0;
        game.grid.cells.forEach(cell => {
            if (cell.tile) {
                total += cell.tile.value;
            }
        });

        $("#score")[0].innerHTML = Math.ceil(total / this.moves);
    }
}
