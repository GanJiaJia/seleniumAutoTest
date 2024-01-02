const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function App (driver) {

    const goApp = async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/autohub/App"]')), 20000);
            element && element.click()
        } catch (error) {
            console.error('goApp', error)
        }

        await sleep(2000)
    }

    // const Edit = async () => {
    //     const editBtn = await driver.wait(until.elementLocated(By.xpath("//span[text()='Edit']")))
    //     await editBtn.click()

    //     await sleep(1000)

    //     const body = await driver.findElement(By.className("ant-modal-body"))
    //     const Save = await body.findElement(By.xpath("//span[text()='Save']"))
    //     await Save.click()
    //     await sleep(4000)
    // }
    try {
        await goApp()

        await sleep(5000)
        
        // await Edit()
     
    } catch (error) {
        console.log(arguments.callee?.name, error)
        await openModalAndClose()
    }
  
}

module.exports = {
    App
}
