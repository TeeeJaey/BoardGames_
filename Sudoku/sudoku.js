var gameOver = false;

const boardSetter = [ 	[1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9],
						[4 , 5 , 6 , 7 , 8 , 9 , 1 , 2 , 3],
						[7 , 8 , 9 , 1 , 2 , 3 , 4 , 5 , 6],
						[2 , 3 , 1 , 5 , 6 , 4 , 8 , 9 , 7],
						[5 , 6 , 4 , 8 , 9 , 7 , 2 , 3 , 1],
						[8 , 9 , 7 , 2 , 3 , 1 , 5 , 6 , 4],
						[3 , 1 , 2 , 6 , 4 , 5 , 9 , 7 , 8],
						[6 , 4 , 5 , 9 , 7 , 8 , 3 , 1 , 2],
						[9 , 7 , 8 , 3 , 1 , 2 , 6 , 4 , 5]
					];

class Game
{
	constructor()
	{
		this.board =  this.generateNewBoard();
		return;
	}

	interchangeNumbers(tempBoard)
	{
		var num1 = Math.floor(Math.random()*10);	 
		while(num1 == 0)
			num1 = Math.floor(Math.random()*10); 
			
		var num2 = Math.floor(Math.random()*10); 
		while(num2 == 0 || num2 == num1)
			num2 = Math.floor(Math.random()*10);
		
		var i = 0;
		while(i < 9)
		{
			var j = 0;
			while(j < 9)
			{
				if (tempBoard[i][j] == num1)
					tempBoard[i][j] = 0;
				else if(tempBoard[i][j] == num2)
					tempBoard[i][j] = num1;
				j += 1;
			}
			i += 1;
		}
		
		var i = 0;
		while(i < 9)
		{
			var j = 0;
			while(j < 9)
			{
				if (tempBoard[i][j] == 0)
					tempBoard[i][j] = num2;
				j += 1;
			}
			i += 1;
		}
		return tempBoard;
	}
	
	
	interchangeCols(tempBoard)
	{ 
		var num1 = 0;	 
		var num2 = 1; 
		
		var i = 0;
		while(i < 9)
		{
			var temp = 0;
			temp = tempBoard[i][num1];
			tempBoard[i][num1] = tempBoard[i][num2];
			tempBoard[i][num2] = temp;
			
			i += 1;
		}
		
		var num1 = 3;	 
		var num2 = 5; 
		
		var i = 0;
		while(i < 9)
		{
			var temp = 0;
			temp = tempBoard[i][num1];
			tempBoard[i][num1] = tempBoard[i][num2];
			tempBoard[i][num2] = temp;
			
			i += 1;
		}
		
		var num1 = 7;	 
		var num2 = 8; 
		
		var i = 0;
		while(i < 9)
		{
			var temp = 0;
			temp = tempBoard[i][num1];
			tempBoard[i][num1] = tempBoard[i][num2];
			tempBoard[i][num2] = temp;
			
			i += 1;
		}
		
		return tempBoard;
	}
	
	
	interchangeRows(tempBoard)
	{ 
		var num1 = 0;	 
		var num2 = 1; 
		
		var i = 0;
		while(i < 9)
		{
			var temp = 0;
			temp = tempBoard[num1][i];
			tempBoard[num1][i] = tempBoard[num2][i];
			tempBoard[num2][i] = temp;
			
			i += 1;
		}
		
		var num1 = 3;	 
		var num2 = 5; 
		
		var i = 0;
		while(i < 9)
		{
			var temp = 0;
			temp = tempBoard[num1][i];
			tempBoard[num1][i] = tempBoard[num2][i];
			tempBoard[num2][i] = temp;
			
			i += 1;
		}
		
		var num1 = 7;	 
		var num2 = 8; 
		
		var i = 0;
		while(i < 9)
		{
			var temp = 0;
			temp = tempBoard[num1][i];
			tempBoard[num1][i] = tempBoard[num2][i];
			tempBoard[num2][i] = temp;
			
			i += 1;
		}
		
		return tempBoard;
	}
	generateNewBoard()
	{
	/*
		Step 2. Shuffle the the digits and replace in all other cells
		Step 3. Randomly rearrange columns 1,2 and 3 within themselves
		Step 4. Randomly rearrange columns 4,5 and 6 within themselves
		Step 5. Randomly rearrange columns 7,8 and 9 within themselves
		Step 6. Randomly rearrange rows 1,2 and 3 within themselves
		Step 7. Randomly rearrange rows 4,5 and 6 within themselves
		Step 8. Randomly rearrange rows 7,8 and 9 within themselves
		Step 9. Randomly rearrange in 3 column groups of size 9x3
		Step 10. Randomly rearrange in 3 row groups of size 3x9
	*/
	
		var tempBoard = boardSetter;
		
		var i = 0
		for(i = 0; i<10; i++)
			tempBoard = this.interchangeNumbers(tempBoard);
			
		tempBoard = this.interchangeCols(tempBoard);
		tempBoard = this.interchangeRows(tempBoard);
		
		return tempBoard;
	}
		
}

$(document).ready(function()
{
	var game = new Game();

	$('#gameUnderDev').css("display","");
	var text = "";
	var i = 0;
	while(i < 9)
	{
		var j = 0;
		while(j < 9)
		{
			text += " " + game.board[i][j];
			j += 1;
		}
		text +=  "<br>";
		i += 1;
	}

	document.getElementById("demo").innerHTML = text ;
	
});