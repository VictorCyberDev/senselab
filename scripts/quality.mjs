import{readdir,readFile}from'node:fs/promises';
import{join}from'node:path';
const roots=['src','tests'];let failures=[];
async function walk(dir){for(const name of await readdir(dir,{withFileTypes:true})){const path=join(dir,name.name);if(name.isDirectory())await walk(path);else if(/\.(js|mjs)$/.test(name.name)){const text=await readFile(path,'utf8');if(/\beval\s*\(/.test(text))failures.push(`${path}: eval is prohibited`);if(/console\.log/.test(text))failures.push(`${path}: console.log is prohibited`);if(/TODO|FIXME/.test(text))failures.push(`${path}: unfinished marker`)}}}
for(const root of roots)await walk(root);if(failures.length){console.error(failures.join('\n'));process.exit(1)}console.info('Quality checks passed.');
