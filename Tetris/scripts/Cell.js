
class Cell
{
    constructor(i,j)
    {
        this.id = i+':'+j;
        this.x = i;
        this.y = j;
        
        this.isSet = false;
        
        this.initColor = "#bbb";
        this.currColor = "#bbb";
        this.blockColor = "#bbb";
        
        return;
    }
}
