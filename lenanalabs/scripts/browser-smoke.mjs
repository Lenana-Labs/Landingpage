import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const url = process.env.TEST_URL || 'http://localhost:3100';
const out = '.taste-skill/qa';
mkdirSync(out, { recursive: true });
const browser = await Browser.launch();
const results = [];
const settle = page => page.eval(() => new Promise(resolve => setTimeout(resolve, 150)));
try {
  for (const width of [360, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({ width, height: width >= 768 ? 720 : 900, mobile: width < 768 });
    await page.goto(url);
    const result = await page.eval(() => ({
      width: innerWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      h1: document.querySelectorAll('h1').length,
      invalidLinks: [...document.querySelectorAll('a[href]')].filter(a => {
        const href = a.getAttribute('href');
        return href === '#' || (href.startsWith('#') && !document.getElementById(href.slice(1)));
      }).map(a => a.textContent),
      brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
      missingLabels: [...document.querySelectorAll('button')].filter(button => !(button.textContent.trim() || button.getAttribute('aria-label'))).length,
      title: document.title,
      contactHeight: Math.ceil(document.querySelector('#contact').getBoundingClientRect().height),
    }));
    assert.equal(result.overflow, false, `Overflow at ${width}px`);
    assert.equal(result.h1, 1);
    assert.deepEqual(result.invalidLinks, []);
    assert.deepEqual(result.brokenImages, []);
    assert.equal(result.missingLabels, 0);
    assert.match(result.title, /Lenana Labs/);
    if (width >= 768 && result.contactHeight > 632) {
      await page.eval(() => document.querySelector('#contact').scrollIntoView());
      await settle(page);
      await page.screenshot({ path: `${out}/${width}-contact-diagnostic.jpg` });
      console.log(await page.eval(() => [...document.querySelectorAll('#contact, .contact-layout, .contact-layout > div, .project-brief > *')].map(element => ({ tag: element.tagName, class: element.className, height: element.getBoundingClientRect().height, width: element.getBoundingClientRect().width, display: getComputedStyle(element).display, position: getComputedStyle(element).position, contain: getComputedStyle(element).containIntrinsicSize }))));
    }
    if (width >= 768) assert.ok(result.contactHeight <= 632, `Contact section should fit a 720px laptop viewport, got ${result.contactHeight}px at ${width}px`);
    assert.deepEqual(page.consoleErrors, []);
    await page.screenshot({ path: `${out}/${width}-fold.jpg` });
    results.push(result);
    if (width === 1024) {
      await page.eval(() => document.querySelector('#contact').scrollIntoView());
      await settle(page);
      await page.screenshot({ path: `${out}/1024-contact.jpg` });
    }
    if (width === 390) {
      await page.send('Page.bringToFront');
      await page.eval(() => document.querySelector('.menu-trigger').focus());
      await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r', unmodifiedText: '\r' });
      await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
      await settle(page);
      assert.equal(await page.eval(() => document.querySelector('.menu-trigger').getAttribute('aria-expanded')), 'true');
      await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
      await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
      await settle(page);
      assert.equal(await page.eval(() => document.querySelector('#mobile-navigation').hidden), true);
      assert.equal(await page.eval(() => document.activeElement.className), 'menu-trigger');
      await page.eval(() => document.querySelector('.menu-trigger').click());
      await settle(page);
      await page.eval(() => document.querySelector('#mobile-navigation a').click());
      await settle(page);
      assert.equal(await page.eval(() => document.querySelector('#mobile-navigation').hidden), true);
      await page.eval(() => document.querySelector('input[value="AI & data"]').click());
      await settle(page);
      await page.eval(() => document.querySelector('textarea').focus());
      await page.send('Input.insertText', { text: 'Search our internal documents & help our team.' });
      await settle(page);
      const mailto = await page.eval(() => document.querySelector('.project-brief .action').href);
      assert.match(mailto, /^mailto:ngigemwaniki2004@gmail.com/);
      const query = new URL(mailto).searchParams;
      assert.match(query.get('subject'), /AI & data/);
      assert.match(query.get('body'), /Search our internal documents & help our team\./);
      await page.eval(() => document.querySelector('.product-copy a').click());
      await settle(page);
      assert.equal(await page.eval(() => document.activeElement.id), 'contact-heading');
      const contactTop = await page.eval(() => document.querySelector('#contact-heading').getBoundingClientRect().top);
      assert.ok(contactTop >= 72 && contactTop < 400, `Contact heading should be visible below the header, got ${contactTop}`);
      assert.match(await page.eval(() => document.querySelector('.enquiry-context').textContent), /Aethelgard Runtime/);
      const productMailto = await page.eval(() => document.querySelector('.project-brief .action').href);
      assert.match(new URL(productMailto).searchParams.get('subject'), /Aethelgard Runtime/);
      assert.match(new URL(productMailto).searchParams.get('body'), /Search our internal documents/);
      await page.screenshot({ path: `${out}/390-product-enquiry.jpg` });
      await page.eval(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.__copiedBrief = text; } } }));
      await page.eval(() => document.querySelector('.email-copy-button').click());
      await settle(page);
      assert.equal(await page.eval(() => window.__copiedBrief), 'ngigemwaniki2004@gmail.com');
      assert.match(await page.eval(() => document.querySelector('#copy-status').textContent), /Email address copied/);
      await page.eval(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Permission denied'); } } }));
      await page.eval(() => document.querySelector('.email-copy-button').click());
      await settle(page);
      assert.equal(await page.eval(() => document.querySelector('.copy-fallback').value), 'ngigemwaniki2004@gmail.com');
      assert.equal(await page.eval(() => document.activeElement.className), 'copy-fallback');
      await page.screenshot({ path: `${out}/390-copy-fallback.jpg` });
      await page.eval(() => document.querySelector('.enquiry-context button').click());
      await settle(page);
      assert.equal(await page.eval(() => document.activeElement.name), 'interest');
      assert.equal(await page.eval(() => document.querySelector('#project-summary').value), 'Search our internal documents & help our team.');
      await page.setViewport({ width: 1024, height: 900 });
      assert.equal(await page.eval(() => getComputedStyle(document.querySelector('.menu-trigger')).display), 'none');
    }
    await page.close();
  }
  const reduced = await browser.newPage({ width: 390, height: 900, reducedMotion: true });
  await reduced.goto(url);
  assert.equal(await reduced.eval(() => matchMedia('(prefers-reduced-motion: reduce)').matches), true);
  assert.equal(await reduced.eval(() => getComputedStyle(document.querySelector('h1')).visibility), 'visible');
  await reduced.close();
  const noScript = await browser.newPage({ width: 390, height: 900 });
  await noScript.send('Emulation.setScriptExecutionDisabled', { value: true });
  await noScript.goto(url);
  assert.equal(await noScript.eval(() => document.querySelectorAll('.no-script-nav a').length), 4);
  assert.equal(await noScript.eval(() => Boolean(document.querySelector('a[href^="mailto:ngigemwaniki2004@gmail.com"]'))), true);
  await noScript.close();
  writeFileSync(`${out}/smoke-results.json`, JSON.stringify({ passed: true, viewports: results, interactions: ['keyboard menu', 'Escape and focus return', 'close on navigation', 'brief email encoding', 'product enquiry context and focus', 'copy brief feedback with clipboard stub', 'clipboard failure recovery', 'context removal preserves draft and restores focus', 'desktop resize', 'reduced motion'] }, null, 2));
  console.log('PASS: five viewport checks, navigation keyboard behavior, project brief, reduced motion, no browser exceptions.');
} finally { await browser.close(); }
