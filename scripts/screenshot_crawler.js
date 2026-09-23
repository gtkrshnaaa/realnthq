#!/usr/bin/env node
/**
 * realnthq: Visual Preview and Screenshot Crawler
 * Captures 1920x1080 screenshots of virtual office routes for documentation and release notes.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PREVIEW_DIR = path.resolve(__dirname, '../docs/preview/screenshots');
const BASE_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const ROUTES = [
  { name: '01-virtual-campus', route: '/', description: 'Virtual Campus Floor & Desk Grid' },
  { name: '02-meeting-hub', route: '/?room=turing', description: 'Interactive Huddle Hub' },
  { name: '03-presence-radar', route: '/?panel=presence', description: 'Spatial Presence Radar' },
];

async function captureScreenshots() {
  console.log('==================================================');
  console.log('       realnthq Screenshot Crawler');
  console.log('==================================================');

  if (!fs.existsSync(PREVIEW_DIR)) {
    fs.mkdirSync(PREVIEW_DIR, { recursive: true });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    for (const item of ROUTES) {
      const target = `${BASE_URL}${item.route}`;
      const dest = path.join(PREVIEW_DIR, `${item.name}.jpg`);
      console.log(`[*] Capturing: ${item.description} -> ${target}`);

      try {
        await page.goto(target, { waitUntil: 'networkidle0', timeout: 5000 });
        await page.screenshot({ path: dest, type: 'jpeg', quality: 80 });
        console.log(`    [OK] Saved to ${dest}`);
      } catch (err) {
        console.log(`    [!] Could not connect to live daemon at ${target}. Generating placeholder manifest.`);
        fs.writeFileSync(
          path.join(PREVIEW_DIR, `${item.name}.manifest.json`),
          JSON.stringify({ name: item.name, target, timestamp: new Date().toISOString() }, null, 2),
        );
      }
    }

    console.log('[OK] Screenshot crawler pass complete.');
  } catch (e) {
    console.error(`[x] Screenshot crawler failed: ${e.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

if (require.main === module) {
  captureScreenshots();
}

module.exports = { captureScreenshots };
