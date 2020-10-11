
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
		constructor()
		{
			this.nmbrOfPlayers = nmbrOfPlayers;
			this.currPlayer = currPlayer;
			this.players = players;
			this.board = board;
			this.logs = logs;
		}
	
	}

	class Cell 
	{
        constructor(cellName,colorGroup,position,topVal,leftVal,isUtility,isCity,
            price,cardImage,rent,constructionPrice,mortgagePrice,houseRent,hotelRent,bldgTopVal,bldgLeftVal)  
		{
            this.cellName = cellName;
			this.colorGroup = colorGroup;
			this.position = position; 
			this.topVal = topVal;
            this.leftVal = leftVal;
            
            this.isUtility = isUtility;
            this.isCity = isCity;


            if(isCity || isUtility)
            {
                this.price = price;
                this.cardImage = cardImage;
                this.owner = -1;
                this.rent = rent;
                this.isMortaged = false;        
                this.mortgagePrice = mortgagePrice;
			}
			
            if(isCity)
            {
                this.constructionPrice = constructionPrice;

                this.houseRent = houseRent;     // [price1,price2,prcie3,price4]
                this.houses = 0;                // 0 - number of houses

                this.hotelRent = hotelRent;
				this.hotel = false;             // currentstatus of hotel
				
				this.bldgTopVal = bldgTopVal;
				this.bldgLeftVal = bldgLeftVal;
            }
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
					else if(board[i].hotel)
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
				if(board[i].owner > -1)
				{
					var bldgCoin = getBldg();
					$(bldgCoin).css("top",this.bldgTopVal.toString()+"px");
					$(bldgCoin).css("left",this.bldgLeftVal.toString()+"px");
				}
			}
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
			this.inJail = false;
		}

		refreshCityGroups()
		{
			this.cityGroups = [];

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

		displayLog()
		{
			var logDiv = generateLogs(this);

			Swal.fire({
				title: logDiv.outerHTML,
				icon: 'info',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'OK',
				allowOutsideClick: false
			});
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
		var savedGame = new Game();
		var gameJSON = JSON.stringify(savedGame,null,4);
		var a = document.createElement("a");
		var file = new Blob([gameJSON],{type:"application/json"});
		a.href = URL.createObjectURL(file);
		a.download = "save.json";
		a.click();
		URL.revokeObjectURL(a.href)
	});

	var loadedGameFile = null;
	document.getElementById('loadGameFile').addEventListener('change', handleFileSelect, false);
	function handleFileSelect(evt) {
		loadedGameFile = evt.target.files[0];
	}
	
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
						board = loadedGame.board;
						currPlayer = loadedGame.currPlayer;
						logs = loadedGame.logs;
						nmbrOfPlayers = loadedGame.nmbrOfPlayers;
						players = loadedGame.players;
						console.log('Loaded game = ', loadedGame);

						
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
						
						setupTrade();
				
						$("#startcontrols").css("display","none");
						$("#gameControls").css("display","");
						$("#endControls").css("display","none");
						$("#btnTrade").css("display","");
						$("#btnLogs").css("display","");
				
						gameStarted = true;

						refreshBoardUI();

						Swal.fire(
							"Game Loaded Success",'',
							'success'
						)
						
					}

				}
				catch (ex) 
				{
					console.log('Error load json : ' , ex);	
					Swal.fire(
						"Game Load failed!",'',
						'error'
					)
					return false;
				}
			}
		})(f);
		fr.readAsText(f);


	});

	//#endregion "Menu"

	//#region "Trade"

	function setupTrade()
	{
		var tradeLeftPlayerSelectorVal = $("input[name='tradeLeftPlayerSelector']:checked").val();
		var tradeRightPlayerSelectorVal = $("input[name='tradeRightPlayerSelector']:checked").val();

		$('#tradeLeftAmountSlider')[0].min = 0;
		$('#tradeRightAmountSlider')[0].min  = 0;
		$('#tradeLeftAmountSlider')[0].value = 0;
		$('#tradeRightAmountSlider')[0].value  = 0;
		$('#tradeLeftAmountSlider')[0].max = players[tradeLeftPlayerSelectorVal].money;
		$('#tradeRightAmountSlider')[0].max = players[tradeRightPlayerSelectorVal].money;

		$('#tradeLeftAmountLabel').html(rupeeSym + $('#tradeLeftAmountSlider').val());
		$('#tradeRightAmountLabel').html(rupeeSym + $('#tradeRightAmountSlider').val());
	}

	$("#btnTrade").click(function()
	{
		$("#TradeTray").animate({"right":"0%"});
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


	$("#confirmTrade").click(function()
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
				Swal.fire(
				"Trade complete!",'',
				'success'
				)

				$("#TradeTray").animate({"right":"-650px"});
			}
		})
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

	function generateLogs(log)
	{
	
		var logItem = document.createElement('div');
		
		var giverCoin = makeLogCoin(log.sender);
		var takerCoin = makeLogCoin(log.reciever);

		var reasonText = log.reason; 
		switch(log.reason) 
		{
			case "rent":
				reasonText = "(Rent for <b>"+log.property+"</b>)";
				break;

			case "trade":
				reasonText = "(as part of Trade)";
				break;

			case "buy":
				reasonText = "(as purchase of <b>"+log.property+"</b>)";
				break;

			case "bldg":
				reasonText = "(as building on <b>"+log.property+"</b>)";
				break;

			case "jail":
				reasonText = "(as Jail charges)";
				break;

			default:
				reasonText = "("+log.reason+")"; 
				break;
		}

		$(logItem).addClass("logItem").html(giverCoin.outerHTML + " Paid <b>" + rupeeSym + log.amount.toString() + "</b> "+reasonText+" to " +takerCoin.outerHTML);
		$("#logsContainer").prepend(logItem);
		return logItem;
	}
	
	//#endregion "Logs"

	//#region "Setup"

	function setupBoard()
	{
		var cardImgLocation = "images/properies/";
		
		board[0] = new Cell(cellName="Go",colorGroup=0,position=0,topVal=520,leftVal=530,isUtility=false,isCity=false);
		
		board[1] = new Cell(cellName="Guwahati",colorGroup=1,position=1,topVal=520,leftVal=460,isUtility=false,isCity=true,
					price=60,cardImage=cardImgLocation + "1.PNG" , rent=2, mortgagePrice=30, constructionPrice=50, houseRent=[0,10,30,90,160], hotelRent=250,bldgTopVal=490,bldgLeftVal=462);

		board[2] = new Cell(cellName="Chest",colorGroup=0,position=2,topVal=520,leftVal=415,isUtility=false,isCity=false);

		board[3] = new Cell(cellName="Bhubaneshwar",colorGroup=1,position=3,topVal=520,leftVal=370,isUtility=false,isCity=true,
					price=60,cardImage=cardImgLocation + "3.PNG" , rent=4, mortgagePrice=30,constructionPrice=50, houseRent=[0,20,60,180,320], hotelRent=450,bldgTopVal=490,bldgLeftVal=373);

		board[4] = new Cell(cellName="Income Tax",colorGroup=0,position=4,topVal=520,leftVal=325,isUtility=false,isCity=false);

		board[5] = new Cell(cellName="Chennai Railway Station",colorGroup=0,position=5,topVal=520,leftVal=283,isUtility=true,isCity=false,
					price=200,cardImage=cardImgLocation + "5.PNG" , rent=25, mortgagePrice=100);

		board[6] = new Cell(cellName="Panaji",colorGroup=2,position=6,topVal=520,leftVal=240,isUtility=false,isCity=true,
					price=100,cardImage=cardImgLocation + "6.PNG" , rent=6, mortgagePrice=50,constructionPrice=50, houseRent=[0,30,90,270,400], hotelRent=550,bldgTopVal=490,bldgLeftVal=241);

		board[7] = new Cell(cellName="Chance",colorGroup=0,position=7,topVal=520,leftVal=195,isUtility=false,isCity=false);
		
		board[8] = new Cell(cellName="Agra",colorGroup=2,position=8,topVal=520,leftVal=150,isUtility=false,isCity=true,
					price=100,cardImage=cardImgLocation + "8.PNG" , rent=6, mortgagePrice=50,constructionPrice=50, houseRent=[0,30,90,270,400], hotelRent=550, bldgTopVal=490,bldgLeftVal=152);
					
		board[9] = new Cell(cellName="Vadodara",colorGroup=2,position=9,topVal=520,leftVal=107,isUtility=false,isCity=true,
					price=120,cardImage=cardImgLocation + "8.PNG" , rent=8, mortgagePrice=60,constructionPrice=50, houseRent=[0,40,100,300,450], hotelRent=600, bldgTopVal=490,bldgLeftVal=108);
				
		// --		
		board[10] = new Cell(cellName="Jail",colorGroup=0,position=10,topVal=520,leftVal=38,isUtility=false,isCity=false);

		board[11] = new Cell(cellName="Ludhiana",colorGroup=3,position=11,topVal=445,leftVal=38,isUtility=false,isCity=true,
					price=140,cardImage=cardImgLocation + "11.PNG" , rent=10, mortgagePrice=70,constructionPrice=100, houseRent=[0,50,150,450,625], hotelRent=750, bldgTopVal=460,bldgLeftVal=73);
		
		board[12] = new Cell(cellName="Electric Company",colorGroup=0,position=12,topVal=400,leftVal=38,isUtility=true,isCity=false,
					price=150,cardImage=cardImgLocation + "12.PNG" , rent=40, mortgagePrice=75);
			
		board[13] = new Cell(cellName="Patna",colorGroup=3,position=13,topVal=360,leftVal=38,isUtility=false,isCity=true,
					price=140,cardImage=cardImgLocation + "13.PNG" , rent=10, mortgagePrice=70,constructionPrice=100, houseRent=[0,50,150,450,625], hotelRent=750, bldgTopVal=370,bldgLeftVal=73);
		
		board[14] = new Cell(cellName="Bhopal",colorGroup=3,position=14,topVal=315,leftVal=38,isUtility=false,isCity=true,
				price=160,cardImage=cardImgLocation + "13.PNG" , rent=12, mortgagePrice=80,constructionPrice=100, houseRent=[0,60,180,500,700], hotelRent=900, bldgTopVal=325,bldgLeftVal=73);
		
		board[15] = new Cell(cellName="Howrah Station",colorGroup=0,position=15,topVal=270,leftVal=38,isUtility=true,isCity=false,
				price=200,cardImage=cardImgLocation + "15.PNG" , rent=25, mortgagePrice=100);

		board[16] = new Cell(cellName="Indore",colorGroup=4,position=16,topVal=225,leftVal=38,isUtility=false,isCity=true,
				price=160,cardImage=cardImgLocation + "16.PNG" , rent=12, mortgagePrice=80,constructionPrice=100, houseRent=[0,60,180,500,700], hotelRent=900, bldgTopVal=235,bldgLeftVal=73);
	
		board[17] = new Cell(cellName="Chest",colorGroup=0,position=17,topVal=180,leftVal=38,isUtility=false,isCity=false);

		board[18] = new Cell(cellName="Nagpur",colorGroup=4,position=18,topVal=135,leftVal=38,isUtility=false,isCity=true,
				price=180,cardImage=cardImgLocation + "18.PNG" , rent=14, mortgagePrice=90,constructionPrice=100, houseRent=[0,70,200,550,750], hotelRent=950, bldgTopVal=150,bldgLeftVal=73);
		
		board[19] = new Cell(cellName="Kochi",colorGroup=4,position=19,topVal=90,leftVal=38,isUtility=false,isCity=true,
				price=200,cardImage=cardImgLocation + "19.PNG" , rent=16, mortgagePrice=100,constructionPrice=100, houseRent=[0,80,220,600,800], hotelRent=1000, bldgTopVal=105,bldgLeftVal=73);
		
		// --	
		board[20] = new Cell(cellName="Free Parking",colorGroup=0,position=20,topVal=15,leftVal=38,isUtility=false,isCity=false);

		board[21] = new Cell(cellName="Lucknow",colorGroup=5,position=21,topVal=15,leftVal=107,isUtility=false,isCity=true,
				price=220,cardImage=cardImgLocation + "21.PNG" , rent=18, mortgagePrice=110,constructionPrice=150, houseRent=[0,90,220,600,800], hotelRent=1050, bldgTopVal=70,bldgLeftVal=108);

		board[22] = new Cell(cellName="Chance",colorGroup=0,position=22,topVal=15,leftVal=150,isUtility=false,isCity=false);

		board[23] = new Cell(cellName="Chandigarh",colorGroup=5,position=23,topVal=15,leftVal=195,isUtility=false,isCity=true,
				price=220,cardImage=cardImgLocation + "23.PNG" , rent=18, mortgagePrice=110,constructionPrice=150, houseRent=[0,90,220,600,800], hotelRent=1050, bldgTopVal=70,bldgLeftVal=196);

		board[24] = new Cell(cellName="Jaipur",colorGroup=5,position=24,topVal=15,leftVal=240,isUtility=false,isCity=true,
				price=240,cardImage=cardImgLocation + "23.PNG" , rent=20, mortgagePrice=120,constructionPrice=150, houseRent=[0,100,300,750,925], hotelRent=1100, bldgTopVal=70,bldgLeftVal=241);

		board[25] = new Cell(cellName="New Delhi Station",colorGroup=0,position=25,topVal=15,leftVal=283,isUtility=true,isCity=false,
				price=200,cardImage=cardImgLocation + "25.PNG" , rent=25, mortgagePrice=100);

		board[26] = new Cell(cellName="Pune",colorGroup=6,position=26,topVal=15,leftVal=325,isUtility=false,isCity=true,
				price=260,cardImage=cardImgLocation + "26.PNG" , rent=22, mortgagePrice=130,constructionPrice=150, houseRent=[0,110,330,800,975], hotelRent=1150, bldgTopVal=70,bldgLeftVal=328);

		board[27] = new Cell(cellName="Hyderabad",colorGroup=6,position=27,topVal=15,leftVal=370,isUtility=false,isCity=true,
				price=260,cardImage=cardImgLocation + "27.PNG" , rent=22, mortgagePrice=130,constructionPrice=150, houseRent=[0,110,330,800,975], hotelRent=1150, bldgTopVal=70,bldgLeftVal=373);

		board[28] = new Cell(cellName="Water Works",colorGroup=0,position=12,topVal=15,leftVal=415,isUtility=true,isCity=false,
				price=150,cardImage=cardImgLocation + "28.PNG" , rent=40, mortgagePrice=75);
	
		board[29] = new Cell(cellName="Ahmedabad",colorGroup=6,position=29,topVal=15,leftVal=460,isUtility=false,isCity=true,
				price=280,cardImage=cardImgLocation + "29.PNG" , rent=24, mortgagePrice=140,constructionPrice=150, houseRent=[0,120,360,850,1025], hotelRent=1200, bldgTopVal=70,bldgLeftVal=462);

		// --	
		board[30] = new Cell(cellName="Go to Jail",colorGroup=0,position=30,topVal=15,leftVal=530,isUtility=false,isCity=false);
		
		board[31] = new Cell(cellName="Kolkata",colorGroup=7,position=31,topVal=90,leftVal=530,isUtility=false,isCity=true,
				price=300,cardImage=cardImgLocation + "31.PNG" , rent=26, mortgagePrice=150,constructionPrice=200, houseRent=[0,130,390,900,1100], hotelRent=1275, bldgTopVal=105,bldgLeftVal=495);
		
		board[32] = new Cell(cellName="Chennai",colorGroup=7,position=32,topVal=135,leftVal=530,isUtility=false,isCity=true,
				price=300,cardImage=cardImgLocation + "32.PNG" , rent=26, mortgagePrice=150,constructionPrice=200, houseRent=[0,130,390,900,1100], hotelRent=1275, bldgTopVal=150,bldgLeftVal=495);

		board[33] = new Cell(cellName="Chest",colorGroup=0,position=33,topVal=180,leftVal=530,isUtility=false,isCity=false);

		board[34] = new Cell(cellName="Bengaluru",colorGroup=7,position=34,topVal=225,leftVal=530,isUtility=false,isCity=true,
				price=320,cardImage=cardImgLocation + "34.PNG" , rent=28, mortgagePrice=160,constructionPrice=200, houseRent=[0,150,450,1000,1100], hotelRent=1400, bldgTopVal=235,bldgLeftVal=495);

		board[35] = new Cell(cellName="Chhatrapati Shivaji Terminus",colorGroup=0,position=35,topVal=270,leftVal=530,isUtility=true,isCity=false,
			price=200,cardImage=cardImgLocation + "35.PNG" , rent=25, mortgagePrice=100);

		board[36] = new Cell(cellName="Chance",colorGroup=0,position=36,topVal=315,leftVal=530,isUtility=false,isCity=false);
		
		board[37] = new Cell(cellName="Delhi",colorGroup=8,position=37,topVal=360,leftVal=530,isUtility=false,isCity=true,
			price=350,cardImage=cardImgLocation + "37.PNG" , rent=35, mortgagePrice=175,constructionPrice=200, houseRent=[0,175,500,1100,1300], hotelRent=1500, bldgTopVal=370,bldgLeftVal=495);

		board[38] = new Cell(cellName="Super Tax",colorGroup=0,position=4,topVal=400,leftVal=530,isUtility=false,isCity=false);

		board[39] = new Cell(cellName="Mumbai",colorGroup=8,position=39,topVal=445,leftVal=530,isUtility=false,isCity=true,
			price=400,cardImage=cardImgLocation + "39.PNG" , rent=50, mortgagePrice=200,constructionPrice=200, houseRent=[0,200,600,1400,1700], hotelRent=2000, bldgTopVal=460,bldgLeftVal=495);


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

	//#endregion "Setup"
	
	
	
	function makeBldgCoin(playerNumber,bldgStr)
	{
		var BldgCoin = document.createElement('img');
		var color = "bank";
		switch(playerNumber)
		{
			case 0: color = "red"; break;
			case 1: color = "green"; break;
			case 2: color = "blue"; break;
			case 3: color = "yellow"; break;
			default: color = "bank"; break;
		}
		BldgCoin.src="images/bldgs/"+color+bldgStr+".PNG";

		return BldgCoin;
	}


	//#region "Game Functions"

	$("#start").click(function()
	{
		setupPlayers();
		setupTrade();

		$("#startcontrols").css("display","none");
		$("#gameControls").css("display","");
		$("#endControls").css("display","none");
		$("#btnTrade").css("display","");
		$("#btnLogs").css("display","");

		gameStarted = true;
	});

	
	$("#diceContainer").click(function()
	{
		/*
		var logItem = new Log(2,-1,300,"rent",board[35].cellName);
		var logDiv = generateLogs(logItem);
		
		Swal.fire({
			title: logDiv.outerHTML,
			icon: 'info',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'OK',
			allowOutsideClick: false
		});
		logs.push(logItem);

		*/

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
					Swal.fire(
					'',"Paid "+rupeeSym+"100 to get out of Jail",
					'success'
					)
					
					players[currPlayer].inJail = false;
					moveCoin(currCoin);
				}
			})

		} 
		else
		{	
			players[currPlayer].inJail = false;
			moveCoin(currCoin);
		}

		if(diceVal1 == diceVal2)
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
			},300);

		},300);

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

		switch(players[currPlayer].position)
		{
			case 10:
			{
				players[currPlayer].inJail = true;
				break;
			}
			case 30:
			{
				moveBackWithoutGO(10);
				break;
			}
			default:
				return;
		}

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
	

		
	function refreshBoardUI()
	{
		var i = 0;
		while(i<nmbrOfPlayers)
		{
			$("#"+players[i].color+"Coin").css("top",(players[currPlayer].topVal).toString()+"px");
			$("#"+players[i].color+"Coin").css("left",(players[currPlayer].leftVal).toString()+"px");
			i += 1;
		}

		i = 0;
		while(i<40)
		{
			debugger;
			board[i].showBldg();
			i += 1;
		}
	}


	//#endregion "Functions"



});