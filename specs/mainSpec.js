const log4js = require("../logger/loggerConfigurator"),
    LoginPage = require("../pageObjects/loginPage"),
    StartingPage = require("../pageObjects/startingPage");

const logger = log4js.getLogger("default");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe('Application ', () => {

    it('should show error message when entering wrong login/password', async () => {
        logger.info("Starting main test");
        await StartingPage.clickOnElement(StartingPage.selectors.logoSelector, 5);
        await StartingPage.clickOnElement(StartingPage.selectors.enviromentButton);
        await StartingPage.pressBackButton();
        await StartingPage.clickOnElement(StartingPage.selectors.loginSelector);
        await LoginPage.fillTextBoxWithRandomText(LoginPage.selectors.loginTextBoxSelector);
        await LoginPage.fillTextBoxWithRandomText(LoginPage.selectors.passwordTextBoxSelector);
        await LoginPage.clickOnElement(LoginPage.selectors.submitButtonSelector);
        expect(await LoginPage.getTextOfElement(LoginPage.selectors.errorMessageSelector))
            .toContain("We didn't recognize the username or password you entered. Please try again.");
    });
});