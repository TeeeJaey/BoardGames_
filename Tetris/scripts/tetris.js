
var mainContentVue = new Vue();       // to put data in HTML x
var game = new Game(); 

 
$(document).ready(function()
{
	importNavbar("tetris", "Tetris");
	//$('#gameUnderDev').css("display","");
	
    mainContentVue = new Vue({
        el: '#mainContent',
        data: {
            game : game 
        }
	});  

	$(document).on('keydown' , function(e) 
	{ 
		var key = e.keyCode || e.which;
		switch(key)
		{ 
			case 37 :
			{
				game.moveLeft();
				break;
			}
			case 39 :
			{
				game.moveRight();
				break;
			}
			case 38 :
			{
				game.rotateBlock();
				break;
			}
			case 40 :
			{
				game.moveDown();
				break;
			}
		}
		
	}); 
	

	$(document.body).on('click',"#start", function()
    {
		game.status = 0;
		game.startBlock();
	});
	 
	$(document.body).on('click',"#btnLeft", function()
    {
		game.moveLeft();
	});
	$(document.body).on('click',"#btnRight", function()
    {
		game.moveRight();
	});
	$(document.body).on('click',"#btnRotate", function()
    {
		game.rotateBlock();
	});
	$(document.body).on('click',"#btnDown", function()
    {
		game.moveDown();
	});
	
});