const {By, Key} = require("selenium-webdriver"),
    {Page} = require("./basePage");

let driver;

//Data:
const nextPageButton = "//a[@class='pn']";
const searchBoxName = "q";
const searchFor = "iTechArt";
const googleAdress = 'http://www.google.com';
const labelsClassName = "g";
const searchResultsLabelId = "resultStats";

class ResultsPage extends Page {

    async initializeDriver() {
        driver = await super.getDriver();
    }
    //Returns amount of results for "iTechArt" word search
    async resultsAmount() {
        let resultText = (await driver.findElement(By.id(searchResultsLabelId)).getText()).split(" ");
        return parseInt(resultText[2] + resultText[3]);
    }

    //Returns searching time in milliseconds
    async searchingTime() {
        let dividedTimeText = (await driver.findElement(By.id(searchResultsLabelId)).getText())
        .split(" ")[4]
        .replace("(", "")
        .split(",");

        //Converting (seconds,milliseconds) to (milliseconds)
        return parseInt(dividedTimeText[1]) + (parseInt(dividedTimeText[0]) * 1000);
    }

    //Returns array of each label's text
    async labelsText() {
        let labelsTextArray = [];
        let labels = (await driver.findElements(By.className(labelsClassName)))
        for(const label of labels) {
            labelsTextArray.push(await label.getText());
        }
        return labelsTextArray;
    }

     //Advances to the next page when all results in the current page are processed
    async nextPage() {
        (await driver.findElement(By.xpath(nextPageButton))).click();
    }

    async open() {
        await super.open(googleAdress);
        await driver.findElement(By.name(searchBoxName)).sendKeys(searchFor, Key.RETURN);
    }

    async close() {
        await super.close();
    }
}

module.exports = ResultsPage;