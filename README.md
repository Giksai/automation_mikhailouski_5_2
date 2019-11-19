## Second task
* Command example: node program.js /Users/evgenij/Projects/automation_mikhailouski_5_2 .txt maxFiles:4 maxDir:5</br>
* maxFiles and maxDir arguments are optional and can pe placed in any order after main arguments. </br>
* Default value for maxFiles is 1000, same for maxDir. </br>
* If maxFile argument is specified, program will print exactly maxFile amount of found files and if not, it will print files, which were created not later than 10 seconds from the last created file. </br>
* maxDir argument determines how many directory jumps program will execute before stopping. </br>
# Program searches for the last created file in the current and nested directories.
