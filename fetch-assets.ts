import fs from 'fs';
import https from 'https';

const html = fs.readFileSync('vercel_homepage.html', 'utf-8');

// Find all script tags or src properties in scripts
const regex = /<script\s+[^>]*src=["']([^"']+)["']/gi;
let match;
const urls: string[] = [];
while ((match = regex.exec(html)) !== null) {
  urls.push(match[1]);
}

console.log('Found script URLs:', urls);

// Let's resolve the URLs relative to https://authority-placement.vercel.app/
const downloadUrl = (url: string): Promise<string> => {
  const fullUrl = url.startsWith('http') ? url : `https://authority-placement.vercel.app${url.startsWith('/') ? '' : '/'}${url}`;
  return new Promise((resolve, reject) => {
    https.get(fullUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
};

async function main() {
  for (const url of urls) {
    try {
      console.log(`Downloading ${url}...`);
      const js = await downloadUrl(url);
      const filename = url.split('/').pop() || 'bundle.js';
      fs.writeFileSync(filename, js);
      console.log(`Saved ${filename} of length ${js.length}`);
      
      // Look for FAQ inside this bundle
      const faqCount = (js.match(/FAQ/gi) || []).length;
      console.log(`Occurrences of 'FAQ' in ${filename}: ${faqCount}`);
      if (faqCount > 0) {
        // Let's find some snippets around FAQ
        let idx = js.indexOf('FAQ');
        while (idx !== -1) {
          console.log(`Snippet around FAQ: ${js.substring(Math.max(0, idx - 150), Math.min(js.length, idx + 150))}`);
          idx = js.indexOf('FAQ', idx + 1);
        }
      }
    } catch (e) {
      console.error(`Failed to download ${url}:`, e);
    }
  }
}

main();
