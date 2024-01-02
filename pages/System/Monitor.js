const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function Monitor (driver) {

    const goMonitor = async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/system"]')), 20000);
            element && element.click()
        } catch (error) {
            console.error('goMonitor', error)
        }

        await sleep(2000)
    }

    try {
        await goMonitor()
        await sleep(4000)
     
    } catch (error) {
        console.log(arguments.callee?.name, error)
        // await openModalAndClose()
    }
  
}

module.exports = {
    Monitor
}
