const log4js = require("../config/loggerConfigurator"),
    googleApi = require("../google/googleAPI"),
    data = require("../google/data");

const logger = log4js.getLogger("default");

beforeAll(async () => {
    logger.info("Starting tests");
});

afterAll(async () => {
    logger.info("All tests are done, exiting");
});

//Main describe
describe("Gmail messages ",() => {

    //Messages amount test
    it(`amount should not be greater than ${data.messagesAmount}`,async () => {
        logger.info("Starting messages amount test");
        expect(await googleApi.getMessagesAmount()).toEqual(data.messagesAmount);
        logger.info("Messages amount test completed");
    }, 30000);

    //Subject's contents check
    it(`should include subject with content: ${data.subjectToSearch}`,async () => {
        logger.info("Starting subject check test");
        for(let msg of (await googleApi.getAllMessages())) {

            //Getting message info
            const subject = await googleApi.getMessageSubject(msg.id);
            const deadline = await googleApi.getMessageDeadline(msg.id);
            const body = await googleApi.getMessageBody(msg.id);
            expect(subject).toContain(data.subjectToSearch);

            //Printing message info
            logger.info(`Задание: ${subject}. Срок выполнения: ${deadline} \n
            Тело письма: \n
            ${body}`);
        }
        logger.info("Subject check test completed");
    }, 30000);

});