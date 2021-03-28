
function importNavbar(htmlName, displayName)
{
	var navHTML =  `
			<style>		
				#desktopNav
				{
					display: block;
				}
				#mobileNav
				{
					display: none;
				}		
				@media (max-width: 768px) 
				{
					#desktopNav
					{
						display: none;
					}
					#mobileNav
					{
						display: block;
					}
				}
			</style>
			<nav class="navbar navbar-inverse" id="desktopNav">
				<div class="container-fluid" >
				<div class="navbar-header" >
					<a class="navbar-brand" style="font-size: 22px;" href="https://teeejaey.github.io/">Home</a>
					<i class="fa fa-angle-right navbar-brand"  style="font-size: 22px;"></i>
					<a class="navbar-brand" style="font-size: 22px;" href="../BoardGames.html">Board Games</a>
					<i class="fa fa-angle-right navbar-brand"  style="font-size: 22px;"></i>
					<a class="navbar-brand" style="font-size: 22px;" href="`+htmlName+ `.html">`+displayName+`</a>
				</div>

				<ul class="nav navbar-nav navbar-right"   >
					<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" href="#" style="font-size: 22px;" > Choose Game
					<span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="../Minesweeper/Minesweeper.html" style="font-size: 22px;" >MineSweeper</a></li>
						<li><a href="../SnakeNLadder/SnakeLadder.html" style="font-size: 22px;">Snake & Ladder</a></li>
						<li><a href="../Solitaire/Solitaire.html" style="font-size: 22px;">Solitaire</a></li>
						<li><a href="../Connect4/Connect4.html" style="font-size: 22px;">Connect 4</a></li>
						<li><a href="../Business/Business.html" style="font-size: 22px;">Business</a></li>
						<li><a href="../Sudoku/sudoku.html" style="font-size: 22px;">Sudoku</a></li>
						<li><a href="../DotsNBoxes/dotsNBoxes.html" style="font-size: 22px;">Dots & Boxes</a></li>
						<li><a href="../DealOrNoDeal/DealNoDeal.html" style="font-size: 22px;">Deal Or NoDeal</a></li>
						<li><a href="../Ludo/Ludo.html" style="font-size: 22px;">Ludo</a></li>
						<li><a href="../Tetris/tetris.html" style="font-size: 22px;">Tetris</a></li>
					</ul>
					</li>
				</ul>
				</div>
			</nav>   
			
			<nav class="navbar navbar-inverse" id="mobileNav">
				<div class="container-fluid"  >
					<ul class="nav navbar-nav "   >
						<a class="navbar-brand" href="https://teeejaey.github.io/" style="font-size: 22px; padding:15px 6px" > 
							<i class="fas fa-home"></i>
						</a>
						<i class="fa fa-angle-right navbar-brand" style="font-size: 22px; padding:15px 6px"  ></i>
						<a class="navbar-brand" style="font-size: 22px; padding:15px 6px"  href="../BoardGames.html">
							<i class="fas fa-dice"></i>
						</a>
						<i class="fa fa-angle-right navbar-brand" style="font-size: 22px; padding:15px 6px"  ></i>
						<a class="navbar-brand" style="font-size: 22px; padding:15px 6px" href="`+htmlName+ `.html">`+displayName+`</a>

						<a class="dropdown-toggle navbar-nav navbar-right"  data-toggle="dropdown" href="#"   > 
							<i class="fa fa-caret-down" style="font-size: 22px; padding:15px 6px" ></i>
						</a>
						<ul class="dropdown-menu" style="width: 80%; margin-left:10%;">
							<li><a href="../Minesweeper/Minesweeper.html" style="font-size: 22px;" >MineSweeper</a></li>
							<li><a href="../SnakeNLadder/SnakeLadder.html" style="font-size: 22px;">Snake & Ladder</a></li>
							<li><a href="../Solitaire/Solitaire.html" style="font-size: 22px;">Solitaire</a></li>
							<li><a href="../Connect4/Connect4.html" style="font-size: 22px;">Connect 4</a></li>
							<li><a href="../Business/Business.html" style="font-size: 22px;">Business</a></li>
							<li><a href="../Sudoku/sudoku.html" style="font-size: 22px;">Sudoku</a></li>
							<li><a href="../DotsNBoxes/dotsNBoxes.html" style="font-size: 22px;">Dots & Boxes</a></li>
							<li><a href="../DealOrNoDeal/DealNoDeal.html" style="font-size: 22px;">Deal Or NoDeal</a></li>
							<li><a href="../Ludo/Ludo.html" style="font-size: 22px;">Ludo</a></li>
							<li><a href="../Tetris/tetris.html" style="font-size: 22px;">Tetris</a></li>
						</ul>
					</ul>
				</div>
			</nav>  
			`;
	
	
	$("#navbar").html(navHTML);

	return;
}


$(document).ready(function()
{
	importNavbar("", "");
});