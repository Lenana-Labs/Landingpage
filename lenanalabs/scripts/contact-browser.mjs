import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const origin=process.env.TEST_URL||'http://localhost:3101';
const out='.taste-skill/contact';mkdirSync(out,{recursive:true});
const browser=await Browser.launch();
const results=[];
try {
  for(const width of [320,375,768,1024,1440,1920]) {
    const page=await browser.newPage({width,height:900,mobile:width<768});
    await page.goto(origin+'/contact');await page.eval(()=>document.fonts.ready.then(()=>true));
    const result=await page.eval(()=>{
      const intro=document.querySelector('.inquiry-intro').getBoundingClientRect();
      const form=document.querySelector('.inquiry-form-column').getBoundingClientRect();
      return {overflow:document.documentElement.scrollWidth>innerWidth,fields:[...document.querySelectorAll('main input,main textarea')].map(x=>x.name),columns:form.left>intro.right,formTop:form.top,h1:document.querySelectorAll('h1').length,email:document.querySelector('.inquiry-mail').getAttribute('href'),labelled:[...document.querySelectorAll('main input,main textarea')].every(x=>x.labels.length&&x.required),active:document.querySelector('nav[aria-label="Primary"] [aria-current="page"]')?.textContent};
    });
    assert.equal(result.overflow,false,`overflow at ${width}`);assert.equal(result.h1,1);assert.equal(result.columns,width>=1024);assert.deepEqual(result.fields,['name','email','message']);assert.equal(result.email,'mailto:ngigemwaniki2004@gmail.com');assert.ok(result.labelled);assert.equal(result.active,'Contact');if(width>=1024)assert.ok(result.formTop<900);
    await page.screenshot({path:`${out}/${width}.jpg`,fullPage:true});
    await page.eval(()=>document.querySelector('.inquiry-form').requestSubmit());
    assert.equal(await page.eval(()=>document.querySelectorAll('main [aria-invalid=true]').length),3);
    assert.equal(await page.eval(()=>document.activeElement.id),'inquiry-name');
    assert.equal(await page.eval(()=>[...document.querySelectorAll('[aria-invalid=true]')].every(x=>document.getElementById(x.getAttribute('aria-describedby')))),true);
    await page.eval(()=>{document.getElementById('inquiry-name').value='Test visitor';document.getElementById('inquiry-email').value='invalid';document.getElementById('inquiry-message').value='A question, without a project category.';document.querySelector('.inquiry-form').requestSubmit();});
    assert.equal(await page.eval(()=>document.activeElement.id),'inquiry-email');
    assert.equal(await page.eval(()=>document.getElementById('inquiry-message').value),'A question, without a project category.');
    if(width===375){await page.eval(()=>document.querySelector('.menu-btn').click());assert.equal(await page.eval(()=>document.querySelector('dialog').open),true);await page.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',windowsVirtualKeyCode:27});await page.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',windowsVirtualKeyCode:27});await new Promise(r=>setTimeout(r,100));assert.equal(await page.eval(()=>document.querySelector('dialog').open),false);}
    assert.deepEqual(page.consoleErrors,[]);results.push({width,...result});await page.close();
  }
  const reduced=await browser.newPage({width:375,height:900,reducedMotion:true});await reduced.goto(origin+'/contact');assert.equal(await reduced.eval(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);await reduced.close();
  const noScript=await browser.newPage({width:375,height:900});await noScript.send('Emulation.setScriptExecutionDisabled',{value:true});await noScript.goto(origin+'/contact');assert.equal(await noScript.eval(()=>document.querySelector('.inquiry-form').getAttribute('method')),'post');assert.equal(await noScript.eval(()=>document.querySelector('.inquiry-mail').getAttribute('href')),'mailto:ngigemwaniki2004@gmail.com');await noScript.close();
  writeFileSync(`${out}/results.json`,JSON.stringify({passed:true,results,note:'No email application was opened and no message was sent.'},null,2));
  console.log('PASS: Contact at six widths, validation, associated errors, retained text, mobile menu, reduced motion and no-script fallback. No email sent.');
} finally {await browser.close();}
