const log4js = require("../logger/loggerConfigurator"),
    LoginPage = require("../pageObjects/loginPage"),
    StartingPage = require("../pageObjects/startingPage");

const logger = log4js.getLogger("default");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe('Application ', () => {

    it('should show error message when entering wrong login/password', async () => {
        logger.info("Starting main test");
        await StartingPage.clickOnElement(StartingPage.logoSelector, 5);
        await StartingPage.clickOnElement(StartingPage.enviromentButton);
        await StartingPage.pressBackButton();
        await StartingPage.clickOnElement(StartingPage.loginSelector);
        await LoginPage.fillTextBoxWithRandomText(LoginPage.loginTextBoxSelector);
        await LoginPage.fillTextBoxWithRandomText(LoginPage.passwordTextBoxSelector);
        await LoginPage.clickOnElement(LoginPage.submitButtonSelector);
        expect(await LoginPage.getTextOfElement(LoginPage.errorMessageSelector))
            .toContain("We didn't recognize the username or password you entered. Please try again.");
    });
});