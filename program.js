const pathM = require('path'),
    fs = require ('fs');

const args = process.argv;
let foundFiles = [];
let maxFilesToShow = 10000;
let maxNestedDirectories = 10000,
    currentNestedDirectories = 0;
let extension;

/**
 * Entry point
 * Arguments:
 * -Path to the folder
 * -File extension
 * -[Optional] maxFiles: Maximum amount of shown files
 * -[Optional] maxDir: Maximum amount of nested directories
 */
(async () => {
    if(args.length < 4 || args.length > 6) {
        wrongArgumentsHandler();
    }
    let path;
    path = args[2];
    extension = args[3];

    //Checking arguments
    if(!fs.existsSync(path)) {
        console.error("Given directory does not exist");
        process.exit();
    }
    if(!extension.match(/\.[a-zA-Z0-9]*/)) {
        console.error("Wrong file extension");
        process.exit();
    }
    for(let argument of args) {
        if(argument.match(/^maxFiles:\d+/)) {
            maxFilesToShow = parseInt(argument.split(':')[1]);
        }
        if(argument.match(/^maxDir:\d+/)) {
            maxNestedDirectories = parseInt(argument.split(':')[1]);
        }
    }

    if(maxFilesToShow) console.log("maxFiles: " + maxFilesToShow);
    if(maxNestedDirectories) console.log("maxDir: " + maxNestedDirectories);
    
    execute(path);
})();

/**
 * Called, when user inputs wrong arguments
 */
function wrongArgumentsHandler() {
    console.error('Wrong arguments!');
    console.info('Use: node program.js <path> <extention> [maxFiles:<shown files amount>] [maxDir:<nested directories amount>]');
    console.info('Example: node program.js /Users/evgenij/Projects/ .txt maxFiles:34 maxDir:59');
    console.info('Two last parameters are optional and can be written in any order');
    process.exit();
}

/**
 * Main logic
 */
function execute(path) {
        //Recursively finds all files in the current directory and in all nested directories, 
        //if there is no additional arguments
        if(recursiveSearch(path) === "No files found") {
            console.log("Given folder does not contain any files!");
            process.exit();
        }
        if(foundFiles.length === 0) {
            console.log("Did not found any files");
            process.exit();
        }
        console.log("Finished searching");

        let lastCreatedFile = findLastCreatedFile();
        console.log("Last created file: " + lastCreatedFile);

        printFoundFiles(lastCreatedFile);
}

function printFoundFiles(lastCreatedFile) {
    console.log("Printing files, creation time of which is not greater than 10 seconds relative to the creation time of the last created file:");
    let recentCreatedFiles = findRecentCreatedFiles(lastCreatedFile);
    for(let i = 0; i < recentCreatedFiles.length; i++) {
        if(i >= maxFilesToShow) return;
        console.log(recentCreatedFiles[i]);
    }
}

function findLastCreatedFile() {
    let compareTime = Date.parse('1/1/1970 00:00');
    let lastCreatedFileHolder;

    for(let file of foundFiles) {
        let createdTime = fs.statSync(file).ctime;
        if(createdTime > compareTime) {
            compareTime = createdTime;
            lastCreatedFileHolder = file;
        }
    }

    return lastCreatedFileHolder;
}

/**
 * Finds files, creation time of which is not greater than 10 seconds 
 * relative to the creation time of the last created file
 */
function findRecentCreatedFiles(lastCreatedFile) {
    let recentCreatedFiles = [];
    
    for(let file of foundFiles) {
        if(file !== lastCreatedFile) {
            if((fs.statSync(lastCreatedFile).ctime.getTime() - fs.statSync(file).ctime.getTime()) < 10000) {
                recentCreatedFiles.push(file);
            }
        }
    }
    return recentCreatedFiles;
}

/**
 * Fills foundFiles array with all files in the current and nested directories
 * @param {string} currentPath Starting directory
 */
function recursiveSearch(currentPath) {
    const directoryContents = fs.readdirSync(currentPath);
    if(directoryContents.length === 0) return "No files found";
    for(entity of directoryContents) {
        const path = pathM.join(currentPath, entity);
        try {
            if(fs.lstatSync(path).isDirectory() 
                && currentNestedDirectories <= maxNestedDirectories) {
                currentNestedDirectories++;
                recursiveSearch(path);
            }
            if(fs.lstatSync(path).isFile()) {
                if((pathM.extname(path)) !== extension) {
                    continue;
                }
                foundFiles.push(path);
            }
        } catch (error){
            console.error("Cannot access file " + path + " \n Error: " + error);
        }
    }
}
