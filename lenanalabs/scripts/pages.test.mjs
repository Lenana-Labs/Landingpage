import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { source } from './test-source.mjs';

const data = await source('src/data/projects.ts');
const { filterProjects } = await source('src/lib/project-filters.ts');
const { default: Content } = await source('src/components/projects/ProjectsContent.tsx');
const { default: Team } = await source('src/components/about/TeamSection.tsx');
const { default: DecisionTree } = await source('src/components/about/DecisionTree.tsx');
const { default: Method } = await source('src/components/about/Method.tsx');
const { default: Beliefs } = await source('src/components/about/Beliefs.tsx');
const { teamMembers } = await source('src/data/team.ts');
const render = (Component, props) => renderToStaticMarkup(createElement(Component, props));
const fixture = (id, overrides = {}) => ({ id, title: `Test-only ${id}`, description: 'Automated fixture, never public data.', category: 'experiment', status: 'prototype', visibility: 'public', ...overrides });

test('publication is opt-in and independent of engineering status', () => {
  const entries = [fixture('draft', { visibility: 'draft', status: 'published' }), fixture('implicit', { visibility: undefined, status: 'published' }), fixture('approved')];
  assert.deepEqual(data.getPublicProjects(entries).map(project => project.id), ['approved']);
  assert.equal(data.getPublicProjects([fixture('private-client', { category: 'client' })]).length, 0);
  assert.equal(data.getPublicProjects([fixture('approved-client', { category: 'client', client: { approvedForPublication: true } })]).length, 1);
});

test('duplicate and unsafe slugs are rejected without draft records affecting public counts', () => {
  assert.equal(data.getPublicProjects([fixture('a', { slug: 'duplicate' }), fixture('b', { slug: 'duplicate' })]).length, 0);
  for (const slug of ['../private', 'Has Spaces', 'https://bad.test', 'unsafe?x']) assert.equal(data.getPublicProjects([fixture('a', { slug })]).length, 0);
  assert.equal(data.getPublicProjects([fixture('a'), fixture('a', { visibility: 'draft' })]).length, 1);
});

test('public projection omits unapproved metadata and unsafe URLs', () => {
  const [project] = data.getPublicProjects([fixture('a', { privateNotes: 'CONFIDENTIAL', client: { approvedForPublication: false, name: 'UNAPPROVED' }, url: 'javascript:alert(1)', image: {src:'//bad.test/image',alt:'bad'}, caseStudy: { url:'https://name:secret@example.com' } })]);
  assert.equal(project.url, undefined); assert.equal(project.image, undefined); assert.equal(project.caseStudy.url, undefined);
  assert.doesNotMatch(JSON.stringify(project), /CONFIDENTIAL|UNAPPROVED|secret/);
  assert.equal(data.safeProjectUrl('https://example.com/tool'), 'https://example.com/tool');
  assert.equal(data.safeAssetSource('/images/approved.png'), '/images/approved.png');
  assert.equal(data.safeAssetSource('/../private.png'), undefined);
});

test('empty and draft-only archives render one honest empty presentation without filters or demo controls', () => {
  for (const entries of [[], [fixture('draft', {visibility:'draft'})]]) {
    const html = render(Content, {entries});
    assert.match(html, /The archive is taking shape/);
    assert.doesNotMatch(html, /Test-only|aria-pressed|Review states|Demonstration data|entry--featured/);
    assert.equal((html.match(/class="ip-mark"/g) || []).length, 0);
    assert.equal((html.match(/class="ip-placeholder"/g) || []).length, 9);
    for (const [category, count] of [['client',2],['product',4],['experiment',3]]) {
      const row = html.match(new RegExp(`data-category="${category}"([\\s\\S]*?)<span class="ip-count`))[1];
      assert.equal((row.match(/class="ip-placeholder"/g) || []).length, count);
    }
    assert.match(html, /Illustrative marks, not published projects/);
  }
});

test('one entry has no meaningless filters or inferred featured placement; missing optional fields are safe', () => {
  const html = render(Content, {entries:[fixture('one')]});
  assert.match(html, /Test-only one/); assert.doesNotMatch(html, /aria-pressed|entry--featured|Read case study|View project|Preview not available/);
  assert.equal((html.match(/class="ip-mark"/g) || []).length, 1);
  assert.doesNotMatch(html, /ip-placeholder|Layout placeholders/);
});

test('mixed public entries support explicit featured client work, filters, outcomes and real external links', () => {
  const entries = [fixture('ordinary'), fixture('featured', {category:'client',featured:true,client:{approvedForPublication:true,name:'Approved test client'},services:['Engineering'],technologies:['TypeScript'],caseStudy:{url:'https://example.com/case-study',outcomes:['Verified fixture outcome']}}), fixture('draft',{visibility:'draft'})];
  const html = render(Content, {entries});
  assert.ok(html.indexOf('Test-only featured',html.indexOf('id="project-entries"')) < html.indexOf('Test-only ordinary',html.indexOf('id="project-entries"')));
  assert.match(html, /entry--featured/); assert.match(html, /Approved test client/); assert.match(html, /Verified fixture outcome/); assert.match(html, /noopener noreferrer/);
  assert.doesNotMatch(html, /Test-only draft/);
  assert.equal((html.match(/class="ip-mark"/g) || []).length, 2);
  assert.equal((html.match(/aria-pressed=/g) || []).length, 3);
  const publicEntries = data.getPublicProjects(entries);
  assert.deepEqual(filterProjects(publicEntries, 'client').map(project => project.id), ['featured']);
  assert.equal(filterProjects(publicEntries, 'all').length, 2);
  assert.equal(filterProjects(publicEntries, 'product').length, 0);
});

test('legacy category/status normalize and long text remains intact without dead case-study links', () => {
  const title = 'A long test title '.repeat(35);
  const [normalized] = data.getPublicProjects([fixture('legacy', {category:'open-source',status:'active',title})]);
  assert.equal(normalized.category,'experiment');assert.equal(normalized.status,'in-development');
  const html=render(Content,{entries:[fixture('long',{title,description:'Long description '.repeat(70)})]});
  assert.match(html,/A long test title/);assert.doesNotMatch(html,/Case study|href="\/projects\//);
});

test('team supports three equally weighted profiles, monograms, optional fields and additional members', () => {
  const members = Array.from({length:3},(_,index)=>({id:`test-${index}`,name:`Fixture Person ${index}`,role:'Test role'}));
  const html = render(Team,{members});
  assert.equal((html.match(/class="profile"/g)||[]).length,3);assert.equal((html.match(/class="monogram"/g)||[]).length,3);
  assert.doesNotMatch(html,/p-bio|p-focus|p-tags|profile-links|team-toggle|team-empty/);
  assert.equal((render(Team,{members:[...members,{id:'extra',name:'Extra Fixture',role:'Testing',links:[{label:'Unsafe',href:'javascript:alert(1)'}]}]}).match(/class="profile"/g)||[]).length,4);
  assert.equal(teamMembers.length,3,'the owner requested three clearly labelled placeholders');
  assert.ok(teamMembers.every(member => member.role === 'Profile placeholder'));
  assert.doesNotMatch(render(Team),/Name Surname|Role title|No public profiles|Show empty|Demonstration profiles/);
});

test('decision tree has six explanations, native disclosure, mobile fallback and five process steps', () => {
  const html=render(DecisionTree);
  assert.match(html,/<details/);assert.match(html,/<summary>What was cut, and why/);
  assert.match(html,/class="tree-list"/);assert.match(html,/Illustrative, not a recorded client decision/);
  assert.equal((render(Method).match(/class="step"/g)||[]).length,5);
  assert.equal((render(Beliefs).match(/class="belief"/g)||[]).length,4);
});

test('approved local imagery uses the existing image pipeline with alternatives and stable dimensions', () => {
  const html=render(Content,{entries:[fixture('image',{featured:true,image:{src:'/icon.svg',alt:'Test-only project illustration'}})]});
  assert.match(html,/alt="Test-only project illustration"/);assert.match(html,/feature-visual/);
  const team=render(Team,{members:[{id:'portrait',name:'Portrait Fixture',role:'Testing',portrait:{src:'/icon.svg',alt:'Test-only portrait'}}]});
  assert.match(team,/alt="Test-only portrait"/);assert.match(team,/data-nimg="fill"/);
});
