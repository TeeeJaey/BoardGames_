

class ChanceChest
{
	constructor(number, name, good)  
	{
        this.number = number;
        this.name = name;
        this.good = good;
        this.message = "";
        this.amount = 0;
        return;
    }

    process()
    {
        // ...
        var div = document.createElement("div");

        var img = document.createElement("img");
        img.src = "images/" + this.name + ".PNG";
        $(img).css("width","150px");

        $(div).addClass("logItem").html(this.message);

        var title = "";
        if(this.amount != undefined)
        {
            if(this.good)
                title = "+ "+ rupeeSym + this.amount;
            else
                title = "- "+ rupeeSym + this.amount;
                
        }

		Swal.fire({
            title: title,
            text: this.message,
            imageUrl:  "images/" + this.name + ".PNG",
            imageHeight : 200,
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'OK'
        });
        

		return;

    }

}

