import fs from 'fs';

const files = [
  'code_lt.txt', 'code_Op.txt', 'code_Kp.txt', 'code_Jp.txt', 'code_Xi.txt',
  'code_Hp.txt', 'code_Up.txt', 'code_Gp.txt', 'code_Qp.txt', 'code_Vp.txt',
  'code_Yp.txt', 'code_qp.txt', 'code_Xp.txt', 'code_ef.txt',
  'code_Js.txt', 'code_Ip.txt', 'code_ii.txt',
  'code_style_f.txt', 'code_style_c.txt', 'code_style__p.txt'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  console.log(`${f}: size = ${content.length} characters.`);
  console.log(`  Start: ${content.substring(0, 80).replace(/\r?\n/g, '\\n')}`);
  console.log(`  End  : ${content.substring(content.length - 80).replace(/\r?\n/g, '\\n')}`);
});
