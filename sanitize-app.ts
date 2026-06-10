import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Let's strip any trailing 'const' or 'const ' at the ends of declarations:
content = content.replace(/const\s*$/gm, '');
content = content.replace(/const\s*;$/gm, '');

// Clean up f.target.result cast
content = content.replace('f.target.result.trim().split', '(f.target.result as string).trim().split');

// Let's check for any remaining compiler issues.
// Let's search inside the code for empty variable declarations, e.g. "const " followed by nothing next to a closing brace
// Or ending lines like "const " before double newlines
content = content.replaceAll('const \n\n', '\n\n');
content = content.replaceAll('const ;', '');

// Let's also define a global type cast or helper for files if any. See lines:
// we had: "user:e" and then "((f=e.name)==null?void 0:f[0]) || 'U'"
// Let's make sure our component arguments have types:
// We can cast "user:e" to "user:e: any" or simply type all functions, e.g.:
// In components, we can add "any" types for params where they trigger TypeScript compiler errors.
// For example:
// function lt({size:e="md",theme:t="dark"}: {size?: string, theme?: string})
// function Si({status:e}: {status: string})
// function Op({domain:e,onFetched:t}: {domain: string, onFetched: any})
// function Bp({onClose:e,onAdd:t,publisherMode:n}: any)
// function Wp({site:e,onClose:t,onOrder:n}: any)
// function $p({user:e,sites:t,orders:n}: any)
// function Hp({sites:e,user:t,onOrder:n}: any)
// function Up({sites:e,setSites:t,user:n}: any)
// function Vp({orders:e,user:t}: any)
// function Yp({user:e}: any)
// function Gp({sites:e,setSites:t}: any)
// function Qp()
// function Xi({onLogin:e,onClose:t,defaultTab:n}: any)
// function Jp({pageId:e,onBack:t}: any)
// function Kp({onBack:e}: any)
// function Xp({onLogin:e}: any)
// function qp({onLogin:e}: any)
// function Zp()
// function ef()

content = content.replace('function lt({size:e="md",theme:t="dark"})', 'function lt({size:e="md",theme:t="dark"}: {size?: string, theme?: string})');
content = content.replace('function Si({status:e})', 'function Si({status:e}: {status: string})');
content = content.replace('function Op({domain:e,onFetched:t})', 'function Op({domain:e,onFetched:t}: {domain: string, onFetched: any})');
content = content.replace('function Bp({onClose:e,onAdd:t,publisherMode:n})', 'function Bp({onClose:e,onAdd:t,publisherMode:n}: any)');
content = content.replace('function Wp({site:e,onClose:t,onOrder:n})', 'function Wp({site:e,onClose:t,onOrder:n}: any)');
content = content.replace('function $p({user:e,sites:t,orders:n})', 'function $p({user:e,sites:t,orders:n}: any)');
content = content.replace('function Hp({sites:e,user:t,onOrder:n})', 'function Hp({sites:e,user:t,onOrder:n}: any)');
content = content.replace('function Up({sites:e,setSites:t,user:n})', 'function Up({sites:e,setSites:t,user:n}: any)');
content = content.replace('function Vp({orders:e,user:t})', 'function Vp({orders:e,user:t}: any)');
content = content.replace('function Yp({user:e})', 'function Yp({user:e}: any)');
content = content.replace('function Gp({sites:e,setSites:t})', 'function Gp({sites:e,setSites:t}: any)');
content = content.replace('function Xi({onLogin:e,onClose:t,defaultTab:n})', 'function Xi({onLogin:e,onClose:t,defaultTab:n}: any)');
content = content.replace('function Jp({pageId:e,onBack:t})', 'function Jp({pageId:e,onBack:t}: any)');
content = content.replace('function Kp({onBack:e})', 'function Kp({onBack:e}: any)');
content = content.replace('function Xp({onLogin:e})', 'function Xp({onLogin:e}: any)');
content = content.replace('function qp({onLogin:e})', 'function qp({onLogin:e}: any)');

// Let's type state e as any so we can access its user properties:
content = content.replace('const[e,t]=T.useState(null)', 'const[e,t]=T.useState<any>(null)');

// Let's type s as any in Qp so user mapping satisfies typescript compiler
content = content.replace('let s={};try{s=JSON.parse', 'let s: any={};try{s=JSON.parse');
content = content.replace('map(y=>({id:y.id', 'map((y: any)=>({id:y.id');

fs.writeFileSync('src/App.tsx', content);
console.log("Sanitized src/App.tsx successfully!");
