const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.tracing.start({
    path: 'trace.json',
    categories: ['devtools.timeline']
  })
  await page.goto('https://m.gsmarena.com/makers.php3')

  // execute standard javascript in the context of the page.
  const stories = await page.$$eval('list-brands', anchors => { return anchors.map(anchor => anchor.textContent).slice(0, 10) })
  console.log(stories)
  await page.tracing.stop()
  await browser.close()
})()