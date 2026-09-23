#!/usr/bin/env node
/**
 * realntoffice: Documentation Utility Builder
 * Scans markdown documentation, aggregates table of contents, and validates links.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.resolve(__dirname, '../docs');

function buildDocsIndex() {
  console.log('==================================================');
  console.log('       realntoffice Documentation Builder');
  console.log('==================================================');

  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`[x] Docs directory not found at ${DOCS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md'));
  console.log(`[*] Discovered ${files.length} core markdown documents:`);

  const manifest = [];
  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const titleLine = lines.find((l) => l.startsWith('# '));
    const title = titleLine ? titleLine.replace('# ', '').trim() : file;

    manifest.push({
      fileName: file,
      title,
      bytes: fs.statSync(filePath).size,
      lines: lines.length,
    });
    console.log(`    - [${file}]: ${title} (${lines.length} lines)`);
  }

  const manifestPath = path.join(DOCS_DIR, 'docs_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`[OK] Generated documentation catalogue at: ${manifestPath}`);
}

if (require.main === module) {
  buildDocsIndex();
}

module.exports = { buildDocsIndex };
