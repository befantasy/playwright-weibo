const { chromium } = require('playwright');
const fs = require('fs');

async function postWeibo(text) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // 加载已保存的 cookies
  const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
  await context.addCookies(cookies);

  const page = await context.newPage();
  await page.goto('https://weibo.com/');

  // 等待页面加载并定位发微博的输入框
  await page.waitForSelector('textarea'); // 请根据实际情况调整选择器
  await page.fill('textarea', text);
  await page.click('button[type="submit"]'); // 请根据实际情况调整选择器

  await browser.close();
}

module.exports = { postWeibo };
