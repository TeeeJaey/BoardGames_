

class Work
{
    constructor()
    {
        this.worker = -1;   
        this.walletAmt = 0;   
        this.changeAmt = 0;                     
        
        this.build = [];                      
        this.sell = [];                      
        this.redeem = [];    
        this.mortgage = [];    
    }

    startWork()
    {
        this.worker = currPlayer;
        this.walletAmt = players[this.worker].money;
        this.currentTask = ""; 
        this.changeAmt = 0;   
        this.build = [];                      
        this.sell = [];                      
        this.redeem = [];    
        this.mortgage = [];    

        $("#workModal").modal('show');
        $('input[name="workRadioBtns"]').prop('checked', false);
        document.querySelectorAll(".workRadioBtns").forEach(x => $(x).removeClass("active"));

        $("#workWalletAmount").html(rupeeSym + players[this.worker].money.toString());
        $("#workChangeAmount").html(rupeeSym + this.changeAmt.toString());
        $("#workPropertyContainer").empty();
    }
    
    appendHorizontalLine()
    {
        var hr = document.createElement('hr');
        $("#workPropertyContainer").append(hr);
        return;
    }
    
    getWorkCardImage(cardNumber)
    {
        var cardImg = document.createElement('img');
        cardImg.src = "images/properties/" + cardNumber.toString() + ".png";
        cardImg.id = this.currentTask +":"+ cardNumber.toString();
        $(cardImg).addClass("workProperty");
        
        switch(this.currentTask)
        {
            case "build":
            {    
                if(this.build.includes(cardNumber))
                    $(cardImg).addClass("workPropertySelected");
                break;
            }
            case "sell":
            {    
                if(this.sell.includes(cardNumber))
                    $(cardImg).addClass("workPropertySelected");
                break;
            }
            case "redeem":
            {    
                if(this.redeem.includes(cardNumber))
                    $(cardImg).addClass("workPropertySelected");
                break;
            }
            case "mortgage":
            {    
                if(this.mortgage.includes(cardNumber))
                    $(cardImg).addClass("workPropertySelected");
                break;
            }
        }
       
        return cardImg;
    }

    addBuildCards()
    {
        var i = 0;
        while(i < players[this.worker].cityGroups.length)
        {
            var putHR = false;
            var grp = players[this.worker].cityGroups[i];
            
            var j = 0;
            while(j < propertyColorGroups[grp].length)
            {
                var propertyNumber = propertyColorGroups[grp][j];
                if(board[propertyNumber].isBuildable())
                {
                    var cardImg = this.getWorkCardImage(propertyNumber);
                    $("#workPropertyContainer").append(cardImg);
                    putHR = true;
                }
                j += 1;
            }
            i += 1;
            if(putHR)
                this.appendHorizontalLine();
        }
    }
    
    addSellCards()
    {
        var i = 0;
        while(i < players[this.worker].cityGroups.length)
        {
            var putHR = false;
            var grp = players[this.worker].cityGroups[i];
            
            var j = 0;
            while(j < propertyColorGroups[grp].length)
            {
                var propertyNumber = propertyColorGroups[grp][j];
                if(board[propertyNumber].isSellable())
                {
                    var cardImg = this.getWorkCardImage(propertyNumber);
                    $("#workPropertyContainer").append(cardImg);
                    putHR = true;
                }
                
                j += 1;
            }
            i += 1;
            if(putHR)
                this.appendHorizontalLine();
        }
    }
    
    addRedeemCards()
    {
        var i = 1;
        while(i < propertyColorGroups.length)
        {
            var putHR = false;

            var j = 0;
            while(j < propertyColorGroups[i].length)
            {
                var propertyNumber = propertyColorGroups[i][j];
                if(players[this.worker].properties.includes(propertyNumber) && board[propertyNumber].isMortgaged)
                {
                    var cardImg = this.getWorkCardImage(propertyNumber);
                    $("#workPropertyContainer").append(cardImg);
                    putHR = true;
                }
                j += 1;
            }
            i += 1;
            if(putHR)
                this.appendHorizontalLine();
        }
    }

    addMortgageCards()
    {
        var i = 1;
        while(i < propertyColorGroups.length)
        {
            var putHR = false;

            var j = 0;
            while(j < propertyColorGroups[i].length)
            {
                var propertyNumber = propertyColorGroups[i][j];
                if(players[this.worker].properties.includes(propertyNumber) && board[propertyNumber].isMortgageable())
                {
                    var cardImg = this.getWorkCardImage(propertyNumber);
                    $("#workPropertyContainer").append(cardImg);
                    putHR = true;
                }
                j += 1;
            }
            i += 1;
            if(putHR)
                this.appendHorizontalLine();
        }
        
        var putHR = false;
        var i = 5;
        while(i < 36)
        {
            if(board[i].owner == this.worker)
            { 
                var cardImg = this.getWorkCardImage(i);
                $(cardImg).css("max-width","22%");
                $("#workPropertyContainer").append(cardImg);
                putHR = true;
            }
            i += 10;
        }
        if(putHR)
            this.appendHorizontalLine();

        var putHR = false;
        if(board[12].owner == this.worker)
        { 
            var cardImg = this.getWorkCardImage(12);
            $("#workPropertyContainer").append(cardImg);
            putHR = true;
        }
        if(board[28].owner == this.worker)
        { 
            var cardImg = this.getWorkCardImage(28);
            $("#workPropertyContainer").append(cardImg);
            putHR = true;
        }
        if(putHR)
            this.appendHorizontalLine();
    }

    refreshWorkContainer(task)
    {
        $("#workPropertyContainer").empty();
        this.currentTask = task;
        switch(this.currentTask)
        {
            case "build":
            {    
                this.addBuildCards();
                break;
            }
            case "sell":
            {    
                this.addSellCards();
                break;
            }
            case "redeem":
            {    
                this.addRedeemCards();
                break;
            }
            case "mortgage":
            {    
                this.addMortgageCards();
                break;
            }
        }
    }

    selectProperty()
    {
        
        switch(this.currentTask)
        {
            case "build":
            {    
                this.build = [];
                var i = 0;
                while(i < $(".workPropertySelected").length)
                { 
                    this.build.push(parseInt($(".workPropertySelected")[i].id.split(':')[1]));
                    i += 1;
                }
                break;
            }
            case "sell":
            {    
                this.sell = [];
                var i = 0;
                while(i < $(".workPropertySelected").length)
                { 
                    this.sell.push(parseInt($(".workPropertySelected")[i].id.split(':')[1]));
                    i += 1;
                }
                break;
            }
            case "redeem":
            {    
                this.redeem = [];
                var i = 0;
                while(i < $(".workPropertySelected").length)
                { 
                    this.redeem.push(parseInt($(".workPropertySelected")[i].id.split(':')[1]));
                    i += 1;
                }
                break;
            }
            case "mortgage":
            {    
                this.mortgage = [];
                var i = 0;
                while(i < $(".workPropertySelected").length)
                { 
                    this.mortgage.push(parseInt($(".workPropertySelected")[i].id.split(':')[1]));
                    i += 1;
                }
                break;
            }
        }
        
        this.refreshChangeAmount();
    }

    refreshChangeAmount()
    {
        var changeAmount = 0;

        var i = 0;
        while(i < this.build.length)
        {
            var cardNumber = this.build[i];
            changeAmount -= board[cardNumber].constructionPrice;
            i += 1;
        }

        i = 0;
        while(i < this.sell.length)
        {
            var cardNumber = this.sell[i];
            changeAmount += board[cardNumber].constructionPrice;
            i += 1;
        }

        i = 0;
        while(i < this.redeem.length)
        {
            var cardNumber = this.redeem[i];
            changeAmount -= board[cardNumber].mortgagePrice;
            i += 1;
        }
        
        i = 0;
        while(i < this.mortgage.length)
        {
            var cardNumber = this.mortgage[i];
            changeAmount += board[cardNumber].mortgagePrice;
            i += 1;
        }

        this.changeAmt = changeAmount;
        $("#workChangeAmount").html(rupeeSym+this.changeAmt.toString());

        $("#btnWorkConfirm").prop('disabled', false); 
        if(changeAmount < 0)
        {
            $("#workChangeAmount").css("color","red");
            if(players[this.worker].money + changeAmount < 0)
            {
                $("#btnWorkConfirm").prop('disabled', true); 
            }
        }
        if(changeAmount > 0)
        {
            $("#workChangeAmount").css("color","green");
        }

        return;
    }

    finishWork()
    {
		try
		{
            $("#workModal").modal('hide');
            if(this.build.length==0 && this.sell.length==0 && this.redeem.length==0 && this.mortgage.length==0)
            {
                return 0;
            }
            else
            {
                var changeAmount = 0;
                
                var i = 0;
                while(i < this.mortgage.length)
                {
                    var cardNumber = this.mortgage[i];
                    var property = board[cardNumber];
                    changeAmount += property.mortgagePrice;
                    property.isMortgaged = true;
                    i += 1;
                }

                i = 0;
                while(i < this.sell.length)
                {
                    var cardNumber = this.sell[i];
                    var property = board[cardNumber];
                    changeAmount += property.constructionPrice;

                    if(property.hotel)
                    {
                        property.hotel = false;
                        players[this.worker].hotelCount -= 1;
                    }
                    else
                    {
                        property.houses -= 1;
                        players[this.worker].houseCount -= 1;
                    }
                    i += 1;
                }

                i = 0;
                while(i < this.redeem.length)
                {
                    var cardNumber = this.redeem[i];
                    var property = board[cardNumber];
                    changeAmount -= property.mortgagePrice;
                    property.isMortgaged = false;
                    i += 1;
                }
                
                i = 0;
                while(i < this.build.length)
                {
                    var cardNumber = this.build[i];
                    
                    if(!this.sell.includes(cardNumber) && !this.sell.includes(cardNumber))
                    {
                        var property = board[cardNumber];
                        if(property.isBuildable())
                        {
                            changeAmount -= property.constructionPrice;
                            if(property.houses < 4)
                            {
                                property.houses += 1;
                                players[this.worker].houseCount += 1;
                            }
                            else
                            {
                                property.hotel = true;
                                players[this.worker].hotelCount += 1;
                            }
                        }
                    }
                    i += 1;
                }


                if(changeAmount > 0)
                {
                    var sender = -1;
                    var reciever = this.worker;
                }
                else 
                {
                    var reciever = -1;
                    var sender = this.worker;
                    changeAmount *= -1;
                }
                
                var log = new Log(sender, reciever, changeAmount,"Construction Work");
                log.prependLogDiv();
                log.performTransaction();
                players[this.worker].refreshCityGroups();
                refreshGameUI();

            }
            return 1;
        }
        catch(e)
        {
            console.log("Exception in WORK :" , e);
            return -1;
        }
        
    }
}

var work = new Work();

$(document).ready(function()
{
	$("#btnWork").click(function()
    {   
        work.startWork();
    });

	$('input[name=workRadioBtns]').change(function() {
        work.refreshWorkContainer( $("input[name='workRadioBtns']:checked").val() );
    });
    
	$(document).on('click', ".workProperty", function()
	{
        if($(this).hasClass("workPropertySelected"))
			$(this).removeClass("workPropertySelected");
		else
            $(this).addClass("workPropertySelected");
        
        work.selectProperty();
    });

	$("#btnWorkConfirm").click(function()
    { 
        var workSuccess = work.finishWork();

        if(workSuccess > 0)
        {
            Swal.fire(
                "Construction Work complete!",'',
                'success'
            );
            refreshGameUI();
        }
        else if(workSuccess < 0)
        {
            Swal.fire(
                "Construction Work Fail!",'',
                'error'
            );
        }
    });

});