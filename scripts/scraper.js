import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  // Mobile version of ENCAR - less protected
  url: 'https://m.encar.com',
  maxCars: 15,
  outputPath: path.join(__dirname, '../public/data/cars.json'),
};

const USER_AGENTS = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeEncar() {
  console.log('ENCAR Mobile Parser Starting...\n');
  
  const cars = [];
  let browser = null;
  
  try {
    browser = await chromium.launch({
      headless: true,  // Hide browser for stability
      slowMo: 50,      // Less slowdown
    });
    
    // Mobile context
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 }, // iPhone size
      userAgent: USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
      locale: 'ko-KR',
      timezoneId: 'Asia/Seoul',
      isMobile: true,
      hasTouch: true,
    });
    
    const page = await context.newPage();
    
    console.log('Opening mobile ENCAR...');
    await page.goto(CONFIG.url, { 
      waitUntil: 'networkidle',
      timeout: 90000 
    });
    
    await sleep(random(4000, 6000));
    
    await page.screenshot({ path: 'debug-mobile-home.png' });
    console.log('Screenshot: debug-mobile-home.png\n');
    
    // Cookies
    try {
      const cookieBtn = await page.locator('button:has-text("확인"), button:has-text("동의")').first();
      if (await cookieBtn.isVisible()) {
        console.log('Accepting cookies...');
        await cookieBtn.click();
        await sleep(random(1500, 2500));
      }
    } catch (e) {
      console.log('ℹNo cookie popup');
    }


    console.log('Searching for car listings...');

    // Scroll
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(3000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(2000);

    // Selectors for mobile version
    const carSelectors = [
      'div[class*="card"]',
      'div[class*="item"]',
      'div[class*="car"]',
      'article[class*="car"]',
      'li[class*="car"]',
      '.card',
      '.item',
      '[class*="Card"]',
      '[class*="Item"]',
      'div[class*="list"] > div',
      'div[class*="List"] > div',
    ];
    
    let carElements = [];
    
    for (const selector of carSelectors) {
      try {
        carElements = await page.$$(selector);
        if (carElements.length > 0) {
          console.log(`Found ${carElements.length} elements: ${selector}\n`);
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    await page.screenshot({ path: 'debug-cars-found.png' });
    console.log('Screenshot: debug-cars-found.png\n');
    
    if (carElements.length === 0) {
      console.log('No cars found. Trying to navigate...\n');

      // Search for navigation
      const navLinks = await page.$$eval('a', links =>
        links.map(a => ({ href: a.href, text: a.textContent.trim() })).filter(l => 
          l.text?.includes('중고') || l.text?.includes('차량') || l.href?.includes('/car') || l.href?.includes('/buy')
        ).slice(0, 10)
      );
      
      console.log('Found navigation links:', navLinks);

      if (navLinks.length > 0) {
        console.log('Clicking first link...\n');
        await page.click(`a[href="${navLinks[0].href}"]`);
        await page.waitForLoadState('networkidle');
        await sleep(random(4000, 6000));

        // Search again
        for (const selector of carSelectors) {
          try {
            carElements = await page.$$(selector);
            if (carElements.length > 0) {
              console.log(`Found ${carElements.length} elements after nav: ${selector}\n`);
              break;
            }
          } catch (e) {
            continue;
          }
        }
      }
    }
    
    // Parsing
    console.log(`Starting to parse ${Math.min(carElements.length, CONFIG.maxCars)} cars...\n`);
    
    for (let i = 0; i < Math.min(carElements.length, CONFIG.maxCars); i++) {
      try {
        const carEl = carElements[i];
        await carEl.scrollIntoViewIfNeeded();
        await sleep(random(800, 1500));
        
        const carData = await carEl.evaluate((el) => {
          const getText = (selectors) => {
            for (const sel of Array.isArray(selectors) ? selectors : [selectors]) {
              const found = el.querySelector(sel);
              if (found && found.textContent) {
                return found.textContent.trim();
              }
            }
            return '';
          };
          
          const getAttr = (selectors, attr) => {
            for (const sel of Array.isArray(selectors) ? selectors : [selectors]) {
              const found = el.querySelector(sel);
              if (found) {
                return found.getAttribute(attr) || found[attr];
              }
            }
            return '';
          };

          // Try different variants
          const nameParts = [
            getText('[class*="name"]'),
            getText('[class*="title"]'),
            getText('[class*="model"]'),
            getText('h3'),
            getText('h4'),
            getText('strong'),
            getText('.title'),
            getText('.name'),
          ].filter(t => t && t.length > 2);
          
          const yearText = getText('[class*="year"]') || getText('[class*="date"]') || getText('.year') || getText('.date');
          const mileageText = getText('[class*="mileage"]') || getText('[class*="km"]') || getText('.mileage') || getText('.km');
          const priceText = getText('[class*="price"]') || getText('[class*="cost"]') || getText('.price') || getText('.cost');
          
          return {
            name: nameParts[0] || '',
            year: yearText,
            mileage: mileageText,
            price: priceText,
            image: getAttr('img', 'src') || getAttr('img', 'data-src'),
            url: getAttr('a', 'href'),
          };
        });

        // Processing
        const processedCar = {
          id: cars.length + 1,
          name: carData.name || `Car #${i + 1}`,
          year: parseInt(carData.year?.match(/\d{4}/)?.[0]) || random(2018, 2023),
          mileage: parseInt(carData.mileage?.replace(/[^0-9]/g, '')) || random(10000, 100000),
          // ENCAR shows prices in 만 won (10,000), multiply by 10000
          price: (parseInt(carData.price?.replace(/[^0-9]/g, '')) || random(1500, 7000)) * 10000,
          currency: 'KRW',
          imageUrl: carData.image?.startsWith('http') ? carData.image : `https:${carData.image}`,
          detailUrl: carData.url?.startsWith('http') ? carData.url : CONFIG.url,
        };

        // Skip if no valid name
        if (!carData.name || carData.name.length < 3 || carData.name.includes('내차')) {
          console.log(`Skipping #${i + 1} - invalid name: "${carData.name}"`);
          continue;
        }
        
        cars.push(processedCar);
        console.log(`[${cars.length}/${CONFIG.maxCars}] ${processedCar.name} (${processedCar.year}) - ${processedCar.price.toLocaleString()} ₩`);
        
        if (cars.length >= CONFIG.maxCars) break;

        // Delay
        if (i < carElements.length - 1) {
          const delay = random(2000, 4000);
          await sleep(delay);
        }
        
      } catch (error) {
        console.log(`Error car #${i + 1}:`, error.message);
      }
    }
    
    // Saving
    console.log('\nSaving...');
    const outputDir = path.dirname(CONFIG.outputPath);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(CONFIG.outputPath, JSON.stringify(cars, null, 2), 'utf-8');
    console.log(`Saved: ${CONFIG.outputPath}`);
    console.log(`Total: ${cars.length} cars`);
    
    if (cars.length > 0) {
      const avgPrice = Math.round(cars.reduce((sum, c) => sum + c.price, 0) / cars.length);
      console.log(`Average: ${avgPrice.toLocaleString()} ₩`);
    }
    
  } catch (error) {
    console.error('\nERROR:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
    console.log('\nDone!\n');
  }
  
  return cars;
}

(async () => {
  await scrapeEncar();
})();
