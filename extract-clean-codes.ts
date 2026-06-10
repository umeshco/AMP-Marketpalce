import fs from 'fs';

const html = fs.readFileSync('target_homepage.html', 'utf-8');

function extractBlock(keyword: string, length: number, filename: string) {
  const index = html.indexOf(keyword);
  if (index !== -1) {
    const block = html.substring(index, index + length);
    fs.writeFileSync(filename, block);
    console.log(`Extracted "${keyword}" to ${filename} (${block.length} bytes)`);
  } else {
    console.log(`Keyword "${keyword}" NOT found`);
  }
}

// Let's find specific functions and variables:
extractBlock('function lt({size:e=', 1000, 'code_lt.txt');
extractBlock('function Op(', 2500, 'code_Op.txt');
extractBlock('function Kp(', 8000, 'code_Kp.txt');
extractBlock('function Jp(', 10000, 'code_Jp.txt');
extractBlock('function Xi(', 12000, 'code_Xi.txt');
extractBlock('function Hp(', 14000, 'code_Hp.txt');
extractBlock('function Up(', 10000, 'code_Up.txt');
extractBlock('function Gp(', 10000, 'code_Gp.txt');
extractBlock('function Qp(', 6000, 'code_Qp.txt');
extractBlock('function Vp(', 10000, 'code_Vp.txt');
extractBlock('function Yp(', 10000, 'code_Yp.txt');
extractBlock('function qp(', 5000, 'code_qp.txt');
extractBlock('function Xp(', 12000, 'code_Xp.txt');
extractBlock('function ef(', 8000, 'code_ef.txt');

// Let's also search for variables like Js=, Ip=, ii=, f=, c=, _p=
extractBlock('Js=[', 2500, 'code_Js.txt');
extractBlock('Ip=[', 2500, 'code_Ip.txt');
extractBlock('ii={', 2500, 'code_ii.txt');

// Let's search for stylesheets
extractBlock('f=`', 15000, 'code_style_f.txt');
extractBlock('c=`', 8000, 'code_style_c.txt');
extractBlock('_p=`', 15000, 'code_style__p.txt');
