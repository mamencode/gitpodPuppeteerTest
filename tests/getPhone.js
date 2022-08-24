const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function testExample(content){
  try {
    console.log(content)
  } catch (error) {
    console.log(error)
  }
}

const finalItems = []
export  async function getPhone(){
    const browser = await puppeteer.launch({
        headless: true,
        args: [ // Disable Chromium's unnecessary SUID sandbox.
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ]
      });
      const page = await browser.newPage(); 
    await page.goto('https://www.gsmarena.com/samsung-phones-f-9-10.php')

    const phones = await page.evaluate(()=> {
      const items = document.querySelectorAll(".makers li")

      const phoneItems = Array.from(items).map((phone)=> {
        const modelName = phone.querySelector("makers li span")
        const phonePicture = phone.querySelector("img")

        return {
        modelName: modelName.innerText,
        phoneImg: phonePicture.src
      }
      })

      return phoneItems
    })

    finalItems.push(...phones)

    testExample(JSON.stringify(finalItems))
    await browser.close()

}