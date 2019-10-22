const {Builder, By, Key} = require("selenium-webdriver"),
    chrome = require("chromedriver"),
    data = require("./data");

let driver = new Builder()
    .forBrowser('chrome')
    .build();



describe("Search results",() => {

    //Searches for "iTechArt"
    beforeAll(async () => {
        await driver.get('http://www.google.com');
        await driver.findElement(By.name("q")).sendKeys("iTechArt", Key.RETURN);
    }, 15000);

    //Quits chrome after all tests are done
    afterAll(() => {
        driver.quit();
    });

    //Checks if results amount is above given limit
    describe("amount should be", () => {
        it(`above given limit (${data.resultsBelowLimit})`, async () => {
            expect(await getResultsAmount() > data.resultsBelowLimit).toBe(true);
            console.log("Results amount: " + (await getResultsAmount()));
            console.log("Searching time (in milliseconds): " + (await getSearchingTime()));
        });
    });
    
    //Checks if result labels contains given word
    describe(`should contain '${data.searchWord}' word`, () => {

        //Advances to the next page when all results in the current page are processed
        afterEach(async () => {
            (await driver.findElement(By.xpath("//a[@class='pn']"))).click();
        });

        it("in the first page", async () => {
            (await getLabelsText()).forEach((text) => {
                expect(text.toLowerCase().includes(data.searchWord.toLowerCase())).toBe(true);
            });
        }, 10000);
        it("in the second page", async () => {
            (await getLabelsText()).forEach((text) => {
                expect(text.toLowerCase().includes(data.searchWord.toLowerCase())).toBe(true);
            });
        }, 10000);
    });
});

//Returns amount of results for "iTechArt" word search
async function getResultsAmount() {
    let resultText = (await driver.findElement(By.id("resultStats")).getText()).split(" ");
    return parseInt(resultText[2] + resultText[3]);
}
//Returns searching time in milliseconds
async function getSearchingTime() {
    let dividedTimeText = (await driver.findElement(By.id("resultStats")).getText())
        .split(" ")[4]
        .replace("(", "")
        .split(",");

    //Converting (seconds,milliseconds) to (milliseconds)
    return parseInt(dividedTimeText[1]) + (parseInt(dividedTimeText[0]) * 1000);
}

//Returns array of each label's text
async function getLabelsText() {
    let labelsTextArray = [];
    let labels = (await driver.findElements(By.xpath("//div[@class='rc']/div[@class='r']/a/h3")))
    for(let i = 0; i < labels.length; i++) {
        labelsTextArray.push(await labels[i].getText());
    }
    return labelsTextArray;
}

//Waits 10 seconds until given element appears
function waitForElement(locator) {
    return (new WebDriverWait(driver, 10))
        .until(ExpectedConditions.presenceOfElementLocated(
                locator));
}