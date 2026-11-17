// Server markup for isolated browser fixtures. Never imported by the application.
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { source } from './test-source.mjs';
export async function projectHarness() {
  const { default: Content } = await source('src/components/projects/ProjectsContent.tsx');
  const fixture=(id,category,extra={})=>({id,category,title:`Test-only ${id}`,description:'Browser fixture only. Never production project data.',status:'prototype',visibility:'public',...extra});
  return renderToStaticMarkup(createElement(Content,{entries:[
    fixture('product','product'),fixture('client','client',{featured:true,client:{approvedForPublication:true,name:'Approved fixture client'}}),
    fixture('experiment','experiment'),fixture('long-experiment','experiment',{title:'An operations system designed for intermittent power and unreliable connectivity',description:'A detailed test description. '.repeat(12)}),
    fixture('private-draft','experiment',{visibility:'draft',status:'published',featured:true}),
  ]}));
}
