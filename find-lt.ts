import fs from 'fs';

const html = fs.readFileSync('target_homepage.html', 'utf-8');

// Let's search for where lt is defined. It must be defined as lt = or function lt
// Let's find all occurrences of lt= outside of React modules.
// Let's use regex to find where lt is defined, e.g., lt=({ or lt=(e)=> or function lt(e){
const regexes = [
  /function\s+lt\s*\(/g,
  /lt\s*=\s*\(\s*\{/g,
  /lt\s*=\s*function\s*\(/g,
  /lt\s*=\s*[a-zA-Z0-9_$]+\s*=>/g,
  /lt\s*=\s*e\s*=>/g
];

regexes.forEach((regex, idx) => {
  let match;
  while ((match = regex.exec(html)) !== null) {
    console.log(`Regex ${idx} matched at index ${match.index}: ${html.substring(match.index, match.index + 200)}`);
  }
});

// Let's also search for all occurrences of "logo" or "viewBox" or "Authority Media Placement"
console.log("\nSearching for logo / viewBox SVG definition inside bundle...");
let index = -1;
while ((index = html.indexOf("<svg", index + 1)) !== -1) {
  console.log(`Found <svg at ${index}: ${html.substring(index, index + 300)}`);
}
