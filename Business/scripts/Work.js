

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
    
    getWorkCardImage(cardNumber)
    {
        var cardImg = document.createElement('img');
        cardImg.src = "images/properties/" + cardNumber.toString() + ".PNG";
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
            var grp = players[this.worker].cityGroups[i];
            
            var j = 0;
            while(j < propertyColorGroups[grp].length)
            {
                var propertyNumber = propertyColorGroups[grp][j];
                if(board[propertyNumber].isBuildable())
                {
                    var cardImg = this.getWorkCardImage(propertyNumber);
                    $("#workPropertyContainer").append(cardImg);
                }
                j += 1;
            }

            var hr = document.createElement('hr');
            $("#workPropertyContainer").append(hr);
            i += 1;
        }

    }
    
    addSellCards()
    {
        var i = 0;
        while(i < players[this.worker].cityGroups.length)
        {
            var grp = players[this.worker].cityGroups[i];
            
            var j = 0;
            while(j < propertyColorGroups[grp].length)
            {
                var propertyNumber = propertyColorGroups[grp][j];
                if(board[propertyNumber].isSellable())
                {
                    var cardImg = this.getWorkCardImage(propertyNumber);
                    $("#workPropertyContainer").append(cardImg);
                }
                
                j += 1;
            }

            var hr = document.createElement('hr');
            $("#workPropertyContainer").append(hr);
            i += 1;
        }
    }
    
    addRedeemCards()
    {
        var i = 0;
        while(i < players[this.worker].cityGroups.length)
        {
            var grp = players[this.worker].cityGroups[i];
            
            var j = 0;
            while(j < propertyColorGroups[grp].length)
            {
                var propertyNumber = propertyColorGroups[grp][j];
                if(board[propertyNumber].isMortgaged)
                {
                    var cardImg = this.getWorkCardImage(propertyNumber);
                    $("#workPropertyContainer").append(cardImg);
                }
                j += 1;
            }

            var hr = document.createElement('hr');
            $("#workPropertyContainer").append(hr);
            i += 1;
        }
    }

    addMortgageCards()
    {
        var i = 0;
        while(i < players[this.worker].cityGroups.length)
        {
            var grp = players[this.worker].cityGroups[i];
            
            var j = 0;
            while(j < propertyColorGroups[grp].length)
            {
                var propertyNumber = propertyColorGroups[grp][j];
                if(board[propertyNumber].isMortgageable())
                {
                    var cardImg = this.getWorkCardImage(propertyNumber);
                    $("#workPropertyContainer").append(cardImg);
                }
                j += 1;
            }
            var hr = document.createElement('hr');
            $("#workPropertyContainer").append(hr);
            i += 1;
        }
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

        if(changeAmount < 0)
        {
            $("#workChangeAmount").css("color","red");
            $("#btnWorkConfirm").prop('disabled', false); 

            if(players[this.worker].money + changeAmount < 0)
            {
                $("#btnWorkConfirm").prop('disabled', true); 
            }
        }
        if(changeAmount > 0)
        {
            $("#workChangeAmount").css("color","green");
        }
    }

    finishWork()
    {
        $("#workModal").modal('hide');
        if(this.build.length==0 && this.sell.length==0 && this.redeem.length==0 && this.mortgage.length==0)
        {
            return;
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
        work.finishWork();
    });

});