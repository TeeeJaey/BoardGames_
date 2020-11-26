
class Cell
{
    constructor(i,j,color)
    {
        this.isSelected = false;
        this.id = i+':'+j;
        this.initColor = color;
        this.currColor = color;
        this.init = false;
        this.value = 0 ;
        
        return;
    }
}