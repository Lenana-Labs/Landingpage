// Test-only bundle: exercises the real client archive without adding fixture routes to the app.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { source } from './test-source.mjs';

const require = createRequire(import.meta.url);
export async function projectHarness() {
  const folder = resolve('.taste-skill/project-harness');
  mkdirSync(folder, { recursive: true });
  const { getPublicProjects, projectCategories } = await source('src/data/projects.ts');
  const fixture = (id, category, extra = {}) => ({ id, category, title:`Test-only ${id}`, description:'Browser fixture only. Never production project data.', status:'prototype', visibility:'public', ...extra });
  const entries = getPublicProjects([
    fixture('product', 'product'),
    fixture('client', 'client', { featured:true, client:{approvedForPublication:true,name:'Approved fixture client'} }),
    fixture('experiment', 'experiment'),
    fixture('private-draft', 'experiment', { visibility:'draft',status:'published' }),
  ]);
  writeFileSync(resolve(folder,'entry.tsx'), `import {createRoot} from 'react-dom/client';
import ProjectArchive from ${JSON.stringify(resolve('src/components/projects/ProjectArchive.tsx').replaceAll('\\','/'))};
createRoot(document.getElementById('archive-browser-fixture')!).render(<ProjectArchive entries={${JSON.stringify(entries)}} categories={${JSON.stringify(projectCategories)}}/>);`);
  writeFileSync(resolve(folder,'loader.cjs'), `const ts=require(${JSON.stringify(require.resolve('typescript'))});module.exports=function(code){return ts.transpileModule(code,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX}}).outputText};`);
  // Images are tested in server rendering; this harness isolates filtering and navigation.
  writeFileSync(resolve(folder,'image.tsx'), `export default function TestImage({src,alt}) { return <img src={src} alt={alt}/>; }`);
  const { webpack } = require('next/dist/compiled/webpack/webpack');
  await new Promise((done, reject) => {
    const compiler = webpack({mode:'production',optimization:{minimize:false},target:'web',entry:resolve(folder,'entry.tsx'),output:{path:folder,filename:'archive.js'},resolve:{extensions:['.tsx','.ts','.js'],alias:{'@':resolve('src'),'next/image':resolve(folder,'image.tsx')}},module:{rules:[{test:/\.tsx?$/,use:resolve(folder,'loader.cjs')}]}});
    compiler.run((error, stats) => compiler.close(closeError => {
      if(error || closeError || stats?.hasErrors()) reject(error || closeError || new Error(stats.toString({all:false,errors:true})));
      else done();
    }));
  });
  return readFileSync(resolve(folder,'archive.js'),'utf8');
}
