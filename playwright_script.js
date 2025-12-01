
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Login
    await page.goto('http://localhost:3000/xms/login');
    await page.fill('input[type="email"]', 'testuser@gmail.com');
    await page.fill('input[type="password"]', '12345678');
    await page.click('button[type="submit"]'); // Assuming there is a submit button
    
    // Wait for navigation to dashboard
    await page.waitForURL('**/xms');
    
    // Take screenshot of dashboard home
    await page.screenshot({ path: 'dashboard_home.png', fullPage: true });
    console.log('Screenshot of dashboard home taken');

    // Navigate to Projects
    await page.goto('http://localhost:3000/xms/projects');
    await page.waitForTimeout(2000); // Wait for content to load
    await page.screenshot({ path: 'dashboard_projects.png', fullPage: true });
    console.log('Screenshot of projects taken');

    // Navigate to Articles
    await page.goto('http://localhost:3000/xms/articles');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'dashboard_articles.png', fullPage: true });
    console.log('Screenshot of articles taken');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
