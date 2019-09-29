var http = require('http');
var path = require('path');
var fs = require ('fs');
var url = require('url');

http.createServer((req, res) =>
{
    var inputParams = url.parse(req.url, true).query;
    fs.readdir(inputParams.path, (error, files) =>
    {
        if(error) return console.log(err);

        var compareTime = Date.parse('1/1/1970 00:00');
        var lastCreatedFileHolder = files[0];
        var filesWithCorrectExtention = new Array();

        //Filtering files with the wrong extention
        //And searching for the last created file
        files.forEach((file)=>
        {
            if(getFileExt(file) != inputParams.ext)
                return;
                
            filesWithCorrectExtention.push(file);

            let filePath = inputParams.path + '/' + file;
            let createdTime = fs.statSync(filePath).ctime;
            
            if(createdTime > compareTime)
            {
                compareTime = createdTime;
                lastCreatedFileHolder = file;
            }
        });

        //finding files with created time within 10
        //seconds from a last created file
        var lastCreatedFileTime = fs.statSync(lastCreatedFileHolder).ctime;
        var closeCreatedFiles = [];
        filesWithCorrectExtention.forEach((file)=>
        {
            let createdTime = fs.statSync(file).ctime;
            if(lastCreatedFileTime.getTime() - createdTime.getTime() < 10000
            && file != lastCreatedFileHolder)
                closeCreatedFiles.push(file);

        });

        //Printing found files
        if(getFileExt(lastCreatedFileHolder) != inputParams.ext)
            console.log("File not found");
        else
            console.log("Last created file: " + lastCreatedFileHolder);
        
        if(closeCreatedFiles.length > 0)
        {
            console.log("Files created within 10 seconds:");
            closeCreatedFiles.forEach((file)=>
            {
                console.log(file);
            });
        }
        
    });

    res.end();
}).listen(8080);

function getFileExt(file)
{
    return file.split('.')[file.split('.').length-1];
}