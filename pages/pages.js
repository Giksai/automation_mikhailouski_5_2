require('chromedriver');
const {Builder, By, Key} = require("selenium-webdriver");

const driver = new Builder()
        .forBrowser('chrome')
        .build();

afterAll(async () => {
    await driver.quit();
});

const resultsPage = {

    //Returns amount of results for "iTechArt" word search
    resultsAmount: async function() {
        let resultText = (await driver.findElement(By.id("resultStats")).getText()).split(" ");
        return parseInt(resultText[2] + resultText[3]);
    },

    //Returns searching time in milliseconds
    searchingTime: async function() {
        let dividedTimeText = (await driver.findElement(By.id("resultStats")).getText())
        .split(" ")[4]
        .replace("(", "")
        .split(",");

        //Converting (seconds,milliseconds) to (milliseconds)
        return parseInt(dividedTimeText[1]) + (parseInt(dividedTimeText[0]) * 1000);
    },

    //Returns array of each label's text
    labelsText: async function() {
        let labelsTextArray = [];
        let labels = (await driver.findElements(By.className("g")))
        for(const label of labels) {
            labelsTextArray.push(await label.getText());
        }
        return labelsTextArray;
    },

     //Advances to the next page when all results in the current page are processed
    nextPage: async function() {
        (await driver.findElement(By.xpath("//a[@class='pn']"))).click();
    },

    open: async function() {
        await driver.get('http://www.google.com');
        await driver.findElement(By.name("q")).sendKeys("iTechArt", Key.RETURN);
    }
}

module.exports = {
    resultsPage : resultsPage
}