import assert from 'node:assert/strict';
import {mkdirSync, writeFileSync} from 'node:fs';
import {Browser} from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
const origin=process.env.TEST_URL||'http://localhost:3102';
const output='.taste-skill/legal';mkdirSync(output,{recursive:true});
const browser=await Browser.launch();const results=[];
try {
  for(const route of ['/privacy-policy','/terms-and-conditions']) {
    assert.equal((await fetch(origin+route)).status,200);
    for(const width of [320,375,768,1024,1440,1920]) {
      const page=await browser.newPage({width,height:900,mobile:width<768});await page.goto(origin+route);await page.eval(()=>document.fonts.ready.then(()=>true));
      const info=await page.eval(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,deadAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),sections:document.querySelectorAll('.legal-section').length,contents:document.querySelectorAll('.legal-rail nav a').length,draft:document.querySelector('.legal-notice').textContent,robots:document.querySelector('meta[name="robots"]').content,footerLinks:[...document.querySelectorAll('.site-footer a')].map(a=>a.getAttribute('href')),mail:document.querySelector('.legal-contact>a').getAttribute('href')}));
      assert.equal(info.overflow,false,`${route} overflow at ${width}`);assert.equal(info.h1,1);assert.deepEqual(info.deadAnchors,[]);assert.equal(info.sections,11);assert.equal(info.contents,11);assert.match(info.draft,/not been adopted/);assert.match(info.robots,/noindex/);assert.ok(info.footerLinks.includes('/privacy-policy'));assert.ok(info.footerLinks.includes('/terms-and-conditions'));assert.equal(info.mail,'mailto:ngigemwaniki2004@gmail.com');
      await page.eval(()=>document.querySelector('.legal-rail nav a').click());
      assert.equal(await page.eval(()=>location.hash),'#scope');
      await page.eval(()=>scrollTo({top:0,behavior:'instant'}));await new Promise(r=>setTimeout(r,300));
      await page.screenshot({path:`${output}/${route.slice(1)}-${width}.jpg`,fullPage:true});
      assert.deepEqual(page.consoleErrors,[]);results.push({route,width,...info});await page.close();
    }
    const page=await browser.newPage({width:375,height:900,reducedMotion:true});await page.send('Emulation.setScriptExecutionDisabled',{value:true});await page.goto(origin+route);assert.equal(await page.eval(()=>document.querySelectorAll('.legal-section').length),11);assert.equal(await page.eval(()=>document.querySelectorAll('.legal-rail nav a').length),11);await page.close();
  }
  for(const route of ['/','/about','/projects','/contact']){const response=await fetch(origin+route);assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes('href="/privacy-policy"'));assert.ok(html.includes('href="/terms-and-conditions"'));}
  writeFileSync(`${output}/results.json`,JSON.stringify({passed:true,results,noScript:true,reducedMotion:true,sharedFooter:true},null,2));console.log('PASS: both legal routes at six widths, contents anchors, footer links on all pages, no-script content and draft metadata.');
} finally {await browser.close();}
