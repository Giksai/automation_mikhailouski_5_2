require('chromedriver');
const {Builder} = require("selenium-webdriver");

const driver = new Builder()
        .forBrowser('chrome')
        .build();

class Page {
    async open(path) {
        await driver.get(path);
    }
    async close() {
        await driver.quit();
    }
}

module.exports = {
    driver: driver,
    Page: Page
};