import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const assetsDir = path.join(rootDir, '.output', 'public', 'assets');
const outputDir = path.join(rootDir, '.output', 'public');

function findMainAssets() {
  if (!fs.existsSync(assetsDir)) {
    console.warn('Assets directory not found:', assetsDir);
    return { js: null, css: null };
  }

  const files = fs.readdirSync(assetsDir);
  
  // Find the main JS file (usually the largest one with all dependencies)
  const jsFiles = files.filter(f => f.endsWith('.js') && f.includes('index'));
  const cssFiles = files.filter(f => f.endsWith('.css'));
  
  // Get the largest JS file as it's likely the main bundle
  const mainJs = jsFiles.reduce((prev, current) => {
    const prevSize = fs.statSync(path.join(assetsDir, prev)).size;
    const currentSize = fs.statSync(path.join(assetsDir, current)).size;
    return currentSize > prevSize ? current : prev;
  }, jsFiles[0]);

  const mainCss = cssFiles[0];

  return {
    js: mainJs || null,
    css: mainCss || null,
  };
}

function generateIndexHtml() {
  const { js, css } = findMainAssets();

  if (!js) {
    console.error('Could not find main JS file in assets directory');
    process.exit(1);
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NakaBus Tracker</title>
    ${css ? `<link rel="stylesheet" href="/assets/${css}" />` : ''}
    <script type="module" src="/assets/${js}"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`;

  const indexPath = path.join(outputDir, 'index.html');
  fs.writeFileSync(indexPath, htmlContent, 'utf-8');
  console.log('✓ Generated index.html:', indexPath);
}

generateIndexHtml();
