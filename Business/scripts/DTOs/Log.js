
class Log 
{
	constructor(sender,reciever,amount,reason,property)
	{
		this.sender = sender;
		this.reciever = reciever;
		this.amount = amount;
		this.reason = reason;
		this.property = property;
	}

	makeLogCoin(playerNumber)
	{
		var logCoinImage = document.createElement('img');
		var color = "bank";
		switch(playerNumber)
		{
			case 0: color = "red"; break;
			case 1: color = "green"; break;
			case 2: color = "blue"; break;
			case 3: color = "yellow"; break;
		}
		logCoinImage.src="images/"+color+".PNG";

		$(logCoinImage).addClass("logCoin");
		return logCoinImage;
	}

	generateLogDiv()
	{
		var logDiv = document.createElement('div');
		
		var giverCoin = this.makeLogCoin(parseInt(this.sender));
		var takerCoin = this.makeLogCoin(parseInt(this.reciever));

		var reasonText = this.reason; 
		switch(this.reason) 
		{
			case "rent":
				reasonText = "(Rent for <b>"+this.property+"</b>)";
				break;

			case "trade":
				reasonText = "(as part of Trade)";
				break;

			case "buy":
				reasonText = "(as purchase of <b>"+this.property+"</b>)";
				break;

			case "bldg":
				reasonText = "(as building on <b>"+this.property+"</b>)";
				break;

			case "jail":
				reasonText = "(as Jail charges)";
				break;

			default:
				reasonText = "("+this.reason+")"; 
				break;
		}

		$(logDiv).addClass("logItem").html(giverCoin.outerHTML + " Paid <b>" + rupeeSym + this.amount.toString() + "</b> "+reasonText+" to " +takerCoin.outerHTML);
		return logDiv;
	}
	
	prependLogDiv(logDiv)
	{
		$("#logsContainer").prepend(logDiv);
		logs.push(this);
		return;
	}


	displayLog(logDiv)
	{
		Swal.fire({
			title: logDiv.outerHTML,
			icon: 'info',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'OK'
		});
		return;
	}


	performTransaction()
	{
		if(this.sender > -1 && this.reciever > -1)
		{
			players[this.sender].money -= this.amount;
			players[this.reciever].money += this.amount;	
		}
		else
		{
			if(this.reciever == -1)
				players[this.sender].money -= this.amount;
			else
			{
				players[this.reciever].money += this.amount;
			}
		}
	}
	
	loadGame_Log(loadedLogObj)
	{
		this.sender = loadedLogObj.sender;
		this.reciever = loadedLogObj.reciever;
		this.amount = loadedLogObj.amount;
		this.reason = loadedLogObj.reason;
		this.property = loadedLogObj.property;

		var logDiv = this.generateLogDiv();
		this.prependLogDiv(logDiv);
		
		return;
	}
}


//#endregion "DTO Classes"
