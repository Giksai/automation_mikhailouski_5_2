const data = require("./data"),
    resultsPage = require("../pages/pages").resultsPage;


afterAll(async () => {
    await resultsPage.close();
});

describe("Search results",() => {

    beforeAll(async () => {
        await resultsPage.open();
    }, 15000);
    
    //Checks if results amount is above given limit
    describe("amount should be", () => {
        it(`above given limit (${data.resultsBelowLimit})`, async () => {
            expect(await resultsPage.resultsAmount()).toBeGreaterThan(data.resultsBelowLimit);
            
            console.log("Results amount: " + (await resultsPage.resultsAmount()));
            console.log("Searching time (in milliseconds): " + (await resultsPage.searchingTime()));
        });
    });
    
    //Checks if result labels contains given word
    describe(`should contain '${data.searchWord}' word`, () => {

        //Advances to the next page when all results in the current page are processed
        afterEach(async () => {
            await resultsPage.nextPage();
        });

        it("in the first page", async () => {
            for(const labelText of await resultsPage.labelsText()) {
                expect(labelText.toLowerCase()).toContain(data.searchWord.toLowerCase());
            }
        }, 10000);
        it("in the second page", async () => {
            for(const labelText of await resultsPage.labelsText()) {
                expect(labelText.toLowerCase()).toContain(data.searchWord.toLowerCase());
            }
        }, 10000);
    });
});


