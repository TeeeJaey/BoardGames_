var mainContentVue = new Vue(); // to put data in HTML

function getAmtString(amt) {
    const rupeeSymbol = " ";
    var amtString = amt.toString();

    if (amtString.length < 4) return rupeeSymbol + amtString;
    else {
        if (amtString.length < 7)
            return rupeeSymbol + amtString.substring(0, amtString.length - 3) + "," + amtString.substring(amtString.length - 3, amtString.length);
        else
            return (
                rupeeSymbol +
                amtString.substring(0, amtString.length - 6) +
                "," +
                amtString.substring(amtString.length - 6, amtString.length - 3) +
                "," +
                amtString.substring(amtString.length - 3, amtString.length)
            );
    }
}

var game = new Game();
var okDisabled = false;

function setTheme() {
    const theme = window.localStorage.getItem("boardgame_theme");
    if (theme && theme == "dark") {
        $("body").addClass("dark");
    } else {
        $("body").removeClass("dark");
    }
}

$(document).ready(function () {
    importNavbar("DealNoDeal", "Deal Or NoDeal");
    setTheme();
    $(document.body).on("click", "#changeTheme", () => {
        if (window.localStorage.boardgame_theme && window.localStorage.boardgame_theme == "dark") {
            window.localStorage.boardgame_theme = "light";
        } else window.localStorage.boardgame_theme = "dark";

        setTheme();
    });

    mainContentVue = new Vue({
        el: "#mainContent",
        data: {
            game: game,
        },
    });

    $(document.body).on("click", ".case", function () {
        if (game.gameOver) return;
        okDisabled = true;

        var selCase = game.getSelectedCase(this.id);

        if (game.chooseCaseIndex < 0) {
            game.chooseCaseIndex += 1;
            game.playerCase = selCase;
            selCase.playerCase = true;
        } else {
            selCase.openCase();

            $("#CaseOpenModal").modal({ backdrop: "static", keyboard: false });
        }
    });

    $(document.body).on("click", "#ok", async function () {
        if (game.gameOver) return;
        if (okDisabled) return;

        $(".caseOutside").slideDown();
        $("#CaseOpenModal").modal("hide");

        if (game.chooseCase[game.chooseCaseIndex] == 0) {
            okDisabled = true;

            await game.showBankOffer(); // Bank Offer
            okDisabled = false;
            game.chooseCaseIndex += 1;
        }
    });

    $(document.body).on("click", "#btnDeal", async function () {
        game.gameOver = true;
        $("#BankOfferModal").modal("hide");
        game.finalWinAmount = game.currentBankOffer;
        $("#GameEndModal").modal({ backdrop: "static", keyboard: false });
    });

    $(document.body).on("click", "#btnNoDeal", async function () {
        $("#BankOfferModal").modal("hide");

        if (game.chooseCaseIndex >= game.chooseCase.length) {
            game.showFinalChoice();
        }

        if (game.chooseCase[game.chooseCaseIndex] == 0) {
            // Bank Offer
            await game.showBankOffer();
            okDisabled = false;
            game.chooseCaseIndex += 1;
        }
    });

    $(document.body).on("click", "#finalOk", async function () {
        game.gameOver = true;
        $("#FinalCaseOpenModal").modal("hide");
        game.finalWinAmount.amt = game.finalCase.moneybar.amount;
        game.finalWinAmount.amtString = game.finalCase.moneybar.amtString;
        $("#GameEndModal").modal({ backdrop: "static", keyboard: false });
    });

    $(document.body).on("click", ".finalCase", async function () {
        $("#FinalChoiceModal").modal("hide");

        game.gameOver = true;
        var finalCase = game.briefcases.find(x => !x.opened & !x.playerCase);
        var playerCase = game.briefcases.find(x => x.playerCase);

        if (this.id == playerCase.id) {
            game.finalCase = playerCase;
            finalCase.opened = true;
            finalCase.moneybar.lost = true;
        } else {
            game.finalCase = finalCase;
            playerCase.opened = true;
            playerCase.moneybar.lost = true;
        }

        $("#FinalCaseOpenModal").modal({ backdrop: "static", keyboard: false });

        await window.setTimeout(() => {
            $(".caseOutside").slideUp("slow");
        }, 800);
    });
});
