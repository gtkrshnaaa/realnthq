#!/usr/bin/env node
/**
 * realnthq: Visual Preview and Screenshot Crawler
 * Captures 1920x1080 screenshots of all virtual office routes,
 * generates an archival ZIP bundle, and outputs docs/preview/allpages.md.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn, execSync } = require('child_process');

let puppeteer;
try {
  puppeteer = require(path.resolve(__dirname, '../tests/node_modules/puppeteer'));
} catch (e) {
  puppeteer = require('puppeteer');
}

const ROOT_DIR = path.resolve(__dirname, '..');
const PREVIEW_DIR = path.resolve(ROOT_DIR, 'docs/preview');
const SCREENSHOTS_DIR = path.resolve(PREVIEW_DIR, 'screenshots');
const ZIP_DIR = path.resolve(SCREENSHOTS_DIR, 'zip');
const BASE_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const ROUTES = [
  {
    name: '01-landing-page',
    route: '/',
    title: 'Welcome Landing Page & Headquarters Hub',
    description:
      'Dedicated self-hosted welcoming portal greeting team members of the host organization (e.g. RealntHQ Dev Squad) with dynamic company data, office statistics, and direct action gateways powered by Realnt HQ.',
    components: ['Header', 'WelcomeBanner', 'DynamicOrgBadge', 'OfficeStats', 'ActionGateways', 'FeatureHighlights'],
  },
  {
    name: '02-office-grid',
    route: '/office',
    title: 'Virtual Office Floor & Desk Grid',
    description:
      'Interactive 2D virtual office canvas featuring persistent left sidebar navigation, multi-floor selection, real-time desk claims, spatial presence radar, and right-hand company announcements bulletin.',
    components: ['Sidebar', 'DashboardLayout', 'BulletinPanel', 'FloorSelector', 'OfficeGrid', 'DeskTile', 'PresenceRadar', 'RoomPanel', 'StatusSelector'],
  },
  {
    name: '03-meeting-rooms',
    route: '/rooms',
    title: 'Meeting Spaces & Huddle Hubs',
    description:
      'Collaborative rooms supporting persistent left sidebar navigation, P2P mesh and SFU gateway signaling, capacity tracking, active meeting indicators, and right-hand company announcements bulletin.',
    components: ['Sidebar', 'DashboardLayout', 'BulletinPanel', 'ActiveHuddle', 'VideoIcon', 'MicIcon', 'UsersIcon'],
  },
  {
    name: '04-decision-logs',
    route: '/artifacts',
    title: 'Decision Registers & Async Artifacts',
    description:
      'Persistent room-level markdown records, architectural decisions, and daily standup journals embedded inside the panel workspace layout with company announcements bulletin.',
    components: ['Sidebar', 'DashboardLayout', 'BulletinPanel', 'ArtifactFilter', 'DecisionCard', 'MarkdownViewer'],
  },
  {
    name: '05-team-directory',
    route: '/team',
    title: 'Team Directory & Spatial Presence Roster',
    description:
      'Comprehensive organizational roster showing member roles, desk locations, live availability indicators, and right-hand company announcements bulletin.',
    components: ['Sidebar', 'DashboardLayout', 'BulletinPanel', 'TeamCard', 'StatusBadge', 'KnockTrigger', 'KnockModal'],
  },
  {
    name: '06-workspace-login',
    route: '/login',
    title: 'Single Sign-On & Authentication Portal',
    description:
      'Enterprise authentication gate supporting Okta / SAML SSO, Google Workspace, GitHub Org, and direct magic-link login with zero-surveillance compliance.',
    components: ['LoginForm', 'SSOButtons', 'OfficeBranding', 'PrivacyNotice'],
  },
  {
    name: '07-townhall-stage',
    route: '/broadcasts',
    title: 'Company Townhall & Amphitheater Stage',
    description:
      'Executive broadcast stage for live company all-hands, moderated audience Q&A, and company-wide announcements.',
    components: ['Sidebar', 'DashboardLayout', 'BroadcastStage', 'BroadcastQa', 'BulletinPanel'],
  },
  {
    name: '08-daily-standup',
    route: '/standup',
    title: 'Asynchronous Daily Standup Kiosk',
    description:
      'Daily squad pulse terminal featuring 3-field check-in submission, blocker resolution highlights, and team briefings.',
    components: ['Sidebar', 'DashboardLayout', 'StandupComposer', 'StandupCard', 'BlockerBanner'],
  },
  {
    name: '09-platform-telemetry',
    route: '/telemetry',
    title: 'Platform Telemetry & Operations',
    description:
      'Real-time WebSocket connection ping latency, WebRTC SFU bitrates, database connection pools, and immutable security audit trail.',
    components: ['Sidebar', 'DashboardLayout', 'TelemetryMetrics', 'AuditLogTable'],
  },
  {
    name: '10-guest-reception',
    route: '/lobby',
    title: 'Guest Reception & Hospitality Lounge',
    description:
      'External visitor access terminal validating 6-digit guest tokens, notifying internal hosts, and hosting visitors in sandboxed lounges.',
    components: ['DashboardLayout', 'GuestCheckinCard', 'WaitingLounge', 'ShieldCheckIcon'],
  },
];

function checkServerUp(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(url, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    const isUp = await checkServerUp(url);
    if (isUp) return true;
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

function generateAllPagesMarkdown(routes, screenshotsDir) {
  const lines = [
    '# realnthq: Visual Interface Catalogue',
    '',
    '**Document Purpose:** Complete visual preview archive and interface index for the `realnthq` virtual office platform.',
    '**Design System Baseline:** Warm Editorial Light (`#fbfbfa` canvas, Plus Jakarta Sans headlines, Inter / DM Sans UI, solid obsidian actions, soft sage accents).',
    '**Viewport Resolution:** 1920x1080 (16:9 Desktop Full-Fidelity).',
    '',
    '---',
    '',
    '## Archival Package Download',
    '',
    '* **Complete Screenshot Bundle (ZIP)**: [Download realnthq.zip](./screenshots/zip/realnthq.zip)',
    '',
    '---',
    '',
    '## Table of Contents',
    '',
  ];

  routes.forEach((r, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    lines.push(`* [${num}. ${r.title}](#${num}-${r.name.substring(3)})`);
  });

  lines.push('', '---', '');

  routes.forEach((r, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const slug = r.name.substring(3);
    const filename = `${r.name}.jpg`;

    lines.push(`## ${num}. ${r.title}`);
    lines.push('');
    lines.push(`* **Route:** \`${r.route}\` ([http://localhost:3000${r.route}](http://localhost:3000${r.route}))`);
    lines.push(`* **File:** [\`docs/preview/screenshots/${filename}\`](./screenshots/${filename})`);
    lines.push(`* **Core Components:** ${r.components.map((c) => `\`${c}\``).join(', ')}`);
    lines.push('');
    lines.push(`![${r.title}](./screenshots/${filename})`);
    lines.push('');
    lines.push(`> **Architecture & UI Note**: ${r.description}`);
    lines.push('');
    lines.push('---');
    lines.push('');
  });

  return lines.join('\n');
}

async function captureScreenshots() {
  console.log('==================================================');
  console.log('       realnthq Visual Preview Crawler');
  console.log('==================================================');

  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }
  if (!fs.existsSync(ZIP_DIR)) {
    fs.mkdirSync(ZIP_DIR, { recursive: true });
  }

  let serverProcess = null;
  const isAlreadyUp = await checkServerUp(BASE_URL);

  if (!isAlreadyUp) {
    console.log(`[*] Web server not active on ${BASE_URL}. Launching Next.js client...`);
    serverProcess = spawn('npm', ['run', 'start'], {
      cwd: path.resolve(ROOT_DIR, 'client'),
      stdio: 'pipe',
      detached: false,
    });

    const isReady = await waitForServer(BASE_URL, 20);
    if (!isReady) {
      console.error('[x] Failed to reach client server at ' + BASE_URL);
      if (serverProcess) serverProcess.kill();
      process.exit(1);
    }
    console.log(`[OK] Client server is ready at ${BASE_URL}.`);
  } else {
    console.log(`[OK] Existing client server detected at ${BASE_URL}.`);
  }

  let browser;
  try {
    const executablePath = fs.existsSync('/usr/bin/google-chrome')
      ? '/usr/bin/google-chrome'
      : (fs.existsSync('/usr/bin/chromium-browser') ? '/usr/bin/chromium-browser' : undefined);

    browser = await puppeteer.launch({
      headless: 'new',
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    for (const item of ROUTES) {
      const target = `${BASE_URL}${item.route}`;
      const dest = path.join(SCREENSHOTS_DIR, `${item.name}.jpg`);
      console.log(`[*] Capturing: ${item.title} -> ${target}`);

      await page.goto(target, { waitUntil: ['networkidle0', 'domcontentloaded'], timeout: 15000 });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: dest, type: 'jpeg', quality: 80 });
      console.log(`    [OK] Saved to docs/preview/screenshots/${item.name}.jpg`);
    }

    // Archival ZIP packaging
    console.log('[*] Generating archival ZIP bundle...');
    const zipFile = path.join(ZIP_DIR, 'realnthq.zip');
    execSync(`cd "${SCREENSHOTS_DIR}" && zip -j "${zipFile}" *.jpg`, { stdio: 'inherit' });
    console.log(`    [OK] Saved archive to docs/preview/screenshots/zip/realnthq.zip`);

    // Generate docs/preview/allpages.md
    console.log('[*] Generating docs/preview/allpages.md catalogue...');
    const allPagesContent = generateAllPagesMarkdown(ROUTES, SCREENSHOTS_DIR);
    const allPagesPath = path.join(PREVIEW_DIR, 'allpages.md');
    fs.writeFileSync(allPagesPath, allPagesContent, 'utf-8');
    console.log(`    [OK] Successfully wrote: ${allPagesPath}`);

    console.log('==================================================');
    console.log('[OK] Visual preview pipeline completed successfully.');
    console.log('==================================================');
  } catch (e) {
    console.error(`[x] Screenshot crawler failed: ${e.message}`);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
    if (serverProcess) {
      serverProcess.kill('SIGTERM');
    }
    process.exit(process.exitCode || 0);
  }
}

if (require.main === module) {
  captureScreenshots();
}

module.exports = { captureScreenshots };
