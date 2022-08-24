const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function example(content) {
  try {
  console.log(content)
    await fs.writeFile('./bd/brdt.js', content);
  } catch (err) {
    console.log(err);
  }
}

  (async function () {
    const browser = await puppeteer.launch({
      headless: true,
      args: [ // Disable Chromium's unnecessary SUID sandbox.
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    const page = await browser.newPage(); // Create a new page instance
    await page.goto('https://www.gsmarena.com/makers.php3')
    await page.waitForSelector(".brandmenu-v2 ul")

    let brandData = {
      brands: []
    }

    const brD = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".brandmenu-v2.light li a")).map(x => x.innerHTML)
    })
    //console.log(brD)
    for (let index = 0; index < brD.length; index++) {
      const element = brD[index];

      brandData.brands.push({
        id: index,
        brandName: element
      })

    }
    
    example(JSON.stringify(brandData.brands))
    // const anchorTags = await page.$$(".brandmenu-v2.light li a")

    // async function getInnerHtml(page, target) {
    //   const innerHTML = await page.evaluate(el => el.innerHTML, target)
    //   return innerHTML
    // }

    // for (const elemnet of anchorTags) {
    //   console.log("")
    //   const res = await getInnerHtml(page, elemnet)
    //   //console.log(res)
    // }

    //console.log(anchorTags)
    //await page.waitForSelector('list-brands')
    //brandmenu-v2.light li a
    //let element = await page.$('list-brand')
    //let value = await page.evaluate(el => el.textContent, element)

    //const title = await page.title()
    //console.log(value)
    await browser.close()
  })();