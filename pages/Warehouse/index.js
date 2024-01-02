const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function Warehouse (driver) {

    const goWarehouse= async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/Warehouse"]')), 20000);
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
        await goWarehouse()

        const DownloadLabel = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'Download Label')]")), 20000)
        await DownloadLabel?.click()

        await sleep(2000)

        const ViewJSON = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'View JSON')]")), 20000)
        await ViewJSON.click()

        await sleep(3000)

        await openModalAndClose()

        // const Download = driver.findElement(By.linkText("Download"))
        // await Download.click()

        // const InfoWrap = await driver.findElement(By.className("3Info-wrap"))
        // const trackingNumber = await InfoWrap.findElement(By.tagName('a'))
        // await trackingNumber.click()

    } catch (error) {
        console.log('warehouse-error', error)
    }

}

module.exports = {
    Warehouse
}
