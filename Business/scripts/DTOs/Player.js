
function removeDuplicates(arr)
{
    return arr.filter((value,index)=> arr.indexOf(value) === index);
}

class Player 
{
	constructor(color) 
	{
		this.color = color;
		this.position = 0;
		this.topVal = 520;
		this.leftVal = 530;
		this.money = 1000;
		this.properties = []; // [0,3,7 .. ]
		this.cityGroups = []; // [1,3,7 .. ]
		this.houseCount = 0;
		this.hotelCount = 0;
		this.inJail = false;
		this.bankrupt = false;
		this.finalRank = 0;

	}

	refreshCityGroups()
	{
		this.cityGroups = [];
		this.properties = removeDuplicates(this.properties);
		this.properties.sort(function(a, b){return a - b});
		var i = 1;
		while(i < propertyColorGroups.length)
		{
			var j = 0;
			var containsGroup = true;
			while(j < propertyColorGroups[i].length)
			{
				if(!this.properties.includes(propertyColorGroups[i][j]))
				{
					containsGroup = false;
				}
				j += 1;
			}
			if(containsGroup)
				this.cityGroups.push(i);
			i += 1;
		}

		return;
	}
	
	bankruptPlayer(number,rank)
	{
		var color = this.color;

		var i = 0
		while(i<40)
		{
			if(board[i].owner == number)
			{
				board[i].owner = -1;
				board[i].isMortgaged = false;    
				board[i].houses = 0;          
				board[i].hotel = false;
			}
			i += 1;
		}

		$("#"+color+"BankruptData").css("display","block");
		$("#"+color+"BankruptOverlay").addClass("bankruptOverlay");
		$("#"+color+"BankruptRank")[0].innerHTML = "Rank : " + rank; 
		$("#"+color+"Coin").remove();
		$("."+color+"TradeSelector").remove();

		players[number] = new Player(color);
		players[number].bankrupt = true;
		players[number].money = 0;
		players[number].finalRank = rank;

		refreshGameUI();
		if(rank == 2)
		{
			endGame();
		}
		if(rank > 2)
		{
			changePlayer();
		}
	}

	loadGame_Player(loadedPlayerObj)
	{
		this.color = loadedPlayerObj.color;
		this.position = parseInt(loadedPlayerObj.position);
		this.topVal = parseInt(loadedPlayerObj.topVal);
		this.leftVal = parseInt(loadedPlayerObj.leftVal);
		this.money = parseInt(loadedPlayerObj.money);
		this.properties = loadedPlayerObj.properties;
		this.cityGroups = loadedPlayerObj.cityGroups;
		this.inJail = loadedPlayerObj.inJail;
		return;
	}
}
