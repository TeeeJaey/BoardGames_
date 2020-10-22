

class ChanceChest
{
	constructor(number, name, good)  
	{
        this.number = number;
        this.name = name;
        this.good = good;
        this.message = "";
        this.amount = 0;
        return;
    }

    processChest()
    {
        switch(this.number)
        {
            case 2:
            {
                var i = 0;
                while(i < nmbrOfPlayers)
                {
                    if(i != currPlayer)
                    {
                        var log = new Log(i, currPlayer, this.amount, "Birthday present!");
                        log.generateLogDiv();
                        log.prependLogDiv();
                        log.performTransaction();
                    }
                    i += 1;
                }
                break;
            }
            case 3:
            {
				players[currPlayer].inJail = true;
                moveBackWithoutGO(10);
                break;
            }
            case 8:
            {
                moveAheadWithGO(0);
                break;
            }
            case 9:
            {
                var log = new Log(currPlayer, -1, (this.amount * players[currPlayer].properties.length), this.message + " " +rupeeSym+ this.amount.toString());
                log.generateLogDiv();
                log.prependLogDiv();
                log.performTransaction();
                break;
            }
            default:
            {
                if(this.good)
                {
                    var log = new Log(-1, currPlayer, this.amount, this.message);
                    log.generateLogDiv();
                    log.prependLogDiv();
                    log.performTransaction();
                }
                else
                {
                    var log = new Log(currPlayer, -1, this.amount, this.message);
                    log.generateLogDiv();
                    log.prependLogDiv();
                    log.performTransaction();
                }
                break;
            }
        
        }

        return;
    }


    processChance()
    {
        switch(this.number)
        {
            case 6:
            {
                var log = new Log(currPlayer, -1, (this.amount * players[currPlayer].houseCount), this.message + this.amount.toString());
                log.generateLogDiv();
                log.prependLogDiv();
                log.performTransaction();
                break;
            }
            case 9:
            {
                moveAheadWithGO(1);
                break;
            }
            case 10:
            {
				players[currPlayer].inJail = true;
                moveBackWithoutGO(10);
                break;
            }
            case 12:
            {
                
                players[currPlayer].position = players[currPlayer].position - 3;
                
                if(players[currPlayer].position < 0)
                    players[currPlayer].position = 40 - players[currPlayer].position;
                
                players[currPlayer].topVal = board[players[currPlayer].position].topVal;
                players[currPlayer].leftVal = board[players[currPlayer].position].leftVal;
                currCoin.animate(
                {
                    "top":(players[currPlayer].topVal).toString()+"px",
                    "left":(players[currPlayer].leftVal).toString()+"px"
                },300);
                
                break;
            }
            default:
            {
                if(this.good)
                {
                    var log = new Log(-1, currPlayer, this.amount, this.message);
                    log.generateLogDiv();
                    log.prependLogDiv();
                    log.performTransaction();
                }
                else
                {
                    var log = new Log(currPlayer, -1, this.amount, this.message);
                    log.generateLogDiv();
                    log.prependLogDiv();
                    log.performTransaction();
                }
                break;
            }
        
        }

        return;
    }

    process()
    {
        var title = "";
        if(this.amount != undefined && this.amount > 0)
        {
            if(this.good)
            {
                title = "<div style=\"color:green\">+ "+ rupeeSym + this.amount + "</div>";
            }
            else
            {
                title = "<div style=\"color:red\">- "+ rupeeSym + this.amount + "</div>";
            }
        }
         

		Swal.fire({
            title: title,
            text: this.message,
            imageUrl:  "images/" + this.name + ".PNG",
            imageHeight : 150,
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'OK'
        });
        
                       
        if(this.name == "chest")
        {
            this.processChest();
        }
              
        if(this.name == "chance")
        {
            this.processChance();
        }

		return;

    }

}

