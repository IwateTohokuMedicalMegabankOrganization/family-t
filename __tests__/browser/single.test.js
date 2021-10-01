// const fs = require('fs');
// const script = require('jest');

// const { promisify } = require('util');
// const webdriver = require('selenium-webdriver');
// const { Builder, By, until } = webdriver;

// const capabilities = webdriver.Capabilities.chrome();
// capabilities.set('chromeOptions', {
//     args: [
//         '--headless',
//         '--no-sandbox',
//         '--disable-gpu',
//         `--window-size=1980,1200`
//     ]
// });

// test('it performs a validation of the search box on the page', (async () => {

//     const driver = await new Builder().withCapabilities(capabilities).build();

//     await driver.get('http://family-t.tkb.mss.co.jp/develop/html/index.html');

//     await driver.wait(until.elementLocated(By.id('download-button')), 10000);

//     let base64 = await driver.takeScreenshot();
//     let buffer = Buffer.from(base64, 'base64');
//     await promisify(fs.writeFile)('screenshot.jpg', buffer);

//     driver.quit();
// }));