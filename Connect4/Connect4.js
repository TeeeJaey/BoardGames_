
$(document).ready(function()
{

    var player = 1;
    var playerColour = "yellow";
    var playerWon = false;

    importNavbar("Connect4", "Connect4");
    
    $('td').click(function(){

        if(playerWon)
            return;
        // Get Row ad Col
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());

        
        // Play 
        
        var n=5
        var played = false;
        var pCol = col;
        
        
        while(n>=0)
        {	
            var currBtn = $(this).parent().parent().children().get(n).cells[pCol].firstChild;
            
            if(currBtn.style.backgroundColor!="yellow" && currBtn.style.backgroundColor!="red")
            {
                currBtn.style.backgroundColor = playerColour;
                played = true;
                var pRow = n;
                break;
            }
            n--;
        }
        
        
        // Check if anyone won
        if(played)
        {
            // Colckwise 
            
            var i = pRow;
            var j = pCol;
            var count = 0;
            
            // Direction 	UR <---> DL
            while(i>=0 && j<=5)
            {	
                var currBtn = $(this).parent().parent().children().get(i).cells[j].firstChild;
                if(currBtn.style.backgroundColor == playerColour)
                {
                    count++;
                    if(count == 4)
                    {
                        playerWon = true;
                        $('#instruct')[0].style.color = playerColour
                        $('#instruct')[0].innerText = "Player " + player + " won!";
                        return;
                    }
                    
                }
                else{
                    break;
                }
                
                i --;
                j ++;					
            }
            
            i = pRow+1;
            j = pCol-1;
            while(i<=5 && j>=0)
            {	
                var currBtn = $(this).parent().parent().children().get(i).cells[j].firstChild;
                if(currBtn.style.backgroundColor == playerColour)
                {
                    count++;
                    if(count == 4)
                    {
                        playerWon = true;
                        $('#instruct')[0].style.color = playerColour
                        $('#instruct')[0].innerText = "Player " + player + " won!";
                        return;
                    }
                    
                }
                else{
                    break;
                }
                
                i ++;		
                j --;					
            }
            
            

            i = pRow;
            j = pCol;
            count = 0;
            // Direction 	DR <---> UL
            while(i<=5 && j<=5)
            {	
                var currBtn = $(this).parent().parent().children().get(i).cells[j].firstChild;
                if(currBtn.style.backgroundColor == playerColour)
                {
                    count++;
                    if(count == 4)
                    {
                        playerWon = true;
                        $('#instruct')[0].style.color = playerColour
                        $('#instruct')[0].innerText = "Player " + player + " won!";
                        return;
                    }
                    
                }
                else{
                    break;
                }
                
                i ++;
                j ++;				
            }
            
            i = pRow-1;
            j = pCol-1;
            while(i>=0 && j>=0)
            {	
                var currBtn = $(this).parent().parent().children().get(i).cells[j].firstChild;
                if(currBtn.style.backgroundColor == playerColour)
                {
                    count++;
                    if(count == 4)
                    {
                        playerWon = true;
                        $('#instruct')[0].style.color = playerColour
                        $('#instruct')[0].innerText = "Player " + player + " won!";
                        return;
                    }
                    
                }
                else{
                    break;
                }

                i --;
                j --;					
            }
            
            
            i = pRow;
            j = pCol;
            count = 0;
            
            // Direction 	L <---> R
            while(j>=0)
            {	
                var currBtn = $(this).parent().parent().children().get(i).cells[j].firstChild;
                if(currBtn.style.backgroundColor == playerColour)
                {
                    count++;
                    if(count == 4)
                    {
                        playerWon = true;
                        $('#instruct')[0].style.color = playerColour
                        $('#instruct')[0].innerText = "Player " + player + " won!";
                        return;
                    }
                    
                }
                else{
                    break;
                }
                
                j --;					
            }


            i = pRow;
            j = pCol+1;
            while(j<=5)
            {	
                var currBtn = $(this).parent().parent().children().get(i).cells[j].firstChild;
                if(currBtn.style.backgroundColor == playerColour)
                {
                    count++;
                    if(count == 4)
                    {
                        playerWon = true;
                        $('#instruct')[0].style.color = playerColour
                        $('#instruct')[0].innerText = "Player " + player + " won!";
                        return;
                    }
                    
                }
                else{
                    break;
                }
                
                j ++;				
            }
            

            i = pRow;
            j = pCol;
            count = 0;
            // Direction D
            while(i<=5)
            {	
                var currBtn = $(this).parent().parent().children().get(i).cells[j].firstChild;
                if(currBtn.style.backgroundColor == playerColour)
                {
                    count++;
                    if(count == 4)
                    {
                        playerWon = true;
                        $('#instruct')[0].style.color = playerColour
                        $('#instruct')[0].innerText = "Player " + player + " won!";
                        return;
                    }
                    
                }
                else{
                    break;
                }
                
                i ++;			
            }

        
            // Change player
            
            if(player == 1)
            {
                player = 2
                playerColour = "red";
                $('#instruct')[0].style.color = playerColour
                $('#instruct')[0].innerText = "Player " + player + " play ...";
            }
            else
            {
                player = 1
                playerColour = "yellow";
                $('#instruct')[0].style.color = playerColour
                $('#instruct')[0].innerText = "Player " + player + " play ...";
            }
        }
                    

        
    });
    
});