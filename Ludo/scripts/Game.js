
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

        board.push(new Cell(i,18,35, 37,60));
        i+=1;
        board.push(new Cell(i,18,82, 37, 140));
        i+=1;
        board.push(new Cell(i,66,35, 116, 60));
        i+=1;
        board.push(new Cell(i,66,82, 116, 140));
        i+=1;

        // House GREEN

        board.push(new Cell(i,18,249, 37,418));
        i+=1;
        board.push(new Cell(i,18,297, 37,497));
        i+=1;
        board.push(new Cell(i,66,249, 116,418));
        i+=1;
        board.push(new Cell(i,66,297, 116,497));
        i+=1;

        // House BLUE

        board.push(new Cell(i,233,35 , 395,60));
        i+=1;
        board.push(new Cell(i,233,83 , 395,140));
        i+=1;
        board.push(new Cell(i,281,35 ,  474,60));
        i+=1;
        board.push(new Cell(i,281,83 , 474,140));
        i+=1;

        // House YELLOW

        board.push(new Cell(i,233,249 , 395,418));
        i+=1;
        board.push(new Cell(i,233,297 , 395,497));
        i+=1;
        board.push(new Cell(i,281,249, 474,418));
        i+=1;
        board.push(new Cell(i,281,297, 474,497));
        i+=1;
        
        //#endregion

        //#region  "Board Outer cells"

        //---- Green Area
		
        mConst = 142;
		dConst = 239;
        board.push(new Cell(i,102,mConst , 176,dConst));
        i+=1;
        board.push(new Cell(i,77,mConst , 136,dConst));
        i+=1;
        board.push(new Cell(i,54,mConst , 96,dConst));
        i+=1;
        board.push(new Cell(i,30,mConst , 56,dConst));
        i+=1;
        board.push(new Cell(i,5,mConst , 16,dConst));
        i+=1;
		board.push(new Cell(i,-18,mConst , -23,dConst));
        i+=1;
		
        mConst = 165; 
		dConst = 279;
        board.push(new Cell(i,-18,mConst , -23,dConst));
        i+=1;

        mConst = 189;
		dConst = 319;
        board.push(new Cell(i,-18,mConst , -23,dConst));
        i+=1;
        board.push(new Cell(i,5,mConst , 16,dConst));
        i+=1;
        board.push(new Cell(i,30,mConst , 56,dConst));
        i+=1;
        board.push(new Cell(i,54,mConst , 96,dConst));
        i+=1;
        board.push(new Cell(i,77,mConst , 136,dConst));
        i+=1;
        board.push(new Cell(i,102,mConst , 176,dConst));
        i+=1;


        //---- Yellow Area
		
        mConst = 126;
		dConst = 215;
        board.push(new Cell(i,mConst,213 , dConst,358));
        i+=1;
        board.push(new Cell(i,mConst,237 , dConst,398));
        i+=1;
        board.push(new Cell(i,mConst,261 , dConst,437));
        i+=1;
        board.push(new Cell(i,mConst,285 , dConst,477));
        i+=1;
        board.push(new Cell(i,mConst,309 , dConst,516));
        i+=1;
        board.push(new Cell(i,mConst,332 , dConst,556));
        i+=1; 

		mConst = 150;
		dConst = 255;
        board.push(new Cell(i,mConst,332 , dConst,556));
        i+=1;
	   
        mConst = 173;
		dConst = 295;
        board.push(new Cell(i,mConst,332 , dConst,556));
        i+=1;
        board.push(new Cell(i,mConst,309 , dConst,516));
        i+=1;
        board.push(new Cell(i,mConst,285 , dConst,477));
        i+=1;
        board.push(new Cell(i,mConst,261 , dConst,437));
        i+=1;
        board.push(new Cell(i,mConst,237 , dConst,398));
        i+=1;        
        board.push(new Cell(i,mConst,213 , dConst,358));
        i+=1;
		
		
		//---- Blue Area
		
        mConst = 189;
		dConst = 319;
        board.push(new Cell(i,196,mConst , 333,dConst));
        i+=1;
        board.push(new Cell(i,221,mConst , 373,dConst));
        i+=1;
        board.push(new Cell(i,245,mConst , 413,dConst));
        i+=1;
        board.push(new Cell(i,270,mConst , 453,dConst));
        i+=1;
        board.push(new Cell(i,293,mConst , 493,dConst));
        i+=1;
        board.push(new Cell(i,317,mConst , 533,dConst));
        i+=1;
		
        mConst = 165; 
		dConst = 279;
        board.push(new Cell(i,317,mConst , 533,dConst));
        i+=1;
		
		mConst = 142;
		dConst = 239;
        board.push(new Cell(i,317,mConst , 533,dConst));
        i+=1;
        board.push(new Cell(i,293,mConst , 493,dConst));
        i+=1;
        board.push(new Cell(i,270,mConst , 453,dConst));
        i+=1;
        board.push(new Cell(i,245,mConst , 413,dConst));
        i+=1;
        board.push(new Cell(i,221,mConst , 373,dConst));
        i+=1;        
		board.push(new Cell(i,196,mConst , 333,dConst));
        i+=1;
		
		
		//---- Red Area
		
        mConst = 173;
		dConst = 215;
        board.push(new Cell(i,mConst,118 , dConst,200));
        i+=1;
        board.push(new Cell(i,mConst,94 , dConst,160));
        i+=1;
        board.push(new Cell(i,mConst,71 , dConst,121));
        i+=1;
        board.push(new Cell(i,mConst,45 , dConst,81));
        i+=1;
        board.push(new Cell(i,mConst,23 , dConst,41));
        i+=1;
        board.push(new Cell(i,mConst,-1 , dConst,1));
        i+=1;

        mConst = 150;
		dConst = 255;
        board.push(new Cell(i,mConst,-1 , dConst,1));
        i+=1;

		mConst = 126;
		dConst = 295;
        board.push(new Cell(i,mConst,-1 , dConst,1));
        i+=1;
        board.push(new Cell(i,mConst,23 , dConst,41));
        i+=1;
        board.push(new Cell(i,mConst,45 , dConst,81));
        i+=1;
        board.push(new Cell(i,mConst,71 , dConst,121));
        i+=1;
        board.push(new Cell(i,mConst,94 , dConst,160));
        i+=1;
        board.push(new Cell(i,mConst,118 , dConst,200));
        i+=1;
		
        
        //#endregion

        //#region  "END Cells"
        
		//---- Red Ends
		
		mConst = 150;
		dConst = 255;
        board.push(new Cell(i,mConst,23 , dConst,40));
        i+=1;
        board.push(new Cell(i,mConst,45 , dConst,80));
        i+=1;
        board.push(new Cell(i,mConst,71 , dConst,120));
        i+=1;
        board.push(new Cell(i,mConst,94 , dConst,160));
        i+=1;
        board.push(new Cell(i,mConst,118 , dConst,200));
        i+=1;
        board.push(new Cell(i,mConst,145 , dConst,243));       // Red End
        i+=1;
		
	
		//---- Green Ends
		
        mConst = 165; 
		dConst = 279;
        board.push(new Cell(i,5,mConst , 15,dConst));
        i+=1;
        board.push(new Cell(i,30,mConst , 55,dConst));
        i+=1;
        board.push(new Cell(i,54,mConst , 95,dConst));
        i+=1;
        board.push(new Cell(i,77,mConst , 135,dConst));
        i+=1;
        board.push(new Cell(i,102,mConst , 175,dConst));
        i+=1;
        board.push(new Cell(i,126,mConst , 220,dConst));       // Green End
        i+=1;
		
		
		//---- Yellow Ends
		
        mConst = 150;
		dConst = 255;
        board.push(new Cell(i,mConst,309 , dConst,518));
        i+=1;
        board.push(new Cell(i,mConst,285 , dConst,478));
        i+=1;
        board.push(new Cell(i,mConst,261 , dConst,438));
        i+=1;
        board.push(new Cell(i,mConst,237 , dConst,398));
        i+=1;
        board.push(new Cell(i,mConst,213 , dConst,358));
        i+=1;
        board.push(new Cell(i,mConst,187 , dConst,315));        // Yellow End
        i+=1;
		
		
		//---- Blue Ends
		
        mConst = 165;
		dConst = 279;
        board.push(new Cell(i,293,mConst , 495,dConst));
        i+=1;
        board.push(new Cell(i,270,mConst , 455,dConst));
        i+=1;
        board.push(new Cell(i,245,mConst , 415,dConst));
        i+=1;
        board.push(new Cell(i,221,mConst , 375,dConst));
        i+=1;
        board.push(new Cell(i,196,mConst , 335,dConst));
        i+=1;
        board.push(new Cell(i,170,mConst , 290,dConst));        // Blue End
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
