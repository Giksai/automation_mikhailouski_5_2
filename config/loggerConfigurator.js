var debug = require('debug')('log4js-example');
var fs = require('fs')

// /**
//  * Clearing reports directory
//  */
// try {
//     if(fs.existsSync('./reports')) {
//             require("rimraf").sync('./reports');
//         }
//         fs.mkdirSync('./reports');
//   } catch (e) {
//     if (e.code != 'EEXIST') {
//       console.error("Could not delete log directory, error was: ", e);
//       process.exit(1);
//     }
//   }

/**
 * Makes log directory if it does not exist
 */
try {
  fs.mkdirSync('./logs');
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}

/**
 * Initialise log4js first, so we don't miss any log messages
 */
var log4js = require('log4js');
log4js.configure('./config/log4js.json');

module.exports = log4js;