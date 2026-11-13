import{mkdir,cp,rm,readFile}from'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const path of['index.html','manifest.webmanifest','sw.js','vercel.json','src','assets'])await cp(path,`dist/${path}`,{recursive:true});
const html=await readFile('dist/index.html','utf8');if(!html.includes('id="main"')||!html.includes('src/app.js'))throw new Error('Build verification failed');
console.info('Static production build created in dist/.');
