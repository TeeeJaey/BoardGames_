$(document).ready(function()
{
	var boardImgNmbr = 0;
	var boardImgPath = "images/board" + boardImgNmbr +".JPG";
	$(".board").attr("src",boardImgPath);
	
	$("#startcontrols").css("display","");
	$("#gameControls").css("display","none");
	$("#endControls").css("display","none");
	
	var gameStarted = false;
	var isAnimationOn = false;
	var gameOver = false;
	
	var nmbrOfPlayers = 2;
	var currPlayer = 0;
	var diceVal = 0;
	
	
	class Cell 
	{
		constructor(position,topVal,leftVal,snakeLadder)  
		{
			this.position = position; 
			this.topVal = topVal;
			this.leftVal = leftVal;
			this.snakeOrLadder = snakeLadder;
		}
	}
	
	class SnakeLadder 
	{
		constructor(startPos,endPos)  
		{
			this.startPos = startPos; 
			this.endPos = endPos;
		}
	}

	class Player 
	{
		constructor(color,position,topVal,leftVal,started) 
		{
			this.color = color;
			this.position = position;
			this.topVal = topVal;
			this.leftVal = leftVal;
			this.started = started;
		}
	}


	var board = [];
	function setupBoard()
	{
		var t = 535;
		var l = -50;
		var d = 59;
		board.push(new Cell(0, t, l, null));
		var dirleft = false;
		var i = 1;
		while(i<=100)
		{	
			
			t = 535 - ((Math.ceil(i/10)-1) * d);
	
			if( ((i-1)/10) == (Math.round(i/10)) && (i!=1) )
				dirleft = !dirleft;
			else
			{
				if(dirleft)
					l = l - d;
				else
					l = l + d;
			}
			
			board.push(new Cell(i, t, l, null));
			i += 1;
		}

		switch(boardImgNmbr)
		{
			case 0:
			{
				board[3].snakeOrLadder = new SnakeLadder(3, 20);
				board[6].snakeOrLadder = new SnakeLadder(6, 14);
				board[8].snakeOrLadder = new SnakeLadder(8, 4);
				board[11].snakeOrLadder = new SnakeLadder(11, 28);
				board[15].snakeOrLadder = new SnakeLadder(15, 34);
				board[17].snakeOrLadder = new SnakeLadder(17, 74);
				board[18].snakeOrLadder = new SnakeLadder(18, 1);
				board[22].snakeOrLadder = new SnakeLadder(22, 37);
				board[26].snakeOrLadder = new SnakeLadder(26, 10);
				board[39].snakeOrLadder = new SnakeLadder(39, 5);
				board[49].snakeOrLadder = new SnakeLadder(49, 67);
				board[51].snakeOrLadder = new SnakeLadder(51, 6);
				board[54].snakeOrLadder = new SnakeLadder(54, 36);
				board[56].snakeOrLadder = new SnakeLadder(56, 1);
				board[60].snakeOrLadder = new SnakeLadder(60, 23);
				board[61].snakeOrLadder = new SnakeLadder(61, 78);
				board[75].snakeOrLadder = new SnakeLadder(75, 28);
				board[81].snakeOrLadder = new SnakeLadder(81, 98);
				board[83].snakeOrLadder = new SnakeLadder(83, 45);
				board[85].snakeOrLadder = new SnakeLadder(85, 59);
				board[88].snakeOrLadder = new SnakeLadder(88, 91);
				board[90].snakeOrLadder = new SnakeLadder(90, 48);
				board[92].snakeOrLadder = new SnakeLadder(92, 25);
				board[97].snakeOrLadder = new SnakeLadder(97, 87);
				board[99].snakeOrLadder = new SnakeLadder(99, 63);
				break;
			}
			case 1:
			{
				board[1].snakeOrLadder = new SnakeLadder(1, 38);
				board[4].snakeOrLadder = new SnakeLadder(4, 14);
				board[9].snakeOrLadder = new SnakeLadder(9, 31);
				board[17].snakeOrLadder = new SnakeLadder(17, 7);
				board[21].snakeOrLadder = new SnakeLadder(21, 42);
				board[28].snakeOrLadder = new SnakeLadder(28, 84);
				board[51].snakeOrLadder = new SnakeLadder(51, 67);
				board[54].snakeOrLadder = new SnakeLadder(54, 34);
				board[62].snakeOrLadder = new SnakeLadder(62, 19);
				board[64].snakeOrLadder = new SnakeLadder(64, 60);
				board[72].snakeOrLadder = new SnakeLadder(72, 91);
				board[80].snakeOrLadder = new SnakeLadder(80, 99);
				board[87].snakeOrLadder = new SnakeLadder(87, 36);
				board[93].snakeOrLadder = new SnakeLadder(93, 73);
				board[95].snakeOrLadder = new SnakeLadder(95, 75);
				board[98].snakeOrLadder = new SnakeLadder(98, 79);
				break;
			}
			case 2:
			{
				board[2].snakeOrLadder = new SnakeLadder(2, 38);
				board[7].snakeOrLadder = new SnakeLadder(7, 14);
				board[8].snakeOrLadder = new SnakeLadder(8, 31);
				board[15].snakeOrLadder = new SnakeLadder(15, 26);
				board[16].snakeOrLadder = new SnakeLadder(16, 6);
				board[21].snakeOrLadder = new SnakeLadder(21, 42);
				board[28].snakeOrLadder = new SnakeLadder(28, 84);
				board[36].snakeOrLadder = new SnakeLadder(36, 44);
				board[39].snakeOrLadder = new SnakeLadder(46, 25);
				board[49].snakeOrLadder = new SnakeLadder(49, 11);
				board[51].snakeOrLadder = new SnakeLadder(51, 67);
				board[62].snakeOrLadder = new SnakeLadder(62, 19);
				board[64].snakeOrLadder = new SnakeLadder(64, 60);
				board[71].snakeOrLadder = new SnakeLadder(71, 91);
				board[74].snakeOrLadder = new SnakeLadder(74, 53);
				board[78].snakeOrLadder = new SnakeLadder(78, 98);
				board[87].snakeOrLadder = new SnakeLadder(87, 94);
				board[89].snakeOrLadder = new SnakeLadder(89, 68);
				board[92].snakeOrLadder = new SnakeLadder(92, 88);
				board[95].snakeOrLadder = new SnakeLadder(95, 75);
				board[99].snakeOrLadder = new SnakeLadder(99, 80);
				break;	
			}
			case 3:
			{
				board[4].snakeOrLadder = new SnakeLadder(4, 14);
				board[9].snakeOrLadder = new SnakeLadder(9, 31);
				board[17].snakeOrLadder = new SnakeLadder(17, 7);
				board[20].snakeOrLadder = new SnakeLadder(20, 38);
				board[28].snakeOrLadder = new SnakeLadder(28, 84);
				board[40].snakeOrLadder = new SnakeLadder(40, 59);
				board[51].snakeOrLadder = new SnakeLadder(51, 67);
				board[63].snakeOrLadder = new SnakeLadder(63, 81);
				board[64].snakeOrLadder = new SnakeLadder(64, 60);
				board[89].snakeOrLadder = new SnakeLadder(89, 26);
				board[95].snakeOrLadder = new SnakeLadder(95, 75);
				board[99].snakeOrLadder = new SnakeLadder(99, 78);
				break;	
			}
		}
	}

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
			players.push(new Player(color,0,540,-50,false));
			i+=1;
		}
		if(nmbrOfPlayers < 4)
			$("#YellowCoin").remove();
		if(nmbrOfPlayers < 3)
			$("#BlueCoin").remove();

		$("#instruct").css("color",players[currPlayer].color);
		$("#instruct").text(players[currPlayer].color + " Play");
	}

	$(".boardSelector").click(function()
	{
		$(".boardSelected").removeClass("boardSelected");
		$(this).addClass("boardSelected");
		boardImgNmbr = parseInt(this.id.split("_")[1]);
		boardImgPath = "images/board" + boardImgNmbr +".JPG";
		$(".board").attr("src",boardImgPath);
	});

		
	$("#start").click(function()
	{
		setupBoard();
		setupPlayers();
		$("#startcontrols").css("display","none");
		$("#gameControls").css("display","");
		$("#endControls").css("display","none");
		gameStarted = true;
	});
	
	function rollDice()
	{
		isAnimationOn = true;
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
			diceVal = Math.floor(Math.random() * 6) + 1;
			$('.dice').attr("src","images/diceRoll"+i.toString()+".PNG");

		},200);
	}
	
	
	function moveCoin(currCoin)
	{
		if(players[currPlayer].position + diceVal > 100)
		{
			changePlayer();
			isAnimationOn = false;
			return;
		}
		
		isAnimationOn = true;
		cnt = 0;
		
		var coinMoveAnim = setInterval(function()
		{
			if(cnt == diceVal)
			{
				clearInterval(coinMoveAnim);
				checkSnakeOrLadder(currCoin);
				checkSnakeOrLadder(currCoin);
				if(diceVal != 6)
					changePlayer();
				isAnimationOn = false;
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
	
	function checkSnakeOrLadder(currCoin)
	{
		if(board[players[currPlayer].position].snakeOrLadder == null)
			return;
	
		var snakeOrLadder = board[players[currPlayer].position].snakeOrLadder;
		players[currPlayer].position = snakeOrLadder.endPos;

		players[currPlayer].topVal = board[players[currPlayer].position].topVal;
		players[currPlayer].leftVal = board[players[currPlayer].position].leftVal;
		currCoin.animate({"top":(players[currPlayer].topVal).toString()+"px" , "left":(players[currPlayer].leftVal).toString()+"px"},700);

	}

	function changePlayer()
	{
		
		if(players[currPlayer].position == 100)
		{
			gameOver = true;
			$("#endInstruct").css("color",players[currPlayer].color);
			$("#endInstruct").text(players[currPlayer].color + " WINS !!!");
			
			
			$("#startcontrols").css("display","none");
			$("#gameControls").css("display","none");
			$("#endControls").css("display","");
			
			return;
		}

		currPlayer+=1;
		if(currPlayer == nmbrOfPlayers)
			currPlayer=0;
		
		$("#instruct").css("color",players[currPlayer].color);
		$("#instruct").text(players[currPlayer].color + " Play");
	}
	
	function play()
	{
		$('.dice').attr("src","images/dice"+diceVal.toString()+".PNG");
		
		$("#instruct").css("color",players[currPlayer].color);
		$("#instruct").text(players[currPlayer].color + " Played : "+ diceVal);
		
		var currCoin = $("#"+players[currPlayer].color+"Coin");
		
		if(players[currPlayer].started)
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
	
	$(".dice").click(function()
	{
		if(!gameStarted)
			return;
		if(gameOver)
			return;
		if(isAnimationOn)
			return;
			
		rollDice();
	});
	
	
});