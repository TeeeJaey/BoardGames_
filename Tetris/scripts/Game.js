 

class Game
{ 
	constructor()
	{
		this.board = this.getNewBoard();
		this.gameOver = false;
		this.status = -1;
		this.score = 0;

		this.currBlock = new Block();
		this.nextBlock = new Block();
		this.nextBlockUI = [];
	}

	rotateBlock()
	{
		this.currBlock.rotate();
	}

	moveDown()
	{
		const rows = 14;
		if(this.isSet(this.currBlock)) 
			return;
		
		if(this.currBlock.currentY + this.currBlock.shape.length >= rows)
			return;

		this.currBlock.currentY += 1;
		this.drawBlock(this.currBlock);
	}

	moveRight()
	{
		const cols = 12;
		if(this.isSet(this.currBlock)) 
			return;

		if(this.currBlock.currentX + this.currBlock.shape[0].length >= cols)
			return;

		this.currBlock.currentX += 1;
		this.drawBlock(this.currBlock);
	}

	moveLeft()
	{
		if(this.isSet(this.currBlock)) 
			return;
		
		if(this.currBlock.currentX == 0)
			return;
			
		this.currBlock.currentX -= 1;
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

	getNewBlock()
	{
		this.checkRowRemoval();
		this.currBlock = this.nextBlock;
		this.nextBlock = new Block();

		this.startBlock();
	}

	startBlock()
	{
		var self = this;
		self.blockMover = window.setInterval(function()
		{
			if(self.isSet(self.currBlock))
			{
				self.setAsSet(self.currBlock);
				self.getNewBlock();
				clearInterval(self.blockMover);
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
			return true;

		if(block.currentY < 0) 
			return false;

		let x = 0;
		for(var i = block.currentY ; i < (block.currentY + block.shape.length) ; i++)
		{
			let y = 0;
			for(var j = block.currentX ; j < (block.currentX + block.shape[0].length); j++)
			{
				if(block.shape[x][y])
				{
					if(this.board[i][j].isSet)
						return true;
				}
				
				y += 1;
			}
			x += 1;
		}
	
		return false;
	}
	
	setAsSet(block)
	{
		block.currentY -= 1;

		let x = 0;
		for(var i = block.currentY; i < (block.currentY + block.shape.length); i++)
		{
			if(i<0)
			{	
				this.endGame();
				return;
			}
			let y = 0;
			for(var j = block.currentX; j < (block.currentX + block.shape[0].length); j++)
			{
				if(block.shape[x][y])
				{
					this.board[i][j].isSet = true;
				}
				y += 1;
			}
			x += 1;
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
			
		let x = 0;
		for(var i = block.currentY ; i < (block.currentY + block.shape.length) ; i++)
		{
			let y = 0;
			for(var j = block.currentX ; j < (block.currentX + block.shape[0].length); j++)
			{
				if (i > -1 && j > -1 && !this.board[i][j].isSet && block.shape[x][y])
					this.board[i][j].currColor = block.color;
				
				y += 1;
			}
			x += 1;
		}

	}

	checkRowRemoval()
	{
		const cols = 12;
		const rows = 14;
		for(var i = 0 ; i < rows ; i++)
		{
			let rowSet = true;
			for(var j = 0 ; j < cols ; j++)
			{
				if(!this.board[i][j].isSet)
				{
					rowSet = false;
					break;
				}
			}
			if(rowSet)
				this.removeRow(i);
		}
	}

	removeRow(row)
	{
		const cols = 12;
		const rows = 14;

		for(var j = 0 ; j < cols ; j++)
		{
			this.board[row][j].currColor = this.board[row][j].initColor;
			this.board[row][j].isSet = false;
		}


		for(var i = row; i > 0; i--)
		{
			this.board[i] = this.board[i-1];
		}
		
		this.score += cols;
	}


	endGame()
	{
		this.gameOver = true;
		this.status = 1;
	}
}