const {Builder, By, until} = require("selenium-webdriver")

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

            const modalContent = await driver.wait(until.elementLocated(By.className('ant-modal-content')), 20000);

            const comments = await modalContent.findElement(By.id("comments"))
            await comments.clear()
            await comments.sendKeys("auto test")

            await sleep(1000)

            const internalComments = await modalContent.findElement(By.id("internalComments"))
            await internalComments.clear()
            await internalComments.sendKeys("auto test")

            const saveComments = await modalContent.findElement(By.xpath('//span[text()="Save Comments"]'))
            await saveComments.click()

            await sleep(2000)

            const printItemsLabel = await modalContent.findElement(By.xpath('//span[text()="Print items label"]'))
            await printItemsLabel.click()

            const closeBtn = await driver.wait(until.elementIsVisible(driver.findElement(By.className('ant-modal-close'))), 10000);

            if (closeBtn) {
                 await sleep(5000)
                await closeBtn.click()
            }

        } catch (error) {
            console.error('viewItemsFn', error)
        }
    }

    const openModalAndClose = async () => {
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
            await sleep(1000)
            await openModalAndClose();

            let ExistedPO = await driver.wait(until.elementLocated(By.xpath('//span[text()=" ExistedPO"]')), 20000);
            await ExistedPO.click()
            await sleep(1000)
            await openModalAndClose();

            let  All_PO_Items = await driver.wait(until.elementLocated(By.xpath('//span[text()=" All PO Items"]')), 20000);
            await All_PO_Items.click()
            await sleep(1000)
            await openModalAndClose();

       } catch (error) {
            console.error("viewOptionsBtn", err)
       }
    } 

    const createPuchase = async () => {
       try {
         
            const toolBar = await driver.wait(until.elementLocated(By.partialLinkText("ant-pro-table-list-toolbar-right")), 20000);
            const createBtn = await toolBar.findElement(By.xpath("button[4]"))
            await createBtn.click()


            // let supplierConfirm = await driver.wait(until.elementLocated(By.xpath('//span[text()="Supplier Confirm"]')), 20000);
            // if (supplierConfirm) {
            //     await supplierConfirm.click()
            //     await sleep(3000)
            // }

       } catch (error) {
            console.err("createPuchase", createPuchase)
       }
    }

    const editFn = async () => {
        try {
            // ant-table-row 
            const editBtn = await driver.wait(until.elementLocated(By.xpath('//span[text()="Edit"]')), 20000)
            await editBtn.click();

            await sleep(1000)

            const modalCont = await driver.wait(until.elementLocated(By.className("ant-modal-content")), 20000)
            const realName = await modalCont.findElement(By.id("realName"))
            await driver.executeScript("arguments[0].value = '';", realName);
            await realName.sendKeys("realName")

            await sleep(500)

            const companyName = await modalCont.findElement(By.id("companyName"))
            await driver.executeScript("arguments[0].value = '';", companyName);
            await companyName.sendKeys("companyName")

            const abn = await modalCont.findElement(By.id("abn"))
            await driver.executeScript("arguments[0].value = '';", abn);
            await abn.sendKeys("abn")

            const acn = await modalCont.findElement(By.id("acn"))
            await driver.executeScript("arguments[0].value = '';", acn);
            await acn.sendKeys("acn")

            try {
                const state = await modalCont.findElement(By.className("ant-select-selection-item"))
                await driver.wait(until.elementIsEnabled(state), 5000);
                await state.click();

                await sleep(1500)

                const selectDropDown = await driver.wait(until.elementLocated(By.xpath('//div[text()="NSW"]')), 5000)
                await selectDropDown.click();
    
           } catch (error) {
                console.log('error', error)
           }

            const suburb = await modalCont.findElement(By.id("suburb"))
            await driver.executeScript("arguments[0].value = '';", suburb);
            await suburb.sendKeys("suburb")

            const postcode = await modalCont.findElement(By.id("postcode"))
            await driver.executeScript("arguments[0].value = '';", postcode);
            await postcode.sendKeys(parseInt(Math.random() * 10000))

            await sleep(1000)

            const accountManager = await modalCont.findElement(By.id("accountManager"))
            await driver.executeScript("arguments[0].value = '';", accountManager);
            await accountManager.sendKeys("accountManager")

            const addressLine1 = await modalCont.findElement(By.id("addressLine1"))
            await driver.executeScript("arguments[0].value = '';", addressLine1);
            await addressLine1.sendKeys("addressLine1")

            const addressLine2 = await modalCont.findElement(By.id("addressLine2"))
            await driver.executeScript("arguments[0].value = '';", addressLine2);
            await addressLine2.sendKeys("addressLine2")

            await sleep(1000)

            const modalFooter = await driver.wait(until.elementLocated(By.className("ant-modal-footer")), 20000)
            const saveBtn = await modalFooter.findElement(By.className("ant-btn-primary"))
            
            await sleep(1000)
            await saveBtn.click()

            // View
            await sleep(2000)
            const viewBtn = await driver.wait(until.elementLocated(By.xpath('//span[text()="View"]')), 20000)
            await viewBtn.click();


            await sleep(5000)

            const closeBtn = await driver.wait(until.elementIsVisible(driver.findElement(By.className('ant-modal-close'))), 10000);
            if (closeBtn) {
                await closeBtn.click()
            }


        } catch (error) {
            console.log('error', error)
        }
    }

    await goPurchasing()
    // await viewOptionsBtn()
    await createPuchase()
    // await viewItemsFn()
   
    // await editFn()
}

module.exports = {
    Purchasing
}
