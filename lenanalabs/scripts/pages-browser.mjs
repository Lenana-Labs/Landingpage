import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { source } from './test-source.mjs';
import { projectHarness } from './project-harness.mjs';
import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const origin = process.env.TEST_URL || 'http://localhost:3100';
const output = '.taste-skill/pages';
mkdirSync(output, { recursive: true });
const widths = [320, 375, 768, 1024, 1440, 1920];
const { default: Team } = await source('src/components/about/TeamSection.tsx');
const teamFixture = renderToStaticMarkup(createElement(Team, {members:Array.from({length:3},(_,index)=>({id:`fixture-${index}`,name:`Test Profile ${index+1}`,role:'Automated test fixture',bio:'This profile exists only in this browser test and is never production data.',expertise:['Testing']}))}));
const browser = await Browser.launch();
const results = [];
const settle = page => page.eval(() => new Promise(resolve => setTimeout(resolve, 180)));
const key = async (page, key, code) => {
  await page.send('Page.bringToFront');
  await page.send('Input.dispatchKeyEvent', {type:'keyDown',key,code:key,windowsVirtualKeyCode:code,...(key==='Enter'?{text:'\r',unmodifiedText:'\r'}:{})});
  await page.send('Input.dispatchKeyEvent', {type:'keyUp',key,code:key,windowsVirtualKeyCode:code});
  await settle(page);
};
try {
  for (const path of ['/about','/projects']) {
    assert.equal((await fetch(origin+path)).status,200);
    for (const width of widths) {
      const page = await browser.newPage({width,height:900,mobile:width<768});
      await page.goto(origin+path); await page.eval(()=>document.fonts.ready.then(()=>true));
      const result = await page.eval(() => ({
        overflow:document.documentElement.scrollWidth>innerWidth,
        headings:document.querySelectorAll('h1').length,
        brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),
        active:document.querySelector('nav[aria-label="Primary"] [aria-current="page"]')?.textContent,
        forbidden:[...document.querySelectorAll('.team-toggle,.team-empty,[data-team],.state-switch,.demo-banner')].length,
        text:document.querySelector('main').textContent,
      }));
      assert.equal(result.overflow,false,`${path} overflow at ${width}`);assert.equal(result.headings,1);assert.deepEqual(result.brokenAnchors,[]);assert.equal(result.forbidden,0);
      assert.equal(result.active,path==='/about'?'About':'Projects');
      assert.doesNotMatch(result.text,/Name Surname|Role title|Demonstration profiles|Test-only|reconciliation engine/i);
      await page.screenshot({path:`${output}/${path.slice(1)}-${width}-hero.jpg`});
      await page.screenshot({path:`${output}/${path.slice(1)}-${width}-page.jpg`,fullPage:true});
      if(path==='/about') {
        assert.equal(await page.eval(()=>['story','beliefs','method','explore','team'].every(id=>Boolean(document.getElementById(id)))),true);
        assert.equal(await page.eval(()=>document.querySelectorAll('.step').length),5);
        assert.equal(await page.eval(()=>document.querySelectorAll('.profile').length),3);
        if(width>720) {
          await page.eval(()=>document.querySelector('.term').dispatchEvent(new PointerEvent('pointerover',{bubbles:true,pointerType:'mouse'})));await settle(page);
          assert.match(await page.eval(()=>document.querySelector('.tree-readout').textContent),/traffic/);
          await page.eval(()=>document.querySelector('.tree-details summary').focus());await key(page,'Enter',13);
          assert.equal(await page.eval(()=>document.querySelector('.tree-details').open),true);
          assert.equal(await page.eval(()=>document.querySelectorAll('.tree-details li').length),6);
        } else assert.notEqual(await page.eval(()=>getComputedStyle(document.querySelector('.tree-list')).display),'none');
        for(const section of ['method','explore']) {
          await page.eval(id=>document.getElementById(id).scrollIntoView({behavior:'instant'}),section);await settle(page);
          await page.screenshot({path:`${output}/about-${width}-${section}.jpg`});
        }
        // Isolated test DOM only: exercise real team CSS without publishing invented identities.
        await page.eval(html=>{document.getElementById('team').outerHTML=html;document.getElementById('team').scrollIntoView({behavior:'instant'});},teamFixture);
        assert.equal(await page.eval(()=>document.querySelectorAll('.profile').length),3);
        assert.equal(await page.eval(()=>document.documentElement.scrollWidth>innerWidth),false);
        await page.screenshot({path:`${output}/team-fixture-${width}.jpg`});
      } else {
        assert.match(result.text,/The archive is taking shape/);
        if(width<=1100) {
          const composition=await page.eval(()=>{
            const title=document.querySelector('.projects-hero h1').getBoundingClientRect();
            const meta=document.querySelector('.archive-meta').getBoundingClientRect();
            return {titleBottom:title.bottom,metaTop:meta.top,titleLeft:title.left,metaLeft:meta.left};
          });
          assert.ok(composition.metaTop>=composition.titleBottom-1,'project metadata stacks below the headline');
          assert.ok(Math.abs(composition.titleLeft-composition.metaLeft)<2,'stacked project hero shares its left edge');
        }
        assert.equal(await page.eval(()=>document.querySelectorAll('.ip-mark,.filter,.entry').length),0);
        await page.eval(()=>{location.hash='demo';});await settle(page);
        assert.equal(await page.eval(()=>document.querySelectorAll('.entry').length),0);
      }
      if(width===375) {
        await page.eval(()=>document.querySelector('.menu-btn').click());await settle(page);
        assert.equal(await page.eval(()=>document.querySelector('dialog').open),true);
        assert.equal(await page.eval(()=>document.body.style.overflow),'hidden');
        await page.eval(()=>document.querySelector('dialog nav a:last-child').focus());await key(page,'Tab',9);
        assert.equal(await page.eval(()=>document.activeElement.className),'mm-close');
        await key(page,'Escape',27);assert.equal(await page.eval(()=>document.querySelector('dialog').open),false);
        assert.equal(await page.eval(()=>document.activeElement.className),'menu-btn');
      }
      assert.deepEqual(page.consoleErrors,[]);results.push({path,width,overflow:false,active:result.active});await page.close();
    }
  }
  for(const path of ['/about','/projects']) {
    const page=await browser.newPage({width:375,height:900,reducedMotion:true});await page.goto(origin+path);
    assert.equal(await page.eval(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);
    assert.equal(await page.eval(()=>getComputedStyle(document.querySelector('h1')).visibility),'visible');await page.close();
    const noScript=await browser.newPage({width:1440,height:900});await noScript.send('Emulation.setScriptExecutionDisabled',{value:true});await noScript.goto(origin+path);
    assert.equal(await noScript.eval(()=>document.querySelectorAll('.no-script-nav a').length),5);
    if(path==='/about'){await noScript.eval(()=>document.querySelector('details').open=true);assert.equal(await noScript.eval(()=>document.querySelectorAll('.tree-details li').length),6);}
    else assert.match(await noScript.eval(()=>document.querySelector('main').textContent),/The archive is taking shape/);
    await noScript.close();
  }
  const archiveCode = await projectHarness();
  const archivePage = await browser.newPage({width:1440,height:900});await archivePage.goto(origin+'/projects');
  await archivePage.eval(()=>{const root=document.createElement('div');root.id='archive-browser-fixture';root.className='shell';document.querySelector('main').replaceChildren(root);});
  await archivePage.eval(archiveCode);await settle(archivePage);
  assert.equal(await archivePage.eval(()=>document.querySelectorAll('.entry').length),3);
  assert.equal(await archivePage.eval(()=>document.querySelectorAll('.ip-mark').length),3);
  assert.doesNotMatch(await archivePage.eval(()=>document.querySelector('main').textContent),/private-draft/);
  await archivePage.eval(()=>[...document.querySelectorAll('.filter')].find(button=>button.textContent.startsWith('Client work')).click());await settle(archivePage);
  assert.equal(await archivePage.eval(()=>document.querySelectorAll('.entry').length),1);assert.equal(await archivePage.eval(()=>document.querySelectorAll('.ip-mark').length),1);
  assert.match(await archivePage.eval(()=>document.querySelector('.entry h3').textContent),/client/);
  await archivePage.eval(()=>[...document.querySelectorAll('.filter')].find(button=>button.textContent.startsWith('Internal products')).focus());await key(archivePage,'Enter',13);
  assert.match(await archivePage.eval(()=>document.querySelector('.entry h3').textContent),/product/);
  assert.equal(await archivePage.eval(()=>document.querySelector('.filter[aria-pressed="true"]').textContent.startsWith('Internal products')),true);
  await archivePage.eval(()=>document.querySelector('.filter').click());await settle(archivePage);
  for(const width of widths){await archivePage.setViewport({width,height:900,mobile:width<768});await settle(archivePage);assert.equal(await archivePage.eval(()=>document.documentElement.scrollWidth>innerWidth),false);await archivePage.screenshot({path:`${output}/projects-fixture-${width}.jpg`,fullPage:true});}
  assert.deepEqual(archivePage.consoleErrors,[]);await archivePage.close();
  assert.equal((await fetch(origin+'/projects/unapproved-slug')).status,404);
  writeFileSync(`${output}/results.json`,JSON.stringify({passed:true,emailChecks:'not run at user request',viewports:results,checks:['all sections','anchors','draft-free production data','no demo controls','decision pointer readout','native keyboard disclosure','mobile diagram fallback','team test-only fixture layout','project fixture pointer and keyboard filtering','filtered index matches visible entries','featured fixture and category layout at six widths','mobile focus containment','Escape and focus restoration','reduced motion','JavaScript-disabled static content','unapproved project slug 404']},null,2));
  console.log('PASS: About and Projects at six widths, diagrams, navigation, content integrity and no-script/reduced-motion checks. No email checks executed.');
} finally { await browser.close(); }
