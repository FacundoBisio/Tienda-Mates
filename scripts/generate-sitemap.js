import fs from 'fs';
import path from 'path';
import { create } from 'xmlbuilder2';
import { fileURLToPath } from 'url';

// Helper for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL of the Google Sheet CSV
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSAay1X8MYjlrX4_YJpKz-ieLNhBJGMcCi40BTTMhjo7XADQ5wAybhbkqiE7RoMKutMGd_zfpPlzgMf/pub?gid=1640561616&single=true&output=csv';
const SITE_URL = 'https://tienda-mates.vercel.app';

async function generateSitemap() {
  console.log('Fetching product data for sitemap...');
  
  try {
    let csvText = '';
    
    // Attempt native fetch (Node 18+)
    try {
        const response = await fetch(GOOGLE_SHEET_URL);
        if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        csvText = await response.text();
    } catch (e) {
        // Fallback or error report
        console.error("Native fetch failed (node version might be < 18?). Trying to continue...", e);
        throw e;
    }

    const productIds = [];
    // Skip header and process rows
    const rows = csvText.trim().split('\n').slice(1);

    rows.forEach(row => {
      // Simple CSV split matching Cart.jsx logic
      const [id, name] = row.split(','); 
      if (id) {
        productIds.push(id.trim());
      }
    });

    console.log(`Found ${productIds.length} products.`);

    // Create Sitemap XML
    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

    // 1. Static Routes
    const staticRoutes = [
      '/',
      '/politica-de-privacidad'
    ];

    staticRoutes.forEach(route => {
      root.ele('url')
        .ele('loc').txt(`${SITE_URL}${route}`).up()
        .ele('changefreq').txt('weekly').up()
        .ele('priority').txt(route === '/' ? '1.0' : '0.5').up();
    });

    // 2. Dynamic Product Routes
    productIds.forEach(id => {
      root.ele('url')
        .ele('loc').txt(`${SITE_URL}/producto/${id}`).up()
        .ele('changefreq').txt('weekly').up()
        .ele('priority').txt('0.8').up();
    });

    // Write sitemap.xml
    const xml = root.end({ prettyPrint: true });
    const publicDir = path.join(__dirname, '..', 'public');
    
    // Ensure public dir exists
    if (!fs.existsSync(publicDir)){
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log('✅ sitemap.xml generated successfully!');

    // Generate robots.txt
    const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml`;
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
    console.log('✅ robots.txt generated successfully!');

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
