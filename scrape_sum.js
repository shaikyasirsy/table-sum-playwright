const { chromium } = require('playwright');

(async () => {
  const baseUrl = 'https://students.iitm.ac.in/devops/qtable?seed=';
  const seeds = Array.from({ length: 10 }, (_, i) => 55 + i);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    await page.goto(`${baseUrl}${seed}`);
    const nums = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
    );
    const sum = nums.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum: ${sum}`);
    grandTotal += sum;
  }

  console.log(`✅ TOTAL SUM: ${grandTotal}`);
  await browser.close();
})();
