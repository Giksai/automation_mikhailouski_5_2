const subjectToSearch = "Automation",
    deadlineName = "Срок его выполнения – ",
    deadlineEndName = ">",
    TOKEN_PATH = './token.json',
    SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'],
    messagesAmount = 2;



module.exports = {
    subjectToSearch: subjectToSearch,
    deadlineName: deadlineName,
    deadlineEndName: deadlineEndName,
    TOKEN_PATH: TOKEN_PATH,
    SCOPES: SCOPES,
    messagesAmount: messagesAmount
};