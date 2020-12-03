
var mainContentVue = new Vue();       // to put data in HTML 

class Moneybar
{
    constructor(i, amt)
    {
        this.index = i;
        this.lost = false;
        this.amount = amt;
        this.amtString = this.getAmtString();
        this.id = "money:"+i;
    }

    getAmtString()
    {
        const rupeeSymbol = " ";
        var amt = this.amount.toString();

        if(amt.length < 4)
            return rupeeSymbol + amt;
        else
        {
            if(amt.length < 7)
                return  rupeeSymbol + amt.substring(0, amt.length-3) + ',' + amt.substring(amt.length - 3, amt.length);
            else
                return rupeeSymbol + amt.substring(0, amt.length-6) + ',' + amt.substring(amt.length-6, amt.length-3) + ',' + amt.substring(amt.length - 3, amt.length);
        }
    }

}

class Briefcase
{
    constructor(i,moneybar)
    {
        this.caseNumber = i;
        this.moneybar = moneybar;
        this.opened = false;
        this.id = "case:"+i;
    }

    openCase()
    {

        window.setTimeout( () =>
        {
            $(".caseOutside").slideUp();
            okDisabled = false;
            this.opened = true;
            this.moneybar.lost = true;
        }, 800);

        game.chooseCase[game.chooseCaseIndex] -= 1;
        if(game.chooseCase[game.chooseCaseIndex] == 0)
        {
            // Bank Offer
            game.showBankOffer();
            game.chooseCaseIndex += 1;
        }

    }
}

class Game
{
    constructor()
    {
        this.moneybars = this.getMoneybars();
        this.briefcases = this.getBriefcases();

        this.playerCase = 0;

        this.chooseCase = [6,5,4,3,2,1,1]
        this.chooseCaseIndex = 0;

        this.previousBankOffers = [];
        this.currentBankOffer = 0;
        this.currSelCase = 0;

        this.gameOver = false;
    }

    getMoneybars()
    {
        var moneybars = [];

        moneybars.push(new Moneybar(0, 1));
        moneybars.push(new Moneybar(1, 5));
        moneybars.push(new Moneybar(2, 10));
        moneybars.push(new Moneybar(3, 25));
        moneybars.push(new Moneybar(4, 50));
        moneybars.push(new Moneybar(5, 75));

        moneybars.push(new Moneybar(6, 100));
        moneybars.push(new Moneybar(7, 200));
        moneybars.push(new Moneybar(8, 300));
        moneybars.push(new Moneybar(9, 400));
        moneybars.push(new Moneybar(10, 500));
        moneybars.push(new Moneybar(11, 750));

        moneybars.push(new Moneybar(12, 1000));
        moneybars.push(new Moneybar(13, 5000));
        moneybars.push(new Moneybar(14, 10000));
        moneybars.push(new Moneybar(15, 25000));
        moneybars.push(new Moneybar(16, 50000));
        moneybars.push(new Moneybar(17, 75000));

        moneybars.push(new Moneybar(18, 100000));
        moneybars.push(new Moneybar(19, 200000));
        moneybars.push(new Moneybar(20, 300000));
        moneybars.push(new Moneybar(21, 400000));
        moneybars.push(new Moneybar(22, 500000));
        moneybars.push(new Moneybar(23, 1000000));

        return moneybars;
    }

    getBriefcases()
    {
        var briefcases = [];


        var i = 1;
        while(i <= 24)
        {
            var randomMoneyBarIndex = Math.ceil( Math.random() * 24); 
            
            if(!briefcases.some(x => x.moneybar == this.moneybars[randomMoneyBarIndex]))
            {
                briefcases.push( new Briefcase(i,this.moneybars[randomMoneyBarIndex]) );
                i += 1;
            }
        }

        return briefcases;
    }

    getSelectedCase(divID)
    {
        this.currSelCase = parseInt(divID.split(':')[1] - 1);
        return this.briefcases[this.currSelCase];
    }

    showBankOffer()
    {

    }
}

var game = new Game();
var okDisabled = false;

$(document).ready(function()
{
    importNavbar("DealNoDeal", "Deal Or NoDeal");
    
    mainContentVue = new Vue({
        el: '#mainContent',
        data: {
            game : game
        }
    }); 
    
    
    $(document.body).on('click',".case", function()
    {
        okDisabled = true;

        $("#CaseOpenModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#CaseOpenModal").modal('show');
        
        var selCase = game.getSelectedCase(this.id);
        selCase.openCase();
        
    });


    $(document.body).on('click',"#ok", function()
    {
        if(okDisabled) return;
        $("#CaseOpenModal").modal('hide');
        $(".caseOutside").slideDown();
    });


});