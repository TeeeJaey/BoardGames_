
var gameOver = false;
var mainContentVue = new Vue();       // to put data in HTML 
var selectedCellID = null;

var game = new Game();
game.getNewBoard();

function getBoardCellByID(cellID)
{
	var i = cellID.split(':')[0];
	var j = cellID.split(':')[1];
	return game.fullBoard[i][j];
}

function checkNumberKey(btn)
{
	if(!selectedCellID)
		return;

	var cell = getBoardCellByID(selectedCellID);
	
	if(cell.init)
		return;

	cell.value = btn;
	game.refreshUI();
}

function checkArrowKey(btn)
{
	if(!selectedCellID)
	{ 
		const newID="0:0";
		const newCell = getBoardCellByID(newID);

		newCell.isSelected = true;
		selectedCellID = newID;

		return;
	}
	else
	{
		const prevCell = getBoardCellByID(selectedCellID);
		
		if(btn == 88) // up
		{
			if(prevCell.x == 0)
				return;
			else
			{
				prevCell.isSelected = false;
				const newID = (prevCell.x-1).toString() + ":" + (prevCell.y).toString();
				const newCell = getBoardCellByID(newID);
				newCell.isSelected = true;
				selectedCellID = newID;
			}
		}
		if(btn == 22) // down
		{
			if(prevCell.x == 8)
				return;
			else
			{
				prevCell.isSelected = false;
				const newID = (prevCell.x+1).toString() + ":" + (prevCell.y).toString();
				const newCell = getBoardCellByID(newID);
				newCell.isSelected = true;
				selectedCellID = newID;
			}
		}
		if(btn == 44) // left
		{
			if(prevCell.y == 0)
				return;
			else
			{
				prevCell.isSelected = false;
				const newID = (prevCell.x).toString() + ":" + (prevCell.y-1).toString();
				const newCell = getBoardCellByID(newID);
				newCell.isSelected = true;
				selectedCellID = newID;
			}
		}
		if(btn == 66) // right
		{
			if(prevCell.y == 8)
				return;
			else
			{
				prevCell.isSelected = false;
				const newID = (prevCell.x).toString() + ":" + (prevCell.y+1).toString();
				const newCell = getBoardCellByID(newID);
				newCell.isSelected = true;
				selectedCellID = newID;
			}
		}

	}
	mainContentVue.game = game;

}
 
$(document).ready(function()
{
	importNavbar("sudoku", "Sudoku");
	//$('#gameUnderDev').css("display","");
	
    mainContentVue = new Vue({
        el: '#mainContent',
        data: {
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
			case 38 :
			{
				btnClicked = 88;
				break;
			}
			case 40 :
			{
				btnClicked = 22;
				break;
			}
			case 37 :
			{
				btnClicked = 44;
				break;
			}
			case 39 :
			{
				btnClicked = 66;
				break;
			}
			default:
			{
				break;
			}
		}
		
		if(btnClicked < 0)
			return;

		if(btnClicked < 10)
			checkNumberKey(btnClicked);
		else
			checkArrowKey(btnClicked);
	});

    $(document.body).on('click',".numPadCell", function()
    {
		if(gameOver)
			return;
		checkNumberKey(parseInt(this.value));
	});
    $(document.body).on('click',".numPadClearCell", function()
    {
		if(gameOver)
			return;
		checkNumberKey(parseInt(this.value));
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
	$(document.body).on('click',"#btnResetGame", function()
    {
		game.resetCurrGame();
		
		if(selectedCellID)
		{
			var prevCell = getBoardCellByID(selectedCellID);
			prevCell.isSelected = false;
			selectedCellID = null;
		}

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

		if(this.id == selectedCellID)
			selectedCellID = null;
		else
		{
			newCell.isSelected = true;
			selectedCellID = this.id;
		}
		
		mainContentVue.game = game;
		return;
	});
});