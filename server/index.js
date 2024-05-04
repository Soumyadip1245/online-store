const puppeteer = require('puppeteer')
(async () =>{
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const url = "https://www.google.com/search?q=macbook&tbm=shop&gl=in"
  await page.goto(url)
  const printHtml = await page.content()
  console.log(printHtml)
})()