
class Player 
{
    constructor(color) 
    {
        this.color = color.toLowerCase();
        this.coins = this.getCoins();
        this.path = this.getPath(color);				// array of numbers - each representing cell index from game.board
    }

    getCoins()
    {
        var coins = [];

        var diff = 0;
        
        if(this.color == "green")
            diff = 4;
        if(this.color == "blue")
            diff = 8;
        if(this.color == "yellow")
            diff = 12;

        for(var i = 0; i < 4 ; i+=1)
            coins.push(new PlayerCoin(this.color + "Coin"+i.toString() , this.color , i + diff));
        
        return coins;
    }

    getPath()
    {
        var path = [];
            
        if(this.color == "red")
        {
            path = [];
            
            var i = 63;
            while(i <= 67)
            {
                path.push(i);
                i += 1;
            }
            var i = 16;
            while(i <= 61)
            {
                path.push(i);
                i += 1;
            }
                
            var i = 68;
            while(i <= 73)
            {
                path.push(i);
                i += 1;
            }

            return path;
        }

        if(this.color == "green")
        {
            path = [];

            var i = 24;
            while(i <= 67)
            {
                path.push(i);
                i += 1;
            }
                
            var i = 16;
            while(i <= 22)
            {
                path.push(i);
                i += 1;
            }

            var i = 74;
            while(i <= 79)
            {
                path.push(i); 
                i += 1;
            }

            return path;
        }

        if(this.color == "yellow")
        {
            path = [];
            
            var i = 37;
            while(i <= 67)
            {
                path.push(i);
                i += 1;
            }
                
            var i = 16;
            while(i <= 35)
            {
                path.push(i);
                i += 1;
            }

            var i = 80;
            while(i <= 85)
            {
                path.push(i); 
                i += 1;
            }

            return path;
        }

        if(this.color == "blue")
        {
            path = [];
            
            var i = 50;
            while(i <= 67)
            {
                path.push(i);
                i += 1;
            }
                
            var i = 16;
            while(i <= 48)
            {
                path.push(i);
                i += 1;
            }

            var i = 86;
            while(i <= 91)
            {
                path.push(i); 
                i += 1;
            }

            return path;
        }

    }

}
