const http = require('http'),
    server = http.createServer(),
    pathM = require('path');
    fs = require ('fs'),
    url = require('url');

const args = process.argv;

//Starting point
server.listen(8080, () => {
    if(args.length !== 4) {
        console.log('Wrong commands!');
        console.log('Use: node program.js <path> <extention>');
        console.log('Example: node program.js /Users/evgenij/Projects/ .txt');
        process.exit();
    }

    execute(args[2], args[3]);
});

function execute(path, ext) {
    //Getting all files in given directory
    fs.readdir(path, (error, files) => {
        if(error) {
            console.log(error);
            process.exit();
        }

        //Time variable that is used to find a file with the last created time
        let compareTime = Date.parse('1/1/1970 00:00');
        //Holds last created file
        let lastCreatedFileHolder = files[0];
        let filesWithCorrectExtention = [];

        //Filtering files with the wrong extention
        //and searching for the last created file
        files.forEach((file) => {
            if(pathM.extname(file) !== ext) {
                return;
            }
                
            filesWithCorrectExtention.push(file);

            let filePath = pathM.join(path, file);
            let createdTime = fs.statSync(filePath).ctime;
            
            if(createdTime > compareTime) {
                compareTime = createdTime;
                lastCreatedFileHolder = file;
            }
        });

        //Getting creation time of the last created file
        var lastCreatedFileTime = fs.statSync(lastCreatedFileHolder).ctime;
        var closeCreatedFiles = [];

        //Finding files with created time within 10
        //seconds from a last created file
        filesWithCorrectExtention.forEach((file) => {
            let createdTime = fs.statSync(file).ctime;
            if(lastCreatedFileTime.getTime() - createdTime.getTime() < 10000
            && file !== lastCreatedFileHolder) {
                closeCreatedFiles.push(file);
            }
        });

        //Printing found files
        if(pathM.extname(lastCreatedFileHolder) !== ext) {
            console.log("File not found");
        } else {
            console.log("Last created file: " + lastCreatedFileHolder);
        }
        
        //Printing files created within 10 seconds of last created file
        if(closeCreatedFiles.length > 0) {
            console.log("Files created within 10 seconds:");
            closeCreatedFiles.forEach((file) => {
                console.log(file);
            });
        }
        process.exit();
    });
    
}
