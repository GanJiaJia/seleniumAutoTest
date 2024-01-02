const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function ModuleRolePermissionManage (driver) {

    const goModuleRolePermissionManage = async () => {
        let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/system/ModuleRolePermissionManage"]')), 20000);
        element && element.click()
        await sleep(5000)
    }

    const query = async () => {
        const applicationId = await driver.findElement(By.id("applicationId"))
        await applicationId.click()
        await sleep(1000)
        await applicationId.sendKeys(Key.RETURN)

        await sleep(1000)
        const controllerName = await driver.findElement(By.id("controllerName"))
        await controllerName.click(1000)
        await controllerName.sendKeys(Key.RETURN)

        const queryBtn = await driver.findElement(By.xpath("//span[text()='Query']"))
        await queryBtn.click()

        await sleep(5000)
    }

    try {
        await goModuleRolePermissionManage()
        await query()
     
    } catch (error) {
        console.log(arguments.callee?.name, error)
    }
  
}

module.exports = {
    ModuleRolePermissionManage
}
