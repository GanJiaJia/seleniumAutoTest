const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function BlackList (driver) {

    const goBlackList = async () => {
        try {BlackList
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/system/BlackList"]')), 20000);
            element && element.click()
        } catch (error) {
            console.error('goBlackList', error)
        }

        await sleep(2000)
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


    const Edit = async () => {
        const editBtn = await driver.wait(until.elementLocated(By.xpath("//span[text()='Edit']")))
        await editBtn.click()
        await sleep(1000)

        const save = await driver.findElement(By.xpath("//span[text()='OK']"))
        await save.click()
      
        const close = await driver.findElement(By.className('ant-modal-close'))
        await close.click()

        await sleep(3000)
        
        await openModalAndClose()

    }
    try {
        await goBlackList()
        await sleep(4000)
      
        await Edit()
     
    } catch (error) {
        console.log(arguments.callee?.name, error)
        await openModalAndClose()
    }
  
}

module.exports = {
    BlackList
}
