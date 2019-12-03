const log4js = require("../logger/loggerConfigurator");

const logger = log4js.getLogger("default");

class BasePage {

    async clickOnElement(elementSelector, amountOfClicks = 1) {
        logger.debug(`Trying to click on ${elementSelector}.`);
        logger.debug(`Getting element ${elementSelector}.`);

        const elementToClickOn = await $(elementSelector);
        logger.debug(`Got element ${elementSelector}.`);

        for(let i = 0; i < amountOfClicks; i++) {
            await elementToClickOn.click();
        }
        logger.debug(`Successfully clicked ${amountOfClicks} times on element ${elementSelector}`);
    }
}

module.exports = BasePage;