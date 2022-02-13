class Cell {
    constructor(i, j) {
        this.id = i + ":" + j;
        this.x = i;
        this.y = j;
        this.color = "black";
        this.background = "white";
        this.value = "";

        return;
    }

    setCell(letter, background) {
        this.value = letter;
        if (background) {
            this.color = "white";
            this.background = background;
        }
    }
}
