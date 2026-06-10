import fs from 'fs';

const html = fs.readFileSync('target_homepage.html', 'utf-8');

// Let's search inside target_homepage.html for any function or component declaration starting with:
// "function "
const regex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
let match;
const matches: { name: string, index: number }[] = [];
while ((match = regex.exec(html)) !== null) {
  matches.push({ name: match[1], index: match.index });
}

console.log("Found functions in target_homepage.html:");
matches.forEach(m => {
  if (m.index > 140000) { // filter out system react/scheduler functions
    console.log(`- ${m.name} at index ${m.index}: ${html.substring(m.index, m.index + 80).replace(/\r?\n/g, '\\n')}`);
  }
});
