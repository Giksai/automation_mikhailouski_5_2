const logger = require('../logger/loggerConfigurator').getLogger('default'),
    {startingPage, genreElementSelectors, genreMenuSelectors} = require('../pages/startingPage'),
    {actionPage, actionPageSelectors} = require('../pages/actionPage'),
    {gamePage, gamePageSelectors} = require('../pages/gamePage'),
    {ageVerificationPage} = require('../pages/ageVerificationPage'),
    {steamPage} = require('../pages/steamPage');


jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;

describe('Steam store ', () => {
    afterAll(async () => {
        await startingPage.close();
    });
    logger.info('starting main describe block');

    it('prices or discounts must be the same as in the trending section',async () => {
        logger.info('Starting discount/price check.');
        logger.info('Opening starting page.');
        await startingPage.open();
        logger.info('Opening action page.');
        await startingPage.navigateTo(genreMenuSelectors.games, genreElementSelectors.action);
        logger.info('Trying to find maximum discount.');
        const maxDiscount = await actionPage.getMaxDiscountOrPriceValue(actionPageSelectors.discountBlockSelector);
        if(!maxDiscount) {
            logger.info(`Have not found any discounts, trying to find maximum price instead.`);
            const maxPrice = await actionPage.getMaxDiscountOrPriceValue(actionPageSelectors.priceBlockSelector);
            logger.info(`Got max price value of ${maxPrice}.`);
            await actionPage.navigateToGameWithDiscountOrPriceValue(actionPageSelectors.priceBlockSelector, maxPrice);
            await checkAgeVerification();
            expect(await gamePage.getPriceOrDiscount(gamePageSelectors.price)).toEqual(maxPrice);
        } else {
            logger.info(`Got max discount value of ${maxDiscount}%.`);
            await actionPage.navigateToGameWithDiscountOrPriceValue(actionPageSelectors.discountBlockSelector, maxDiscount);
            await checkAgeVerification();
            expect(await gamePage.getPriceOrDiscount(gamePageSelectors.discount)).toEqual(maxDiscount);
        }
        logger.info('Ending discount/price check.');
    });

    it('binary file must download correctly',async () => {
        logger.info(`Starting file download section.`);
        await steamPage.open();
        await steamPage.pressDownloadButton();
        expect(await steamPage.waitForFileToDownload()).toEqual(true);
        logger.info(`Ending file download section.`);
    });
    logger.info('Ending main describe block.');
});

async function checkAgeVerification() {
    if(await ageVerificationPage.isAtAgeVerification()) {
        await ageVerificationPage.setRandomDate();
        await ageVerificationPage.enterGamePage();
    }
}
