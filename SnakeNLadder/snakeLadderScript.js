$(document).ready(function()
{
	var boardImgNmbr = Math.floor(Math.random() * 3).toString();
	var boardImgPath = "images/board" + Math.floor(Math.random() * 3).toString() +".JPG";
	$(".board").attr("src",boardImgPath);
	
	var moveLen = 59;
	var gameStarted = false;
	var isAnimationOn = false;
	var gameOver = false;
	
	var nmbrOfPlayers = 2;
	var currPlayer = 0;
	var diceVal = 0;
	
	$("#theDice").css("display","none");
	
	
	class Coin 
	{
		constructor(color,position,topVal,leftVal) 
		{
			this.color = color;
			this.position = position;
			this.topVal = topVal;
			this.leftVal = leftVal;
		}
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
			players.push(new Coin(color,0,540,-50));
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
				isAnimationOn = false;
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
		isAnimationOn = true;
		var cnt=0;	
		var diceRollAnim = setInterval(function()
		{
			if(cnt==diceVal)
			{
				clearInterval(diceRollAnim);
				isAnimationOn = false;
				changePlayer();
				return;
			}
			cnt+=1;
			players[currPlayer].leftVal = moveLen + players[currPlayer].leftVal;
			currCoin.css("left",(players[currPlayer].leftVal).toString()+"px");

		},200);
	}
	
	
	function changePlayer()
	{
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
		if(isAnimationOn)
			return;
		rollDice();
	});
	
	
});