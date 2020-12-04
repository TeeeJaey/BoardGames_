

class Moneybar
{
    constructor(i, amt)
    {
        this.index = i;
        this.lost = false;
        this.amount = amt;
        this.amtString = getAmtString(amt);
        this.id = "money:"+i;
        return;
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
        this.playerCase=false;
        return;
    }

    async openCase()
    {
        if(game.chooseCase[game.chooseCaseIndex] == 0) return;
        await window.setTimeout( () =>
        {
            $(".caseOutside").slideUp();
            okDisabled = false;
            this.opened = true;
            this.moneybar.lost = true;
        }, 800);

        game.chooseCase[game.chooseCaseIndex] -= 1;
        return;
    }
}
