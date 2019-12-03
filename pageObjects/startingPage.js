const log4js = require("../logger/loggerConfigurator"),
    BasePage = require("./basePage");

const logger = log4js.getLogger("default");
let selectors = {
    logoSelector: '~Login Logo',
    loginSelector: 'android=new UiSelector().className("android.widget.TextView").textContains("Login")',
    enviromentButton: 'android=new UiSelector().className("android.widget.TextView").textContains("QA1")'
};

class StartingPage extends BasePage{
    getSelectors() {
        return selectors;
    }

    async pressBackButton() {
        logger.debug("Trying to press back button.");

        driver.back();
        logger.debug("Pressed back button.");
    }
}

module.exports = new StartingPage();