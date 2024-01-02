const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function WarehouseClient (driver) {

    const goWarehouseClient =  async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/Warehouse/WarehouseClient"]')), 22000);
            element && element.click()
        } catch (error) {
            console.error('goPurchasing', error)
        }

        await sleep(1000)
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
        await goWarehouseClient()
        await sleep(3000)

        const edit = await driver.findElement(By.xpath("//span[text()='Edit']"))
        await edit.click()

        await sleep(1000)

        const cont = await driver.findElement(By.className("ant-modal-content"))
        const save = await cont.findElement(By.className("ant-btn-primary"))

        await save.click()

    } catch (error) {
        console.log('warehouse-error', error)
        await openModalAndClose()
    }

}

module.exports = {
    WarehouseClient
}
