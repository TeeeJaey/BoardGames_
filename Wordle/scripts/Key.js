class Key {
    constructor(letter) {
        this.color = "black";
        this.background = "white";
        this.value = letter;
        return;
    }

    setKey(letter, background) {
        this.value = letter;
        if (background) {
            this.color = "white";
            this.background = background;
        }
    }
}
