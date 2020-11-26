var gameOver = false;

var mainContentVue = new Vue();       // to put data in HTML 

class Game
{
	constructor(difficulty=3)
	{
		if(difficulty > 2)
			this.difficulty = Math.floor(Math.random() * 3)
		else
			this.difficulty  = difficulty;

		this.board =  this.getNewBoard();
		this.fullBoard =  this.makeFullBoard();

		return;
	}
	
	getNewBoard()
	{
		switch(this.difficulty)
		{
			case 0:
				this.difficultyText = "Easy";
				var probGetter = new ProblemGetter();
				return probGetter.getEasyProblem();
				break;

			case 1:
				this.difficultyText = "Medium";
				var probGetter = new ProblemGetter();
				return probGetter.getMediumProblem();
				break;

			case 2:
				this.difficultyText = "Hard";
				var probGetter = new ProblemGetter();
				return probGetter.getHardProblem();
				break;

		}
	}

	makeFullBoard()
	{
		var fullBoard = [];

		for(var i = 0 ; i < 9 ; i += 1)
		{
			fullBoard.push([]);
			for(var j = 0 ; j < 9 ; j += 1)
				fullBoard[i].push(0);
		}

		for(var i = 0 ; i < this.board.length ; i += 1)
		{
			var cell = this.board[i];
			fullBoard[cell.x][cell.y] = cell.value;
		}
		
		return fullBoard;
	}
}

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
	var text = "";
	var i = 0;
	while(i < 9)
	{
		var j = 0;
		while(j < 9)
		{
			text += " " + game.fullBoard[i][j];
			j += 1;
		}
		text +=  "<br>";
		i += 1;
	}

	document.getElementById("demo").innerHTML = text ;
	
});