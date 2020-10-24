

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
			if(board[cardNumber].isTradeble())
				addTradeCardImage(cardNumber, left);
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
			if(board[cardNumber].isTradeble())
				addTradeCardImage(cardNumber, left);
			i+=1;
		}
	}
	

	return;
}

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
		log.prependLogDiv();
		log.performTransaction();
	}
	else if(rightAmount > leftAmount)
	{
		var log = new Log(rightPlayer,leftPlayer,rightAmount-leftAmount,"trade");
		log.prependLogDiv();
		log.performTransaction();
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
			
			board[property].owner = rightPlayer;
			
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

			board[property].owner = leftPlayer;

			players[leftPlayer].refreshCityGroups();
			players[rightPlayer].refreshCityGroups();
		}
		else
			tradeSuccess = false;

		i+=1;
	}

	return tradeSuccess;
}

$(document).ready(function()
{

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
		setupTrade();
	});
	$('input[name=tradeRightPlayerSelector]').change(function() {
		refreshTradeCards(false);
		setupTrade();
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
	
	
});