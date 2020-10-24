

class Auction
{
    constructor()
    {
        this.auctionProperty = null;        
        this.auctionPlayers = [];        //  array of acutal player# [1,3]      players unfolded
        this.currentBidAmt = 0;          //  numberic                           current highest bid amount 
        this.currentBidPlayer = -1;      //  this.auctionPlayers[iterator]      current highest bidder
        this.currentPlayer = 0;          //  this.auctionPlayers[iterator]      current chance to bid
    }
    
    startAuction(auctionProperty)
    {
        this.auctionProperty = auctionProperty;
        this.currentBidAmt = 0;
        this.auctionPlayers = [currPlayer];
        this.currentBidPlayer = -1;
        this.currentPlayer = currPlayer;

        var i = currPlayer + 1;
        while(true)
        {
            if(i >= parseInt(nmbrOfPlayers))
                i = 0;
            if(i==currPlayer)
                break;
            this.auctionPlayers.push(i);
            i+=1;
        } 

        $("#PropertySaleModal").modal('hide');

        $('#PropertyAuctionModal').modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#imageCurrentBider")[0].src = "images/"+players[currPlayer].color+".PNG";
        this.refreshAuctionUI();
    }

    processAuction(bid)
    {
        if(bid)
        {   // BID
            this.currentBidAmt = parseInt($('#auctionBidSlider')[0].value);
            this.currentBidPlayer = this.currentPlayer;
            
            this.currentPlayer = this.currentPlayer + 1;
            if(this.currentPlayer == this.auctionPlayers.length)
                this.currentPlayer = 0;
                
        }
        else
        {   // FOLD
            this.auctionPlayers.splice(this.currentPlayer, 1);

            if(this.auctionPlayers.length < 2)
            {
                this.finishAuction(this.auctionPlayers[0] , this.currentBidAmt);
                return
            }
            
            if(this.currentPlayer == this.auctionPlayers.length)
                this.currentPlayer = 0;
        }
        this.refreshAuctionUI();
    }

    refreshAuctionUI()
    {
        if(this.currentBidPlayer > -1 && this.currentBidAmt > 0)
        {
            var playerNumber =  parseInt(this.auctionPlayers[this.currentBidPlayer]);
            $("#imageHighestBidder")[0].src = "images/"+players[playerNumber].color+".PNG";
            $('#imageHighestBidder').css("display","");
        }
        
        $('#currentBidAmt').html(rupeeSym + this.currentBidAmt.toString());

        $("#btnBidInAuction").prop('disabled', false); 
        if(this.currentBidAmt >= players[this.auctionPlayers[this.currentPlayer]].money)
        {
            $("#btnBidInAuction").prop('disabled', true); 
        }


        var playerNumber =  parseInt(this.auctionPlayers[this.currentPlayer]);
        $("#imageCurrentBider")[0].src = "images/"+players[playerNumber].color+".PNG";

        
        $('#auctionBidSlider')[0].min = this.currentBidAmt + 1;
        $('#auctionBidSlider')[0].value = this.currentBidAmt + 1;
        $('#auctionBidSlider')[0].max = players[this.auctionPlayers[this.currentPlayer]].money;
        $('#auctionBidLabel').html(rupeeSym + $('#auctionBidSlider').val());
    }


    finishAuction(winner,winAmt)
    {
        var log = new Log(winner,-1,winAmt,"auction",this.auctionProperty.cellName);
		var logDiv = log.generateLogDiv();
		log.prependLogDiv(logDiv);
		log.performTransaction();

		players[winner].properties.push(this.auctionProperty.position);
        players[winner].refreshCityGroups();
        
        $("#PropertyAuctionModal").modal('hide');

		Swal.fire(
			'',"Won in Auction " + this.auctionProperty.cellName + " for " +rupeeSym+ " " + winAmt,
			'success'
        );
        
    }
}

var auction = new Auction();


$(document).ready(function()
{
	$('#auctionBidSlider').on('input change', () => {
		$('#auctionBidLabel').html(rupeeSym+$('#auctionBidSlider').val());
	});
    
    
	$("#btnBidInAuction").click(function()
    {
        auction.processAuction(true);
    });

	$("#btnFoldInAuction").click(function()
    {
        auction.processAuction(false);
    });

	$("#btnAuction").click(function()
    {
        var property = board[players[currPlayer].position];
        auction.startAuction(property);
	});

});