
$(document).ready(function()
{

	var gameStarted = false;
	var isChanceOn = false;
	var gameOver = false;
	
	var nmbrOfPlayers = 2;
	var currPlayer = 0;
    var diceVal1 = 0;
    var diceVal2 = 0;
    var diceValTotal = diceVal1 + diceVal2;
    var rupeeSym = "&#x20b9;";

    $(".coin").css("display","none");
	$("#startcontrols").css("display","");
	$("#gameControls").css("display","none");
    $("#endControls").css("display","none");
    

	$("#btnRules").click(function()
	{
        $("#allRules").animate({"right":"0%"});

    });
	$("#closeRules").click(function()
	{
        $("#allRules").animate({"right":"-500px"});
    });

	$("#btnTrade").click(function()
	{
		if(gameStarted)
	        $("#TradeTray").animate({"right":"0%"});
    });
	$("#closeTrade").click(function()
	{
        $("#TradeTray").animate({"right":"-650px"});
    });
	$("#closeTrade").click(function()
	{
        $("#TradeTray").animate({"right":"-650px"});
    });
	
	

	class Cell 
	{
        constructor(cellName,colorGroup,position,topVal,leftVal,isUtility,isCity,
            price,cardImage,constructionPrice,mortgagePrice,houseRent,hotelRent)  
		{
            this.cellName = cellName;
			this.colorGroup = colorGroup;
			this.position = position; 
			this.topVal = topVal;
            this.leftVal = leftVal;
            
            this.isUtility = isUtility;
            this.isCity = isCity;


            if(isCity || isUtility)
            {
                this.price = price;
                this.cardImage = cardImage;
                this.owner = -1;
                this.currRent = 0;
                this.mortgagePrice = mortgagePrice;
			}
			
            if(isCity)
            {
                this.constructionPrice = constructionPrice;
                this.isMortaged = false;        

                this.houseRent = houseRent;     // [price1,price2,prcie3,price4]
                this.houses = 0;                // 0 - number of houses

                this.hotelRent = hotelRent;
                this.hotel = false;             // currentstatus of hotel
            }
		}
	}
	
	class Player 
	{
		constructor(color,position,topVal,leftVal,properties) 
		{
			this.color = color;
			this.position = position;
			this.topVal = topVal;
			this.leftVal = leftVal;
			this.properties = properties; // [0,3,7 .. ]
		}
	}


	var board = [];
	function setupBoard()
	{
		var cardImgLocation = "images/properies/";

		board[0] = new Cell(cellName="Go",colorGroup=0,position=0,topVal=520,leftVal=530,isUtility=false,isCity=false);
		
		board[1] = new Cell(cellName="Guwahati",colorGroup=1,position=1,topVal=520,leftVal=460,isUtility=false,isCity=true,
					price=60,cardImage=cardImgLocation + "1.PNG" , mortgagePrice=30, constructionPrice=50, houseRent=[10,30,90,160], hotelRent=250);

		board[2] = new Cell(cellName="Chest",colorGroup=0,position=2,topVal=520,leftVal=415,isUtility=false,isCity=false);

		board[3] = new Cell(cellName="Bhubaneshwar",colorGroup=1,position=3,topVal=520,leftVal=370,isUtility=false,isCity=true,
					price=60,cardImage=cardImgLocation + "3.PNG" , mortgagePrice=30,constructionPrice=50, houseRent=[20,60,180,320], hotelRent=450);

		board[4] = new Cell(cellName="Income Tax",colorGroup=0,position=4,topVal=520,leftVal=325,isUtility=false,isCity=false);

		board[5] = new Cell(cellName="Chennai Railway Station",colorGroup=0,position=5,topVal=520,leftVal=283,isUtility=true,isCity=false,
					price=200,cardImage=cardImgLocation + "5.PNG" ,mortgagePrice=100);

		board[6] = new Cell(cellName="Panaji",colorGroup=2,position=6,topVal=520,leftVal=240,isUtility=false,isCity=true,
					price=100,cardImage=cardImgLocation + "6.PNG" , mortgagePrice=50,constructionPrice=50, houseRent=[30,90,270,400], hotelRent=550);

		board[7] = new Cell(cellName="Chance",colorGroup=0,position=4,topVal=520,leftVal=195,isUtility=false,isCity=false);
		
		board[8] = new Cell(cellName="Agra",colorGroup=2,position=8,topVal=520,leftVal=150,isUtility=false,isCity=true,
					price=100,cardImage=cardImgLocation + "8.PNG" , mortgagePrice=50,constructionPrice=50, houseRent=[30,90,270,400], hotelRent=550);
					
		board[9] = new Cell(cellName="Vadodara",colorGroup=2,position=9,topVal=520,leftVal=107,isUtility=false,isCity=true,
					price=120,cardImage=cardImgLocation + "8.PNG" , mortgagePrice=60,constructionPrice=50, houseRent=[40,100,300,450], hotelRent=600);
					
		board[10] = new Cell(cellName="Jail",colorGroup=0,position=4,topVal=520,leftVal=38,isUtility=false,isCity=false);


	}

	setupBoard();
	
	var players = [];
	function setupPlayers()
	{
		nmbrOfPlayers = $("input[name='nmbrOfPlayers']:checked").val();
		
		var i = 0;
		var color = "Red";
		while(i<nmbrOfPlayers)
		{
			if(i == 0)
				color = "Red";
			if(i == 1)
				color = "Green";
			if(i == 2)
				color = "Blue";
			if(i == 3)
                color = "Yellow";
            
            var properties = []; 

            players.push(new Player(color,0,520,530,properties));
            
			i+=1;
		}

        $(".coin").css("display","");
        
        if(nmbrOfPlayers < 4)
        {
			$("#YellowCoin").remove();
			$("#YellowData").remove();
			$(".yellowTradeSelector").remove();
        }
        if(nmbrOfPlayers < 3)
		{
            $("#BlueCoin").remove();
			$("#BlueData").remove();
			$(".blueTradeSelector").remove();
			
        }
	}


		
	$("#start").click(function()
	{
		setupPlayers();
		$("#startcontrols").css("display","none");
		$("#gameControls").css("display","");
		$("#endControls").css("display","none");
		gameStarted = true;
	});



	function rollDice()
	{
		isChanceOn = true;
		var cnt=0;	
		var diceRollAnim = setInterval(function()
		{
			if(cnt==5)
			{
				clearInterval(diceRollAnim);
				play();
				return;
			}
			cnt+=1;
			i = cnt%3;
			diceVal1 = Math.floor(Math.random() * 6) + 1;
            diceVal2 = Math.floor(Math.random() * 6) + 1;
            diceValTotal = diceVal1 + diceVal2;
			$('#dice1').attr("src","images/diceRoll"+i.toString()+".PNG");
			$('#dice2').attr("src","images/diceRoll"+(2-i).toString()+".PNG");

		},200);
	}
    	
	function moveCoin(currCoin)
	{ 
		isChanceOn = true;
		cnt = 0;
		
		var coinMoveAnim = setInterval(function()
		{
			if(cnt == diceValTotal)
			{
				clearInterval(coinMoveAnim);
				checkCell(currCoin);
				if(diceVal1 != diceVal2)
					changePlayer();
                isChanceOn = false;
				return;
			}
			cnt+=1;
			players[currPlayer].position = players[currPlayer].position + 1;

			players[currPlayer].topVal = board[players[currPlayer].position].topVal;
			players[currPlayer].leftVal = board[players[currPlayer].position].leftVal;
			currCoin.animate(
			{
				"top":(players[currPlayer].topVal).toString()+"px",
				"left":(players[currPlayer].leftVal).toString()+"px"
			},300);

		},300);
		
    }
    
	function play()
	{
        $('#dice1').attr("src","images/dice"+diceVal1.toString()+".PNG");
        $('#dice2').attr("src","images/dice"+diceVal2.toString()+".PNG");
		
		
		var currCoin = $("#"+players[currPlayer].color+"Coin");
		
		if(players[currPlayer].position != 10) // in jail
			moveCoin(currCoin);
		else
		{
			if(diceVal == 6)
				players[currPlayer].started = true;
			else
				changePlayer();
			isAnimationOn = false;
		}
		return;
	}
    
    
	$("#diceContainer").click(function()
	{
		if(!gameStarted)
			return;
		if(gameOver)
			return;
		if(isChanceOn)
			return;
			
		rollDice();
	});

});