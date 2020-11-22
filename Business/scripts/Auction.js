

class Auction
{
    constructor()
    {
        this.auctionProperty = null;        
        this.auctionPlayers = [];        //  array of acutal player# [1,3]              players unfolded
        this.currentBidAmt = 0;          //  numberic                                   current highest bid amount 
        this.currentBidPlayer = -1;      //  value  this.auctionPlayers[iterator]       current highest bidder
        this.currentPlayer = 0;          //  iterator this.auctionPlayers[iterator]     current chance to bid
    }
    
    startAuction(auctionProperty)
    {
        this.auctionProperty = auctionProperty;
        this.currentBidAmt = 0;
        this.auctionPlayers = [0,1];
        this.currentBidPlayer = -1;
        this.currentPlayer = currPlayer;

        if(parseInt(nmbrOfPlayers) == 3)
            this.auctionPlayers = [0,1,2];
        if(parseInt(nmbrOfPlayers) == 4)
            this.auctionPlayers = [0,1,2,3];

        var i = 0;
        while(i < this.auctionPlayers.length)   // remove bankrupt players
        {
            var num = this.auctionPlayers[i];
            if(players[num].bankrupt)
                this.auctionPlayers.splice(i, 1);
            else 
                i+=1;
        }

        $("#imagePropertyAuction").attr("src",auctionProperty.cardImage);
        $("#PropertySaleModal").modal('hide');

        $('#PropertyAuctionModal').modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#imageCurrentBider")[0].src = "images/"+players[currPlayer].color+".png";
        this.refreshAuctionUI();
    }

    processAuction(bid)
    {
        if(bid)
        {   // BID
            this.currentBidAmt = parseInt($('#auctionBidSlider')[0].value);
            this.currentBidPlayer = this.auctionPlayers[this.currentPlayer];
            
            this.currentPlayer += 1;
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
            $("#imageHighestBidder")[0].src = "images/"+players[this.currentBidPlayer].color+".png";
            $('#imageHighestBidder').css("display","");
        }
        else
            $('#imageHighestBidder').css("display","none");
        
        $('#currentBidAmt').html(rupeeSym + this.currentBidAmt.toString());

        $("#btnBidInAuction").prop('disabled', false); 
        if(this.currentBidAmt >= players[this.auctionPlayers[this.currentPlayer]].money)
        {
            $("#btnBidInAuction").prop('disabled', true); 
        }


        var playerNumber =  parseInt(this.auctionPlayers[this.currentPlayer]);
        $("#imageCurrentBider")[0].src = "images/"+players[playerNumber].color+".png";

        
        $('#auctionBidSlider')[0].min = this.currentBidAmt + 1;
        $('#auctionBidSlider')[0].value = this.currentBidAmt + 1;
        $('#auctionBidSlider')[0].max = players[this.auctionPlayers[this.currentPlayer]].money;
        $('#auctionBidLabel').html(rupeeSym + $('#auctionBidSlider').val());
    }


    finishAuction(winner,winAmt)
    {
        var log = new Log(winner,-1,winAmt,"auction",this.auctionProperty.cellName);
		log.prependLogDiv();
		log.performTransaction();

        this.auctionProperty.owner = winner;
		players[winner].properties.push(this.auctionProperty.position);
        players[winner].refreshCityGroups();
        $("#PropertyAuctionModal").modal('hide');
        refreshGameUI();

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