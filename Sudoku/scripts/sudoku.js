
var gameOver = false;
var mainContentVue = new Vue();       // to put data in HTML 
var selectedCellID = null;

var game = new Game();

function getBoardCellByID(btnID)
{
	var col = btnID.split(':')[0];
	var row = btnID.split(':')[1];
	return game.fullBoard[col][row];
}

function checkKeyPress(btn)
{
	if(!selectedCellID)
		return;

	  
	
	var cell = getBoardCellByID(selectedCellID);
	console.log(cell);

}

$(document).ready(function()
{
	//$('#gameUnderDev').css("display","");
	
    mainContentVue = new Vue({
        el: '#mainContent',
        data: {
            serverOnline : false,
            game : game,
			loading : true,
			controls : -1
        }
	}); 
	
	game.refreshUI();

	$(document).on('keydown' , function(e) 
	{ 
		if(gameOver)
			return;
		var key = e.keyCode || e.which;
		var btnClicked = -1;
		switch(key)
		{
			case 8 : case 46 : case 48 : case  96 : case 110 :
			{
				btnClicked = 0;
				break;
			}
			case 49 : case 97 :
			{
				btnClicked = 1;
				break;
			}
			case 50 : case 98 :
			{
				btnClicked = 2;
				break;
			}
			case 51 : case 99 :
			{
				btnClicked = 3;
				break;
			}
			case 52 : case 100 :
			{
				btnClicked = 4;
				break;
			}
			case 53 : case 101 :
			{
				btnClicked = 5;
				break;
			}
			case 54 : case 102 :
			{
				btnClicked = 6;
				break;
			}
			case 55 : case 103 :
			{
				btnClicked = 7;
				break;
			}
			case 56 : case 104 :
			{
				btnClicked = 8;
				break;
			}
			case 57 : case 105 :
			{
				btnClicked = 9;
				break;
			}
			default:
			{
				break;
			}
		}
		
		if(btnClicked > -1)
			checkKeyPress(btnClicked);
	});

    $(document.body).on('click',".numPadCell", function()
    {
		if(gameOver)
			return;
		checkKeyPress(parseInt(this.value));
	});
    $(document.body).on('click',".numPadClearCell", function()
    {
		if(gameOver)
			return;
		checkKeyPress(parseInt(this.value));
	});
	

	$(document.body).on('click',"#btnStartGame", function()
    {
		if(gameOver)
			return;
		var difficulty = $("input[name='difficulty']:checked").val();
		game.getNewBoard(parseInt(difficulty));
		game.refreshUI();
		mainContentVue.controls = 0;
	});
	

	$(document.body).on('click',".cell", function()
    {
		if(gameOver)
			return;

		if(selectedCellID)
		{
			var prevCell = getBoardCellByID(selectedCellID);
			prevCell.isSelected = false;
		}
 
		var newCell = getBoardCellByID(this.id);

		if(newCell.init || this.id == selectedCellID)
		{
			selectedCellID = null;
		}
		else
		{
			newCell.isSelected = true;
			selectedCellID = this.id;
		}

		game.refreshUI();
		return;
	});
});