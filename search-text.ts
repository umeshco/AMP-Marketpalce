import fs from 'fs';

const html = fs.readFileSync('target_homepage.html', 'utf-8');

function findAround(keyword: string, lengthBefore: number, lengthAfter: number) {
  const index = html.indexOf(keyword);
  if (index !== -1) {
    console.log(`\n=== Found "${keyword}" at index ${index} ===`);
    const start = Math.max(0, index - lengthBefore);
    const end = Math.min(html.length, index + keyword.length + lengthAfter);
    console.log(html.substring(start, end));
  } else {
    console.log(`\n=== "${keyword}" NOT found ===`);
  }
}

// Search for key words to find mock data
findAround("techcrunch-style.com", 200, 3000);
findAround("const u=", 10, 2000);
findAround("const N=", 10, 2000);
findAround("const v=", 10, 2000);
findAround("const k=", 10, 2000);
findAround("const z=", 10, 2000);
