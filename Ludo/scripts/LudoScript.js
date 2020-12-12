

var game = new Game();
var mainContentVue = new Vue();       // to put data in HTML  
var isAnimationOn = false; 
var mobileUI = $(window).width() <= 768;
 
function rollDice()
{
	isAnimationOn = true;
	var cnt=0;	
	var diceRollAnim = setInterval(function()
	{
		if(cnt==5)
		{
			game.diceVal = diceVal;
			clearInterval(diceRollAnim);

			$('.dice').attr("src","images/dice"+game.diceVal.toString()+".png");

			var currentPlayer = game.players[game.currPlayer];
			game.instruction = currentPlayer.color.toUpperCase() + " Played : "+ game.diceVal.toString();
			currentPlayer.checkPlay();
			return;
		}

		cnt+=1;
		i = cnt%3;
		diceVal = Math.ceil(Math.random() * 6);
		$('.dice').attr("src","images/diceRoll"+i.toString()+".png");

	},150);
}

 
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
	
    $(document.body).on('click',".coin", function()
	{
		if(game.gameStatus != 0)
			return; 
		if(!game.waitCoinSelection)
			return;
		if(isAnimationOn)
			return;
			
		game.selectCoinById(this.id);
		if(game.selectedCoin.highlighted)
			game.selectedCoin.coinMoveLoop();
		
			return;
	});

    $(document.body).on('click',".dice", function()
	{
		if(game.gameStatus != 0)
			return; 
		if(game.waitCoinSelection)
			return;
		if(isAnimationOn)
			return;
		
		rollDice();
		
		return;
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