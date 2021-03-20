
class Block
{
    constructor(i,j)
    {
        this.currentX = this.getX();
        this.currentY = 0

        this.shape = this.getAShape();
        this.color = this.getAColors();
        return;
    }

    getX()
    {
        return 0;
    }

    getAShape()
    {
        return [[true,false],
                [true,true],
                [false,true]];

    }

    getAColors()
    {
        return "#FF9F33";
    }

}