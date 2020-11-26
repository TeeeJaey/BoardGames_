

class Game
{
	constructor(difficulty=3)
	{
		if(difficulty > 2)
			this.difficulty = Math.floor(Math.random() * 3)
		else
			this.difficulty  = difficulty;

		this.boardData =  this.getNewBoard();
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
			{
				var color = "white"; 
				if(i < 3 || i > 5)
				{
					if(j < 3 || j > 5)
						color = "powderblue";
				}
				else
				{
					if(i > 2 && i < 6 && j > 2 && j < 6)
						color = "powderblue";
				}

				fullBoard[i].push(new Cell(i,j,color));
			}
		}

		for(var i = 0 ; i < this.boardData.length ; i += 1)
		{
			var cell = this.boardData[i];
			if(cell.value > 0)
			{
				fullBoard[cell.x][cell.y].init = true;
				fullBoard[cell.x][cell.y].value = cell.value ;
			}
		}
		
		return fullBoard;
	}
}