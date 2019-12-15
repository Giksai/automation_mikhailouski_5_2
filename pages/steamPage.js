const {driver, BasePage, logger} = require('./basePage'),
    {By, until} = require('selenium-webdriver'),
    fs = require('fs'),
    config = require('../config'),
    path = require('path');

const steamLink = 'https://store.steampowered.com/about/';
const fileName = 'steam';

const steamPageSelectors = {
    downloadButton: '.about_install_steam_link'
}

class SteamPage extends BasePage {
    async pressDownloadButton() {
        logger.debug(`pressDownloadButton: Trying to press download button.`);
        await driver.findElement(By.css(steamPageSelectors.downloadButton)).click();
    }

    async waitForFileToDownload() {
        logger.debug(`Waiting for steam setup file to download.`);
        setTimeout(async () => {
            logger.error(`Could not download file in 50 seconds.`);
            await super.close();
        }, 50000);

        while(! await checkForFile()) {
            await driver.sleep(5);
        }

        return true;
    }

    async open() {
        await super.open(steamLink);
    }

}

async function checkForFile() {
    const files = fs.readdirSync(config.downloadPath);
    for(let file of files) {
        if(file.toLowerCase().includes(fileName.toLowerCase())) {
            if(path.extname(file) !== '.crdownload') {
                logger.debug(`Found steam file.`);
                return true;
            }
        }
    }
    return false;
}

module.exports = {
    steamPage: new SteamPage()
}