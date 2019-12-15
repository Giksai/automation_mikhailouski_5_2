const {driver, BasePage, logger} = require('./basePage'),
    {By} = require('selenium-webdriver');

const gamePageSelectors = {
    discount: '.discount_pct',
    price: '.discount_final_price'
};

class GamePage extends BasePage {
    async getPriceOrDiscount(elementSelector) {
        logger.debug(`getPriceOrDiscount: Trying to get game discount value of element with selector ${elementSelector}.`);
        const foundElement = await driver.findElement(By.css(elementSelector));
        logger.debug(`getPriceOrDiscount: Got element.`);

        const elementValue = super.getDiscountOrPriceValue(await foundElement.getText());
        logger.debug(`getPriceOrDiscount: Element's value is ${elementValue}.`);

        return elementValue;
    }
}

module.exports = {
    gamePage: new GamePage(),
    gamePageSelectors: gamePageSelectors
}