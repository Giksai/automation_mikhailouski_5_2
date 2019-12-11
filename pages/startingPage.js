const {driver, BasePage} = require('./basePage'),
    {By} = require('selenium-webdriver');

const selectors = {
    genreId: 'genre_tab',

};

class StartingPage extends BasePage {

    async goToAction1() {
        await driver.findElement(By.css("a[href^='https://store.steampowered.com/tags/en/Action/']")).click;
    }
    async goToAction2() {
        await driver.findElement(
            {
                className: 'gutter_item',
                arguments: 'href=https://store.steampowered.com/tags/en/Action/?snr=1_4_4__125'
            }
        ).click();
    }
    async goToAction3() {
        let foundElements = await driver.findElements(By.className('gutter_item'));
        console.log('Length: ' + foundElements.length);
        for(let element of foundElements) {
            console.log("Text: " + (await element.getText()));
            if((await element.getText()).includes('Action')
            || (await element.getText()).includes('Экшен')) {
                console.log('Found button!');
                await element.click();
            }
        }
    }

    async getHeaderText() {
        return await driver.findElement(By.className('pageheader')).getText();
    }

}

module.exports = {
    startingPage: new StartingPage(),
    selectors: selectors
}