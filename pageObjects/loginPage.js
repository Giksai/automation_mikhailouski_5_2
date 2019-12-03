const log4js = require("../logger/loggerConfigurator"),
    BasePage = require("./basePage");

const logger = log4js.getLogger("default");
let selectors = {
    loginTextBoxSelector: 'android=new UiSelector().resourceId("user_username")',
    passwordTextBoxSelector:  'android=new UiSelector().resourceId("user_password")',
    submitButtonSelector: 'android=new UiSelector().resourceId("submit")',
    errorMessageSelector: 'android=new UiSelector().className("android.view.View").textContains("error")'
};

class LoginPage extends BasePage {
    getSelectors() {
        return selectors;
    }

    //Can be used with both password and login text boxes
    async fillTextBoxWithRandomText(boxSelector) {
        logger.debug(`Trying to fill text box (${boxSelector}) with random text.`);

        await (await $(boxSelector)).setValue(this.getRandomText());
    }

    async getTextOfElement(elementSelector) {
        logger.debug(`Trying to get text of element ${elementSelector}`);

        return await (await $(elementSelector)).getText();
    }

    getRandomText() {
        logger.debug("Getting random string.");
        return Math.random().toString(36).slice(-5);
    }
}

module.exports = new LoginPage();