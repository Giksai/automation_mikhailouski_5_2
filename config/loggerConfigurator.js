const debug = require('debug')('log4js-example'),
  fs = require('fs')

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
let log4js = require('log4js');
log4js.configure('./config/log4js.json');

module.exports = log4js;