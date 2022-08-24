const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function testExample(content) {
  try {
    console.log(content)
  } catch (error) {
    console.log(error)
  }
}

async function getPhone() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [ // Disable Chromium's unnecessary SUID sandbox.
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  });
  const page = await browser.newPage();
  await page.goto('https://www.gsmarena.com/samsung-phones-f-9-10.php')
  const finalItems = []

  let count = 1

  while(count < 10){
    console.log(count)
    const title = await page.title()
    console.log(title)

    await page.click(".pages-next ")
    count +=1
  }




  const exist = await page.$(".disabled pages-next", () => true).catch(() => false)


  while (!exist) {
    //console.log(exist)
    // const title = await page.title()
    // console.log(title)

    // await page.click(".pages-next ")
  }
  /*
   const phones = await page.evaluate(()=> {
        const items = document.querySelectorAll(".makers li")
  
        const phoneItems = Array.from(items).map((phone)=> {
          const modelName = phone.querySelector(".makers li span")
          const phonePicture = phone.querySelector("img")
  
          return {
          modelName: modelName.innerHTML,
          phoneImg: phonePicture.src
        }
        })
  
        return phoneItems
      })
  
      finalItems.push(...phones)
  
      testExample(JSON.stringify(finalItems))
  
  */

  await browser.close()

}

module.exports = getPhone()