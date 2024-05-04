const puppeteer = require('puppeteer')
(async () =>{
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const url = "https://www.amazon.in/s?k=Macbook"
  await page.goto(url)
  const printHtml = await page.content()
  console.log(printHtml)
})()