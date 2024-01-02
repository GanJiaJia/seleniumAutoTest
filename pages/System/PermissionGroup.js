const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function PermissionGroup (driver) {

    const go = async (path) => {
        let element = await driver.wait(until.elementLocated(By.xpath(`//a[@href="/system/${path}"]`)), 20000);
        element && element.click()
        await sleep(5000)
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


    const query = async () => {
        const applicationId = await driver.findElement(By.id("applicationId"))
        await applicationId.click()
        await sleep(1000)
        await applicationId.sendKeys(Key.RETURN)

        const role = await driver.findElement(By.xpath("//span[text()='Developer']"))
        await role.click()

        const queryBtn = await driver.findElement(By.xpath("//span[text()='Query']"))
        await queryBtn.click()

        await sleep(5000)

        await openModalAndClose()
    }

    const UpdateProject = async () => {
        const updateBtn = await driver.findElement(By.xpath("//span[text()='Edit']"))
        await updateBtn.click()
        await sleep(1000)

        const okBtn = driver.findElement(By.xpath("//span[text()='OK']"))
        await okBtn.click()
        await sleep(5000)
    }

    const jobLogView = async () => {
        const logView = await driver.wait(until.elementLocated(By.xpath("//span[text()='Log View']")), 20000)
        await logView.click()
        await sleep(5000)

        await openModalAndClose()

        await sleep(3000)
    }

    const downloadMessageLog= async () => {
        const download = await driver.findElement(By.xpath("//span[text()='Download']"))
        await download.click()
        await sleep(8000)
    }



    try {
        await go('PermissionGroup')
        await query()

        await sleep(2000)
        await go('PermissionMenu')

        await sleep(2000)
        await go('Project')
        await UpdateProject()
     
        await sleep(2000)
        await go('Job')
        await jobLogView()

        await go("messageLog")
        await downloadMessageLog()

        await go("PersistenceLog")
     
    } catch (error) {
        console.log(arguments.callee?.name, error)
        await openModalAndClose()
    }
  
}

module.exports = {
    PermissionGroup
}
