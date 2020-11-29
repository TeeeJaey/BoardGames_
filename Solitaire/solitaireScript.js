
$(document).ready(function()
{
	importNavbar("Solitaire", "Solitaire");
	
	var gameOver = false;
	var backImg = "back.png";
	var reshowImg = "reshow.png";
	$('#gameUnderDev').css("display","");

	var suits = ["s", "d", "c", "h"];
	var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	
	class Card 
	{
		constructor(suit,value,position) 
		{
			this.suit = suit;
			this.value = value;
			this.position = position;
			this.revealed = false;
			this.imageSrc = suit+value+".png";
		}
		
	}	
	
	function makeCardImage(src)
	{
		var image = $("<img>");
		image.addClass("cardImage");
		image.addClass("revealedCard");
		image.attr("src",src);
		return image;
	}
	
	function makeBackImage()
	{
		var image = $("<img>");
		image.addClass("cardImage");
		image.attr("src","images/"+backImg);
		return image;
	}
	
	function makeReshowImage()
	{
		var image = $("<img>");
		image.addClass("cardImage");
		image.attr("src","images/"+reshowImg);
		
		image.css("height", "80px");
		image.css("width", "80px");
		image.css("top", "50px");
		image.css("left", "35px");
		image.css("border", "none");
				
		return image;
	}
	
	function getDeck()
	{
		var deck = new Array();

		for(var i = 0; i < suits.length; i++)
		{
			for(var x = 0; x < values.length; x++)
			{
				var card = new Card(suits[i],values[x],"");
				deck.push(card);
			}
		}
		// for 1000 turns
		// switch the values of two random cards
		for (var i = 0; i < 100; i++)
		{
			var location1 = Math.floor((Math.random() * deck.length));
			var location2 = Math.floor((Math.random() * deck.length));
			
			var tmp = deck[location1];
			deck[location1] = deck[location2];
			deck[location2] = tmp;
		}
		
		return deck;
	}
	
	var deck = getDeck();
	
	var tray = new Array(4);
	for (var i = 0; i <= 4; i++) 
		tray[i] = new Array(13); 
		
	var board = new Array();
	for (var i = 0; i <= 7; i++) 
	{ 
		board[i] = new Array(); 
		for (var j = 0; j <= i; j++) 
		{
			var card = deck.pop();	
			if(i==j)
			{
				card.position="board:"+(i).toString()+":"+(j).toString();
				card.revealed - true;
				var image = makeCardImage("images/"+card.imageSrc);
				image.css("top", (j * 25).toString()+"px");
				$("#board"+i).append(image);
			}
			else
			{
				var image = makeBackImage();
				image.css("top", (j * 25).toString()+"px");
				$("#board"+i).append(image);
			}
			board[i][j] = card;
		} 
	} 
	
	var image = makeBackImage()
	$("#deckBack").append(image);

	deckCurr = 0;
	
	var cardSelected = false;
	var selectedCard = deck[0];
	
	//Select Card from the deck
	function deSelectCard()
	{
		if(!cardSelected)
			return;
		
		var cardPos = selectedCard.position.split(":");
		if(cardPos[0] == "deck")
		{
			selectedCardImage = $('#deckCard');
		}
		else
		{
			selectedCardImage = $($($("#board").children()[parseInt(cardPos[1])]).children()[parseInt(cardPos[2])]);
		}
		selectedCardImage.css("border", "none");
		selectedCardImage.css("left", "0px");
		cardSelected = false;
		selectedCard = deck[0];
	}
	
	//Take card out of the deck
	$('#deckBack').click(function()
	{
		deSelectCard();
		
		if(deckCurr == deck.length)
		{					
			var image = makeBackImage()
			$('#deckCard').empty();
			$("#deckBack").append(image);
			deckCurr = 0;
			deck[deckCurr-1].revealed = false;
		}
		else
		{
			if(deckCurr == deck.length-1)
			{
				var image = makeReshowImage();
				$('#deckBack').empty();
				$("#deckBack").append(image);
				
			}
			var card = deck[deckCurr];
			if(deckCurr>0)	
				deck[deckCurr-1].revealed = false;
			card.revealed = true;
			card.position = "deck:"+(deckCurr).toString();
			var image = makeCardImage("images/"+card.imageSrc);
			image.css("top", (0 * 25).toString()+"px");
			$('#deckCard').append(image);
			deckCurr += 1;
		}
		
		
		return;
	});
	
	
	$('#deckCard').click(function()
	{
		if($(this).children().length == 0)
		{
			deSelectCard();
			return;
		}
		if(!cardSelected)
		{
			$(this).css("border", "4px solid #FFA500");
			$(this).css("left", "-2px");
			var card = deck[deckCurr-1];
			selectedCard = card;
			cardSelected = true;
		}
		else
			deSelectCard();
		
		return;
	});
	
	//Select Card from the board
	$('.revealedCard').click(function()
	{
		var boardIndex1 = parseInt($(this).parent()[0].id.slice(-1));
		var boardIndex2 = $(this).parent().parent().children().index($(this).parent())
		
		
		if(!cardSelected)
		{
			selectedCard = board[boardIndex1][boardIndex2];
			$(this).css("border", "4px solid #FFA500");
			$(this).css("left", "-2px");
			cardSelected = true;
		}
		else
		{
			// Check Card move
			
			deSelectCard();
		}
		return;
	});
		
});