import fs from 'fs';

// Let's read all the extracted full files
const fileContentOf = (name: string) => {
  return fs.readFileSync(`full_${name}.txt`, 'utf-8').trim();
};

const header = `import React, { useState, useEffect, useRef } from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';

// Setup original mini-framework mappings
const l = {
  jsx: _jsx,
  jsxs: _jsxs,
  Fragment: _Fragment
};
const T = React;
`;

// Let's construct standard credentials & theme properties from full_ii.txt
// Wait, full_ii.txt starts with: "ii={..." and ends with "p={...},"
// Let's extract ii and p from full_ii.txt.
// Since full_ii.txt preserves them exactly, let's look at its content:
let iiContent = fileContentOf('ii');
// It contains:
// ii={...}
// cc=[...]
// p={...},
// Let's tidy iiContent: since it is "ii={...} cc=[...] p={...},"
// Let's change the trailing comma of p to a semicolon or assignment.
if (iiContent.endsWith(',')) {
  iiContent = iiContent.substring(0, iiContent.length - 1) + ';';
}
// Let's wrap ii, cc, and p with const declarations if they aren't already:
let processedIi = iiContent;
if (processedIi.startsWith('ii=')) {
  processedIi = 'const ' + processedIi;
}
processedIi = processedIi.replace('\ncc=[', '\nconst cc=[');
processedIi = processedIi.replace('\np={', '\nconst p={');

// Let's read Js and Ip
let JsContent = fileContentOf('Js');
if (JsContent.startsWith('Js=')) {
  JsContent = 'const ' + JsContent;
}
if (JsContent.endsWith(',')) {
  JsContent = JsContent.substring(0, JsContent.length - 1) + ';';
}

let IpContent = fileContentOf('Ip');
if (IpContent.startsWith('Ip=')) {
  IpContent = 'const ' + IpContent;
}
if (IpContent.endsWith(',')) {
  IpContent = IpContent.substring(0, IpContent.length - 1) + ';';
}

// Let's read styling _p
let stylePContent = fileContentOf('style__p');
if (stylePContent.startsWith('_p=')) {
  stylePContent = 'const ' + stylePContent;
}
if (stylePContent.endsWith(',')) {
  stylePContent = stylePContent.substring(0, stylePContent.length - 1) + ';';
}

// Now let's collect the component codes in logical order
const components = [
  'logo',    // lt
  'Si',      // approved status badge
  'Op',      // automatic SEO metrics fetcher
  'Bp',      // Add website bulk/single modal dialogue
  'Wp',      // Placing order checkout modal
  '$p',      // User overview panels card
  'Hp',      // Marketplace grid explore page
  'Up',      // My Sites (Publishers screen)
  'Vp',      // Orders database grid listing
  'Yp',      // Wallet operations, transaction, deposit listing
  'Gp',      // Admin approved sites editor
  'Qp',      // Admin registered users logs database
  'Xi',      // Account sign in / signup dialog modal
  'Jp',      // Info pages render manager
  'Kp',      // Blog posts grid listings
  'Xp_combined', // The absolute composite landing page view
  'qp',      // Secret admin entrance gate
  'Zp',      // Password modifier page controller
  'ef'       // The global app state coordinator and route renderer
];

let componentsCombined = '';
components.forEach(comp => {
  let content = fileContentOf(comp);
  
  // Make sure it compiles nicely
  if (comp === 'ef') {
    // In full_ef.txt, there is a ReactDOM render routine right at the end since it was the entry point.
    // We should safely strip/clean up any trailing reactdom rendering code, leaving only function ef()
    const renderIdx = content.indexOf('ac(document.getElementById("root"))');
    if (renderIdx !== -1) {
      content = content.substring(0, renderIdx).trim();
    }
  }
  
  componentsCombined += '\n\n' + content;
});

// Create the final src/App.tsx source containing all components and exporter
const finalFileContent = `${header}

// Main initial app datasets & styling configs
${processedIi}
${JsContent}
${IpContent}
${stylePContent}

// All premium React functional view modules
${componentsCombined}

// Default export wrapper
export default function App() {
  return <ef />;
}
`;

fs.writeFileSync('src/App.tsx', finalFileContent);
console.log("Successfully created /src/App.tsx with modern stitched React application!");
