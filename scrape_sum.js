const { chromium } = require('playwright');

const baseUrl = 'https://students.iitm.ac.in/devops/qtable?seed=';

const seeds = Array.from({ length: 10 }, (_, i) => 55 + i);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (const seed of seeds) {
    await page.goto(`${baseUrl}${seed}`);
    const numbers = await page.$$eval('table td', cells =>
      cells.map(cell => parseFloat(cell.textContent)).filter(n => !isNaN(n))
    );
    const pageSum = numbers.reduce((sum, num) => sum + num, 0);
    console.log(`Seed ${seed}: Sum = ${pageSum}`);
    totalSum += pageSum;
  }

  console.log(`Total Sum Across All Seeds: ${totalSum}`);
  await browser.close();
})();
