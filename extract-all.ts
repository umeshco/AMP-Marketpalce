import fs from 'fs';

const html = fs.readFileSync('target_homepage.html', 'utf-8');

const components = [
  "lt", "Kp", "Jp", "Xi", "Hp", "Up", "Gp", "Qp", "Vp", "Yp", "qp", "Xp", "ef"
];

const results: Record<string, string> = {};

components.forEach(comp => {
  // Let's search for definitions like "const comp=" or "comp=" or "function comp("
  const patterns = [
    `const ${comp}=`,
    `let ${comp}=`,
    `var ${comp}=`,
    `function ${comp}(`,
    `${comp}=`
  ];
  
  let foundIndex = -1;
  let matchingPattern = "";
  for (const pattern of patterns) {
    const idx = html.indexOf(pattern);
    if (idx !== -1) {
      if (foundIndex === -1 || idx < foundIndex) {
        foundIndex = idx;
        matchingPattern = pattern;
      }
    }
  }

  if (foundIndex !== -1) {
    console.log(`Found ${comp} with pattern "${matchingPattern}" at index ${foundIndex}`);
    // extract surrounding text, let's say 4000 characters
    const text = html.substring(foundIndex, foundIndex + 8000);
    results[comp] = text;
    fs.writeFileSync(`extracted_${comp}.txt`, text);
  } else {
    console.log(`Could not find definition for ${comp}`);
  }
});

console.log("Extraction completed! Compiling summary of components.");
