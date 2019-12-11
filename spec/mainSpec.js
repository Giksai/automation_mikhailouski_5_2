const data = require('./data'),
    logger = require('../logger/loggerConfigurator').getLogger('default'),
    {startingPage, selectors} = require('../pages/startingPage');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;

describe('main', () => {
    afterAll(async () => {
        await startingPage.close();
    });

    logger.info('starting main describe block');
    it('it',async () => {
        logger.info('Starting main It block...');
        logger.info('Opening starting page.');
        await startingPage.open('https://store.steampowered.com/');
        logger.info('Opening action page.');
        await startingPage.goToAction3();
        logger.info('Opened action page.');
        expect(await startingPage.getHeaderText()).toContain('Browsing Action');
        logger.info('Ending main it block');
    });
    logger.info('Ending main describe block');
});
