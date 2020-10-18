
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

	}

	refreshCityGroups()
	{
		this.cityGroups = [];
		this.properties.sort();
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
