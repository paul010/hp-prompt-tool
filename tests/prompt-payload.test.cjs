const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const app = path.resolve(__dirname, '../prompt-tool');
const ts = require(path.join(app, 'node_modules/typescript'));
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(name, ...args) {
  if (name.startsWith('@/')) name = path.join(app, 'src', name.slice(2));
  return originalResolve.call(this, name, ...args);
};
require.extensions['.ts'] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, file);
process.chdir(app);
const { getPromptCatalog } = require(path.join(app, 'src/lib/prompt-catalog.ts'));
const { queryPrompts } = require(path.join(app, 'src/lib/prompt-query.ts'));
const { getLocalized } = require(path.join(app, 'src/lib/i18n.ts'));
function baseline(prompts, q) {
  const language=q.language||'zh-CN';
  const name=p=>typeof p.name==='string'?(language.startsWith('zh')?p.nameZh||p.name:p.name):getLocalized(p.name,language);
  const result=prompts.filter(p=>{
    const search=(q.search||'').toLowerCase();
    if(search && ![name(p),getLocalized(p.description,language),getLocalized(p.content,language),...p.tags].some(x=>x.toLowerCase().includes(search)))return false;
    return (!q.scenario||p.scenario===q.scenario)&&(!q.platform||p.recommendedPlatforms.includes(q.platform))&&(!q.difficulty||p.difficulty===q.difficulty);
  });
  if(q.sort==='name')result.sort((a,b)=>name(a).localeCompare(name(b)));
  if(q.sort==='difficulty'){const rank={'入门':1,'进阶':2,'专家':3};result.sort((a,b)=>rank[a.difficulty]-rank[b.difficulty]);}
  return result;
}
(async()=>{
 const { prompts,version }=await getPromptCatalog();
 assert(prompts.length>100,'Real catalogue loaded, not local-only fallback');
 assert.equal((await getPromptCatalog()).version,version);
 assert.equal(new Set(prompts.map(p=>p.id)).size,prompts.length,'Detail IDs must be unique');
 let cases=0;
 for(const language of ['zh-CN','en','ja'])for(const scenario of ['',...new Set(prompts.map(p=>p.scenario))])for(const search of ['', 'email','data', 'nonexistentwordabcxyz'])for(const sort of ['relevance','name','difficulty']) {
  const q={language,scenario,search,sort,page:1,pageSize:24};const expected=baseline(prompts,q);const actual=queryPrompts(prompts,q,version);
  assert.equal(actual.total,expected.length);assert.deepEqual(actual.prompts.map(p=>p.id),expected.slice(0,24).map(p=>p.id));cases++;
 }
 for(const platform of ['copilot','claude','midjourney'])for(const difficulty of ['入门','进阶','专家']) {
  const q={platform,difficulty,pageSize:12,page:2};const expected=baseline(prompts,q);const actual=queryPrompts(prompts,q,version);const page=Math.max(1,Math.min(2,Math.ceil(expected.length/12)));
  assert.equal(actual.total,expected.length);assert.deepEqual(actual.prompts.map(p=>p.id),expected.slice((page-1)*12,page*12).map(p=>p.id));cases++;
 }
 // Search a phrase appearing in a body, not title/description/tags.
 const fulltext=prompts.find(p=>typeof p.content==='string'&&p.content.length>1000);
 const phrase=fulltext.content.slice(700,740);
 assert(queryPrompts(prompts,{search:phrase},version).total>0,'Body-only fulltext search');
 for(const n of [-1,0,Infinity,NaN,999999])assert(queryPrompts(prompts,{page:n},version).page>=1);
 assert.equal(queryPrompts(prompts,{pageSize:10000},version).pageSize,24);
 let maxPageBytes=0;for(let page=1;page<=Math.ceil(prompts.length/48);page++){
  const result=queryPrompts(prompts,{page,pageSize:48},version);
  for(const p of result.prompts){assert.equal(p.content,'');assert.equal(p.contentZh,undefined);assert.equal(p.examples,undefined);}
  maxPageBytes=Math.max(maxPageBytes,Buffer.byteLength(JSON.stringify(result)));
 }
 const maxDetailBytes=Math.max(...prompts.map(p=>Buffer.byteLength(JSON.stringify(p))));
 assert(maxPageBytes<512*1024,`Page budget exceeded: ${maxPageBytes}`);
 assert(maxDetailBytes<3*1024*1024,`Detail budget exceeded: ${maxDetailBytes}`);
 console.log(JSON.stringify({passed:true,queryCases:cases,prompts:prompts.length,version,maxPageBytes,maxDetailBytes,initialPageBytes:Buffer.byteLength(JSON.stringify(queryPrompts(prompts,{},version)))},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
