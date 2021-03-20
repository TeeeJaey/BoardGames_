 

class Game
{ 
	constructor()
	{
		this.board = this.getNewBoard();
		this.gameOver = false;
		this.status = -1;
		this.score = 0;

		this.currBlock = new Block();
	}

	moveLeft()
	{
		if(this.isSet(this.currBlock)) return;
		
		if(this.currBlock.currentX == 0)
		{
			return;
		}
		this.currBlock.currentX -= 1;
		this.drawBlock(this.currBlock);
	}

	moveRight()
	{
		const cols = 12;
		if(this.isSet(this.currBlock)) return;

		if(this.currBlock.currentX + this.currBlock.shape[0].length >= cols)
		{
			return;
		}
		this.currBlock.currentX += 1;
		this.drawBlock(this.currBlock);
	}

	getNewBoard()
	{
		var newBoard = []
		const cols = 12;
		const rows = 14;


		for(var i = 0 ; i < rows ; i++)
		{
			newBoard.push([]);
			for(var j = 0 ; j < cols ; j++)
			{
				newBoard[i].push( new Cell(i,j) );
			}
		}
		
		return newBoard;
	}
 

	getBoardCellByID(cellID)
	{
		var i = cellID.split(':')[0];
		var j = cellID.split(':')[1];
		return game.board[i][j];
	}

	startBlock()
	{
		this.currBlock =  new Block();

		var self = this;
		var moveDownAnim = window.setInterval(function()
		{
			if(self.isSet(self.currBlock))
			{
				self.setAsSet(self.currBlock);
				clearInterval(moveDownAnim);
			}
			else
			{
				self.drawBlock(self.currBlock);

				self.currBlock.currentY += 1;
			}

		},500)
	}

	isSet(block)
	{
		const rows = 14;

		if(block.currentY + block.shape.length > rows)
		{
			return true;
		}

	}
	
	setAsSet(block)
	{
		block.currentY -= 1;

		for(var i = block.currentY; i < (block.currentY + block.shape.length); i++)
		{
			for(var j = block.currentX; j < (block.currentX + block.shape[0].length); j++)
			{
				this.board[i][j].isSet = true;
			}
		}
	}


	drawBlock(block)
	{
		const cols = 12;
		const rows = 14;
		for(var i = 0 ; i < rows ; i++)
		{
			for(var j = 0 ; j < cols ; j++)
			{
				if (!this.board[i][j].isSet)
					this.board[i][j].currColor = this.board[i][j].initColor;
			}
		} 

		for(var i = block.currentY ; i < (block.currentY + block.shape.length) ; i++)
		{
			for(var j = block.currentX ; j < (block.currentX + block.shape[0].length); j++)
			{
				if (!this.board[i][j].isSet)
					this.board[i][j].currColor = block.color;
			}
		}
	}

}