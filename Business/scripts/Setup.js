
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

function setupChanceChest()
{
	var i = 0;
	chances = [];
	chests = [];
	while(i<13)
	{
		var good = true;
		if(i%2==0)
			good = false;

		var chance = new ChanceChest(i,"chance",good);
		chances.push(chance);

		var chest = new ChanceChest(i,"chest",!good);
		chests.push(chest);

		i+=1;
	}


	// Chests --- Even

	chests[2].message = "It is your Birthday collect from each player" ;
	chests[2].amount = 10;

	chests[4].message = "1st price in Singing contest" ;
	chests[4].amount = 150;

	chests[6].message = "Income Tax refund" ;
	chests[6].amount = 50;

	chests[8].message = "Travel to Go" ;
	chests[8].moveAheadto = 0;

	chests[10].message = "Recieved interest of shares" ;
	chests[10].amount = 30;

	chests[12].message = "Sale of stocks" ;
	chests[12].amount = 100;

	// Chests --- Odd

	chests[3].message = "Go to Jail" ;

	chests[5].message = "School & medical fees" ;
	chests[5].amount = 40;

	chests[7].message = "Marriage celebration" ;
	chests[7].amount = 140;

	chests[9].message = "General repairs on all properties each" ;
	chests[9].amount = 10;

	chests[11].message = "Pay insurance premium" ;
	chests[11].amount = 100;


	// Chances --- Even

	chances[2].message = "Loss in share market" ;
	chances[2].amount = 200;

	chances[4].message = "Accident in Drink & Drive" ;
	chances[4].amount = 20;

	chances[6].message = "House Repairs each" ;
	chances[6].amount = 15;

	chances[8].message = "Loss due to fire in Godown" ;
	chances[8].amount = 300;

	chances[10].message = "Go to Jail";

	chances[12].message = "Go back 3 spaces";

	// Chances --- Odd

	chances[3].message = "Lottery price won" ;
	chances[3].amount = 250;

	chances[5].message = "Won Crossword puzzle competition" ;
	chances[5].amount = 100;

	chances[7].message = "Won Jackpot" ;
	chances[7].amount = 200;

	chances[9].message = "Travel ahead to Guwahati";

	chances[11].message = "Best performance in Exports" ;
	chances[11].amount = 300;

	return;
}
//#endregion "Setup"
