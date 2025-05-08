const { chromium } = require('playwright');

async function postWeibo(text) {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    storageState: 'cookies.json' // 使用扫码登录保存的文件
  });

  const page = await context.newPage();
  await page.goto('https://weibo.com/', { waitUntil: 'networkidle' });

  // 等待并填写微博内容
  await page.waitForSelector('[placeholder="有什么新鲜事想分享"]', { timeout: 30000 });
  await page.fill('[placeholder="有什么新鲜事想分享"]', text);

  // 点击发布按钮
  await page.click('text=发布');

  await page.waitForTimeout(3000); // 稍等几秒确认发布成功
  await browser.close();
}

module.exports = { postWeibo };
