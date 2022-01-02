
class Cell
{
    constructor(i,j)
    {
        this.id = i+':'+j;
        this.x = i;
        this.y = j;
        this.currColor = "#bbb";
        
        this.isSnake = false;
        this.isFood = false;
        
        return;
    }

    setClear = () => {
        this.isSnake = false;
        this.isFood = false;
        this.isDanger = false;
        this.currColor = "#bbb";
    }
    
    setFood = () => {
        this.isDanger = false;
        this.isFood = true;
        this.currColor = "red";
    }
    
    setSnake = () => {
        this.isDanger = false;
        this.isFood = false;
        this.isSnake = true;
        this.currColor = "#333";
    }
}
