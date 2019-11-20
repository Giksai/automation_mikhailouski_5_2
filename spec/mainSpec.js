const data = require("./data"),
    ResultsPage = require("../pages/ResultsPage");

var RPage = new ResultsPage();

afterAll(async () => {
    await RPage.close();
});

describe("Search results",() => {

    beforeAll(async () => {
        await RPage.open();
    }, 15000);
    
    //Checks if results amount is above given limit
    describe("amount should be", () => {
        it(`above given limit (${data.resultsBelowLimit})`, async () => {
            expect(await RPage.resultsAmount()).toBeGreaterThan(data.resultsBelowLimit);
            
            console.log("Results amount: " + (await RPage.resultsAmount()));
            console.log("Searching time (in milliseconds): " + (await RPage.searchingTime()));
        });
    });
    
    //Checks if result labels contains given word
    describe(`should contain '${data.searchWord}' word`, () => {

        //Advances to the next page when all results in the current page are processed
        afterEach(async () => {
            await RPage.nextPage();
        });

        it("in the first page", async () => {
            for(const labelText of await RPage.labelsText()) {
                expect(labelText.toLowerCase()).toContain(data.searchWord.toLowerCase());
            }
        }, 10000);
        it("in the second page", async () => {
            for(const labelText of await RPage.labelsText()) {
                expect(labelText.toLowerCase()).toContain(data.searchWord.toLowerCase());
            }
        }, 10000);
    });
});


