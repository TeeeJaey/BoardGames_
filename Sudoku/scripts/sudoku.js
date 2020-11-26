
var gameOver = false;
var mainContentVue = new Vue();       // to put data in HTML 
var prevSelected = null;

$(document).ready(function()
{

	//$('#gameUnderDev').css("display","");
	
    mainContentVue = new Vue({
        el: '#mainContent',
        data: {
            serverOnline : false,
            board : [],
            loading : true
        }
	}); 
	
	var game = new Game();
	console.log(game);
	mainContentVue.board = game.fullBoard;



    $(document.body).on('click',".cell", function()
    {

		if(prevSelected)
		{
			var col = prevSelected.split(':')[0];
			var row = prevSelected.split(':')[1];
			game.fullBoard[col][row].isSelected = false;
			$("#"+prevSelected).removeClass("selectedCell");
		}

		
		var col = this.id.split(':')[0];
		var row = this.id.split(':')[1];
		if(game.fullBoard[col][row].init)
			return;
		game.fullBoard[col][row].isSelected = true;
		$(this).addClass("selectedCell");
		
		prevSelected = this.id;
		
		mainContentVue.board = game.fullBoard;
	});
});