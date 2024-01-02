const {Builder, By, until} = require("selenium-webdriver")

async function Order (driver) {

    const sleep = async (time) => {
        return await new Promise((resolve)=> setTimeout(resolve, time))
    }

    const goOrder = async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/order"]')), 20000);
            element && element.click()
        } catch (error) {
            console.log(error)
        }
    }

    const addOrder = async () => {
        try {
            let parent = await driver.wait(until.elementLocated(By.className('ant-pro-table-list-toolbar-right')), 10000);
            const button = parent.findElement(By.css('button'))
            await button.click();

            const modalBody = await driver.wait(until.elementLocated(By.className('ant-modal-body')), 4000)
            const searchWrap = await modalBody.findElement(By.className("addOrder-search-customer"));
            const inputName = await driver.wait(searchWrap.findElement(By.css("input")), 3000) 
            const inputNameBtn = await driver.wait(searchWrap.findElement(By.css("button")), 3000) 
            await inputName.sendKeys("xian")
            await inputNameBtn.click()
            const nameItem = await driver.wait(searchWrap.findElement(By.css('li')), 8000) 
            await nameItem.click()

            await sleep(3000);
            
            const reference = await driver.wait(modalBody.findElement(By.id("reference")), 3000) 
            await reference.sendKeys("auto test")

            await sleep(500);

            const customerName = await driver.wait(modalBody.findElement(By.id("customerName")), 3000) 
            await customerName.sendKeys("auto test")
            
            const phone = await driver.wait(modalBody.findElement(By.id("phone")), 3000) 
            await phone.sendKeys(129239394)

            await sleep(500);

            const partNoListWrap = await driver.wait(modalBody.findElement(By.className("partNoListWrap")), 3000) 
            const inputPartNo = await driver.wait(partNoListWrap.findElement(By.css("input")), 3000) 
            // await inputPartNo.sendKeys("1350000")
            await inputPartNo.sendKeys("7PK2120")
            
            // const listItem = partNoListWrap.findElement(By.className("ant-list-item"))
            const listItem = await driver.wait(until.elementLocated(By.className("ant-list-item")), 10000)

            await sleep(2000);
            await listItem.click()

            const customerInstructions = await modalBody.findElement(By.id("customerInstructions"))
            await customerInstructions.sendKeys("autotest Sticky Note")

            await sleep(1000);

            const internalComments = await modalBody.findElement(By.id("internalComments"))
            await internalComments.sendKeys("autotest Special Note")

            await sleep(1000);

            const courierMethod = await modalBody.findElement(By.id("courierMethod"))
            // await courierMethod.sendKeys("FASTWAY COURIER") aria-label="FASTWAY COURIER"
            await courierMethod.click()

            const courierMethod_list = await driver.wait(until.elementLocated(By.id('courierMethod_list')),8000)
            const courierMethod_item =  await courierMethod_list.findElement(By.xpath('//div[@title="AUSTRALIA EXPRESS POST"]'))

            await sleep(2000);
            await courierMethod_item.click()

            const modalFooter = await driver.wait(until.elementLocated(By.className('ant-modal-footer')), 4000)
            const submit = await modalFooter.findElement(By.className("ant-btn-primary"))
            
            await submit.click()
            await sleep(3000);

            try {
                const closeViewBtn = await driver.wait(until.elementIsVisible(driver.findElement(By.className('ant-modal-close'))), 10000);
                if (closeViewBtn) {
                    await sleep(5000);
                    await closeViewBtn.click()
                }

            } catch (error) {
                
            }

            
        } catch (error) {
            console.log(error)
        }
    }

    const confirmOrder = async () => {
        try {
            const tableBody = await driver.wait(until.elementLocated(By.className('ant-table-body')), 20000)
            const firstTr = await tableBody.findElement(By.className("ant-table-row"))
            const dropdown = await firstTr.findElement(By.className("ant-pro-table-dropdown"))
            await dropdown.click()

            await sleep(3000);

            let dropdownmenu = driver.wait(until.elementIsVisible(driver.findElement(By.className('ant-dropdown'))), 12000);
            // const dropdownmenu = await driver.wait(until.elementLocated(By.className('ant-dropdown ')), 50000)
            const menuItem = await dropdownmenu.findElement(By.className("ant-dropdown-menu-title-content"))
            await menuItem.click()

            await sleep(1000);
            
            const btns = await driver.wait(until.elementIsVisible(driver.findElement(By.className('ant-modal-confirm-btns'))), 10000);
            
            const sureBtn = await btns.findElement(By.className("ant-btn-primary"))
            await sureBtn.click()

            const closeBtn = await driver.wait(until.elementIsVisible(driver.findElement(By.className('ant-modal-close'))), 10000);
            if (closeBtn) {
                await sleep(5000);
                await closeBtn.click()
            }

        } catch (error) {
            console.error("confirmOrder", error)
        }
        // ant-dropdown-menu-item
    }

    const viewOrder = async () =>  {
         // ViewOrder
         const tableBody = await driver.wait(until.elementLocated(By.className('ant-table-body')), 20000)
         const firstTr = await tableBody.findElement(By.className("ant-table-row"))
         const viewBtn = firstTr.findElement(By.linkText('View'))
         viewBtn && await viewBtn.click()

         try {
             const closeViewBtn = await driver.wait(until.elementIsVisible(driver.findElement(By.className('ant-modal-close'))), 10000);
             if (closeViewBtn) {
                 await sleep(5000);
                 await closeViewBtn.click()
             }

         } catch (error) {
             
         }
    }


    await goOrder()
    await addOrder()
    await confirmOrder()
    await viewOrder()
}

module.exports = {
    Order
}
