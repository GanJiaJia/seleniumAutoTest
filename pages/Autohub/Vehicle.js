const {Builder, By, until, Key} = require("selenium-webdriver")

const sleep = async (time) => {
    return await new Promise((resolve)=> setTimeout(resolve, time))
}

async function Vehicle (driver) {

    const goVehicle = async () => {
        try {
            let element = await driver.wait(until.elementLocated(By.xpath('//a[@href="/autohub"]')), 20000);
            element && element.click()
        } catch (error) {
            console.error('goVehicle', error)
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

    const CreateVehicle = async () => {
        try {
            const createBtn = await driver.findElement(By.xpath("//span[text()='Create Vehicle']"))
            await createBtn.click()
            await sleep(1000)

            const createCont = await driver.findElement(By.className("ant-modal-content"))

            const bodyType = await createCont.findElement(By.id("bodyType"))
            await bodyType.click()
            await bodyType.sendKeys(Key.UP, Key.RETURN)

            const brakeSystem = await createCont.findElement(By.id("brakeSystem"))
            await brakeSystem.sendKeys("auto_test")

            const brakeType = await createCont.findElement(By.id("brakeType"))
            await brakeType.sendKeys("auto_test")

            const capacity = await createCont.findElement(By.id("capacity"))
            await capacity.sendKeys(666)
        
            const catalystConverterType = await createCont.findElement(By.id("catalystConverterType"))
            await catalystConverterType.sendKeys("auto_test")

            const cc = await createCont.findElement(By.id("cc"))
            await cc.sendKeys(666)

            const chassis = await createCont.findElement(By.id("chassis"))
            await chassis.click()
            await chassis.sendKeys(666)

            const country = await createCont.findElement(By.id("country"))
            await country.click()
            await country.sendKeys(Key.RETURN)

            const cylinders = await createCont.findElement(By.id("cylinders"))
            await cylinders.sendKeys(666)

            const driveType = await createCont.findElement(By.id("driveType"))
            await driveType.click()
            await driveType.sendKeys(Key.RETURN)

            await sleep(1000)

            const engineType = await createCont.findElement(By.id("engineType"))
            await engineType.click()
            await engineType.sendKeys(Key.RETURN)

            const fuelMixtureFormation = await createCont.findElement(By.id("fuelMixtureFormation"))
            await fuelMixtureFormation.sendKeys("auto_test")

            const kTypeNo = await createCont.findElement(By.id("kTypeNo"))
            await kTypeNo.sendKeys("auto_test")
        
            const kW = await createCont.findElement(By.id("kW"))
            await kW.sendKeys(1)

            const makeID = await createCont.findElement(By.id("makeID"))
            await makeID.sendKeys("auto_test_make")

            const model = await createCont.findElement(By.id("model"))
            await model.sendKeys("auto_test_model")
        
            const series = await createCont.findElement(By.id("series"))
            await series.sendKeys("auto_test_series")

            const transmissionType = await createCont.findElement(By.id("transmissionType"))
            await transmissionType.sendKeys("auto_test")
        
            const vehicleID = await createCont.findElement(By.id("vehicleID"))
            await vehicleID.sendKeys(parseInt(Math.random() * 10000000))

            const yearFrom = await createCont.findElement(By.id("yearFrom"))
            await yearFrom.sendKeys('2020-12-20', Key.RETURN)

            const yearTo = await createCont.findElement(By.id("yearTo"))
            await yearTo.sendKeys(new Date()?.toLocaleDateString()?.replace(/\//g, '-'), Key.RETURN)
            
            
            const yearRange = await createCont.findElement(By.className("ant-picker-range"))
            await yearRange.click()
            await sleep(500)

            const firstInput = await yearRange.findElement(By.id("yearRange"))
            await firstInput.sendKeys('2020-12-20', Key.RETURN)

            await sleep(500)
            const secondInputWrap = await yearRange.findElement(By.className("ant-picker-input-active"))
            const secondInput = await secondInputWrap.findElement(By.css("input"))
            await secondInput.sendKeys(new Date()?.toLocaleDateString()?.replace(/\//g, '-'), Key.RETURN)

            const saveBtn = await createCont.findElement(By.xpath("//span[text()='Save']"))
            await saveBtn.click()

            await sleep(6000)
            // await sleep(1000)
            // const firstInput = await driver.wait(until.elementIsEnabled(yearRange.findElement(By.xpath("//input"))), 10000);
            // const firstInput = await yearRange.findElement(By.xpath("//input"))
            // console.log('firstInput', firstInput)
            // await firstInput?.click()
            // const secondInput = await yearRange.findElement(By.xpath("//input"))

           
            // await secondInput.sendKeys(new Date()?.toLocaleDateString()?.replace(/\//g, '-'), Key.RETURN)

        } catch (error) {
            console.log('CreateVehicle', error)
            // await openModalAndClose()
        }
    }

    const EditMakeName = async () => {
        // const editMakeName = await driver.findElement(By.xpath("//span[text='Edit MakeName']"))
        // await editMakeName.click()
    }

    const View = async () => {
        const ViewBtn =  await driver.wait(until.elementLocated(By.xpath("//span[text()='View']")), 2000)
        await ViewBtn.click()
        await sleep(3000)
        await openModalAndClose()
    }

    const whSelect  = async () => {
        const whSelectBtn = await driver.findElement(By.xpath("//span[text()='4WH SELECT']"))
        await whSelectBtn.click()
        await sleep(1000)
        const cont = await driver.findElement(By.className("ant-modal-content"))

        const make = await cont.findElement(By.id("Make"))
        await make.click()
        await make.sendKeys(Key.DOWN, Key.RETURN);

        await sleep(5500)

        const model = await cont.findElement(By.id("Model"))
        await model.click()
        await model.sendKeys(Key.DOWN, Key.RETURN);
         
        await sleep(4500)
        await openModalAndClose()
    }

  try {
    await goVehicle()

    await sleep(1500)

    await View()

    await whSelect()
  } catch (error) {
    console.error(arguments.callee?.name, error)
    await openModalAndClose()
  }

    // ---
    // await CreateVehicle()
}

module.exports = {
    Vehicle
}
