const {Order} = require('./pages/Order/Order')
const { AutoCommenceConfig } = require("./pages/Order/AutoCommenceConfig")
const { Purchasing } = require("./pages/Purchasing")

const {Builder, By, until} = require("selenium-webdriver")

const fs = require("fs");
const chrome = require('selenium-webdriver/chrome');

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

const addInfo = (info) => {
    info = info || ''
    fs.appendFile('info.txt', `\n${info}`, function(err, fd) {
        if (err) {
            return console.error(err);
        }
     });
}

const loginAdminPortal = async (driver) => {
    fs.access("info.txt", fs.constants.F_OK, (err) => {
        if (!err) {
            addInfo()
        }
    })

    // 导航到一个网页.
    await driver.get('https://adminportal.super10.com.au');
    await driver.manage().setTimeouts({implicit: 2000});

    let Username = await driver.findElement(By.name('Username'));
    let Password = await driver.findElement(By.name('Password'));
    let button = await driver.findElement(By.name('button'));
    // 登录
    await Username.sendKeys('ganjia');
    await Password.sendKeys('Ganjia.2023');
    await button.click();
    addInfo("userName: ganjia login Success")
   
    // 请求 浏览器信息 
    let title = await driver.getTitle();

    addInfo("title is adminPortal")

     return new Promise((resolve, reject) => {
        resolve(driver)
     }) 
}

// 切换语言
const selectLanguage = async (driver) => {


    try {
        let anticon = await driver.wait(until.elementLocated(By.className('anticon')), 5000);
        // let anticon = await driver.executeScript("return document.querySelector('.anticon')");
        anticon && anticon.click();

        let element = await driver.wait(until.elementLocated(By.xpath('//li[contains(data-menu-id, "en-US")]')), 20000);
        // element && element.click();
        // let look = await driver.wait(until.elementLocated(By.xpath('//span[data-menu-id="English"]')), 300);
        // let look = await driver.executeScript(`return document.querySelector('span[aria-label="English"]')`);
        
    } catch (error) {
        console.log('error', error)
    }
    return new Promise((resolve, reject) => {
        resolve(driver)
     }) 
}

// 切换外观
const switchLook = async (driver) => {

    // let element = await driver.executeScript("return document.getElementById('yourElementId');");
    // let element = await driver.wait(until.elementLocated(By.id('yourElementId')), 10000);
    try {
        // let parent = await driver.findElement(By.className('top-switch-wrap'));
        let parent = await driver.wait(until.elementLocated(By.className('top-switch-wrap')), 8000);
        let look = await parent.findElement(By.css('button'));
        look && look.click()
    } catch (error) {
        console.log('error', error)
    }
    return new Promise((resolve, reject) => {
        resolve(driver)
     }) 
}

const doAutoTest = async () => {
    try {
        let options = new chrome.Options();
        options.addArguments('--lang=en');
        // options.addArguments('headless'); // 添加无头参数
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--window-size=full');

        let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        await loginAdminPortal(driver)
        // await Order(driver)
        // await AutoCommenceConfig(driver)
        await Purchasing(driver)
        await sleep(5000)
        
        await driver.quit()
    } catch (error) {
        console.error("root-error", error)
    }
}

doAutoTest()

module.exports = {
    sleep
}