import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {Browser} from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
const origin=process.env.TEST_URL||'http://localhost:3116';
const output='.taste-skill/lenske';mkdirSync(output,{recursive:true});
const browser=await Browser.launch();const results=[];
try {
  for(const route of ['/','/about','/projects','/products/lenske']) {
    assert.equal((await fetch(origin+route)).status,200);
    for(const width of [320,375,768,1024,1440,1920]) {
      const page=await browser.newPage({width,height:900,mobile:width<768});await page.goto(origin+route);await page.eval(()=>document.fonts.ready.then(()=>true));
      const info=await page.eval(()=>({overflow:document.documentElement.scrollWidth>innerWidth,title:document.title,h1:document.querySelectorAll('h1').length,text:document.querySelector('main').textContent,links:[...document.querySelectorAll('main a')].map(a=>a.getAttribute('href')),footer:!!document.querySelector('.site-footer a[href="/products/lenske"]'),anchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)}));
      assert.equal(info.overflow,false,`${route} overflow at ${width}`);assert.equal(info.h1,1);assert.ok(info.footer);assert.deepEqual(info.anchors,[]);
      if(route==='/about'){assert.doesNotMatch(info.text,/Lenske/);assert.equal(info.links.includes('/products/lenske'),false);}
      else {assert.match(info.text,/Lenske/);if(route!='/products/lenske')assert.ok(info.links.includes('/products/lenske'));}
      if(route==='/projects'){assert.equal(await page.eval(()=>document.querySelectorAll('#p-lenske').length),1);assert.equal(await page.eval(()=>document.querySelector('.contents .c').textContent),'00');assert.equal(await page.eval(()=>document.querySelectorAll('.contents-empty').length),2);assert.equal(await page.eval(()=>document.querySelector('.plate-tags')),null);}
      if(route==='/products/lenske'){assert.doesNotMatch(info.text,/Next\.js|Django|Supabase|PostgreSQL|backend|frontend|API|revenue split|royalty.free/i);assert.match(info.text,/In development/);assert.equal(info.links.some(href=>href?.includes('github.com')),false);}
      if(route==='/'){await page.eval(()=>document.getElementById('lab').scrollIntoView({behavior:'instant'}));assert.equal(await page.eval(()=>document.querySelectorAll('#lab .project-entry').length),1);}
      else if(route==='/about')await page.eval(()=>document.getElementById('explore').scrollIntoView({behavior:'instant'}));
      await new Promise(r=>setTimeout(r,200));await page.screenshot({path:`${output}/${route==='/'?'home':route.replaceAll('/','').replace('products','')}-${width}.jpg`,fullPage:route==='/projects'||route==='/products/lenske'});
      assert.deepEqual(page.consoleErrors,[]);results.push({route,width,overflow:false,footer:true});await page.close();
    }
  }
  const page=await browser.newPage({width:375,height:900,reducedMotion:true});await page.send('Emulation.setScriptExecutionDisabled',{value:true});await page.goto(origin+'/products/lenske');assert.match(await page.eval(()=>document.querySelector('main').textContent),/photography marketplace/);await page.close();
  writeFileSync(`${output}/results.json`,JSON.stringify({passed:true,results,noScript:true,emailsSent:false},null,2));console.log('PASS: Lenske on Home, Projects and product page; About has no product promotion. Six widths, safe links, one product record and no-script content.');
}finally{await browser.close();}
