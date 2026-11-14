const modules = window.sopModules || [];
const glossary = window.sopGlossary || [];

const conceptInfo = {
"S&OP":{type:"CORE PROCESS",title:"Sales & Operations Planning",desc:"A cross-functional business planning process that aligns demand, supply, and financial plans into one achievable operating plan.",why:"It creates one agreed plan so teams can make coordinated trade-offs instead of optimizing in silos.",related:["Demand Planning","Supply Planning","Inventory Management","Financial Planning"]},
"Demand Planning":{type:"COMMERCIAL INPUT",title:"Demand Planning",desc:"The process of estimating future customer demand using historical patterns, statistical forecasts, and commercial intelligence.",why:"A credible demand view helps the organization prepare materials, capacity, inventory, and customer commitments.",related:["S&OP","Forecasting","Inventory Management","Financial Planning"]},
"Supply Planning":{type:"OPERATIONS INPUT",title:"Supply Planning",desc:"The process of determining how demand can be met using available materials, suppliers, labor, capacity, and inventory.",why:"It tests feasibility and exposes constraints that need operational or management action.",related:["S&OP","Production Planning","Capacity Planning","Inventory Management"]},
"Production Planning":{type:"EXECUTION",title:"Production Planning",desc:"The process of deciding what to produce, how much, and when, considering demand, resources, materials, and operational policies.",why:"It translates the agreed supply plan into a sequence and volume of production activity.",related:["Supply Planning","Capacity Planning","MRP","Inventory Management"]},
"Inventory Management":{type:"BUFFER",title:"Inventory Management",desc:"The discipline of setting and controlling stock to balance availability, service, cost, and working capital.",why:"Inventory absorbs timing and variability differences between demand and supply, but too much stock creates financial and obsolescence risk.",related:["Demand Planning","Supply Planning","Lead Time","Safety Stock"]},
"Capacity Planning":{type:"CONSTRAINT",title:"Capacity Planning",desc:"The process of comparing required workload with available equipment, labor, and other constrained resources.",why:"Capacity determines whether the supply plan is achievable and what alternatives are needed when resources are overloaded.",related:["Supply Planning","Production Planning","S&OP","OEE"]},
"Financial Planning":{type:"BUSINESS IMPACT",title:"Financial Planning",desc:"The translation of volume, mix, price, cost, and inventory assumptions into revenue, margin, expense, and cash outcomes.",why:"It helps decision-makers understand the financial consequences of operating choices and align plans with business targets.",related:["S&OP","Demand Planning","Inventory Management","Performance KPIs"]},
"Performance KPIs":{type:"FEEDBACK",title:"Performance KPIs",desc:"Measures that show whether the plan and its execution are delivering expected outcomes.",why:"Performance feedback reveals gaps and helps improve future forecasts, supply assumptions, inventory policies, and decisions.",related:["S&OP","Demand Planning","Supply Planning","Financial Planning"]}
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let completed = new Set(JSON.parse(localStorage.getItem("sopAcademyCompleted") || "[]"));
let currentLesson = null;
let currentModule = 0;

function totalTopics(){return modules.reduce((n,m)=>n+m.topics.length,0)}
function completedCount(){return totalTopics()===0?0:completed.size}
function updateProgress(){
 const total=totalTopics();const pct=total?Math.round(completedCount()/total*100):0;
 $("#progressPercent").innerHTML=pct+'<small>%</small>';$("#progressBar").style.width=pct+"%";
 $("#completedLabel").textContent=completedCount()+" of "+totalTopics()+" topics completed";
 $("#progressBig").textContent=pct+"%";$("#ringValue").textContent=pct+"%";
 $("#progressRing").style.background="conic-gradient(#5b9a91 "+(pct*3.6)+"deg,#e9eff0 0deg)";
 $("#progressDescription").textContent=pct===0?"Your learning journey starts here.":pct===100?"Curriculum completed. Keep revisiting and applying your knowledge.":completedCount()+" topics completed. Keep building your S&OP foundation.";
}
function showView(name){
 $$(".view").forEach(v=>v.classList.toggle("active",v.id==="view-"+name));
 $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
 $("#crumbCurrent").textContent=({dashboard:"Overview",modules:"Learning modules",concepts:"Concept map",glossary:"Technical glossary",progress:"My progress"})[name];
 $("#sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});
 if(name==="progress")renderProgress();
}
$$(".nav-item").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
$$("[data-go]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.go)));
$("#menuToggle").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));

function renderModules(){
 const q=($("#moduleSearch")?.value||"").toLowerCase(),level=$("#levelFilter")?.value||"all";
 const root=$("#moduleList");root.innerHTML="";
 modules.forEach((m,i)=>{
  const matches=m.title.toLowerCase().includes(q)||m.desc.toLowerCase().includes(q)||m.topics.some(t=>t.name.toLowerCase().includes(q));
  if(!matches||(level!=="all"&&m.level!==level))return;
  if(i===0 && !q && level==="all" && (m.objectives.length || m.references.length)){
   const intro=document.createElement("section");intro.className="module-objectives";
   intro.innerHTML='<div class="eyebrow">MODULE 01 LEARNING OUTCOMES</div><h3>By the end of this module, you should be able to:</h3><ul>'+m.objectives.map(x=>'<li>'+x+'</li>').join("")+'</ul><div class="module-references"><strong>Reference reading</strong><div>'+m.references.map(x=>'<a href="'+x.url+'" target="_blank" rel="noopener noreferrer">'+x.label+' ↗</a>').join("")+'</div></div>';
   root.appendChild(intro);
  }
  const done=m.topics.filter((t,j)=>completed.has(i+"-"+j)).length,pct=m.topics.length?Math.round(done/m.topics.length*100):0;
  const card=document.createElement("article");card.className="module-card"+(i===0?" open":"");
  card.innerHTML='<button class="module-head"><span class="module-number">'+String(i+1).padStart(2,"0")+'</span><span class="module-info"><span class="eyebrow">'+m.level.toUpperCase()+' · MODULE '+String(i+1).padStart(2,"0")+'</span><strong>'+m.title+'</strong><small>'+m.topics.length+' topics · '+m.desc+'</small></span><span class="module-progress">'+done+'/'+m.topics.length+'<i><b style="width:'+pct+'%"></b></i></span><span class="module-chevron">⌄</span></button><div class="module-topics">'+m.topics.map((t,j)=>'<div class="topic-row"><span class="topic-check '+(completed.has(i+"-"+j)?"done":"")+'">'+(completed.has(i+"-"+j)?"✓":"")+'</span><span class="topic-text"><strong>'+t.name+'</strong><small>'+t.lectures+' lectures · '+t.minutes+' min</small></span><button data-topic="'+i+'-'+j+'">Open topic →</button></div>') .join(""):'<div class="empty-state">No topics have been added yet. This module is currently a blank workspace.</div>')+'</div>';
  card.querySelector(".module-head").addEventListener("click",()=>card.classList.toggle("open"));
  card.querySelectorAll("[data-topic]").forEach(btn=>btn.addEventListener("click",()=>openLesson(i,Number(btn.dataset.topic.split("-")[1]),0)));
  root.appendChild(card);
 });
 if(!root.children.length)root.innerHTML='<div class="empty-state">No modules match your search.</div>';
}
$("#moduleSearch").addEventListener("input",renderModules);$("#levelFilter").addEventListener("change",renderModules);
$$("[data-open-module]").forEach(b=>b.addEventListener("click",()=>{showView("modules");renderModules();const first=$(".module-card");if(first)first.classList.add("open")}));

function openLesson(mi,ti,li){
 currentModule=mi;const topic=modules[mi].topics[ti],lesson=topic.lessons[li];currentLesson={mi,ti,li};
 $("#lessonModule").textContent="MODULE "+String(mi+1).padStart(2,"0")+" · "+modules[mi].title;
 $("#lessonTopic").textContent="TOPIC "+(mi+1)+"."+ (ti+1)+" · LECTURE "+(li+1)+" OF "+topic.lessons.length;
 $("#lessonTitle").textContent=lesson.title;$("#lessonMeta").textContent="GUIDED LECTURE · "+Math.max(8,Math.round(topic.minutes/topic.lectures))+" MIN READ";
 $("#lectureNav").innerHTML=topic.lessons.map((x,i)=>'<button class="lecture-tab '+(i===li?'active':'')+'" data-lecture="'+i+'">'+String(i+1).padStart(2,"0")+' · '+x.title+'</button>').join("");
 $("#lectureNav").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>openLesson(mi,ti,Number(btn.dataset.lecture))));
 $("#lessonBody").innerHTML=lesson.body;$("#lessonConnection").textContent=lesson.connection;
 $("#quizQuestion").textContent=lesson.question;$("#quizFeedback").textContent="";
 $("#quizOptions").innerHTML=lesson.options.map((o,i)=>'<button class="quiz-option" data-answer="'+i+'">'+String.fromCharCode(65+i)+'. '+o+'</button>').join("");
 $("#quizOptions").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
  const chosen=Number(b.dataset.answer);$$(".quiz-option").forEach(x=>{x.disabled=true;if(Number(x.dataset.answer)===lesson.answer)x.classList.add("correct")});
  if(chosen!==lesson.answer)b.classList.add("wrong");
  $("#quizFeedback").textContent=(chosen===lesson.answer?"Correct. ":"Not quite. ")+lesson.explain;
 }));
 const isDone=completed.has(mi+"-"+ti);$("#lessonStatus").textContent=isDone?"Topic completed ✓":"Not completed";$("#lessonStatus").classList.toggle("complete",isDone);
 $("#completeLesson").textContent=isDone?"Completed ✓":"Mark topic complete ✓";
 $("#lessonModal").classList.add("open");$("#lessonModal").setAttribute("aria-hidden","false");
}
function closeLesson(){$("#lessonModal").classList.remove("open");$("#lessonModal").setAttribute("aria-hidden","true")}
$("#closeLesson").addEventListener("click",closeLesson);$("#lessonModal").addEventListener("click",e=>{if(e.target.id==="lessonModal")closeLesson()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLesson()});
$("#completeLesson").addEventListener("click",()=>{
 if(!currentLesson)return;const key=currentLesson.mi+"-"+currentLesson.ti;
 if(!completed.has(key)){completed.add(key);localStorage.setItem("sopAcademyCompleted",JSON.stringify([...completed]));}
 $("#lessonStatus").textContent="Topic completed ✓";$("#lessonStatus").classList.add("complete");$("#completeLesson").textContent="Completed ✓";
 updateProgress();renderModules();
});

function renderGlossary(){
 const q=($("#glossarySearch").value||"").toLowerCase(),letter=$(".letter-filter button.active")?.dataset.letter||"all";
 const list=glossary.filter(t=>(letter==="all"||t[0].toUpperCase().startsWith(letter))&&t.join(" ").toLowerCase().includes(q));
 $("#glossaryCount").textContent=list.length+" TERMS";
 $("#glossaryGrid").innerHTML=list.map(t=>'<article class="term-card"><span class="term-acronym">'+t[0]+'</span><h3>'+t[1]+'</h3><p>'+t[2]+'</p><span class="term-category">'+t[3].toUpperCase()+'</span></article>').join("")||'<div class="empty-state">No terms found. Try another search.</div>';
}
$("#glossarySearch").addEventListener("input",renderGlossary);
$("#letterFilter").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{$$(".letter-filter button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderGlossary()}));

function renderConcept(name){
 const c=conceptInfo[name];if(!c)return;
 $$(".map-node").forEach(n=>n.classList.toggle("selected",n.dataset.concept===name));
 $("#conceptDetail").innerHTML='<div class="eyebrow">SELECTED CONCEPT</div><span class="detail-chip">'+c.type+'</span><h2>'+c.title+'</h2><p>'+c.desc+'</p><div class="detail-section"><strong>Why it matters</strong><p>'+c.why+'</p></div><div class="detail-section"><strong>Related concepts</strong><div class="related-tags">'+c.related.map(x=>'<span>'+x+'</span>').join("")+'</div></div>';
}
$$(".map-node").forEach(n=>n.addEventListener("click",()=>renderConcept(n.dataset.concept)));
$("#resetMap").addEventListener("click",()=>renderConcept("S&OP"));

function renderProgress(){
 const root=$("#progressModules");root.innerHTML=modules.map((m,i)=>{
  const done=m.topics.filter((t,j)=>completed.has(i+"-"+j)).length,pct=m.topics.length?Math.round(done/m.topics.length*100):0;
  return '<article class="progress-module"><div class="progress-module-head"><strong>'+String(i+1).padStart(2,"0")+' · '+m.title+'</strong><small>'+done+'/'+m.topics.length+' topics</small></div><div class="progress-track"><i style="width:'+pct+'%"></i></div><p class="empty-state">No topics added yet.</p></article>';
 }).join("");
}
updateProgress();renderModules();renderGlossary();renderProgress();