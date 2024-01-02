const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function OrderTracking (driver) {

    const goOrderTracking = async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/system/order"]')), 20000);
            element && element.click()
        } catch (error) {
            console.error('goOrderTracking', error)
        }

        await sleep(2000)
    }

    try {
        await goOrderTracking()
        await sleep(4000)
     
    } catch (error) {
        console.log(arguments.callee?.name, error)
        await openModalAndClose()
    }
  
}

module.exports = {
    OrderTracking
}
