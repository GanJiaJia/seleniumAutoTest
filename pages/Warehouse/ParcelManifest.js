const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function ParcelManifest (driver) {

    const goParcelManifest =  async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/Warehouse/ParcelManifest"]')), 22000);
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
        await goParcelManifest()
        await sleep(2000)
        
        // const createBtn = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'Create ParcelManifest')]")), 20000)
        // await createBtn?.click()

        // await sleep(2000)

        const modalCont = await driver.findElement(By.className("ant-modal-content"))
        const okBtn = await modalCont.findElement(By.className("ant-btn-primary"))
        await okBtn.click()

        await sleep(5000)

        const closeNotice = await driver.findElement(By.className("ant-notification-notice-close"))
        if (closeNotice) {
            await closeNotice?.click()
        }

        await openModalAndClose()

        const exportBtn = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'Export Manifest')]")), 20000)
        await exportBtn.click()

        await sleep(3000)
        await openModalAndClose()

    } catch (error) {
        console.log('warehouse-error', error)
        await openModalAndClose()
    }

}

module.exports = {
    ParcelManifest
}
