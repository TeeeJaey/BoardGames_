
class Game
{
    constructor()
    {
        this.moneybars = this.getMoneybars();
        this.briefcases = this.getBriefcases();

        this.playerCase = 0;

        this.chooseCase = [6,5,4,3,2,1,1]
        this.chooseCaseIndex = -1;

        this.previousBankOffers = [];
        this.currentBankOffer = {amt:0,amtString:'0'};
        this.currSelCase = 0;

        this.finalCase = this.briefcases[0];
        this.finalChoice = [this.briefcases[0],this.briefcases[1]];
        this.finalWinAmount = {amt:0,amtString:'0'};
        this.gameOver = false;
        return;
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
            var randomMoneyBarIndex = Math.floor( Math.random() * 24) 
            
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
        var moneyLeft = 0;
        var moneyCount = 0;
        
        for(var i =0; i < this.moneybars.length; i+=1)
        {
            if(!this.moneybars[i].lost)
            {
                moneyLeft += this.moneybars[i].amount;
                moneyCount += 1;
            }
        }
        var offerAmt = Math.floor(moneyLeft / moneyCount);

        this.currentBankOffer = {amt:offerAmt,amtString: getAmtString(offerAmt)};
        this.previousBankOffers.push( this.currentBankOffer );

        $("#BankOfferModal").modal({backdrop: 'static', keyboard: false});
        return;
    }

    showFinalChoice()
    {
        this.finalChoice = [];
        this.finalChoice.push(this.playerCase);
        
        var finalCase = this.briefcases.find(x => !x.opened & !x.playerCase);
        this.finalChoice.push(finalCase);
         
        $("#FinalChoiceModal").modal({backdrop: 'static', keyboard: false}); 
        
        return;
    }

}