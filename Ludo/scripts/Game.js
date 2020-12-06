

class Game 
{
	constructor()
	{
        this.gameStatus = -1;
        this.gameOver = false;
        
		this.nmbrOfPlayers = 2;
        this.players = [];
        this.currPlayer = 0;
        
        this.board = this.setupBoard();
        
        this.diceVal = 0;
    }
    
    setupBoard()
    {
        var board = [];
        var i = 0;
        var mConst = 0;
        var dConst = 0;

        //#region  "Houses"

        // House RED

        board.push(new Cell(i,18,35));
        i+=1;
        board.push(new Cell(i,18,82));
        i+=1;
        board.push(new Cell(i,66,35));
        i+=1;
        board.push(new Cell(i,66,82));
        i+=1;

        // House GREEN

        board.push(new Cell(i,18,249));
        i+=1;
        board.push(new Cell(i,18,297));
        i+=1;
        board.push(new Cell(i,66,249));
        i+=1;
        board.push(new Cell(i,66,297));
        i+=1;

        // House BLUE

        board.push(new Cell(i,233,35));
        i+=1;
        board.push(new Cell(i,233,83));
        i+=1;
        board.push(new Cell(i,281,35));
        i+=1;
        board.push(new Cell(i,281,83));
        i+=1;

        // House YELLOW

        board.push(new Cell(i,233,249));
        i+=1;
        board.push(new Cell(i,233,297));
        i+=1;
        board.push(new Cell(i,281,249));
        i+=1;
        board.push(new Cell(i,281,297));
        i+=1;
        
        //#endregion

        //#region  "Board Outer cells"

        //---- Green Area
		
        mConst = 142;
        board.push(new Cell(i,102,mConst));
        i+=1;
        board.push(new Cell(i,77,mConst));
        i+=1;
        board.push(new Cell(i,54,mConst));
        i+=1;
        board.push(new Cell(i,30,mConst));
        i+=1;
        board.push(new Cell(i,5,mConst));
        i+=1;
		board.push(new Cell(i,-18,mConst));
        i+=1;
		
        mConst = 165;
        board.push(new Cell(i,-18,mConst));
        i+=1;

        mConst = 189;
        board.push(new Cell(i,-18,mConst));
        i+=1;
        board.push(new Cell(i,5,mConst));
        i+=1;
        board.push(new Cell(i,30,mConst));
        i+=1;
        board.push(new Cell(i,54,mConst));
        i+=1;
        board.push(new Cell(i,77,mConst));
        i+=1;
        board.push(new Cell(i,102,mConst));
        i+=1;


        //---- Yellow Area
		
        mConst = 126;
        board.push(new Cell(i,mConst,213));
        i+=1;
        board.push(new Cell(i,mConst,237));
        i+=1;
        board.push(new Cell(i,mConst,261));
        i+=1;
        board.push(new Cell(i,mConst,285));
        i+=1;
        board.push(new Cell(i,mConst,309));
        i+=1;
        board.push(new Cell(i,mConst,332));
        i+=1;
	   
        mConst = 150;
        board.push(new Cell(i,mConst,332));
        i+=1;
	   
        mConst = 173;
        board.push(new Cell(i,mConst,332));
        i+=1;
        board.push(new Cell(i,mConst,309));
        i+=1;
        board.push(new Cell(i,mConst,285));
        i+=1;
        board.push(new Cell(i,mConst,261));
        i+=1;
        board.push(new Cell(i,mConst,237));
        i+=1;        
        board.push(new Cell(i,mConst,213));
        i+=1;
		
		
		//---- Blue Area
		
        mConst = 189;
        board.push(new Cell(i,196,mConst));
        i+=1;
        board.push(new Cell(i,221,mConst));
        i+=1;
        board.push(new Cell(i,245,mConst));
        i+=1;
        board.push(new Cell(i,270,mConst));
        i+=1;
        board.push(new Cell(i,293,mConst));
        i+=1;
        board.push(new Cell(i,317,mConst));
        i+=1;
		
        mConst = 165;
        board.push(new Cell(i,317,mConst));
        i+=1;
		
		mConst = 142;
        board.push(new Cell(i,317,mConst));
        i+=1;
        board.push(new Cell(i,293,mConst));
        i+=1;
        board.push(new Cell(i,270,mConst));
        i+=1;
        board.push(new Cell(i,245,mConst));
        i+=1;
        board.push(new Cell(i,221,mConst));
        i+=1;        
		board.push(new Cell(i,196,mConst));
        i+=1;
		
		
		//---- Red Area
		
        mConst = 173;
        board.push(new Cell(i,mConst,118));
        i+=1;
        board.push(new Cell(i,mConst,94));
        i+=1;
        board.push(new Cell(i,mConst,71));
        i+=1;
        board.push(new Cell(i,mConst,45));
        i+=1;
        board.push(new Cell(i,mConst,23));
        i+=1;
        board.push(new Cell(i,mConst,-1));
        i+=1;

        mConst = 150;
        board.push(new Cell(i,mConst,-1));
        i+=1;

		mConst = 126;
        board.push(new Cell(i,mConst,-1));
        i+=1;
        board.push(new Cell(i,mConst,23));
        i+=1;
        board.push(new Cell(i,mConst,45));
        i+=1;
        board.push(new Cell(i,mConst,71));
        i+=1;
        board.push(new Cell(i,mConst,94));
        i+=1;
        board.push(new Cell(i,mConst,118));
        i+=1;
		
        
        //#endregion

        //#region  "END Cells"
        
		//---- Red Ends
		
		mConst = 150;
        board.push(new Cell(i,mConst,23));
        i+=1;
        board.push(new Cell(i,mConst,45));
        i+=1;
        board.push(new Cell(i,mConst,71));
        i+=1;
        board.push(new Cell(i,mConst,94));
        i+=1;
        board.push(new Cell(i,mConst,118));
        i+=1;
        board.push(new Cell(i,mConst,145));        // Red End
        i+=1;
		
	
		//---- Green Ends
		
        mConst = 165; 
        board.push(new Cell(i,5,mConst));
        i+=1;
        board.push(new Cell(i,30,mConst));
        i+=1;
        board.push(new Cell(i,54,mConst));
        i+=1;
        board.push(new Cell(i,77,mConst));
        i+=1;
        board.push(new Cell(i,102,mConst));
        i+=1;
        board.push(new Cell(i,126,mConst));        // Green End
        i+=1;
		
		
		//---- Yellow Ends
		
        mConst = 150;
        board.push(new Cell(i,mConst,309));
        i+=1;
        board.push(new Cell(i,mConst,285));
        i+=1;
        board.push(new Cell(i,mConst,261));
        i+=1;
        board.push(new Cell(i,mConst,237));
        i+=1;
        board.push(new Cell(i,mConst,213));
        i+=1;
        board.push(new Cell(i,mConst,187));        // Yellow End
        i+=1;
		
		
		//---- Blue Ends
		
        mConst = 165;
        board.push(new Cell(i,293,mConst));
        i+=1;
        board.push(new Cell(i,270,mConst));
        i+=1;
        board.push(new Cell(i,245,mConst));
        i+=1;
        board.push(new Cell(i,221,mConst));
        i+=1;
        board.push(new Cell(i,196,mConst));
        i+=1;
        board.push(new Cell(i,170,mConst));        // Yellow End
        i+=1;
		

        //#endregion
        
        return board;
    }

    setupPlayers()
    {
        this.nmbrOfPlayers = parseInt($("input[name='nmbrOfPlayers']:checked").val());
        
        var i = 0;
        var color = "red";
        while(i < this.nmbrOfPlayers)
        {
            if(i == 0)
                color = "red";
            if(i == 1)
                color = "green";
            if(i == 2)
                color = "blue";
            if(i == 3)
                color = "yellow";
            this.players.push(new Player(color));
            i+=1;
        }

        if(this.nmbrOfPlayers < 4)
        {
            $("#yellowCoin0").remove();
            $("#yellowCoin1").remove();
            $("#yellowCoin2").remove();
            $("#yellowCoin3").remove();

            if(this.nmbrOfPlayers < 3)
            {
                $("#blueCoin0").remove();
                $("#blueCoin1").remove();
                $("#blueCoin2").remove();
                $("#blueCoin3").remove();
            }
        }

        this.instruction = this.players[this.currPlayer].color + " play";

        $('.coin').css({"display":"" });

    }

    ResizeUI()
    {
        for(var i = 0 ; i < this.nmbrOfPlayers ; i +=1)
        {
            var player = this.players[i];
            for(var j = 0 ; j < 4 ; j +=1)
            {
                player.coins[j].displayCoin();
            }
        }
    }
}
