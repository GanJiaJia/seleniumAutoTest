const {Builder, By, until} = require("selenium-webdriver")

async function AutoCommenceConfig (driver) {

    const sleep = async (time) => {
        return await new Promise((resolve)=> setTimeout(resolve, time))
    }

    const goAutoCommenceConfig = async () => {
        await sleep(1000)
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/order/AutoCommenceConfig"]')), 20000);
            await element.click()
        } catch (error) {
            console.error('goAutoCommenceConfig', error)
        }
    }

    const editFn = async () => {
        try {

            await sleep(1500)

            const editBtn = await driver.wait(until.elementLocated(By.xpath('//span[text()="Edit"]')), 20000)
            await editBtn.click();

            await sleep(1500)

            // const modalCont = await driver.wait(until.elementLocated(By.className("ant-modal-content")), 20000)
        //     const realName = await modalCont.findElement(By.id("realName"))
        //     await driver.executeScript("arguments[0].value = '';", realName);
        //     await realName.sendKeys("realName")

        //     await sleep(1000)

        //     const companyName = await modalCont.findElement(By.id("companyName"))
        //     await driver.executeScript("arguments[0].value = '';", companyName);
        //     await companyName.sendKeys("companyName")

        //     await sleep(1000)

        //     const abn = await modalCont.findElement(By.id("abn"))
        //     await driver.executeScript("arguments[0].value = '';", abn);
        //     await abn.sendKeys("abn")

        //     await sleep(1000)

        //     const acn = await modalCont.findElement(By.id("acn"))
        //     await driver.executeScript("arguments[0].value = '';", acn);
        //     await acn.sendKeys("acn")

        //     await sleep(1000)

        //     try {
        //         const state = await modalCont.findElement(By.className("ant-select-selection-item"))
        //         await driver.wait(until.elementIsEnabled(state), 5000);
        //         await state.click();

        //         await sleep(1500)

        //         const selectDropDown = await driver.wait(until.elementLocated(By.xpath('//div[text()="NSW"]')), 5000)
        //         await selectDropDown.click();
    
        //    } catch (error) {
        //         console.log('error', error)
        //    }

        //     const suburb = await modalCont.findElement(By.id("suburb"))
        //     await driver.executeScript("arguments[0].value = ''", suburb);
        //     await suburb.sendKeys("suburb")

        //     await sleep(1000)

        //     const postcode = await modalCont.findElement(By.id("postcode"))
        //     await driver.executeScript("arguments[0].value = ''", postcode);
        //     await postcode.sendKeys('1234')

        //     await sleep(1000)

        //     const accountManager = await modalCont.findElement(By.id("accountManager"))
        //     await driver.executeScript("arguments[0].value = '';", accountManager);
        //     await accountManager.sendKeys("accountManager")

        //     await sleep(1000)

        //     const addressLine1 = await modalCont.findElement(By.id("addressLine1"))
        //     await driver.executeScript("arguments[0].value = '';", addressLine1);
        //     await addressLine1.sendKeys("addressLine1")

        //     await sleep(1000)

        //     const addressLine2 = await modalCont.findElement(By.id("addressLine2"))
        //     await driver.executeScript("arguments[0].value = '';", addressLine2);
        //     await addressLine2.sendKeys("addressLine2")

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
            console.error('editFn', error)
        }
    }

    await goAutoCommenceConfig()
    await editFn()
    return await sleep(2000)
}

module.exports = {
    AutoCommenceConfig
}
