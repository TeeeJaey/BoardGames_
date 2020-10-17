
$(document).ready(function()
{

	//#region "Variables"

	var gameStarted = false;
	var diceRolled = false;
	var isChanceOn = false;
	var gameOver = false;
	
    var diceVal1 = 0;
    var diceVal2 = 0;
    var diceValTotal = diceVal1 + diceVal2;
	var rupeeSym = "&#x20b9;";
	var consecutiveDoubles = 0;
	
	var currPlayer = 0;
	var board = [];
	var nmbrOfPlayers = 2;
	var players = [];
	var logs = [];
	var propertyColorGroups = [[],[1,3],[6,8,9],[11,13,14],[16,18,19],[21,23,24],[26,27,29],[31,32,34],[37,39]];

	//#endregion "Variables"
	

	//#region "Init displays for different objects"
	
	
	$("#menu").css("display","none");
    $(".coin").css("display","none");
	$("#startcontrols").css("display","");
	$("#gameControls").css("display","none");
    $("#endControls").css("display","none");
    $("#btnTrade").css("display","none");
    $("#btnLogs").css("display","none");

	//#endregion "Init displays for different objects"

	//#region "DTO Classes"

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
			
			var dd = new Date();
			var ss = '' + dd.getFullYear() + (dd.getMonth()+1) + dd.getDate() + dd.getHours()+ dd.getMinutes()+ dd.getSeconds();
	
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
				nmbrOfPlayers = loadedGame.nmbrOfPlayers;
				currPlayer = loadedGame.currPlayer;

				player = [];
				var i = 0;
				while(i< nmbrOfPlayers)
				{
					var player = new Player();
					player.loadGame_Player(loadedGame.players[i]);
					players.push(player);
					i += 1;
				}

				board = [];
				var i = 0;
				while(i < 40)
				{
					var boardCell = new Cell();
					boardCell.loadGame_boardCell(loadedGame.board[i]);
					board.push(boardCell);
					i += 1;
				}

				logs = [];
				var i = 0;
				while(i < logs.length)
				{
					var log = new Log();
					log.loadGame_Log(loadedGame.logs[i]);
					logs.push(log);
					i += 1;
				}

				$(".coin").css("display","");
			
				if(nmbrOfPlayers < 4)
				{
					$("#YellowCoin").remove();
					$("#YellowData").remove();
					$(".yellowTradeSelector").remove();
				}
		
				if(nmbrOfPlayers < 3)
				{
					$("#BlueCoin").remove();
					$("#BlueData").remove();
					$(".blueTradeSelector").remove();
				}
				
				refreshGameUI();
				
				return true;
			}
			catch(e)
			{
				currentGame.setCurrentGame();
				return false;
			}
		}
	}

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

			/*    
            if(this.isCity || this.isUtility)
            {
                this.price = price;
                this.rent = rent;
                this.isMortaged = false;        
				this.mortgagePrice = mortgagePrice;
				
				this.bldgTopVal = bldgTopVal;
				this.bldgLeftVal = bldgLeftVal;
			}
			
            if(this.isCity)
            {
                this.constructionPrice = constructionPrice;
                this.houseRent = houseRent;     // [price1,price2,prcie3,price4]               // 0 - number of houses
                this.hotelRent = hotelRent;           // currentstatus of hotel
				
			}
			*/
			
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

		
		getBldg()
		{
			var bldgCoin = null;
			if(this.isUtility)
			{
				if(this.owner > -1)
				{
					bldgCoin = makeBldgCoin(this.owner,"0");
				}
			}
			if(this.isCity)
			{
				if(this.owner > -1)
				{
					if(this.isMortaged)
					{
						bldgCoin = makeBldgCoin(this.owner,"M");
						return bldgCoin;
					}
					else if(this.hotel)
					{
						bldgCoin = makeBldgCoin(this.owner,"H");
						return bldgCoin;
					}
					else
					{
						bldgCoin = makeBldgCoin(this.owner, this.houses);
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
			this.position = loadedPlayerObj.position;
			this.topVal = loadedPlayerObj.topVal;
			this.leftVal = loadedPlayerObj.leftVal;
			this.money = loadedPlayerObj.money;
			this.properties = loadedPlayerObj.properties;
			this.cityGroups = loadedPlayerObj.cityGroups;
			this.inJail = loadedPlayerObj.inJail;
			return;
		}
	}
	
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

		generateLogDiv()
		{
		
			var logDiv = document.createElement('div');
			
			var giverCoin = makeLogCoin(this.sender);
			var takerCoin = makeLogCoin(this.reciever);
	
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

		
		loadGame_Log(loadedLogObj)
		{
			this.sender = loadedLogObj.sender;
			this.reciever = loadedLogObj.reciever;
			this.amount = loadedLogObj.amount;
			this.reason = loadedLogObj.reason;
			this.property = loadedLogObj.property;
			return;
		}
	}


	//#endregion "DTO Classes"


	//#region "Menu"

	$("#btnRules").click(function()
	{
        $("#allRules").animate({"right":"0%"});

    });
	$("#closeRules").click(function()
	{
        $("#allRules").animate({"right":"-500px"});
	});
	
	$("#btnMenu").click(function()
	{
        $("#menu").toggle();
    });
	
	$("#saveGame").click(function()
	{
		var game = new Game();
		game.saveGame();
	});

	var loadedGameFile = null;
	document.getElementById('loadGameFile').addEventListener('change', handleFileSelect, false);
	function handleFileSelect(evt) {
		loadedGameFile = evt.target.files[0];
	}

	$("#loadGame").click(function()
	{
		$('#loadGameModal').modal({
			backdrop: 'static',
			keyboard: false
		});
	});


	$("#loadGameSubmit").click(function()
	{
		var fr = new FileReader();
		var f = loadedGameFile;
		// Closure to capture the file information.
		fr.onload = (function (theFile) {
			return function (e) {
				try 
				{
					var loadedGame = JSON.parse(e.target.result);
					if(loadedGame != null)
					{
						var newGame = new Game();
						var gameLoaded = newGame.loadGame(loadedGame);

						if(gameLoaded)
						{
							console.log('Loaded game = ', loadedGame);
							setupTrade();
							startGame();

							$("#loadGameModal").modal('hide');
	
							Swal.fire(
								"Game Loaded Success",'',
								'success'
							);
							
							
						}
						else
						{
							console.log('Error loading game');	
							Swal.fire(
								"Game Load failed!",'',
								'error'
							);

						}

					}
					else
					{
						console.log('Error parsing json');	
						Swal.fire(
							"Game Load failed!",'',
							'error'
						);
					}
					
				}
				catch (ex) 
				{
					console.log('Error loading json : ' , ex);	
					Swal.fire(
						"Game Load failed!",'',
						'error'
					);
				}
			}
		})(f);
		fr.readAsText(f);


	});

	//#endregion "Menu"

	//#region "Trade"
	function addTradeCardImage(cardNumber, left)
	{
		var Image = document.createElement('img');
		Image.src = "images/properties/" + cardNumber + ".PNG";
		Image.id = "tradecard"+cardNumber.toString();

		if(left)
		{
			$(Image).addClass("imageLeftPropertyTrade");
			$("#tradeLeftPropertyContainer").append(Image);
		}
		else
		{
			$(Image).addClass("imageRightPropertyTrade");
			$("#tradeRightPropertyContainer").append(Image);
		}
		return Image;
	}

	function refreshTradeCards(left)
	{
		if(left)
		{
			var leftPlayer = $("input[name='tradeLeftPlayerSelector']:checked").val();
			$("#tradeLeftPropertyContainer").empty();

			var i = 0;
			while(i < players[leftPlayer].properties.length)
			{	
				var cardNumber = players[leftPlayer].properties[i]; 
				if(board[cardNumber].isCity || board[cardNumber].isUtility)
				{	
					if(!board[cardNumber].isMortaged && !board[cardNumber].hotel && board[cardNumber].houses == 0 )
					{
						addTradeCardImage(cardNumber, left);
					}
				}
				i+=1;
			}
		}
		else
		{
			var rightPlayer = $("input[name='tradeRightPlayerSelector']:checked").val();
			$("#tradeRightPropertyContainer").empty();
			
			var i = 0;
			while(i < players[rightPlayer].properties.length)
			{	
				var cardNumber = players[rightPlayer].properties[i]; 
				if(board[cardNumber].isCity || board[cardNumber].isUtility)
				{	
					if(!board[cardNumber].isMortaged && !board[cardNumber].hotel && board[cardNumber].houses == 0 )
					{
						addTradeCardImage(cardNumber, left);
					}
				}
				i+=1;
			}
		}
		

		return;
	}
	
	$(document).on('click', ".imageLeftPropertyTrade", function()
	{
        if($(this).hasClass("tradeImageSelected"))
			$(this).removeClass("tradeImageSelected");
		else
			$(this).addClass("tradeImageSelected");
    });
	$(document).on('click', ".imageRightPropertyTrade", function()
	{
        if($(this).hasClass("tradeImageSelected"))
			$(this).removeClass("tradeImageSelected");
		else
			$(this).addClass("tradeImageSelected");
    });


	$('input[name=tradeLeftPlayerSelector]').change(function() {
		refreshTradeCards(true);
	});
	$('input[name=tradeRightPlayerSelector]').change(function() {
		refreshTradeCards(false);
	});

	$("#btnTrade").click(function()
	{
		$("#TradeTray").animate({"right":"0%"});
		setupTrade();
		refreshTradeCards(true);
		refreshTradeCards(false);
    });
	$("#closeTrade").click(function()
	{
        $("#TradeTray").animate({"right":"-650px"});
    });
		

	$('#tradeLeftAmountSlider').on('input change', () => {
		$('#tradeLeftAmountLabel').html(rupeeSym+$('#tradeLeftAmountSlider').val());
	});
	
	$('#tradeRightAmountSlider').on('input change', () => {
		$('#tradeRightAmountLabel').html(rupeeSym + $('#tradeRightAmountSlider').val());
	});

	function performTrade()
	{
		var tradeSuccess = true;
		var leftPlayer = $("input[name='tradeLeftPlayerSelector']:checked").val();
		var rightPlayer = $("input[name='tradeRightPlayerSelector']:checked").val();

		var leftCardList = $(".imageLeftPropertyTrade.tradeImageSelected");
		var rightCardList = $(".imageRightPropertyTrade.tradeImageSelected");
		
		//$(".imageLeftPropertyTrade.tradeImageSelected")[0].id.split('tradecard')[1]
		var leftAmount = parseInt($('#tradeLeftAmountSlider').val()); 
		var rightAmount = parseInt($('#tradeRightAmountSlider').val());

		if(leftAmount > rightAmount)
		{
			var log = new Log(leftPlayer,rightPlayer,leftAmount-rightAmount,"trade");
			var logDiv = log.generateLogDiv();
			log.prependLogDiv(logDiv);
			performTransaction(log);
		}
		else if(rightAmount > leftAmount)
		{
			var log = new Log(rightPlayer,leftPlayer,rightAmount-leftAmount,"trade");
			var logDiv = log.generateLogDiv();
			log.prependLogDiv(logDiv);
			performTransaction(log);
		}

		var i = 0;
		while(i<leftCardList.length)
		{
			var property = parseInt(leftCardList[0].id.split('tradecard')[1]);
			var propertyIndex = players[leftPlayer].properties.lastIndexOf(property)
			if(propertyIndex != -1)
			{
				players[leftPlayer].properties.splice(propertyIndex, 1);
				players[rightPlayer].properties.push(property);

				players[leftPlayer].refreshCityGroups();
				players[rightPlayer].refreshCityGroups();
			}
			else
				tradeSuccess = false;

			i+=1;
		}

		i = 0;
		while(i<rightCardList.length)
		{
			var property = parseInt(rightCardList[0].id.split('tradecard')[1]);
			var propertyIndex = players[rightPlayer].properties.lastIndexOf(property)
			if(propertyIndex != -1)
			{
				players[rightPlayer].properties.splice(propertyIndex, 1);
				players[leftPlayer].properties.push(property);

				players[leftPlayer].refreshCityGroups();
				players[rightPlayer].refreshCityGroups();
			}
			else
				tradeSuccess = false;

			i+=1;
		}

		return tradeSuccess;
	}

	$("#confirmTrade").click(function()
	{
		if($("input[name='tradeLeftPlayerSelector']:checked").val() == $("input[name='tradeRightPlayerSelector']:checked").val())
		{
			Swal.fire(
				"Trade Fail!",'Same player selected',
				'error'
			);
		}
		else
		{
			Swal.fire({
				title: "Are you sure?",
				text: "Just Confirming this trade operation",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, Confirm!',
				allowOutsideClick: false
			}).then((result) => 
			{
				if (result.isConfirmed) 
				{
					if(performTrade())
					{
						Swal.fire(
							"Trade complete!",'',
							'success'
						);
						refreshGameUI();
					}
					else
					{
						Swal.fire(
							"Trade Fail!",'',
							'error'
						);
					}
					$("#TradeTray").animate({"right":"-650px"});
				}
			})
		}
	});
	
	//#endregion "Trade"
	
	
	//#region "Logs"

	$("#btnLogs").click(function()
	{
		$("#allLogs").animate({"right":"0%"});
	});
	
	$("#closeLogs").click(function()
	{
        $("#allLogs").animate({"right":"-650px"});
	});
	
	function makeLogCoin(playerNumber)
	{
		var logCoinImage = document.createElement('img');
		var color = "bank";
		switch(playerNumber)
		{
			case 0: color = "red"; break;
			case 1: color = "green"; break;
			case 2: color = "blue"; break;
			case 3: color = "yellow"; break;
			default: color = "bank"; break;
		}
		logCoinImage.src="images/"+color+".PNG";

		$(logCoinImage).addClass("logCoin");
		return logCoinImage;
	}

	function performTransaction(log)
	{
		if(log.sender > -1 && log.reciever > -1)
		{
			players[log.sender].money -= log.amount;
			players[log.reciever].money += log.amount;	
		}
		else
		{
			if(log.reciever == -1)
				players[log.sender].money -= log.amount;
			else
			{
				players[log.reciever].money += log.amount;
			}
		}
	}
	//#endregion "Logs"

	//#region "Setup"

	function setupBoard()
	{
		var i = 0;
		while(i < 40)
		{
			board[i] = new Cell(i)
			
			if(i <= 10)
			{
				board[i].topVal = 520;
				board[i].bldgTopVal=490;
			}
			if(10 <= i && i <= 20)
			{
				board[i].leftVal = 38;
				board[i].bldgLeftVal=73;
			}
			if(20 <= i && i <= 30)
			{
				board[i].topVal = 15;
				board[i].bldgTopVal=70;
			}
			if(30 <= i || i==0)
			{
				board[i].leftVal = 530;
				board[i].bldgLeftVal = 495;
			}
			i+=1;
		}
	
		// --
		board[0].cellName="Go"
		// --
		
		board[1].cellName="Guwahati";
		board[1].colorGroup=1;
		board[1].position=1;
		board[1].leftVal=460;
		board[1].isCity=true;
		board[1].price=60;
		board[1].rent=2;
		board[1].mortgagePrice=30;
		board[1].constructionPrice=50;
		board[1].houseRent=[0,10,30,90,160];
		board[1].hotelRent=250;
		board[1].bldgLeftVal=462;

		board[2].cellName="Chest";
		board[2].leftVal=415;

		board[3].cellName="Bhubaneshwar";
		board[3].colorGroup=1;
		board[3].leftVal=370;
		board[3].isCity=true;
		board[3].price=60;
		board[3].rent=4;
		board[3].mortgagePrice=30;
		board[3].constructionPrice=50;
		board[3].houseRent=[0,20,60,180,320];
		board[3].hotelRent=450;
		board[3].bldgLeftVal=373;

		
		board[4].cellName="Income Tax";
		board[4].leftVal=325;

		board[5].cellName="Chennai Railway Station";
		board[5].leftVal=283;
		board[5].isUtility=true;
		board[5].price=200;
		board[5].rent=25;
		board[5].mortgagePrice=100;
		board[5].bldgLeftVal=285;

		board[6].cellName="Panaji";
		board[6].colorGroup=2;
		board[6].leftVal=240;
		board[6].isCity=true;
		board[6].price=100;
		board[6].rent=6;
		board[6].mortgagePrice=50;
		board[6].constructionPrice=50;
		board[6].houseRent=[0,30,90,270,400];
		board[6].hotelRent=550;
		board[6].bldgLeftVal=241;

		board[7].cellName="Chance";
		board[7].leftVal=195;
		
		board[8].cellName="Agra";
		board[8].colorGroup=2;
		board[8].leftVal=150;
		board[8].isCity=true;
		board[8].price=100;
		board[8].rent=6;
		board[8].mortgagePrice=50;
		board[8].constructionPrice=50;
		board[8].houseRent=[0,30,90,270,400];
		board[8].hotelRent=550;;
		board[8].bldgLeftVal=152;
					
		board[9].cellName="Vadodara";
		board[9].colorGroup=2;
		board[9].leftVal=107;
		board[9].isCity=true;
		board[9].price=120;
		board[9].rent=8;
		board[9].mortgagePrice=60;
		board[9].constructionPrice=50;
		board[9].houseRent=[0,40,100,300,450];
		board[9].hotelRent=600;
		board[9].bldgLeftVal=108;
				
		// --		
		board[10].cellName="Jail";	
		// --

		board[11].cellName="Ludhiana";
		board[11].colorGroup=3;
		board[11].topVal=445;
		board[11].isCity=true;
		board[11].price=140;
		board[11].rent=10;
		board[11].mortgagePrice=70;
		board[11].constructionPrice=100;
		board[11].houseRent=[0,50,150,450,625];
		board[11].hotelRent=750;
		board[11].bldgTopVal=460;
		
		board[12].cellName="Electric Company";
		board[12].isUtility=true;
		board[12].topVal=400
		board[12].price=150;
		board[12].rent=40;
		board[12].mortgagePrice=75;
		board[12].bldgTopVal=418;
		
		board[13].cellName="Patna";
		board[13].colorGroup=3;
		board[13].topVal=360;
		board[13].isCity=true;
		board[13].price=140;
		board[13].rent=10;
		board[13].mortgagePrice=70;
		board[13].constructionPrice=100;
		board[13].houseRent=[0,50,150,450,625];
		board[13].hotelRent=750;
		board[13].bldgTopVal=370;
		
		board[14].cellName="Bhopal";
		board[14].colorGroup=3;
		board[14].topVal=315;
		board[14].isCity=true;
		board[14].price=160;
		board[14].rent=12;
		board[14].mortgagePrice=80;
		board[14].constructionPrice=100;
		board[14].houseRent=[0,60,180,500,700];
		board[14].hotelRent=900;
		board[14].bldgTopVal=325;
		
		board[15].cellName="Howrah Station";
		board[15].topVal=270;
		board[15].isUtility=true;
		board[15].price=200;
		board[15].rent=25;
		board[15].mortgagePrice=100;
		board[15].bldgTopVal=280;
		
		board[16].cellName="Indore";
		board[16].colorGroup=4;
		board[16].topVal=225;
		board[16].isCity=true;
		board[16].price=160;
		board[16].rent=12;
		board[16].mortgagePrice=80;
		board[16].constructionPrice=100;
		board[16].houseRent=[0,60,180,500,700];
		board[16].hotelRent=900;
		board[16].bldgTopVal=235;
		
		board[17].cellName="Chest";
		board[17].topVal=180;
		
		board[18].cellName="Nagpur";
		board[18].colorGroup=4;
		board[18].topVal=135;
		board[18].isCity=true;
		board[18].price=180;
		board[18].rent=14;
		board[18].mortgagePrice=90;
		board[18].constructionPrice=100;
		board[18].houseRent=[0,70,200,550,750];
		board[18].hotelRent=950;
		board[18].bldgTopVal=150;
		
		board[19].cellName="Kochi";
		board[19].colorGroup=4;
		board[19].topVal=90;
		board[19].isCity=true;
		board[19].price=200;
		board[19].rent=16;
		board[19].mortgagePrice=100;
		board[19].constructionPrice=100;
		board[19].houseRent=[0,80,220,600,800];
		board[19].hotelRent=1000;
		board[19].bldgTopVal=105;
		
		// --	
		board[20].cellName="Free Parking";
		// --	
		
		board[21].cellName="Lucknow";
		board[21].colorGroup=5;
		board[21].leftVal=107;
		board[21].isCity=true;
		board[21].price=220;
		board[21].rent=18;
		board[21].mortgagePrice=110;
		board[21].constructionPrice=150;
		board[21].houseRent=[0,90,220,600,800];
		board[21].hotelRent=1050;
		board[21].bldgLeftVal=108;

		board[22].cellName="Chance";
		board[22].leftVal=150;
		
		board[23].cellName="Chandigarh";
		board[23].colorGroup=5;
		board[23].leftVal=195;
		board[23].isCity=true;
		board[23].price=220;
		board[23].rent=18;
		board[23].mortgagePrice=110;
		board[23].constructionPrice=150;
		board[23].houseRent=[0,90,220,600,800];
		board[23].hotelRent=1050;
		board[23].bldgLeftVal=196;

		board[24].cellName="Jaipur";
		board[24].colorGroup=5;
		board[24].leftVal=240;
		board[24].isCity=true;
		board[24].price=240;
		board[24].rent=20;
		board[24].mortgagePrice=120;
		board[24].constructionPrice=150;
		board[24].houseRent=[0,100,300,750,925];
		board[24].hotelRent=1100;
		board[24].bldgLeftVal=241;

		board[25].cellName="New Delhi Station";
		board[25].leftVal=283;
		board[25].isUtility=true;
		board[25].price=200;
		board[25].rent=25;
		board[25].mortgagePrice=100;
		board[25].bldgLeftVal=285;

		board[26].cellName="Pune";
		board[26].colorGroup=6;
		board[26].leftVal=325;
		board[26].isCity=true;
		board[26].price=260;
		board[26].rent=22;
		board[26].mortgagePrice=130;
		board[26].constructionPrice=150;
		board[26].houseRent=[0,110,330,800,975];
		board[26].hotelRent=1150;
		board[26].bldgLeftVal=328;

		board[27].cellName="Hyderabad";
		board[27].colorGroup=6;
		board[27].leftVal=370;
		board[27].isCity=true;
		board[27].price=260;
		board[27].rent=22;
		board[27].mortgagePrice=130;
		board[27].constructionPrice=150;
		board[27].houseRent=[0,110,330,800,975];
		board[27].hotelRent=1150;
		board[27].bldgLeftVal=373;

		board[28].cellName="Water Works";
		board[28].leftVal=415;
		board[28].isUtility=true;
		board[28].price=150;
		board[28].rent=40;
		board[28].mortgagePrice=75;
		board[28].bldgLeftVal=418; 
	
		board[29].cellName="Ahmedabad";
		board[29].colorGroup=6;
		board[29].leftVal=460;
		board[29].isCity=true;
		board[29].price=280;
		board[29].rent=24;
		board[29].mortgagePrice=140;
		board[29].constructionPrice=150;
		board[29].houseRent=[0,120,360,850,1025];
		board[29].hotelRent=1200;
		board[29].bldgLeftVal=462;

		// --	
		board[30].cellName="Go to Jail";
		// --
		
		board[31].cellName="Kolkata";
		board[31].colorGroup=7;
		board[31].topVal=90;
		board[31].isCity=true;
		board[31].price=300;
		board[31].rent=26;
		board[31].mortgagePrice=150;
		board[31].constructionPrice=200;
		board[31].houseRent=[0,130,390,900,1100];
		board[31].hotelRent=1275;
		board[31].bldgTopVal=105;
		
		board[32].cellName="Chennai";
		board[32].colorGroup=7;
		board[32].topVal=135;
		board[32].isCity=true;
		board[32].price=300;
		board[32].rent=26;
		board[32].mortgagePrice=150;
		board[32].constructionPrice=200;
		board[32].houseRent=[0,130,390,900,1100];
		board[32].hotelRent=1275;
		board[32].bldgTopVal=150;
		
		board[33].cellName="Chest";
		board[33].topVal=180,leftVal=530,isUtility=false,isCity=false;

		board[34].cellName="Bengaluru";
		board[34].colorGroup=7;
		board[34].topVal=225;
		board[34].isCity=true;
		board[34].price=320;
		board[34].rent=28;
		board[34].mortgagePrice=160;
		board[34].constructionPrice=200;
		board[34].houseRent=[0,150,450,1000,1100];
		board[34].hotelRent=1400;
		board[34].bldgTopVal=235;

		board[35].cellName="Chhatrapati Shivaji Terminus";
		board[35].topVal=270;
		board[35].isUtility=true;
		board[35].price=200;
		board[35].rent=25;
		board[35].mortgagePrice=100;
		board[35].bldgTopVal=280;

		board[36].cellName="Chance";
		board[36].topVal=315;
		
		board[37].cellName="Delhi";
		board[37].colorGroup=8;
		board[37].topVal=360;
		board[37].isCity=true;
		board[37].price=350;
		board[37].rent=35;
		board[37].mortgagePrice=175;
		board[37].constructionPrice=200;
		board[37].houseRent=[0,175,500,1100,1300];
		board[37].hotelRent=1500;
		board[37].bldgTopVal=370;

		board[38].cellName="Super Tax";
		board[38].colorGroup=0;
		board[38].position=4;
		board[38].topVal=400;

		board[39].cellName="Mumbai";
		board[39].colorGroup=8;
		board[39].topVal=445;
		board[39].isCity=true;
		board[39].price=400;
		board[39].rent=50;
		board[39].mortgagePrice=200;
		board[39].constructionPrice=200;
		board[39].houseRent=[0,200,600,1400,1700];
		board[39].hotelRent=2000;
		board[39].bldgTopVal=460;

		return;
	}

	setupBoard();
	
	function setupPlayers()
	{
		nmbrOfPlayers = $("input[name='nmbrOfPlayers']:checked").val();
		
		var i = 0;
		var color = "Red";
		while(i<nmbrOfPlayers)
		{
			if(i == 0)
				color = "Red";
			if(i == 1)
				color = "Green";
			if(i == 2)
				color = "Blue";
			if(i == 3)
                color = "Yellow";
            
            players.push(new Player(color));
			i+=1;
		}

        $(".coin").css("display","");
        
        if(nmbrOfPlayers < 4)
        {
			$("#YellowCoin").remove();
			$("#YellowData").remove();
			$(".yellowTradeSelector").remove();
        }

		if(nmbrOfPlayers < 3)
		{
            $("#BlueCoin").remove();
			$("#BlueData").remove();
			$(".blueTradeSelector").remove();
		}
		
		return;
	}

	function setupTrade()
	{
		
		var tradeLeftPlayerSelectorVal = $("input[name='tradeLeftPlayerSelector']:checked").val();
		if(!tradeLeftPlayerSelectorVal)
		{
			$("input[name='tradeLeftPlayerSelector']")[0].checked = true;
			tradeLeftPlayerSelectorVal = 0;
		}

		var tradeRightPlayerSelectorVal = $("input[name='tradeRightPlayerSelector']:checked").val();
		if(!tradeRightPlayerSelectorVal)
		{
			$("input[name='tradeRightPlayerSelector']")[0].checked = true;
			tradeRightPlayerSelectorVal = 0;
		}

		$('#tradeLeftAmountSlider')[0].min = 0;
		$('#tradeRightAmountSlider')[0].min  = 0;

		$('#tradeLeftAmountSlider')[0].value = 0;
		$('#tradeRightAmountSlider')[0].value  = 0;

		$('#tradeLeftAmountSlider')[0].max = players[tradeLeftPlayerSelectorVal].money;
		$('#tradeRightAmountSlider')[0].max = players[tradeRightPlayerSelectorVal].money;

		$('#tradeLeftAmountLabel').html(rupeeSym + $('#tradeLeftAmountSlider').val());
		$('#tradeRightAmountLabel').html(rupeeSym + $('#tradeRightAmountSlider').val());
		
		return;
	}

	//#endregion "Setup"
	
	
	//#region "Building"
	
	function makeBldgCoin(playerNumber,bldgStr)
	{
		var BldgCoin = document.createElement('img');
		$(BldgCoin).addClass("bldgCoin");
		switch(playerNumber)
		{
			case 0: color = "red"; break;
			case 1: color = "green"; break;
			case 2: color = "blue"; break;
			case 3: color = "yellow"; break;
		}
		BldgCoin.src="images/bldgs/"+color+bldgStr+".PNG";

		return BldgCoin;
	}

	//#endregion "Building"

	//#region "Game Functions"

	$("#start").click(function()
	{
		setupPlayers();
		setupTrade();
		startGame();
	});

	function startGame()
	{
		
		$("#startcontrols").css("display","none");
		$("#gameControls").css("display","");
		$("#endControls").css("display","none");
		$("#btnTrade").css("display","");
		$("#btnLogs").css("display","");

		gameStarted = true;
	}

	$("#diceContainer").click(function()
	{
		/*
		var logItem = new Log(2,1,300,"rent",board[12].cellName);
		var logDiv = logItem.generateLogDiv();
		logItem.displayLog(logDiv);
		logItem.prependLogDiv(logDiv);
		logs.push(logItem);
		5*/


		if(!gameStarted)
			return;
		if(gameOver)
			return;	
		if(diceRolled)
			return;
		if(isChanceOn)
			return;

		diceRolled = true;
		rollDice();
	});


	function rollDice()
	{
		isChanceOn = true;
		var cnt=0;	
		var diceRollAnim = setInterval(function()
		{
			if(cnt==5)
			{
				clearInterval(diceRollAnim);
				play();
				return;
			}
			cnt+=1;
			i = cnt%3;
			diceVal1 = Math.floor(Math.random() * 6) + 1;
            diceVal2 = Math.floor(Math.random() * 6) + 1;
            diceValTotal = diceVal1 + diceVal2;
			$('#dice1').attr("src","images/dice/diceRoll"+i.toString()+".PNG");
			$('#dice2').attr("src","images/dice/diceRoll"+(2-i).toString()+".PNG");

		},200);
	}
	
	
    
	function play()
	{
        $('#dice1').attr("src","images/dice/dice"+diceVal1.toString()+".PNG");
        $('#dice2').attr("src","images/dice/dice"+diceVal2.toString()+".PNG");
		
		
		var currCoin = $("#"+players[currPlayer].color+"Coin");
		if(players[currPlayer].inJail && (diceVal1 != diceVal2) ) // show jail popup
		{
			var jailQstn = document.createElement('div');
			$(jailQstn).addClass("logItem").html("Pay "+rupeeSym+"100 OR wait till you roll a double?");
		
			Swal.fire({
				title: "You are in Jail!",
				text: jailQstn.innerHTML,
				imageUrl: "images/"+players[currPlayer].color+"Jail.PNG",
				imageWidth: 200,
				imageHeight: 200,
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: "Pay "+rupeeSym+"100",
				cancelButtonText: "Wait",
				allowOutsideClick: false
			}).then((result) => 
			{
				if (result.isConfirmed) 
				{
					var log = new Log(currPlayer,-1,100,"jail");
					var logDiv = log.generateLogDiv();
					log.prependLogDiv(logDiv);
					performTransaction(log);
					refreshGameUI();
					
					Swal.fire(
					'',"Paid "+rupeeSym+"100 to get out of Jail",
					'success'
					)

					players[currPlayer].inJail = false;
					moveCoin(currCoin);
				}
				else
					isChanceOn = false;
			})

		} 
		else
		{	
			players[currPlayer].inJail = false;
			moveCoin(currCoin);
		}

		if(diceVal1 == diceVal2 && !players[currPlayer].inJail)
		{
			consecutiveDoubles += 1;
			if(consecutiveDoubles < 3)
				diceRolled = false;
			else
			{
				moveBackWithoutGO(10);
						
				Swal.fire({
					title: "Going to Jail for OverSpeeding!",
					imageUrl: "images/"+players[currPlayer].color+"Jail.PNG",
					imageWidth: 200,
					imageHeight: 200,
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'OK',
					allowOutsideClick: false
				})
				consecutiveDoubles = 0;
			}
		}
		return;
	}
	
	function moveCoin()
	{ 
		var currCoin = $("#"+players[currPlayer].color+"Coin");
		isChanceOn = true;

		cnt = 0;
		var coinMoveAnim = setInterval(function()
		{
			if(cnt == diceValTotal)
			{
				clearInterval(coinMoveAnim);
				checkCell();
				isChanceOn = false;
				return;
			}
			cnt+=1;
			players[currPlayer].position = players[currPlayer].position + 1;
			
			if(players[currPlayer].position == 40)
				players[currPlayer].position = 0;
			
			players[currPlayer].topVal = board[players[currPlayer].position].topVal;
			players[currPlayer].leftVal = board[players[currPlayer].position].leftVal;
			currCoin.animate(
			{
				"top":(players[currPlayer].topVal).toString()+"px",
				"left":(players[currPlayer].leftVal).toString()+"px"
			},300);

		},300);
		
	}

	function moveBackWithoutGO(endPos)
	{
		var currCoin = $("#"+players[currPlayer].color+"Coin");

		var coinMoveAnim = setInterval(function()
		{
			if(players[currPlayer].position == endPos)
			{
				clearInterval(coinMoveAnim);
				checkCell()
				return;
			}
			
			if(players[currPlayer].position > 30 && endPos < 30)
				players[currPlayer].position = 30;
			else if(players[currPlayer].position > 20 && endPos < 20)
				players[currPlayer].position = 20;
			else if(players[currPlayer].position > 10 && endPos < 10)
				players[currPlayer].position = 10;
			else
				players[currPlayer].position = endPos;

			players[currPlayer].topVal = board[players[currPlayer].position].topVal;
			players[currPlayer].leftVal = board[players[currPlayer].position].leftVal;
			currCoin.animate(
			{
				"top":(players[currPlayer].topVal).toString()+"px",
				"left":(players[currPlayer].leftVal).toString()+"px"
			},500);

		},500);

	}

	
	function moveAheadWithGO(endPos)
	{
		var currCoin = $("#"+players[currPlayer].color+"Coin");

		var coinMoveAnim = setInterval(function()
		{
			if(players[currPlayer].position == endPos)
			{
				clearInterval(coinMoveAnim);
				checkCell()
				return;
			}
			
			if(endPos > players[currPlayer].position)
			{
					
				if(players[currPlayer].position < 10 && endPos >= 10)
					players[currPlayer].position = 10;
				else if(players[currPlayer].position < 20 && endPos >= 20)
					players[currPlayer].position = 20;
				else if(players[currPlayer].position < 30 && endPos >= 30)
					players[currPlayer].position = 30;
				else
					players[currPlayer].position = endPos;

			}
			else if(endPos < players[currPlayer].position)
			{
			
				if(players[currPlayer].position > 0)
					players[currPlayer].position = 10;

				if(players[currPlayer].position >= 10)
					players[currPlayer].position = 20;

				else if(players[currPlayer].position >= 20)
					players[currPlayer].position = 30;
					
				else if(players[currPlayer].position >= 30)
					players[currPlayer].position = 0;

			}
			
			players[currPlayer].topVal = board[players[currPlayer].position].topVal;
			players[currPlayer].leftVal = board[players[currPlayer].position].leftVal;
			currCoin.animate(
			{
				"top":(players[currPlayer].topVal).toString()+"px",
				"left":(players[currPlayer].leftVal).toString()+"px"
			},300);

		},300);

	}


	function checkCell()
	{
		
		var currCoin = $("#"+players[currPlayer].color+"Coin");
		var cell = board[players[currPlayer].position];
		var cellRent = cell.getCurrentRent(); 

		if(cellRent != undefined)
		{		
			if(cellRent > 0)
			{
				if(cell.owner != currPlayer)
				{
					var log = new Log(currPlayer,cell.owner,cellRent,"rent",cell.cellName);
					var logDiv = log.generateLogDiv();
					log.displayLog(logDiv);
					log.prependLogDiv(logDiv);
					performTransaction(log);
				}
			}
			else
			{
				// Show Sale form
				$("#imagePropertySale").attr("src",cell.cardImage);

				if(players[currPlayer].money < cell.price)
					$("#btnBuyProperty").prop('disabled', true); 
				
				$("#pursePropertySale")[0].innerHTML = " " + rupeeSym + " " + players[currPlayer].money;
				$('#PropertySaleModal').modal({
					backdrop: 'static',
					keyboard: false
				});

			}

		}
		else
		{
			if(cell.position == 10)
			{
				players[currPlayer].inJail = true;
				Swal.fire({
					title: "In Jail!",
					imageUrl: "images/"+players[currPlayer].color+"Jail.PNG",
					imageWidth: 200,
					imageHeight: 200,
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'OK',
					allowOutsideClick: false
				});
			}
			if(cell.position == 30)
				moveBackWithoutGO(10);

		}
		refreshGameUI();
		return;
	}



	function changePlayer()
	{
		
		$("#"+players[currPlayer].color+"Data").removeClass("currChanceData");

		currPlayer+=1;
		if(currPlayer == nmbrOfPlayers)
			currPlayer=0;
		
		$("#"+players[currPlayer].color+"Data").addClass("currChanceData");
		
		$(".currentChanceBtns").appendTo("#"+players[currPlayer].color+"Data");
		consecutiveDoubles = 0;
	}


	$("#btnDone").click(function()
    {
		if(isChanceOn)
			return;
		if(diceRolled)
		{
			changePlayer();
			diceRolled = false;
		}
	});
	

	$("#btnBuyProperty").click(function()
    {
		var cell = board[players[currPlayer].position];
		
		cell.owner = currPlayer;
		
		$("#PropertySaleModal").modal('hide');

		var log = new Log(currPlayer,-1,cell.price,"buy",cell.cellName);
		var logDiv = log.generateLogDiv();
		log.prependLogDiv(logDiv);
		performTransaction(log);

		players[currPlayer].properties.push(cell.position);
		players[currPlayer].refreshCityGroups();

		Swal.fire(
			'',"Bought " + cell.cellName + " for " +rupeeSym+ " " + cell.price,
			'success'
		);

		refreshGameUI();
	});

		
	function refreshGameUI()
	{

		var i = 0;
		while(i<nmbrOfPlayers)
		{
			$("#"+players[i].color+"Coin").css("top",(players[i].topVal).toString()+"px");
			$("#"+players[i].color+"Coin").css("left",(players[i].leftVal).toString()+"px");

			$("#"+players[i].color+"CityValue")[0].innerHTML = players[i].properties.length;
			$("#"+players[i].color+"HouseValue")[0].innerHTML = players[i].houseCount;
			$("#"+players[i].color+"HotelValue")[0].innerHTML = players[i].hotelCount;
			$("#"+players[i].color+"MoneyValue")[0].innerHTML = rupeeSym + " " + players[i].money;
			
			if(players[i].money < 1)
				$("#"+players[i].color+"MoneyValue").css("color","red");
			else
				$("#"+players[i].color+"MoneyValue").css("color","black");

			i += 1;
		}

		i = 0;
		while(i<40)
		{
			board[i].showBldg();
			i += 1;
		}
		
	}
	

	//#endregion "Functions"



});