import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Transpile the real source with the already-installed compiler; no additional framework.
mkdirSync('.taste-skill/testmodules', { recursive: true });
async function source(path, name) {
  let code = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  code = code.replaceAll('@/data/projects', './projects.mjs');
  const target = resolve(`.taste-skill/testmodules/${name}.mjs`);
  writeFileSync(target, code);
  return import(pathToFileURL(target).href);
}
const terrain = await source('src/lib/terrain.ts', 'terrain');
const contact = await source('src/lib/contact.ts', 'contact');
const projects = await source('src/data/projects.ts', 'projects');
const { default: Lab } = await source('src/components/sections/Lab.tsx', 'Lab');

test('terrain geometry is deterministic, closed, and finite', () => {
  assert.equal(terrain.contours.length, 24);
  assert.equal(terrain.ringPath(214,196,80,.7), terrain.ringPath(214,196,80,.7));
  assert.ok(terrain.contours.every(path => path.d.startsWith('M') && path.d.endsWith('Z') && !/NaN|Infinity/.test(path.d)));
});
test('elevation and coordinate bounds cover edges and invalid input', () => {
  for (let x = 0; x <= 400; x += 20) for (let y = 0; y <= 470; y += 10) assert.ok(terrain.sampleElevation(x,y) >= 2400 && terrain.sampleElevation(x,y) <= 8000);
  assert.deepEqual(terrain.clampPoint(-20,800), { x:0,y:470 });
  assert.deepEqual(terrain.clampPoint(NaN,Infinity), { x:214,y:196 });
  assert.ok(terrain.sampleElevation(214,196) > terrain.sampleElevation(0,0));
});
test('contact requires name, valid email and a brief', () => {
  assert.deepEqual(Object.keys(contact.validateBrief({ name:' ', email:'broken@', brief:'', focus:'Product' })), ['name','email','brief']);
  for (const email of ['a@', '@host.com', 'a b@example.com', 'a@host']) assert.ok(contact.validateBrief({name:'Amina',email,brief:'A real problem',focus:'Product'}).email);
  assert.deepEqual(contact.validateBrief({name:'Amina',email:'amina@example.com',brief:'A real problem',focus:'Product'}), {});
  assert.ok(contact.validateBrief({name:'A',email:'a@example.com',brief:'a'.repeat(2001),focus:'Product'}).brief);
});
test('fallback safely encodes an email draft without claiming delivery', () => {
  const link = contact.briefMailto('studio@example.com', {name:'Amina & team', email:'amina@example.com', brief:'A&B? #details\nSecond line',focus:'Research'});
  const url = new URL(link);
  assert.equal(url.protocol, 'mailto:');
  assert.match(url.searchParams.get('subject'), /Research/);
  assert.match(url.searchParams.get('body'), /A&B\? #details\nSecond line/);
});
test('Lab empty state and populated state use the same component', () => {
  assert.equal(projects.projects.length, 0);
  assert.match(renderToStaticMarkup(createElement(Lab)), /No public entries yet/);
  const fixture = {id:'fixture', title:'Test fixture', description:'For automated testing only.',category:'experiment',status:'prototype',url:'https://example.com/tool'};
  const populated = renderToStaticMarkup(createElement(Lab, {entries:[fixture]}));
  assert.match(populated, /1 entry/);
  assert.match(populated, /noopener noreferrer/);
  assert.match(populated, /href="https:\/\/example.com\/tool"/);
  assert.doesNotMatch(populated, /No public entries yet/);
  const unsafe = renderToStaticMarkup(createElement(Lab,{entries:[{...fixture,url:'javascript:alert(1)'}]}));
  assert.doesNotMatch(unsafe.match(/<article[\s\S]*?<\/article>/)[0], /href=/);
});
