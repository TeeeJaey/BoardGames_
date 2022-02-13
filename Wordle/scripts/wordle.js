var gameOver = false;
var mainContentVue = new Vue(); // to put data in HTML
var game = new Game();
game.buildNewGame();

function setToaster(msg) {
    const toaster = $(".toaster")[0];
    toaster.textContent = msg;
    toaster.style.opacity = 1;

    setTimeout(() => (toaster.style.opacity = 0), 2000);
}

$(document).ready(function () {
    importNavbar("wordle", "Wordle");

    mainContentVue = new Vue({
        el: "#mainContent",
        data: {
            game: game,
            gameOver: false,
        },
    });

    game.refreshUI();

    $(document).on("keydown", function (e) {
        if (gameOver) return;

        const keyCode = e.keyCode || e.which;

        if (keyCode == 8) {
            game.hitLetter("bksp");
            e.preventDefault();
            return;
        }
        if (keyCode == 13) {
            game.hitLetter("enter");
            e.preventDefault();
            return;
        }

        const keyValue = e.key;
        let validKey = false;
        game.keyboard.forEach(row => {
            if (row.find(k => k.value === keyValue)) validKey = true;
        });

        if (validKey) {
            game.hitLetter(keyValue);
            e.preventDefault();
            return;
        }
    });

    $(document.body).on("click", ".keyboardCell", function () {
        if (gameOver) return;
        game.hitLetter(this.value);
    });

    $(document.body).on("click", "#btnNewGame", function () {
        localStorage.boardgame_sudoku = undefined;
        document.location.reload(true);
    });
});
