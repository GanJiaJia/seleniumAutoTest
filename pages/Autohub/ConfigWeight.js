const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function ConfigWeight (driver) {

    const goConfigWeight = async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/autohub/ConfigWeight"]')), 20000);
            element && element.click()
        } catch (error) {
            console.error('goConfigWeight', error)
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

        const save = await driver.findElement(By.xpath("//span[text()='Save']"))
        await save.click()
        
        await sleep(4000)

        await openModalAndClose()

    }
    try {
        await goConfigWeight()
        await sleep(2500)
      
        await Edit()
     
    } catch (error) {
        console.log(arguments.callee?.name, error)
        await openModalAndClose()
    }
  
}

module.exports = {
    ConfigWeight
}
