import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
const url=process.env.TEST_URL||'http://localhost:3100';
const testContact = process.env.SKIP_CONTACT_TESTS !== '1';
const out='.taste-skill/qa';mkdirSync(out,{recursive:true});
const browser=await Browser.launch();const results=[];
const settle=page=>page.eval(()=>new Promise(resolve=>setTimeout(resolve,180)));
const key=async(page,key,code)=>{await page.send('Input.dispatchKeyEvent',{type:'keyDown',key,code:key,windowsVirtualKeyCode:code});await page.send('Input.dispatchKeyEvent',{type:'keyUp',key,code:key,windowsVirtualKeyCode:code});await settle(page);};
async function terrainTest(page,type='mouse'){
 const before=await page.eval(()=>document.querySelector('.plate-foot').textContent);
 await page.eval(type=>{const svg=document.querySelector('.plate svg');const rect=svg.getBoundingClientRect();svg.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerType:type,clientX:rect.left+rect.width*.25,clientY:rect.top+rect.height*.7}));},type);
 await settle(page);
 assert.notEqual(await page.eval(()=>document.querySelector('.plate-foot').textContent),before);
 await page.eval(()=>document.querySelector('.plate svg').dispatchEvent(new PointerEvent('pointerout',{bubbles:true,relatedTarget:document.body})));
 await settle(page);assert.equal(await page.eval(()=>document.querySelector('.plate-foot').textContent),before);
}
try{
 for(const width of [320,375,768,1024,1440,1920]){
  const page=await browser.newPage({width,height:900,mobile:width<768});await page.goto(url);await settle(page);await page.eval(()=>document.fonts.ready.then(()=>true));
  const info=await page.eval(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,sections:['top','about','capabilities','approach','lab','contact'].every(id=>document.getElementById(id)),invalidLinks:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),title:document.title,fonts:['Bricolage Grotesque','Instrument Sans','IBM Plex Mono'].every(name=>[...document.fonts].some(face=>face.family===name&&face.status==='loaded'))}));
  assert.equal(info.overflow,false,`overflow at ${width}`);assert.equal(info.h1,1);assert.equal(info.sections,true);assert.equal(info.fonts,true);assert.deepEqual(info.invalidLinks,[]);assert.match(info.title,/LenanaLabs/);
  await terrainTest(page);await terrainTest(page,'touch');
  if(width===1440){
   const counts=await page.eval(()=>{
    const svg=document.querySelector('.plate svg');const rect=svg.getBoundingClientRect();
    const originalRequest=window.requestAnimationFrame,originalCancel=window.cancelAnimationFrame;
    let requested=0,cancelled=0;
    window.requestAnimationFrame=callback=>{requested++;return originalRequest(callback);};
    window.cancelAnimationFrame=id=>{cancelled++;originalCancel(id);};
    for(let i=0;i<40;i++)svg.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,clientX:rect.left+40+i,clientY:rect.top+80}));
    svg.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true}));
    window.requestAnimationFrame=originalRequest;window.cancelAnimationFrame=originalCancel;
    return {requested,cancelled};
   });
   assert.deepEqual(counts,{requested:1,cancelled:1},'continuous updates are batched and pending work cancels');
   await settle(page);
   await page.eval(()=>{
    const svg=document.querySelector('.plate svg'),rect=svg.getBoundingClientRect();
    svg.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerType:'touch',clientX:rect.left+rect.width*.3,clientY:rect.top+rect.height*.6}));
    svg.dispatchEvent(new PointerEvent('pointerout',{bubbles:true,pointerType:'touch',relatedTarget:document.body}));
   });
   await settle(page);assert.doesNotMatch(await page.eval(()=>document.querySelector('.plate-foot').textContent),/X 214Y 196/);
   await page.eval(()=>document.querySelector('.plate svg').dispatchEvent(new PointerEvent('pointercancel',{bubbles:true})));await settle(page);
   await page.eval(()=>{
    const svg=document.querySelector('.plate svg'),rect=svg.getBoundingClientRect(),original=window.requestAnimationFrame;
    window.requestAnimationFrame=undefined;
    svg.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:rect.left+60,clientY:rect.top+60}));
    window.requestAnimationFrame=original;
   });await settle(page);assert.doesNotMatch(await page.eval(()=>document.querySelector('.plate-foot').textContent),/X 214Y 196/);
   await page.eval(()=>document.querySelector('.plate svg').dispatchEvent(new PointerEvent('pointercancel',{bubbles:true})));await settle(page);
  }
  await page.eval(()=>document.querySelector('.plate svg').focus());await key(page,'ArrowLeft',37);assert.match(await page.eval(()=>document.querySelector('.plate-foot').textContent),/X 204/);await key(page,'Home',36);
  await page.eval(()=>window.scrollTo(0,0));await settle(page);await page.screenshot({path:`${out}/${width}-hero.jpg`});
  for(const section of ['about','capabilities','approach','lab','contact']){await page.eval(id=>document.getElementById(id).scrollIntoView({behavior:"instant"}),section);await settle(page);await page.screenshot({path:`${out}/${width}-${section}.jpg`});}
  if(width===375){
   await page.eval(()=>document.querySelector('.menu-btn').click());await settle(page);
   assert.equal(await page.eval(()=>document.querySelector('dialog').open),true);
   assert.equal(await page.eval(()=>document.body.style.overflow),'hidden');
   assert.equal(await page.eval(()=>document.activeElement.className),'mm-close');
   await page.eval(()=>document.querySelector('dialog nav a:last-child').focus());await key(page,'Tab',9);
   assert.equal(await page.eval(()=>document.querySelector('dialog').contains(document.activeElement)),true);
   await key(page,'Escape',27);assert.equal(await page.eval(()=>document.querySelector('dialog').open),false);assert.equal(await page.eval(()=>document.activeElement.className),'menu-btn');
   await page.eval(()=>document.querySelector('.menu-btn').click());await settle(page);await page.eval(()=>document.querySelector('dialog a[href="/#contact"]').click());await settle(page);assert.equal(await page.eval(()=>document.querySelector('dialog').open),false);
   if (testContact) {
   await page.eval(()=>document.querySelector('.brief').requestSubmit());await settle(page);assert.equal(await page.eval(()=>document.querySelectorAll('.field-error').length),3);assert.equal(await page.eval(()=>document.activeElement.name),'name');
   await page.eval(()=>{document.querySelector('[name=name]').value='Amina';document.querySelector('[name=email]').value='invalid@';document.querySelector('[name=brief]').value='A test problem';document.querySelector('.brief').requestSubmit();});await settle(page);assert.equal(await page.eval(()=>document.querySelectorAll('.field-error').length),1);
   await page.eval(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__copiedEmail=text;}}}));
   await page.eval(()=>document.querySelector('.copy-btn').click());await settle(page);assert.match(await page.eval(()=>document.querySelector('.copy-state').textContent),/copied/);assert.equal(await page.eval(()=>window.__copiedEmail),'ngigemwaniki2004@gmail.com');
   await page.eval(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied');}}}));await page.eval(()=>document.querySelector('.copy-btn').click());await settle(page);assert.equal(await page.eval(()=>document.activeElement.className),'copy-fallback');

   await page.send('Fetch.enable',{patterns:[{urlPattern:'mailto:*',requestStage:'Request'}]});
   await page.eval(()=>{document.querySelector('[name=email]').value='amina@example.com';document.querySelector('.brief').requestSubmit();});await settle(page);assert.equal(await page.eval(()=>document.querySelectorAll('.field-error').length),0);assert.match(await page.eval(()=>document.querySelector('.form-status').textContent),/Review and send/);
   }
   await page.eval(()=>document.querySelector('.menu-btn').click());await settle(page);await page.setViewport({width:1440,height:900});await settle(page);assert.equal(await page.eval(()=>document.querySelector('dialog').open),false);assert.equal(await page.eval(()=>document.body.style.overflow),'');
  }
  assert.deepEqual(page.consoleErrors,[],`browser errors at ${width}`);results.push(info);await page.eval(()=>window.scrollTo({top:document.body.scrollHeight,behavior:'instant'}));await settle(page);await page.screenshot({path:out+'/'+width+'-footer.jpg'});await page.close();
 }
 const reduced=await browser.newPage({width:375,height:900,reducedMotion:true});await reduced.goto(url);await settle(reduced);assert.equal(await reduced.eval(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);await terrainTest(reduced,'touch');await reduced.close();
 const noScript=await browser.newPage({width:375,height:900});await noScript.send('Emulation.setScriptExecutionDisabled',{value:true});await noScript.goto(url);assert.equal(await noScript.eval(()=>document.querySelectorAll('.no-script-nav a').length),5);assert.equal(await noScript.eval(()=>document.querySelectorAll('.contour').length),24);if(testContact) assert.ok(await noScript.eval(()=>document.querySelector('a[href^="mailto:"]')));await noScript.close();
 const missingUrl = `${url}/__lenanalabs_missing_page__`;
 assert.equal((await fetch(missingUrl)).status,404,'unknown routes return an HTTP 404');
 const missing=await browser.newPage({width:320,height:900,mobile:true});await missing.goto(missingUrl);
 for(const width of [320,375,768,1024,1440,1920]) {
  await missing.setViewport({width,height:900,mobile:width<768});await settle(missing);
  assert.equal(await missing.eval(()=>document.documentElement.scrollWidth>innerWidth),false,`404 overflow at ${width}`);
  assert.equal(await missing.eval(()=>document.querySelectorAll('h1').length),1);
  assert.match(await missing.eval(()=>document.title),/Page not found/);
  assert.equal(await missing.eval(()=>document.querySelector('.error-copy .btn').getAttribute('href')),'/');
  assert.equal(await missing.eval(()=>document.querySelector('.error-copy .link-arrow').getAttribute('href')),'/#contact');
  await missing.screenshot({path:`${out}/${width}-404.jpg`,fullPage:true});
 }
 await missing.eval(()=>document.querySelector('.error-copy .btn').click());await settle(missing);
 assert.equal(await missing.eval(()=>location.pathname),'/');
 assert.deepEqual(missing.consoleErrors,[]);await missing.close();
 writeFileSync(`${out}/smoke-results.json`,JSON.stringify({passed:true,contactChecks:testContact?'passed':'skipped at user request',viewports:results,checks:['anchors','overflow','all sections','loaded fonts','pointer sampling','touch sampling','pointer exit','keyboard sampling','animation-frame batching and cancellation','missing animation-frame support','menu focus containment','Escape and focus restoration','body scroll','resize','reduced motion','no JavaScript content','custom 404 HTTP status','404 at six widths','404 return-home navigation']},null,2));console.log('PASS: six viewports, terrain, navigation, reduced motion, no-script content, and custom 404. Contact checks: '+(testContact?'passed':'skipped.'));
}finally{await browser.close();}
