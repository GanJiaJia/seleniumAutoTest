const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function CompareCourierCharge (driver) {

    const goCompareCourierCharge=  async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/Warehouse/CompareCourierCharge"]')), 22000);
            element && element.click()
        } catch (error) {
            console.error('goPurchasing', error)
        }

        await sleep(3000)
    }

    const openModalAndClose = async () => {
        await sleep(1000)
        try {
            const modalContent = await driver.wait(until.elementLocated(By.className('ant-modal-content')), 20000);
            const closeBtn = await driver.wait(until.elementIsVisible(modalContent.findElement(By.className('ant-modal-close'))), 10000);
            if (closeBtn) {
                await sleep(5000)
                await closeBtn.click()
            }
        } catch (error) {
            console.error("openModalAndClose", error)
        }
    }

    try {
        await goCompareCourierCharge()
        await sleep(3000)

        const postCode = await driver.findElement(By.id("postalCode"))
        await postCode.sendKeys("2146");

        const searchBtn = await driver.findElement(By.className("ant-btn-primary"))
        await searchBtn.click()

        await sleep(10000)
       

    } catch (error) {
        console.log('warehouse-error', error)
        await openModalAndClose()
    }

}

module.exports = {
    CompareCourierCharge
}
