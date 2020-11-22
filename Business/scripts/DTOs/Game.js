

//#region "Get Current Date"

Date.prototype.YYYYMMDDHHMMSS = function () 
{
	var yyyy = this.getFullYear().toString();
	var MM = pad(this.getMonth() + 1,2);
	var dd = pad(this.getDate(), 2);
	var hh = pad(this.getHours(), 2);
	var mm = pad(this.getMinutes(), 2)
	var ss = pad(this.getSeconds(), 2)

	return yyyy + MM + dd+  hh + mm + ss;
};

function pad(number, length) 
{
	var str = '' + number;
	while (str.length < length) {
		str = '0' + str;
	}
	return str;
}

//#endregion "Get Current Date"


class Game 
{
	getCurrentGame()
	{
		this.nmbrOfPlayers = nmbrOfPlayers;
		this.currPlayer = currPlayer;
		this.players = players;
		this.board = board;
		this.logs = logs;
		return this;
	}

	setCurrentGame()
	{
		nmbrOfPlayers = this.nmbrOfPlayers;
		currPlayer = this.currPlayer;
		players = this.players;
		board = this.board;
		logs = this.logs;
		return;
	}

	saveGame()
	{
		this.nmbrOfPlayers = nmbrOfPlayers;
		this.currPlayer = currPlayer;
		this.players = players;
		this.board = board;
		this.logs = logs;

		var gameJSON = JSON.stringify(this,null,4);
		var a = document.createElement("a");
		var file = new Blob([gameJSON],{type:"application/json"});
		a.href = URL.createObjectURL(file);

		var d = new Date();
		var ss = d.YYYYMMDDHHMMSS();

		a.download = "saveGame_" + ss + ".json";
		a.click();
		URL.revokeObjectURL(a.href);
		return;
	}
	
	loadGame(loadedGame)
	{

		var currentGame = this.getCurrentGame();

		try
		{
			nmbrOfPlayers = parseInt(loadedGame.nmbrOfPlayers);
			currPlayer = parseInt(loadedGame.currPlayer);

			players = [];
			var i = 0;
			while(i< nmbrOfPlayers)
			{
				var player = new Player(loadedGame.players[i].color);
				player.loadGame_Player(loadedGame.players[i]);
				players.push(player);
				i += 1;
			}

			board = [];
			var i = 0;
			while(i < 40)
			{
				var boardCell = new Cell(i);
				boardCell.loadGame_boardCell(loadedGame.board[i]);
				board.push(boardCell);
				i += 1;
			}

			logs = [];
			var i = 0;
			while(i < loadedGame.logs.length)
			{
				var log = new Log();
				log.loadGame_Log(loadedGame.logs[i]);
				logs.push(log);
				i += 1;
			}

			$(".coin").css("display","");
		
			if(nmbrOfPlayers < 4)
			{
				$("#yellowCoin").remove();
				$("#yellowData").remove();
				$(".yellowTradeSelector").remove();
			}
	
			if(nmbrOfPlayers < 3)
			{
				$("#blueCoin").remove();
				$("#blueData").remove();
				$(".blueTradeSelector").remove();
			}
			
			refreshGameUI();
			
			return true;
		}
		catch(e)
		{
			console.log("Exception" , e);
			currentGame.setCurrentGame();
			return false;
		}
	}
}