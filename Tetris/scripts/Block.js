
class Block
{
    constructor()
    {
        this.isSet = false;
        this.shape = this.getShape();
        this.color = this.getColor();
        
        this.currentX = this.getX();
        this.currentY = this.getY();
        return;
    }

    getY()
    {
        return -2;
    }

    getX()
    {
        const randomCode = Math.floor(Math.random()*9);
        return randomCode+2;
    }

    getShape()
    {
        const randomCode = Math.floor(Math.random()*9);
        switch(randomCode)
        {
            case 0:
                return [[true,false],
                        [true, true]];
            case 1:
                return [[true,true],
                        [true, true]];
            case 2:
                return [[true],
                        [true],
                        [true]];
            case 3:
                return [[true, false],
                        [true,false],
                        [true, true]];
            case 4:
                return [[true, false],
                        [true,true],
                        [false, true]];
            case 5:
                return [[true, true],
                        [true,false],
                        [true, true]];
            case 6:
                return [[true, false],
                        [true, true],
                        [true, false]];
            case 7:
                return [[true, false, false],
                        [true, false, false],
                        [true, true, true]];
            case 8:
                return [[true, false, false],
                        [true, false, false],
                        [true, true, true]];
        }

        return [[true,true],
                [true,false],
                [true,true]];
    }

    getColor()
    {
        const randomCode = Math.floor(Math.random()*11);
        switch(randomCode)
        {
            case 0:
                return "#C51111";
            case 1:
                return "#132fd2";
            case 2:
                return "#127f2d";
            case 3:
                return "#ed53b9";
            case 4:
                return "#ef7d0e";
            case 5:
                return "#f3f658";
            case 6:
                return "#3f484e";
            case 7:
                return "#6b30bc";
            case 8:
                return "#72491e";
            case 9:
                return "#39fedb";
            case 10:
                return "#50ef3a";
        }
    }

    rotate()
    {
        
		const cols = 12;
        if(game.currBlock.currentX + this.shape.length >= cols)
            this.currentX -= 1;

        let newShape = [];

        for (let i = 0; i < 3; i++) 
        {
            const col = 2 - i;
            let newRow = [undefined, undefined, undefined];
            if(this.shape[2])
                newRow[0] = this.shape[2][i];
            if(this.shape[1])
                newRow[1] = this.shape[1][i]
            if(this.shape[0])
                newRow[2] = this.shape[0][i];
            
            newShape.push(newRow);
        }

        for (let row = 0; row < newShape.length; row++) 
        {
            newShape[row] = newShape[row].filter(x=>x!==undefined);

            if(newShape[row].length == 0)
                newShape.splice(row,1);
        }

        this.shape = newShape;

        
        return;
    }
}