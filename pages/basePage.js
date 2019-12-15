require('chromedriver');
require('geckodriver');
const {Builder, By} = require("selenium-webdriver"),
    logger = require('../logger/loggerConfigurator').getLogger('default'),
    driver = new Builder()
        .forBrowser('chrome')
        .build(),
    actions = driver.actions({bridge: true});

class BasePage {

    async findElementByTextAndCss(cssSelector, text) {
        logger.debug(`findElementByTextAndCss: Trying to find an element with text ${text}.`);
        const foundElements = await driver.findElements(By.css(cssSelector));
            logger.debug(`findElementByTextAndCss: Found ${foundElements.length} elements with selector ${cssSelector}.`);
            for(let element of foundElements) {
                if((await element.getText()).includes(text)) {
                    logger.debug(`findElementByTextAndCss: Found element with text ${text}.`);
                    return element;
                }
            }
    }
    
    /**
    * Returns integer typed value of the discount
    * @param {String} rawValue Unformatted value
    */
    getDiscountOrPriceValue(rawValue) {
    if(rawValue === 'Бесплатно' || rawValue === '.' || rawValue === '') return 0;
    if(rawValue.includes('-')) rawValue = rawValue.replace('-', '');
    if(rawValue.includes('%')) rawValue = rawValue.replace('%', '');
    if(rawValue.includes('$')) rawValue = rawValue.replace('$', '');
    if(rawValue.includes(' USD')) rawValue = rawValue.replace(' USD', '');

    return parseFloat(rawValue);
    }

    async hoverOverElement(elementCssSelector, time = 1) {
        logger.debug(`hoverOverElement: Trying to hover over element with cssSelector: ${elementCssSelector}.`);
        let element = await driver.findElement(By.css(elementCssSelector));
        logger.debug(`hoverOverElement: Found element with text ${await element.getText()}.`);
        await actions.move({duration:time,origin:element,x:0,y:0}).perform();
        logger.debug(`hoverOverElement: Hovered over element with text ${await element.getText()}.`);
    }

    async open(URI) {
        logger.debug(`open: Opening uri: ${URI}.`);
        await driver.get(URI);
    }

    async close() {
        logger.debug(`close: Exiting.`);
        await driver.quit();
    }
}

module.exports = {
        driver: driver,
        BasePage: BasePage,
        logger: logger
}