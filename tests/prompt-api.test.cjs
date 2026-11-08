const assert = require('node:assert/strict');
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3108';
let checks=0;
async function get(path,status=200){const r=await fetch(base+path);assert.equal(r.status,status,path);checks++;return r;}
(async()=>{
 const home=await (await get('/')).text();assert(Buffer.byteLength(home)<1024*1024);checks++;
 const listResponse=await get('/api/prompts');assert.equal(listResponse.headers.get('cache-control'),'private, no-store');
 const list=await listResponse.json();assert(list.totalAll>100);assert.equal(list.prompts.length,24);assert(list.prompts.every(p=>p.content===''&&!p.contentZh&&!p.examples));checks+=3;
 const one=list.prompts[0];const detail=await (await get(`/api/prompts/${encodeURIComponent(one.id)}?version=${list.version}`)).json();assert.equal(detail.id,one.id);assert(detail.content);checks+=2;
 await get(`/api/prompts/${encodeURIComponent(one.id)}?version=obsolete`,409);
 await get(`/api/prompts/${encodeURIComponent(one.id)}`,409);
 await get(`/api/prompts/not-a-real-id?version=${list.version}`,404);
 const page2=await (await get('/api/prompts?page=2&pageSize=24')).json();assert.equal(page2.page,2);assert(!page2.prompts.some(p=>list.prompts.some(q=>p.id===q.id)));checks+=2;
 const clamped=await (await get('/api/prompts?page=999999&pageSize=48')).json();assert.equal(clamped.page,clamped.totalPages);checks++;
 const invalid=await (await get('/api/prompts?language=__proto__&page=NaN&pageSize=100000')).json();assert.equal(invalid.page,1);assert.equal(invalid.pageSize,24);assert.deepEqual(invalid.prompts,list.prompts);checks+=3;
 const empty=await (await get('/api/prompts?search=nonexistentwordabcxyz')).json();assert.equal(empty.total,0);assert.equal(empty.page,1);assert.deepEqual(empty.prompts,[]);checks+=3;
 const phrase=typeof detail.content==='string'?detail.content.slice(50,90):Object.values(detail.content)[0].slice(50,90);
 const full=await (await get('/api/prompts?search='+encodeURIComponent(phrase))).json();assert(full.prompts.some(p=>p.id===detail.id));checks++;
 for(const p of ['/?difficulty=%E8%BF%9B%E9%98%B6','/api/prompts?platform=copilot&difficulty=%E5%85%A5%E9%97%A8&sort=name','/api/prompts?language=en&sort=difficulty'])await get(p);
 console.log(JSON.stringify({passed:true,checks,base,total:list.totalAll,version:list.version,homeBytes:Buffer.byteLength(home),listBytes:Buffer.byteLength(JSON.stringify(list)),detailBytes:Buffer.byteLength(JSON.stringify(detail))},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
