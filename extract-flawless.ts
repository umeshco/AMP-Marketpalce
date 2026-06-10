import fs from 'fs';

const html = fs.readFileSync('target_homepage.html', 'utf-8');

const targets = [
  { name: 'logo', pattern: 'function lt({size:e=' },
  { name: 'Si', pattern: 'function Si(' },
  { name: 'Op', pattern: 'function Op(' },
  { name: 'Bp', pattern: 'function Bp(' },
  { name: 'Wp', pattern: 'function Wp(' },
  { name: '$p', pattern: 'function $p(' },
  { name: 'Hp', pattern: 'function Hp(' },
  { name: 'Up', pattern: 'function Up(' },
  { name: 'Vp', pattern: 'function Vp(' },
  { name: 'Yp', pattern: 'function Yp(' },
  { name: 'Gp', pattern: 'function Gp(' },
  { name: 'Qp', pattern: 'function Qp(' },
  { name: 'Xi', pattern: 'function Xi(' },
  { name: 'Jp', pattern: 'function Jp(' },
  { name: 'Kp', pattern: 'function Kp(' },
  { name: 'Xp', pattern: 'function Xp(' },
  { name: 'qp', pattern: 'function qp(' },
  { name: 'Zp', pattern: 'function Zp(' },
  { name: 'ef', pattern: 'function ef(' },
  { name: 'Js', pattern: 'Js=[' },
  { name: 'Ip', pattern: 'Ip=[' },
  { name: 'ii', pattern: 'ii={' },
  { name: 'style__p', pattern: '_p=`' },
  { name: 'style_f', pattern: 'f=`' },
  { name: 'style_c', pattern: 'c=`' }
];

const resolved = targets.map(t => {
  const index = html.indexOf(t.pattern);
  return { ...t, index };
}).filter(t => {
  if (t.index === -1) {
    console.log(`Failed to find index for ${t.name} with pattern "${t.pattern}"`);
    return false;
  }
  return true;
});

resolved.sort((a, b) => a.index - b.index);

for (let i = 0; i < resolved.length; i++) {
  const current = resolved[i];
  const start = current.index;
  let end = html.length;
  if (i < resolved.length - 1) {
    end = resolved[i+1].index;
  } else {
    const scriptEnd = html.indexOf('</script>', start);
    if (scriptEnd !== -1) {
      end = scriptEnd;
    }
  }
  
  const block = html.substring(start, end).trim();
  fs.writeFileSync(`full_${current.name}.txt`, block);
  console.log(`Extracted full ${current.name} (length = ${block.length} chars)`);
}
