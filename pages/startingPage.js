const {BasePage, logger} = require('./basePage');

const genreMenuSelectors = {
    games: 'div#genre_tab'
};
const genreElementSelectors = {
    action: 'Экшен'
};
const privateSelectors = {
    menuItems: '.popup_menu_item'
};
const storeLink = 'https://store.steampowered.com/';

class StartingPage extends BasePage {
    async navigateTo(genreMenuSelector, genreElementSelector) {
        logger.debug(`navigateTo: Trying to navigate to ${genreElementSelector}.`);
        await super.hoverOverElement(genreMenuSelector);
        await (await super.findElementByTextAndCss(privateSelectors.menuItems, genreElementSelector)).click();
        logger.debug(`navigateTo: Navigated successfully.`);
    }

    async open() {
        await super.open(storeLink);
    }

}

module.exports = {
    startingPage: new StartingPage(),
    genreMenuSelectors: genreMenuSelectors,
    genreElementSelectors: genreElementSelectors
}