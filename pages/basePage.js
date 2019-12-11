require('chromedriver');
require('geckodriver');
const {Builder, By} = require("selenium-webdriver");

const driver = new Builder()
        .forBrowser('chrome')
        .build();

class BasePage {
    async open(URI) {
        driver.get(URI);
    }

    async close() {
        driver.quit();
    }
}

module.exports = {
        driver: driver,
        BasePage: BasePage
}