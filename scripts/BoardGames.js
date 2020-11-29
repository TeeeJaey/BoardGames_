function performSearch()
{
    var input = document.getElementById("searchInput");
    if(input.value != undefined && input.value != null  && input.value != "")
    {
        var filter = document.getElementById("searchInput").value.toUpperCase();
        var gameList = document.getElementById("gameList");
        var a = gameList.getElementsByTagName("a");

        for (i = 0; i < a.length; i++) 
        {
            var game = a[i];
            var txtValue = game.id || game.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1) 
            {
                game.style.display = "inline-block";
            }
            else 
            {
                game.style.display = "none";
            }
        }
    }
    else
    {
        var filter = document.getElementById("searchInput").value.toUpperCase();
        var gameList = document.getElementById("gameList");
        var a = gameList.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) 
        {
            var game = a[i];
            var txtValue = game.id || game.innerText;
            game.style.display = "inline-block";
        }
    }
}

$(document).ready(function()
{
    $("#searchSubmit").click(function()
    {
        performSearch();
    });
    $('#searchForm').keypress((e) => 
    { 
        // Enter key corresponds to number 13 
        if (e.which === 13) 
        { 
            performSearch();
        } 
    }) 
});
