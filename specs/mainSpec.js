const log4js = require("../logger/loggerConfigurator"),
    LoginPage = require("../pageObjects/loginPage"),
    StartingPage = require("../pageObjects/startingPage");

const logger = log4js.getLogger("default");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

describe('Application ', () => {

    it('should show error message when entering wrong login/password', async () => {
        logger.info("Starting main test");
        await StartingPage.clickOnElement(StartingPage.getSelectors().logoSelector, 5);
        await StartingPage.clickOnElement(StartingPage.getSelectors().enviromentButton);
        await StartingPage.pressBackButton();
        await StartingPage.clickOnElement(StartingPage.getSelectors().loginSelector);
        await LoginPage.fillTextBoxWithRandomText(LoginPage.getSelectors().loginTextBoxSelector);
        await LoginPage.fillTextBoxWithRandomText(LoginPage.getSelectors().passwordTextBoxSelector);
        await LoginPage.clickOnElement(LoginPage.getSelectors().submitButtonSelector);
        expect(await LoginPage.getTextOfElement(LoginPage.getSelectors().errorMessageSelector))
            .toContain("We didn't recognize the username or password you entered. Please try again.");
    });
});