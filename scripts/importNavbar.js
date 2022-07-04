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
		justify-content: center;
		align-items: center;
	}
	.flex-navigation {
		color: white;
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
	
	.flex-navigation > div > #themeIcon {
		border: 1px solid white;
		border-radius: 100%;
		padding: 2px 5px;
	}

	.sidemenu a,
	.flex-navigation a ,
	.flex-navigation > div > i ,
	.flex-navigation .dropdown {
		font-size: 18px;
		margin: 10px;
		text-decoration:none;
		color:rgb(256,256,256,0.8);
	}
	.flex-navigation .dropdown .dropdown-menu {
		left:auto;
		right:0;
	}
	
	.sidemenu a:hover,
	.sidemenu a:active,
	.flex-navigation a:hover,
	.flex-navigation a:active {
		cursor: pointer;
		text-decoration:none;
		color:white;
	}

	.sidemenu {
		position: absolute;
		top: 50px;
		left: -360px;
		width: 360px;
		height: 400px;
		overflow-y:scroll;
		background-color: #222;
		padding: 20px;
		display:flex;
		flex-direction:column;
		transition: left 0.4s;
	}
	.sidemenu a { 
		font-size: 18px;
	}
</style>

<script>
	function toggleSideMenu() {
		var sidemenu = document.getElementById("sidemenu");
		if (sidemenu.style.left == "0px")
			sidemenu.style.left = "-360px";
		else
			sidemenu.style.left = "0px";
	}
</script>

<div class="flex-navigation hidden-xs">

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
	
	<div class="flex-center" >
		<a id="changeTheme"> Change Theme <i class="fa fa-moon-o"></i></a>
		|
		<div class="dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown" href="#" > 
				Choose Game <span class="caret"></span>
			</a>
			<ul class="dropdown-menu">
				<li><a href="../Minesweeper/Minesweeper.html" >MineSweeper</a></li>
				<li><a href="../SnakeNLadder/SnakeLadder.html">Snake & Ladder</a></li>
				<li><a href="../Connect4/Connect4.html">Connect 4</a></li>
				<li><a href="../Business/Business.html">Business</a></li>
				<li><a href="../Sudoku/sudoku.html">Sudoku</a></li>
				<li><a href="../DotsNBoxes/dotsNBoxes.html">Dots & Boxes</a></li>
				<li><a href="../DealOrNoDeal/DealNoDeal.html">Deal Or NoDeal</a></li>
				<li><a href="../Ludo/Ludo.html">Ludo</a></li>
				<li><a href="../Tetris/tetris.html">Tetris</a></li>
				<li><a href="../Snake/snake.html">Snake</a></li>
				<li><a href="../Wordle/wordle.html">Wordle</a></li>
				<li><a href="../2048/2048.html">2048</a></li>
			</ul>
		</div>
	</div>
</div>


<div class="flex-navigation hidden-lg hidden-md hidden-sm">
	<div class="flex-center">
		<a onclick="toggleSideMenu()" > 
			<i class="fa fa-bars"></i>
		</a>
	</div>
	<div class="dropdown" style="margin:10px; position:unset;"> ` +
        displayName +
        ` </div>
	
	<div style="padding: 0 20px;"></div>
</div>

<div id="sidemenu" class="sidemenu hidden-lg hidden-md hidden-sm">
	<a href="https://teeejaey.github.io/">Home <i class="fa fa-home"></i></a>
	<hr style="width: 100%; margin: 10px 0px"/>
	
	<a href="../BoardGames.html">Board Games <i class="fa fa-dice"></i></a>
	<hr style="width: 100%; margin: 10px 0px"/>
	
	<a id="changeTheme"> Change Theme <i class="fa fa-moon-o"></i></a>
	<hr style="width: 100%; margin: 10px 0px"/>

	<a href="../Minesweeper/Minesweeper.html"  >MineSweeper</a>
	<a href="../SnakeNLadder/SnakeLadder.html" >Snake & Ladder</a>
	<a href="../Connect4/Connect4.html" >Connect 4</a>
	<a href="../Business/Business.html" >Business</a>
	<a href="../Sudoku/sudoku.html" >Sudoku</a>
	<a href="../DotsNBoxes/dotsNBoxes.html" >Dots & Boxes</a>
	<a href="../DealOrNoDeal/DealNoDeal.html" >Deal Or NoDeal</a>
	<a href="../Ludo/Ludo.html" >Ludo</a>
	<a href="../Tetris/tetris.html" >Tetris</a>
	<a href="../Snake/snake.html" >Snake</a>
	<a href="../Wordle/wordle.html" >Wordle</a>
	<a href="../2048/2048.html" >2048</a>
</div>
			`;

    $("#navbar").html(navHTML);

    return;
}

$(document).ready(function () {
    importNavbar("", "");
});
