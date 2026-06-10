import fs from 'fs';

// Read target_homepage.html of our target
const html = fs.readFileSync('target_homepage.html', 'utf-8');

// Let's search for variables like const Js =, const Ip =, etc. or any lists
// We can find them by looking for lines or patterns
console.log("Analyzing variables inside scripture...");

// Let's find index.css references, or styled components, or the CSS defined in variables.
// The variables are: f (styles for navbar/landing page), c (style for subpages), _p (styles for platform dashboard)
// We saw:
// l.jsx("style",{children:f})
// l.jsx("style",{children:c})
// l.jsx("style",{children:_p})

const styleRegex = /_p\s*=\s*`([^`]+)`/g;
let match = styleRegex.exec(html);
if (match) {
  console.log("Found _p style rule: ", match[1].substring(0, 500) + "...");
}

// Let's write a script to extract all text or list variables
// Let's find things like "98%","Satisfaction Rate"
// Or "🔒 SSL Secured"
// Let's find different blocks inside target_homepage.html using search or split.
// Let's write a parser to search for all variable declarations of interest
const keys = ["Js", "Ip", "ii", "N", "v", "k", "z", "_p", "f", "c"];
for (const key of keys) {
  const regex = new RegExp(`(?:const|var|let)\\s+${key}\\s*=\\s*(\`[^\`]*\`|"[^"]*"|'[^']*'|\\[[^\\]]*\\]|\\{[^\\}]*\\})`, 'g');
  const m = regex.exec(html);
  if (m) {
    console.log(`Key ${key} matches first:`, m[1].substring(0, 200) + `... [Total Length: ${m[1].length}]`);
    fs.writeFileSync(`extracted_${key}.txt`, m[1]);
  } else {
    // try different search
    const index = html.indexOf(`${key}=`);
    if (index !== -1) {
      console.log(`Found direct assign is ${key}= at ${index}:`, html.substring(index, index + 300));
    }
  }
}
