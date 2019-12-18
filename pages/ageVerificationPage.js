const {driver, BasePage, logger} = require('./basePage');

const ageVerificationPageSelectors = {
    year: '#ageYear ',
    option: "option",
    openPage: 'span'
};

const optionText = '1900';
const openPageText = 'Открыть страницу';

class AgeVerificationPage extends BasePage {
    async setRandomDate() {
        logger.debug(`setRandomDate: Trying to set random date.`);
        await (await super.findElementByTextAndCss(ageVerificationPageSelectors.option, optionText)).click();
    }

    async enterGamePage() {
        logger.debug(`enterGamePage: Trying to enter game page.`);
        await (await super.findElementByTextAndCss(ageVerificationPageSelectors.openPage, openPageText)).click();
    }

    async isAtAgeVerification() {
        return (await driver.getCurrentUrl()).includes('agecheck') ? true : false;
    }

}

module.exports = {
    ageVerificationPage: new AgeVerificationPage(),
}