const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function Manufacturer (driver) {

    const goManufacturer = async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/autohub/Manufacturer"]')), 20000);
            element && element.click()
        } catch (error) {
            console.error('goManufacturer', error)
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

    const exportManufacturer = async () => {
        try {
            
            const exportBtn  = await driver.findElement(By.xpath("//span[contains(text(), 'Export Manufacturer')]"))
            await exportBtn.click()

            await sleep(1000)

            const body = await driver.findElement(By.className("ant-modal-body"))
            const ok = await body.findElement(By.xpath("//span[text()='OK']"))
            await ok.click()
            await sleep(5000)


        } catch (error) {
            console.error(arguments.callee?.name, error)
            await openModalAndClose()
        }
    }

    const Edit = async () => {
        const editBtn = await driver.wait(until.elementLocated(By.xpath("//span[text()='Edit']")))
        await editBtn.click()

        await sleep(1000)

        const body = await driver.findElement(By.className("ant-modal-body"))
        const Save = await body.findElement(By.xpath("//span[text()='Save']"))
        await Save.click()
        await sleep(4000)

    }
    try {
        await goManufacturer()

        await sleep(2000)
        
        await exportManufacturer()
    
        await sleep(4000)
    
        await Edit()
     
    } catch (error) {
        console.log(arguments.callee?.name, error)
        await openModalAndClose()
    }
  
}

module.exports = {
    Manufacturer
}
