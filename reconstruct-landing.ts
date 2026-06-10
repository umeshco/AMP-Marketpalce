import fs from 'fs';

const html = fs.readFileSync('target_homepage.html', 'utf-8');

const start = html.indexOf('function Xp(');
const end = html.indexOf('function qp(');

if (start !== -1 && end !== -1) {
  const block = html.substring(start, end).trim();
  fs.writeFileSync('full_Xp_combined.txt', block);
  console.log(`Extracted full combined Xp (length = ${block.length} characters)`);
} else {
  console.log(`Could not find Xp or qp index`);
}
