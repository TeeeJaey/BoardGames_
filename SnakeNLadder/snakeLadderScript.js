$(document).ready(function()
{
	var boardImgNmbr = Math.floor(Math.random() * 3).toString();
	var boardImgPath = "images/board" + Math.floor(Math.random() * 3).toString() +".JPG";
	$(".board").attr("src",boardImgPath);
	
	var gameStarted = false;
	var isAnimationOn = false;
	var gameOver = false;
	
	var nmbrOfPlayers = 2;
	var currPlayer = 0;
	var diceVal = 0;
	
	$("#theDice").css("display","none");
	
	
	class Cell 
	{
		constructor(position,topVal,leftVal,snake,ladder)  
		{
			this.position = position; 
			this.topVal = topVal;
			this.leftVal = leftVal;
			this.snake = snake;
			this.ladder = ladder;
		}
	}
	
	class Player 
	{
		constructor(color,position,topVal,leftVal) 
		{
			this.color = color;
			this.position = position;
			this.topVal = topVal;
			this.leftVal = leftVal;
		}
	}
	
	var spaceMoveValues = [];

	var t = 540;
	var l = -50;
	var d = 59;
	spaceMoveValues.push(new Cell(0, t, l, false, false));
	var dirleft = false;
	var i = 1;
	while(i<=100)
	{	
		
		t = 540 - ((Math.ceil(i/10)-1) * d);

		if( ((i-1)/10) == (Math.round(i/10)) && (i!=1) )
			dirleft = !dirleft;
		else
		{
			if(dirleft)
				l = l - d;
			else
				l = l + d;
		}
		
		spaceMoveValues.push(new Cell(i, t, l, false, false));
		i += 1;
	}
	
	var players = [];
		
	$("#start").click(function()
	{
		gameStarted = true;
		nmbrOfPlayers = $("input[name='nmbrOfPlayers']:checked").val();
		$("#controls").css("display","none");
		$("#theDice").css("display","");
		
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
			players.push(new Player(color,0,540,-50));
			i+=1;
		}
		$("#instruct").css("color",players[currPlayer].color);
		$("#instruct").text(players[currPlayer].color + " Play");
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
			return;
		}
		
		isAnimationOn = true;
		cnt = 0;
		var diceRollAnim = setInterval(function()
		{
			if(cnt==diceVal)
			{
				clearInterval(diceRollAnim);
				isAnimationOn = false;
				if(diceVal != 6)
					changePlayer();
				return;
			}
			cnt+=1;
			players[currPlayer].position = players[currPlayer].position + 1;

			players[currPlayer].topVal = spaceMoveValues[players[currPlayer].position].topVal;
			currCoin.animate({"top":(players[currPlayer].topVal).toString()+"px"},200);

			players[currPlayer].leftVal = spaceMoveValues[players[currPlayer].position].leftVal;
			currCoin.animate({"left":(players[currPlayer].leftVal).toString()+"px"},200);

		},200);
	}
	
	
	function changePlayer()
	{
		
		if(players[currPlayer].position == 100)
		{
			gameOver = true;
			$("#instruct").css("color",players[currPlayer].color);
			$("#instruct").text(players[currPlayer].color + " WINS !!!");
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
		
		moveCoin(currCoin);
		
		
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