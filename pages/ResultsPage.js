const {By, Key} = require("selenium-webdriver"),
    {driver, Page} = require("./basePage"),
    log4js = require("../config/loggerConfigurator");

let logger = log4js.getLogger("default");

class ResultsPage extends Page {

    //Returns amount of results for "iTechArt" word search
    async resultsAmount() {
        logger.debug("resultsAmount: getting results amount text");
        let resultText = (await driver.findElement(By.id("resultStats")).getText()).split(" ");
        logger.debug("resultsAmount: parsing text to number");
        return parseInt(resultText[2] + resultText[3]);
    }

    //Returns searching time in milliseconds
    async searchingTime() {
        logger.debug("searchingTime: getting and splitting search time text");
        let dividedTimeText = (await driver.findElement(By.id("resultStats")).getText())
        .split(" ")[4]
        .replace("(", "")
        .split(",");

        //Converting (seconds,milliseconds) to (milliseconds)
        logger.debug("searchingTime: converting acquired to milliseconds");
        return parseInt(dividedTimeText[1]) + (parseInt(dividedTimeText[0]) * 1000);
    }

    //Returns array of each label's text
    async labelsText() {
        let labelsTextArray = [];
        logger.debug("labelsText: getting all results blocks");
        let labels = (await driver.findElements(By.className("g")))
        logger.debug("labelsText: pushing each block's text into array");
        for(const label of labels) {
            labelsTextArray.push(await label.getText());
        }
        return labelsTextArray;
    }

     //Advances to the next page when all results in the current page are processed
    async nextPage() {
        logger.debug("nextPage: pressing next page button");
        (await driver.findElement(By.xpath("//a[@class='pn']"))).click();
    }

    async open() {
        logger.debug("open: opening google start page");
        await super.open('http://www.google.com');
        logger.debug("open: entering 'iTechArt' into search field and then pressing search button");
        await driver.findElement(By.name("q")).sendKeys("iTechArt", Key.RETURN);
    }

    async close() {
        logger.debug("close: closing page");
        await super.close();
    }
}

module.exports = ResultsPage;