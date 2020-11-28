$(document).ready(function()
{
	const minLeft = 540;

	if( parseInt($('#btnMenu').css("left").slice(0,-2)) < minLeft )
	{
		$("#btnMenu").css({"left": minLeft , "right":""});
		$("#menu").css({"left": minLeft , "right":""});

		$("#btnLogs").css({"left": 610 , "right":""});
		
		$("#btnTrade").css({"left": 600 , "right":""});
	}
	
	//#region "Logs"

	$("#btnLogs").click(function()
	{
		$("#allLogs").animate({"right":"0%"});
	});
	
	$("#closeLogs").click(function()
	{
        $("#allLogs").animate({"right":"-650px"});
	});
	
	//#endregion "Logs"
	

	$("#btnRules").click(function()
	{
        $("#allRules").animate({"right":"0%"});

    });
	$("#closeRules").click(function()
	{
        $("#allRules").animate({"right":"-500px"});
	});
	
	$("#btnMenu").click(function()
	{
        $("#menu").toggle();
	});
	


	$("#saveGame").click(function()
	{
		var game = new Game();
		game.saveGame();
	});

	var loadedGameFile = null;
	document.getElementById('loadGameFile').addEventListener('change', handleFileSelect, false);
	function handleFileSelect(evt) {
		loadedGameFile = evt.target.files[0];
	}

	$("#loadGame").click(function()
	{
		$('#loadGameModal').modal({
			backdrop: 'static',
			keyboard: false
		});
	});


	$("#loadGameSubmit").click(function()
	{
		var fr = new FileReader();
		var f = loadedGameFile;
		// Closure to capture the file information.
		fr.onload = (function (theFile) {
			return function (e) {
				try 
				{
					var loadedGame = JSON.parse(e.target.result);
					if(loadedGame != null)
					{
						var newGame = new Game();
						var gameLoaded = newGame.loadGame(loadedGame);

						if(gameLoaded)
						{
							console.log('Loaded game = ', loadedGame);
							startGame();

							$("#loadGameModal").modal('hide');
	
							Swal.fire(
								"Game Loaded Success",'',
								'success'
							);
							
							
						}
						else
						{
							console.log('Error loading game');	
							Swal.fire(
								"Game Load failed!",'',
								'error'
							);

						}

					}
					else
					{
						console.log('Error parsing json');	
						Swal.fire(
							"Game Load failed!",'',
							'error'
						);
					}
					
				}
				catch (ex) 
				{
					console.log('Error loading json : ' , ex);	
					Swal.fire(
						"Game Load failed!",'',
						'error'
					);
				}
			}
		})(f);
		fr.readAsText(f);

	});

});