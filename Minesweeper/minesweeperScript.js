$(document).ready(function()
{
	var gameOver = false;
	var board = new Array(10); 
	var boardSize = 10;
	
	class Cell 
	{
		constructor(i,j,revealed,value,markedAsMine) 
		{
			this.i = i;
			this.j = j;
			this.revealed = revealed;
			this.value = value;
			this.markedAsMine = markedAsMine;
		}
		
	  
		setValue()
		{
			if(this.value == -1)
				return;
			var val = 0;
			for (var x = this.i-1; x <= this.i+1; x++) 
			{ 
				for (var y = this.j-1; y <= this.j+1; y++) 
				{ 
					if(x >= 0 && x < boardSize && y >= 0 && y < boardSize)
						if(board[x][y].value == -1)
							val++;
				}
			}
			this.value = val;
			return;
		}
	}	

	 
	// Loop to create 2D array using 1D array 
	for (var i = 0; i < boardSize; i++) 
	{ 
		board[i] = new Array(boardSize); 
		for (var j = 0; j < boardSize; j++) 
		{
			if(Math.floor(Math.random() * boardSize) < 2)
				val =  -1;
			else val = 0;			
			board[i][j] = new Cell(i,j,false,val,false); 
		} 
	} 
  
	// Loop to give them value
	for (var i = 0; i < boardSize; i++) 
	{ 
		for (var j = 0; j < boardSize; j++) 
		{ 			
			board[i][j].setValue();
		}
	}				
	
	function revealAll()
	{
		for (var i = 0; i < boardSize; i++) 
		{ 
			for (var j = 0; j < boardSize; j++) 
			{ 			
				board[i][j].revealed = true;
				cell = $($($('#theBoard').children().children()[i]).children()[j]).children()[0];
									
				switch(board[i][j].value) 
				{
					case -1:
						cell.style.backgroundColor = "#f00";
						break;
						
					case 0:
						cell.style.backgroundColor = "#fff";
						break;
						
					default:
						cell.style.backgroundColor = "#ddd";
						cell.innerHTML = board[i][j].value;
						break;
				}
			}
		}	
		
		return;
	}
	
	function revealNeighbours(i,j)
	{
		for (var x = i-1; x <= i+1; x++) 
		{ 
			for (var y = j-1; y <= j+1; y++) 
			{ 
				if(x >= 0 && x < boardSize && y >= 0 && y < boardSize)
				{
					if(!board[x][y].revealed)
					{
						board[x][y].revealed = true;
						cell = $($($('#theBoard').children().children()[x]).children()[y]).children()[0];
											
						switch(board[x][y].value) 
						{
							case -1:
								cell.style.backgroundColor = "#f00";
								break;
								
							case 0:
								cell.style.backgroundColor = "#fff";
								revealNeighbours(x,y);
								board[7][8].markedAsMine = false;
								break;
								
							default:
								cell.style.backgroundColor = "#ddd";
								board[7][8].markedAsMine = false;
								cell.innerHTML = board[x][y].value;
								break;
	 
						}
						
					}
				}
			}
		}
		return;
	}
			
	function checkIfWon()
	{
		// Loop to check all bombs are marked
		for (var i = 0; i < boardSize; i++) 
		{ 
			for (var j = 0; j < boardSize; j++) 
			{
				if(board[i][j].value == -1)
				{
					if(!board[i][j].markedAsMine)
						return;
				}
				else 
				{
					if(board[i][j].markedAsMine)
						return;
				}
			} 
		} 
		revealAll();
		gameOver = true;
		$('h3')[0].innerText = "Wooaahh! You won";
		
	}
	
	
	$('td').click(function()
	{
		
		if(gameOver)
			return;
			
		// Get Row ad Col
		var row = $(this).parent().parent().children().index($(this).parent());
		var col = $(this).parent().children().index($(this));
		var playedCell = $(this).children()[0];
		
		if(board[row][col].revealed)
			return;
			
		$('h3')[0].innerText = "So far, so good..";
		
		if($('#markMine')[0].checked)
		{
			if(board[row][col].markedAsMine)
			{
				board[row][col].markedAsMine = false;
				playedCell.style.backgroundColor = "#aaa";
			}
			else	
			{
				board[row][col].markedAsMine = true;
				playedCell.style.backgroundColor = "#f00";
			}
			
			checkIfWon();
			return;
		}
		else
		{
			board[row][col].revealed = true;

			switch(board[row][col].value) 
			{
				case -1:
					revealAll();
					gameOver = true;
					$('h3')[0].innerText = "OOPS! You got blown up ... Try again?";
					break;
					
				case 0:
					playedCell.style.backgroundColor = "#fff";
					revealNeighbours(row,col);
					break;
					
				default:
					playedCell.style.backgroundColor = "#ddd";
					playedCell.innerHTML = board[row][col].value;
					break;
			}
			
			return;
		}
		
		
	});	
	
});