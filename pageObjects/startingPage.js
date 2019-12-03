const log4js = require("../logger/loggerConfigurator"),
    BasePage = require("./basePage");

const logger = log4js.getLogger("default");

class StartingPage extends BasePage{
    selectors = {
        logoSelector: "~Login Logo",
        loginSelector: "android=new UiSelector().className('android.widget.TextView').textContains('Login')",
        enviromentButton: "android=new UiSelector().className('android.widget.TextView').textContains('QA1')"
    }

    // async clickOnElement(elementSelector, amountOfClicks = 1) {
    //     super.clickOnElement(elementSelector, amountOfClicks);
    // }

    async pressBackButton() {
        logger.debug("Trying to press back button.");

        driver.back();
        logger.debug("Pressed back button.");
    }
}

module.exports = new StartingPage();