var mainContentVue = new Vue(); // to put data in HTML x
var game = new Game();

function setTheme() {
    const theme = window.localStorage.getItem("boardgame_theme");
    if (theme && theme == "dark") {
        $("body").addClass("dark");
    } else {
        $("body").removeClass("dark");
    }
}

$(document).ready(function () {
    importNavbar("snake", "Snake");
    setTheme();
    $(document.body).on("click", "#changeTheme", () => {
        if (window.localStorage.boardgame_theme && window.localStorage.boardgame_theme == "dark") {
            window.localStorage.boardgame_theme = "light";
        } else window.localStorage.boardgame_theme = "dark";

        setTheme();
    });

    //$('#gameUnderDev').css("display","");

    mainContentVue = new Vue({
        el: "#mainContent",
        data: {
            game: game,
        },
    });

    $(document).on("keydown", function (e) {
        var key = e.keyCode || e.which;
        switch (key) {
            case 37:
            case 65: {
                // a and left
                e.preventDefault();
                game.moveLeft();
                break;
            }
            case 39:
            case 68: {
                // d and right
                e.preventDefault();
                game.moveRight();
                break;
            }
            case 38:
            case 87: {
                // w and up
                e.preventDefault();
                game.moveUp();
                break;
            }
            case 40:
            case 83: {
                // s and down
                e.preventDefault();
                game.moveDown();
                break;
            }
        }
    });

    $(document.body).on("click", "#start", function () {
        game.status = 0;
        game.resetTimer();
    });

    $(document.body).on("click", "#btnLeft", () => game.moveLeft());
    $(document.body).on("click", "#btnRight", () => game.moveRight());
    $(document.body).on("click", "#btnUp", () => game.moveUp());
    $(document.body).on("click", "#btnDown", () => game.moveDown());
});
