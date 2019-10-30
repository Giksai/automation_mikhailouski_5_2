const {By, Key} = require("selenium-webdriver"),
    {driver, Page} = require("./basePage");

class ResultsPage extends Page {

    //Returns amount of results for "iTechArt" word search
    async resultsAmount() {
        let resultText = (await driver.findElement(By.id("resultStats")).getText()).split(" ");
        return parseInt(resultText[2] + resultText[3]);
    }

    //Returns searching time in milliseconds
    async searchingTime() {
        let dividedTimeText = (await driver.findElement(By.id("resultStats")).getText())
        .split(" ")[4]
        .replace("(", "")
        .split(",");

        //Converting (seconds,milliseconds) to (milliseconds)
        return parseInt(dividedTimeText[1]) + (parseInt(dividedTimeText[0]) * 1000);
    }

    //Returns array of each label's text
    async labelsText() {
        let labelsTextArray = [];
        let labels = (await driver.findElements(By.className("g")))
        for(const label of labels) {
            labelsTextArray.push(await label.getText());
        }
        return labelsTextArray;
    }

     //Advances to the next page when all results in the current page are processed
    async nextPage() {
        (await driver.findElement(By.xpath("//a[@class='pn']"))).click();
    }

    async open() {
        await super.open('http://www.google.com');
        await driver.findElement(By.name("q")).sendKeys("iTechArt", Key.RETURN);
    }

    async close() {
        await super.close();
    }
}

module.exports = ResultsPage;