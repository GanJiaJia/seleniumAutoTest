const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function StockTransferList (driver) {

    const goStockTransferList =  async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/Warehouse/StockTransferList"]')), 22000);
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

    const Create = async () => {
        const create = await driver.findElement(By.xpath("//span[text()='Create StockTransferOrder']"))
        await create.click()

        await sleep(1000)

        const cont = await driver.findElement(By.className("ant-modal-content"))

        const reference = await cont.findElement(By.id("reference"))
        await reference.sendKeys(new Date()?.valueOf())

        const transferOutWarehouse = await cont.findElement(By.id("transferOutWarehouse"))
        await transferOutWarehouse.sendKeys("Syd-Head", Key.UP, Key.RETURN)

        const transferInWarehouse = await cont.findElement(By.id("transferInWarehouse"))
        await transferInWarehouse.sendKeys("Bne-Branch", Key.RETURN)

        const stockItem = await cont.findElement(By.name("stockItem"))
        await stockItem.sendKeys("Bendix-BBC4", Key.RETURN)

        await sleep(6000)

        const ol = await cont.findElement(By.className("search-stockItem-select-list"))
        const numberInput = await ol.findElement(By.className("ant-input-number-input"))
      
        const backspaceSeries = Array(4).fill(Key.BACK_SPACE).join('');
        await numberInput.sendKeys(backspaceSeries);
        await numberInput.sendKeys('1');

        const checkebox = await ol.findElement(By.className("ant-checkbox-input"))
        await checkebox.click()

        const addBtn = await ol.findElement(By.xpath("//button[text()='Add']"))
        await addBtn.click()

        await sleep(5000)

        const footer = await driver.findElement(By.className("ant-modal-footer"))
        const saveBtn = await footer.findElement(By.xpath("//span[text()='Save']"))
        await saveBtn.click()
        await sleep(5000)
    }

    const ViewAndEdit = async () => {
        const View = await driver.findElement(By.xpath("//span[text()='View']"))
        await View.click()

        await sleep(3500)
        await openModalAndClose()

        const Edit = await driver.findElement(By.xpath("//span[text()='Edit']"))
        await Edit.click()

        await sleep(2000)
        const EidtCont = await driver.findElement(By.className("ant-modal-content"))
        const EditBtn = await EidtCont.findElement(By.xpath("//span[text()='save']"))
        await EditBtn.click()

        await sleep(10000)

        const transition = await driver.findElement(By.xpath("//span[text()='Transaction']"))
        await transition.click()

        await sleep(3000)

        const transitionCont = await driver.findElement(By.className("transactions-modal-wrap"))
        const transitionDetail = await transitionCont.findElement(By.xpath("//span[text()='Detail']"))

        await transitionDetail.click()
        await sleep(3500)

        await openModalAndClose()
    }


    const ConfirmStockTransfer = async () => {
        const Confirm = await driver.findElement(By.xpath("//span[text()='Confirm']"))
        await Confirm.click()

        await sleep(1500)
        const OK = await driver.findElement(By.xpath("//span[text()='OK']"))
        await OK.click()

        await sleep(3000)
    }

    const Print = async () => {
        const Print = await driver.findElement(By.xpath("//span[text()='Print']"))
        await Print.click()
    }

    try {
        await goStockTransferList()
        await sleep(2000)

        // await Create()
        await ViewAndEdit()

        await sleep(1000)
        // await ConfirmStockTransfer()
        await Print()
        await sleep(2000)
      
    } catch (error) {
        console.log('warehouse-error', error)
        await openModalAndClose()
    }

}

module.exports = {
    StockTransferList
}
