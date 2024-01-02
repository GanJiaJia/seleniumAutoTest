const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function Purchasing (driver) {

    const goPurchasing = async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/purchasing"]')), 20000);
            element && element.click()
        } catch (error) {
            console.error('goPurchasing', error)
        }

        await sleep(2000)
    }

    const viewItemsFn = async () => {
        try {
 
            let element = await driver.wait(until.elementLocated(By.xpath('//a[text()="Items"]')), 20000);
            
            await element.click()

            await sleep(2000)

            // const internalComments = await modalContent.findElement(By.id("internalComments"))
            // await internalComments.sendKeys("auto test")

            // const saveComments = await modalContent.findElement(By.xpath('//span[text()="Save Comments"]'))
            // await saveComments.click()

            // await sleep(2000)

            // const printItemsLabel = await modalContent.findElement(By.xpath('//span[text()="Print items label"]'))
            // await printItemsLabel.click()
            await openModalAndClose()

        } catch (error) {
            console.error('viewItemsFn', error)
            await openModalAndClose()
        }
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

    const viewOptionsBtn = async () => {

       try {
            let syncPO = await driver.wait(until.elementLocated(By.xpath('//span[text()=" SyncPO"]')), 20000);
            await syncPO.click()
            await sleep(5000)
            await openModalAndClose();

            let ExistedPO = await driver.wait(until.elementLocated(By.xpath('//span[text()=" ExistedPO"]')), 20000);
            await ExistedPO.click()
            await sleep(5000)
            await openModalAndClose();

            let  All_PO_Items = await driver.wait(until.elementLocated(By.xpath('//span[text()=" All PO Items"]')), 20000);
            await All_PO_Items.click()
            await sleep(5000)
            await openModalAndClose();

       } catch (error) {
            console.error("viewOptionsBtn", err)
       }
    } 

    const createPuchase = async () => {
       try {
         
            await sleep(3000)
            let createBtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Create PurchaseOrder')]")), 20000);
            // const createBtn  = await toolBar.findElement(By.xpath("//button[contains(text(),'Create PurchaseOrder')]"));
            await createBtn.click()

            await sleep(6000)
            let warehouse = await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div/div[1]/div/div/div[2]/div/div/div/div/span[1]/input")), 20000);
            await warehouse.sendKeys("SYD-HEAD")
            await sleep(3000)
            // const warehouseId_list_0 = await driver.wait(until.elementLocated(By.className("ant-select-item-option-active")), 20000)
            const warehouseId_list_0 = await driver.wait(until.elementLocated(By.xpath('(//div[@title="SYD-HEAD"])')), 20000)
            await warehouseId_list_0.click()

            const Supplier = await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div/div[2]/div/div/div[2]/div/div/div/div/span[1]/input")), 20000)
            await Supplier.sendKeys("SAKURA")
            await sleep(5000)        

            const Supplier_0 = await driver.findElement(By.xpath('(//div[@title="SAKURA"])'));
            // const Supplier_0 = await driver.wait(until.elementLocated(By.className("ant-select-item-option-active")), 20000)
            await Supplier_0.click()

            const syndBtn = await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div/div[3]/div/div/div/div[2]/div/div[2]/div/div/button"))
            await syndBtn.click()

            const modalCont = await driver.wait(until.elementLocated(By.className("ant-modal-content")))

            const PurchasingGuid = await modalCont.findElement(By.id("purchaseOrderGuid"))
            await PurchasingGuid.sendKeys(`autoTest-${new Date()?.valueOf()}`)

            const OrderDate = await modalCont.findElement(By.id("orderDate"))
            await OrderDate.click();
            await OrderDate.sendKeys(new Date()?.toLocaleDateString()?.replace(/\//g, '-'), Key.RETURN)
            await sleep(2000)

            const ExpectedDeliveryDate = await driver.findElement(By.id("expectedDeliveryDate"))
            await ExpectedDeliveryDate.click()

            await ExpectedDeliveryDate.sendKeys(new Date()?.toLocaleDateString()?.replace(/\//g, '-'), Key.RETURN)
            await sleep(2000)
         
            // const footer = await driver.findElement(By.className("ant-modal-footer"))
            // const cancelBtn = await footer.findElement(By.xpath('//span[text()="Cancel"]'))
            // await cancelBtn.click()

            const saveBtn = await driver.findElement(By.xpath('//span[text()="Save & Close"]'))
            await saveBtn.click()

            await sleep(8000)

            let supplierConfirm = await driver.wait(until.elementLocated(By.xpath('//span[text()="Supplier Confirm"]')), 20000);
            if (supplierConfirm) {
                await supplierConfirm.click()
                await sleep(3000)
            }

       } catch (error) {
            console.error("createPuchase", createPuchase)
            const closeViewBtn = await driver.wait(until.elementIsVisible(driver.findElement(By.className('ant-modal-close'))), 10000);
            if (closeViewBtn) {
                await sleep(5000);
                await closeViewBtn.click()
            }
       }
    }

    const editFn = async () => {
        try {

            const firstTr = await driver.wait(until.elementLocated(By.className('ant-table-row')), 20000)
            
            const dropdownBtn =  firstTr.findElement(By.className('ant-dropdown-trigger'))
            // const dropdownBtn =   await driver.wait(until.elementLocated(By.className('ant-dropdown-trigger')), 20000)
            // await driver.executeScript("arguments[0].hover();", dropdownBtn);
            await dropdownBtn.click()
            await sleep(1500)

            // ant-table-row 
            const editBtn = await driver.wait(until.elementLocated(By.xpath('//span[text()="Edit"]')), 20000)
            await editBtn.click();

            await sleep(1000)

            const modalFooter = await driver.wait(until.elementLocated(By.className("ant-modal-footer")), 20000)
            const saveBtn = await modalFooter.findElement(By.className("ant-btn-primary"))
            
            await sleep(1000)
            await saveBtn.click()

        } catch (error) {
            await openModalAndClose()
        }
    }

    await goPurchasing()
    await viewOptionsBtn()
    // await createPuchase()
    await viewItemsFn()
    await editFn() 
}

module.exports = {
    Purchasing
}
