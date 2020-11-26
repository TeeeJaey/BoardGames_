const http = require('http');
const fs = require('fs');
  

function getProblems()
{
    return new Promise(function(resolve, reject) 
    {
        var str = '';
        http.get('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=3' ,
            function(res)
            {
                console.log('Response is '+res.statusCode);

                res.on('data', function (chunk) {
                    str += chunk;
                });

                res.on('end', function () {
                    resolve(str);
                });

            }
        );
    });
}

for(var i=0; i<100; i++)
{
    getProblems().then( function(str)
    {       
        fs.appendFile('probs.txt', "allHardProblems.push("+str+");\r\n", (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            // success case, the file was saved
            console.log('str saved!');
        });
    });
}

