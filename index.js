'use strict';

const puppeteer = require('puppeteer');

(async function main() {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();
    const urls = ['https://www.calilio.com/blogs/what-is-esim', 'https://www.calilio.com/blogs/what-is-ucaas','https://www.calilio.com/blogs/what-is-esim','https://www.calilio.com/blogs/how-to-identify-a-fake-text-message'];
    const allData = [];
    for (const url of urls) {
      await page.goto(url);
      const data = await page.evaluate(() => {
        return document.querySelector('div.text-base.text-gray-600.font-normal').innerText.slice(9).replace(" ","")
      });
      const date= new Date(data)
      allData.push({url,date});
    }
    console.log(allData);
    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();