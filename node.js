const {Builder, By, Key, until} = require('selenium-webdriver'),
    chrome = require('chromedriver');

//Entry point
(async function main() {
    
    //Initializing chrome driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        //Going to onliner website
        await driver.get("https://www.onliner.by/");

        //Configuring implicit waits
        driver.manage().setTimeouts({ implicit: 1000, pageLoad: 2000, script: 2000 });

        //Finding selectors
        let selectors = [
           await driver.findElement(By.id("navigation-sidebar")).getTagName(),
           await driver.findElement(By.name("viewport")).getTagName(),
           await driver.findElement(By.className("header-style__toggle")).getTagName(),
           await driver.findElement(By.tagName("body")).getTagName(),
           //By.linkText function cannot find elements when trying to search for russian text in an "a" tag
           //This selector will find the first link with an empty text in it
           await driver.findElement(By.linkText("")).getTagName(),
           await driver.findElement(By.partialLinkText("")).getTagName(),
           await driver.findElement(By.css("a.icon-rss")).getTagName(),
        ];

        //Printing each found selector's tag
        selectors.forEach((element, index) => {
            console.log(`${index}: ${element};`);
        });

    } finally {
        driver.quit();
    }

})();