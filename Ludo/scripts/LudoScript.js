


var game = new Game();
var mainContentVue = new Vue();       // to put data in HTML 
	
var isAnimationOn = false;
var diceVal = 0;
var mobileUI = $(window).width() <= 768;

var players = [];



$(document).ready(function()
{
	importNavbar("Ludo", "Ludo");
	
    mainContentVue = new Vue({
        el: '#mainContent',
        data: {
            game : game
        }
	}); 

	$('.coin').css({"display":"none"});
	
	$(".boardSelector").click(function()
	{
		$(".boardSelected").removeClass("boardSelected");
		$(this).addClass("boardSelected");
		boardImgNmbr = parseInt(this.id.split("_")[1]);
		boardImgPath = "images/board" + boardImgNmbr +".jpg";
		$(".board").attr("src",boardImgPath);
	});

		
	$("#start").click(function()
	{
		game.setupPlayers();
		game.gameStatus=0;
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
			$('.dice').attr("src","images/diceRoll"+i.toString()+".png");

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
				"z-index":(players[currPlayer].topVal + 50).toString() ,
				"top":(players[currPlayer].topVal).toString()+"px",
				"left":(players[currPlayer].leftVal).toString()+"px"
			},300);

		},300);
		
	}

	function changePlayer()
	{
		
		if(players[currPlayer].position == 100)
		{
			game.gameStatus = 1;
			game.gameOver = true;

			$("#endInstruct").css("color",players[currPlayer].color);
			$("#endInstruct").text(players[currPlayer].color + " WINS !!!");
			
			
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
		$('.dice').attr("src","images/dice"+diceVal.toString()+".png");
		
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
		if(game.gameStatus != 0)
			return;
		if(gameOver)
			return;
		if(isAnimationOn)
			return;
			
		rollDice();
	});
	

	$(window).on('resize', function()
	{
		if (window.innerWidth <= 768) 
		{
			if(!mobileUI)
			{
				mobileUI = true;
				game.ResizeUI();
			}
		}
		else
		{
			if(mobileUI)
			{
				mobileUI = false;
				game.ResizeUI();
			}
		}

  	});

	
});