function importNavbar(htmlName, displayName) {
    var navHTML =
        `
			<script src='https://kit.fontawesome.com/a076d05399.js'></script>
			<style>	
				#navbar {
					position: relative;
					z-index:900;
				}

				.flex-center {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.flex-navigation {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					background-color: #222;
					width: 100%;
					margin: 0px;
					margin-bottom: 25px !important;
					justify-content: space-between;
					min-height: 45px;
				}
				
				.flex-navigation > #searchForm {
					margin: 12px;
					float: right;
				}
				
				.flex-navigation > div > a ,
				.flex-navigation > div > i ,
				.flex-navigation .dropdown {
					font-size: 22px;
					margin: 10px;
					text-decoration:none;
					color:rgb(256,256,256,0.8);
				}
				.flex-navigation .dropdown .dropdown-menu {
					left:auto;
					right:0;
				}

				.flex-navigation a:hover,
				.flex-navigation a:active {
					text-decoration:none;
					color:white;
				}	

			</style>

			<div class="flex-navigation hidden-sm hidden-xs">
				<div class="flex-center" >
					<a href="https://teeejaey.github.io/">Home</a>
					<i class="fa fa-angle-right" style="padding-top:2px" ></i>
					<a href="../BoardGames.html">Board Games</a>
					<i class="fa fa-angle-right" style="padding-top:2px"  ></i>
					<a href="` +
        htmlName +
        `.html">` +
        displayName +
        `</a>
				</div>
				
				<div class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" href="#" style="font-size: 22px;" > 
						Choose Game <span class="caret"></span>
					</a>
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
						<li><a href="../Snake/snake.html" style="font-size: 22px;">Snake</a></li>
						<li><a href="../Wordle/wordle.html" style="font-size: 22px;">Wordle</a></li>
					</ul>
				</div>
			</div>

			<div class="flex-navigation hidden-lg hidden-md">
				<div class="flex-center" >
					<a href="https://teeejaey.github.io/" > 
						<i class="fa fa-home"></i>
					</a>
					<i class="fa fa-angle-right"  ></i>
					<a  href="../BoardGames.html">
						<i class="fa fa-dice"></i>
					</a>
					<i class="fa fa-angle-right"  ></i>
				</div>
				
				<div class="dropdown" style="margin:10px; position:unset;">
					<a class="dropdown-toggle" data-toggle="dropdown" href="#"> 
						` +
        displayName +
        ` <span class="caret"></span>
					</a>
					<ul class="dropdown-menu" style="left:10%; top:50px; width:80vw">
						<li><a href="../Minesweeper/Minesweeper.html"  >MineSweeper</a></li>
						<li><a href="../SnakeNLadder/SnakeLadder.html" >Snake & Ladder</a></li>
						<li><a href="../Solitaire/Solitaire.html" >Solitaire</a></li>
						<li><a href="../Connect4/Connect4.html" >Connect 4</a></li>
						<li><a href="../Business/Business.html" >Business</a></li>
						<li><a href="../Sudoku/sudoku.html" >Sudoku</a></li>
						<li><a href="../DotsNBoxes/dotsNBoxes.html" >Dots & Boxes</a></li>
						<li><a href="../DealOrNoDeal/DealNoDeal.html" >Deal Or NoDeal</a></li>
						<li><a href="../Ludo/Ludo.html" >Ludo</a></li>
						<li><a href="../Tetris/tetris.html" >Tetris</a></li>
						<li><a href="../Snake/snake.html" >Snake</a></li>
						<li><a href="../Wordle/wordle.html" >Wordle</a></li>
					</ul>
				</div>
			</div>
			`;

    $("#navbar").html(navHTML);

    return;
}

$(document).ready(function () {
    importNavbar("", "");
});
