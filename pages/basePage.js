require('chromedriver');
require("geckodriver");

const {Builder} = require("selenium-webdriver");

let driver;
const argumentSearch = "--browser=";

function wrongArguments() {
    console.error("Wrong arguments!");
    process.exit();
}

class Page {
    async getDriver() {
        for(let argument of process.argv) {
            if(argument.includes(argumentSearch)) {
                const browser = argument.replace(argumentSearch, "");
                if(browser !== "chrome" && browser !== "firefox") {
                    wrongArguments();
                }
                driver = await new Builder()
                    .forBrowser(browser)
                    .build();
                    return driver;
            }
        }
        if(!driver) {
                wrongArguments();
        }
    }

    async open(path) {
        await driver.get(path);
    }
    async close() {
        await driver.quit();
    }
}

module.exports = {
    Page: Page
};