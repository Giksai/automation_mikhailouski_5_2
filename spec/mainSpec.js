const data = require("./data"),
    ResultsPage = require("../pages/ResultsPage"),
    log4js = require("../config/loggerConfigurator");


let RPage = new ResultsPage();

let logger = log4js.getLogger("default");

afterAll(async () => {
    logger.info("All tests are completed, exiting");
    await RPage.close();
});

describe("Search results",() => {

    beforeAll(async () => {
        logger.info("Opening Results page");
        await RPage.open();
    }, 15000);
    
    //Checks if results amount is above given limit
    describe("amount should be", () => {
        it(`above given limit (${data.resultsBelowLimit})`, async () => {
            logger.info("Starting results amount check");
            expect(await RPage.resultsAmount()).toBeGreaterThan(data.resultsBelowLimit);
            
            console.log("Results amount: " + (await RPage.resultsAmount()));
            console.log("Searching time (in milliseconds): " + (await RPage.searchingTime()));
            logger.info("Results amount check has ended");
        });
    });
    
    //Checks if result labels contains given word
    describe(`should contain '${data.searchWord}' word`, () => {
        logger.info("Starting results page check");
        //Advances to the next page when all results in the current page are processed
        afterEach(async () => {
            logger.info("Advancing to the next page");
            await RPage.nextPage();
        });

        it("in the first page", async () => {
            logger.info("Starting results page check on the first page");
            for(const labelText of await RPage.labelsText()) {
                expect(labelText.toLowerCase()).toContain(data.searchWord.toLowerCase());
            }
            logger.info("Results check of the first page has ended");
        }, 10000);
        it("in the second page", async () => {
            logger.info("Starting results page check on the second page");
            for(const labelText of await RPage.labelsText()) {
                expect(labelText.toLowerCase()).toContain(data.searchWord.toLowerCase());
            }
            logger.info("Results check of the second page has ended");
        }, 10000);
    });
});


