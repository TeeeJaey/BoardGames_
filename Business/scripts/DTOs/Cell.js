
class Cell 
{
	constructor(pos)  
	{
		this.cellName = "";
		this.colorGroup = 0;
		this.position = pos; 
		this.topVal = 0;
		this.leftVal = 0;
		
		this.isUtility = false;
		this.isCity = false;

		this.cardImage = "images/properties/" + pos.toString() + ".PNG";
		this.owner = -1;
		this.isMortaged = false;    
		this.houses = 0;          
		this.hotel = false;  

		
	}

	getCurrentRent()
	{
		var rent = 0;
		if(this.isUtility)
		{
			if(this.owner > -1)
			{
				if(this.isMortaged)
				{
					return rent;
				}
				else
				{
					if(this.position == 5 || this.position == 15 || this.position == 25 || this.position == 35)
					{
						var stations = [5,15,25,35];
						rent = this.rent / 2;
						var i = 0;
						while(i < 4)
						{
							if(players[this.owner].properties.includes(stations[i]))
								rent = rent + rent;
							i += 1;
						}

						return rent;
					}

					if(this.position == 12 || this.position == 28)
					{
						if(players[this.owner].properties.includes(12) && players[this.owner].properties.includes(28))
						{
							rent = 10 * diceValTotal;
						}
						else
						{
							rent = 4 * diceValTotal;
						}
						return rent;
					}
				}
			}
			return rent;
		}

		else if(this.isCity)
		{
			if(this.owner > -1)
			{
				if(this.isMortaged)
				{
					rent = 0;
					return rent;
				}
				else
				{
					players[this.owner].refreshCityGroups();

					if(this.hotel)
					{	
						rent = this.hotelRent;
						return rent;
					}
					else if(this.houses > 0)
					{
						rent = this.houseRent[this.houses];
						return rent;
					}
					else
					{
						if(players[this.owner].cityGroups.includes(this.colorGroup))
						{
							rent = this.rent * 2;
						}
						else
						{
							rent = this.rent;
						}
						return rent;
					}5
				}
			}
			return rent;
		}
	}

	isBuildable()
	{
		
		if(!this.isCity)
			return false;
		
		if(this.owner<0)
			return false;
		
		if(!players[this.owner].cityGroups.includes(this.colorGroup))
			return false;
		
		if(this.hotel)
			return false;
		
		if(this.isMortaged)
			return false;

		var i = 0;
		while(i < propertyColorGroups[this.colorGroup].length)
		{
			var cardNumber = propertyColorGroups[this.colorGroup][i];
			if(board[cardNumber].isMortaged)
				return false;

			if(board[cardNumber].houses < this.houses)
				return false;

			i += 1;
		}

		return true;
	}
	
	isSellable()
	{
		if(!this.isCity)
			return false;

		if(this.owner<0)
			return false;
	
		if(this.hotel)
			return true;
		
		if(this.isMortaged)
			return false;

		if(this.houses == 0)
			return false;

		var i = 0;
		while(i < propertyColorGroups[this.colorGroup].length)
		{
			var cardNumber = propertyColorGroups[this.colorGroup][i];
			if(board[cardNumber].houses > this.houses)
				return false;
			
			i += 1;
		}

		return true;
	}

	isMortgageable()
	{
		if(this.isCity || this.isUtility)
		{	
			if(!this.isMortaged && !this.hotel && this.houses == 0)
			{
				return true;
			}
		}
		return false;
	}

	isTradeble()
	{
		if(this.isCity || this.isUtility)
		{	
			if( !this.hotel && this.houses == 0 )
			{
				return true;
			}
		}
		return false;
	}
	 
	makeBldgCoin(playerNumber,bldgStr)
	{
		var BldgCoin = document.createElement('img');
		$(BldgCoin).addClass("bldgCoin");
		var color = "";
		switch(parseInt(playerNumber))
		{
			case 0: color = "red"; break;
			case 1: color = "green"; break;
			case 2: color = "blue"; break;
			case 3: color = "yellow"; break;
		}
		BldgCoin.src="images/bldgs/"+color+bldgStr+".PNG";

		return BldgCoin;
	}
	
	getBldg()
	{
		var bldgCoin = null;
		if(this.isUtility)
		{
			if(this.owner > -1)
			{
				bldgCoin = this.makeBldgCoin(this.owner,"0");
			}
		}
		if(this.isCity)
		{
			if(this.owner > -1)
			{
				if(this.isMortaged)
				{
					bldgCoin = this.makeBldgCoin(this.owner,"M");
					return bldgCoin;
				}
				else if(this.hotel)
				{
					bldgCoin = this.makeBldgCoin(this.owner,"H");
					return bldgCoin;
				}
				else
				{
					bldgCoin = this.makeBldgCoin(this.owner, this.houses);
					return bldgCoin;
				}
			}
		}
		return bldgCoin;
	}
	
	showBldg()
	{
		if(this.isCity || this.isUtility)
		{
			if(this.owner > -1)
			{
				var bldgCoin = this.getBldg();
				$(bldgCoin).css("top",this.bldgTopVal.toString()+"px");
				$(bldgCoin).css("left",this.bldgLeftVal.toString()+"px");

				$("#theBoard").append(bldgCoin);
			}
		}
	}

	loadGame_boardCell(loadedCellObj)
	{
		
		this.cellName = loadedCellObj.cellName;
		this.colorGroup = loadedCellObj.colorGroup;
		this.position = loadedCellObj.position; 
		this.topVal = loadedCellObj.topVal;
		this.leftVal = loadedCellObj.leftVal;
		
		this.isUtility = loadedCellObj.isUtility;
		this.isCity = loadedCellObj.isCity;


		this.price = loadedCellObj.price;
		this.cardImage = loadedCellObj.cardImage;
		this.owner = loadedCellObj.owner;
		this.rent = loadedCellObj.rent;
		this.isMortaged = loadedCellObj.isMortaged;        
		this.mortgagePrice = loadedCellObj.mortgagePrice;

		this.constructionPrice = loadedCellObj.constructionPrice;

		this.houseRent = loadedCellObj.houseRent;     // [price1,price2,prcie3,price4]
		this.houses = loadedCellObj.houses;                // 0 - number of houses

		this.hotelRent = loadedCellObj.hotelRent;
		this.hotel = loadedCellObj.hotel;             // currentstatus of hotel
		
		this.bldgTopVal = loadedCellObj.bldgTopVal;
		this.bldgLeftVal = loadedCellObj.bldgLeftVal;
	}
	
}

