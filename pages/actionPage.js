const {driver, BasePage, logger} = require('./basePage'),
    {By} = require('selenium-webdriver');

const actionPageSelectors = {
    discountBlockSelector: 'a.tab_item .discount_block .discount_pct',
    priceBlockSelector: '.tab_item .discount_block .discount_prices .discount_final_price'
};

class ActionPage extends BasePage {
    async getMaxDiscountOrPriceValue(elementSelector) {
        logger.debug(`getMaxDiscountOrPriceValue: Trying to get all elements with selector ${elementSelector}.`);
        const allElements = await driver.findElements(By.css(elementSelector));
        logger.debug(`getMaxDiscountOrPriceValue: Found ${allElements.length} elements.`);

        let maxDiscount = 0;
        for(let element of allElements) {
            maxDiscount = getMaxValue(maxDiscount, super.getDiscountOrPriceValue(await element.getText()));
        }
        logger.debug(`getMaxDiscountOrPriceValue: Maximum element value: ${maxDiscount}.`);
        return maxDiscount;
    }

    async navigateToGameWithDiscountOrPriceValue(elementSelector, value) {
        logger.debug(`Navigating to the game with selector ${elementSelector} and value of ${value}.`);
        const foundElement = await super.findElementByTextAndCss(elementSelector, value.toString());
        await foundElement.click();
    }
}

function getMaxValue(firstComparer, secondComparer) {
    return firstComparer > secondComparer ? firstComparer : secondComparer;
}

module.exports = {
    actionPage: new ActionPage(),
    actionPageSelectors: actionPageSelectors
}