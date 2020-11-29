

var gameOver = false;
var mainContentVue = new Vue();       // to put data in HTML 

const cellTypes = {
    Vertex: 1,
    VerSide: 2,
    HorSide: 3,
    Box: 4
}; 

class Cell
{ 
    constructor(i,j,type)
    {
        this.type = type;
        this.id = i+':'+j;
        this.x = i;
        this.y = j;
        this.marked = false;
        this.color = -1;
    }

    markCell()
    {
        this.marked = true;
        this.color = game.currPlayer;
        
        var anyBoxFilled = false;

        if(this.type == cellTypes.HorSide)
        {
            if(this.x > 0)
            {
                var boxUp = game.board[this.x - 1][this.y];
                if(boxUp.type == cellTypes.Box)
                {
                    if(boxUp.checkBox())
                        anyBoxFilled  = true;

                }
            }
            if(this.x < 16)
            {
                var boxDown = game.board[this.x + 1][this.y];
                if(boxDown.type == cellTypes.Box)
                {
                    if(boxDown.checkBox())
                        anyBoxFilled  = true;
                }
            }
        }
        else if(this.type == cellTypes.VerSide)
        {
            if(this.y > 0)
            {
                var boxLeft = game.board[this.x][this.y - 1];
                if(boxLeft.type == cellTypes.Box)
                {
                    if(boxLeft.checkBox())
                        anyBoxFilled  = true;
                }
            }
            if(this.y < 16)
            {
                var boxRight = game.board[this.x][this.y + 1];
                if(boxRight.type == cellTypes.Box)
                {
                    if(boxRight.checkBox())
                        anyBoxFilled  = true;
                }
            }
        }
        
        if(anyBoxFilled)
            game.checkGameEnd();
        else
            game.changePlayer();

        return;
    }

    checkBox()
    {
        var boxfilled = false;

        var lineUp = game.board[this.x - 1][this.y];
        var lineDown = game.board[this.x + 1][this.y];
        var lineLeft = game.board[this.x][this.y - 1];
        var lineRight = game.board[this.x][this.y + 1];

        if(lineUp.marked && lineDown.marked && lineLeft.marked && lineRight.marked)
        {
            this.marked = true;
            this.color = game.currPlayer;
            game.players[game.currPlayer].score += 1;

            boxfilled = true;
        }
        
        return boxfilled;
    }
}

class Player
{ 
    constructor(color)
    {
        this.name = color;
        this.color = color.toLowerCase();
        this.score = 0;
    }
}

class Game
{ 
    constructor()
    {
        this.players = [];
        this.players.push(new Player("Red"));
        this.players.push(new Player("Blue"));
        this.currPlayer = 0;

        this.board = this.makeBoard();

        this.control = 0;
        this.winner = -1;

        this.coloredBoxes = 0;
        this.totalBoxes = 64;
    }

    makeBoard()
    {
        var board = [];
        board.push([]);

		for(var i = 0 ; i <  17  ; i += 1)
		{
			board.push([]);
            if(i % 2 == 0)
            {
                for(var j = 0 ; j < 17 ; j += 1)
                {
                    var cellType = cellTypes.HorSide;
                    if(j % 2 == 0)
                        cellType = cellTypes.Vertex;
                    board[i].push(new Cell(i, j, cellType));
                }
            }
            else
            {
                for(var j = 0 ; j < 17 ; j += 1)
                {
                    var cellType = cellTypes.Box;
                    if(j % 2 == 0)
                        cellType = cellTypes.VerSide;
                    board[i].push(new Cell(i, j, cellType));
                }
            }
        }

        return board;
    }

    changePlayer()
    {
        if(this.currPlayer == 0) 
            this.currPlayer = 1;
        else 
            this.currPlayer = 0;
        
        return;
    }
    
    checkGameEnd()
    {
        var unMarked_BoxFound = false;

        var i = 1;
        while(i < 16)
        {
            var rowBoxes = game.board[i].filter(x => x.type == cellTypes.Box);

            for(var j = 0 ; j < rowBoxes.length ; j += 1)
            {
                if(!rowBoxes[j].marked)
                {
                    unMarked_BoxFound = true;
                    return;
                }
            }
            
            i += 2;
        }
        
        if(!unMarked_BoxFound)
        {
            gameOver = true;
        
            if(game.players[0].score < game.players[1].score)
                game.winner = 1;
            else if(game.players[1].score < game.players[0].score)
                game.winner = 0;
            
            game.control = 1;
        }   

    }
}

var game = new Game();

function getBoardCellByID(cellID)
{
	var i = cellID.split(':')[0];
	var j = cellID.split(':')[1];
	return game.board[i][j];
}

$(document).ready(function()
{
    importNavbar("dotsNBoxes", "Dots & Boxes");

    mainContentVue = new Vue({
        el: '#mainContent',
        data: {
            game : game
        }
	}); 

    $(document.body).on("click", ".unmarkedSide", function()
    {  
		if(gameOver)
			return;

        var cell = getBoardCellByID(this.id);
        cell.markCell();

        
        
        
        mainContentVue.game = game;
        return;
    });

});

