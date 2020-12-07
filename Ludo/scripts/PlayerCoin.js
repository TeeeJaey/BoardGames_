
class PlayerCoin 
{
    constructor(id,color,pos)
    {
        this.id = id;
        this.color = color;
        
        this.playerNumber = 0;
        if(color == "green")  
            this.playerNumber = 1;
        if(color == "blue")  
            this.playerNumber = 2;
        if(color == "yellow")  
            this.playerNumber = 3;

        this.homePos = pos;
        this.currPos = -1;                  // -1 - HOME -- 0 onwards cells in Player.path
        this.location = game.board[pos];
        
        this.started = false;
        this.ended = false;

        this.displayCoin();
    }

    displayCoin()
    {
        var startTop = this.location.dTopVal;
        var startLeft = this.location.dLeftVal;

        if(mobileUI)
        {
            startTop = this.location.mTopVal;
            startLeft = this.location.mLeftVal;
        }
        
        $("#"+this.id).css({"top":startTop , "left":startLeft});
    }
}