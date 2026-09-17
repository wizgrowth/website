
(function(){
'use strict';
const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const body=document.body, reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
const page=$('#page-content'), motionButton=$('#motion-toggle');
function updateMotion(){
 body.classList.toggle('motion-paused',paused);
 motionButton.setAttribute('aria-pressed',String(paused));
 motionButton.setAttribute('aria-label',paused?'Play ambient animations':'Pause ambient animations');
 $('#motion-label').textContent=paused?'Play motion':'Pause motion';
 $('#motion-icon').innerHTML=paused?'<path d="M2 1 11 6 2 11Z"/>':'<path d="M2 1h3v10H2zM7 1h3v10H7z"/>';
 document.dispatchEvent(new CustomEvent('wg:motionchange'));
}
updateMotion();motionButton.addEventListener('click',()=>{paused=!paused;updateMotion();});
reduced.addEventListener('change',e=>{paused=e.matches;updateMotion();});
// Brand intro: timed, skippable, focus-contained and replayable.
const loader=$('#loader'), skip=$('#skip-intro');let introId=0,introFallback=0,introHide=0,introRunning=false,introReturn=null;
function finishIntro(){
 if(!introRunning)return;introRunning=false;cancelAnimationFrame(introId);clearTimeout(introFallback);
 $('#loader-number').textContent='100';$('#loader-rule').style.transform='scaleX(1)';
 loader.classList.add('leaving');body.classList.remove('is-loading','replaying');body.classList.add('ready');
 page.inert=false;motionButton.inert=false;
 if(introReturn&&introReturn.isConnected)introReturn.focus({preventScroll:true});else if(document.activeElement===skip)$('#main').setAttribute('tabindex','-1'),$('#main').focus({preventScroll:true});
 introHide=setTimeout(()=>{loader.hidden=true;loader.classList.remove('leaving');},reduced.matches?0:820);
}
function startIntro(replay=false){
 if(introRunning)return;clearTimeout(introHide);
 introReturn=replay?document.activeElement:null;introRunning=true;
 body.classList.add('is-loading','replaying');body.classList.remove('ready');
 loader.hidden=false;loader.classList.remove('leaving');page.inert=true;motionButton.inert=true;
 $$('.loader-shape,.loader-words i').forEach(el=>{el.style.animation='none';void el.offsetWidth;el.style.animation='';});
 skip.focus({preventScroll:true});const start=performance.now(),duration=reduced.matches?1:1850;
 function tick(now){if(!introRunning)return;const p=Math.min(1,(now-start)/duration);$('#loader-number').textContent=String(Math.floor(p*100)).padStart(2,'0');$('#loader-rule').style.transform='scaleX('+p+')';if(p<1)introId=requestAnimationFrame(tick);else finishIntro();}
 introId=requestAnimationFrame(tick);introFallback=setTimeout(finishIntro,3500);
}
skip.addEventListener('click',finishIntro);loader.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();finishIntro();}if(e.key==='Tab'){e.preventDefault();skip.focus();}});
$$('[data-replay]').forEach(b=>b.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'instant'});startIntro(true);}));
// Reveal enhancements do not hide content unless an observer is installed.
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target);}});},{threshold:.13,rootMargin:'0px 0px -18px 0px'});
 body.classList.add('observing');$$('.reveal').forEach(el=>observer.observe(el));
}
// Accessible service tabs; no arbitrary auto-rotation while somebody is reading.
const tabs=$$('[data-service]');function selectService(tab,focus=false){
 tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;$('#panel-'+t.dataset.service).hidden=!active;});if(focus)tab.focus();
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectService(tab));tab.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowDown'||e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();selectService(tabs[n],true);});});
// Native dialogs provide keyboard focus management and Escape dismissal.
const dialogs=$$('dialog');function openDialog(dialog){dialogs.forEach(d=>{if(d.open)d.close();});dialog.showModal();body.style.overflow='hidden';}
dialogs.forEach(dialog=>{dialog.addEventListener('close',()=>{if(!dialogs.some(d=>d.open))body.style.overflow='';});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});$$('[data-close]',dialog).forEach(b=>b.addEventListener('click',()=>dialog.close()));});
$('#menu-open').addEventListener('click',()=>openDialog($('#menu-dialog')));
$$('#menu-dialog a').forEach(a=>a.addEventListener('click',()=>$('#menu-dialog').close()));
// Contact triggers are bound by the enquiry studio below.
$('#academy-open').addEventListener('click',()=>openDialog($('#academy-dialog')));
$('#back-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:paused?'instant':'smooth'}));

// Outbound social URLs supplied by the client. Trustpilot is the only pending profile.
// No guessed account handles or unverified star ratings are shipped.
const SITE_PROFILES={"whatsapp":"https://api.whatsapp.com/send/?phone=917907551261&text=Hi+WizGrowth+%E2%80%94+I%E2%80%99d+like+to+talk+about+growing+my+business.&type=phone_number&app_absent=0","x":"https://x.com/wiz_growth","instagram":"https://www.instagram.com/wiz_growth/","linkedin":"https://www.linkedin.com/company/wiz-growth/","trustpilot":"https://www.trustpilot.com/review/wizgrowth.com"};
const PROFILE_LABELS={instagram:'Instagram',linkedin:'LinkedIn',x:'X',whatsapp:'WhatsApp',trustpilot:'Trustpilot'};
$$('[data-profile]').forEach(control=>{
 const key=control.dataset.profile,url=SITE_PROFILES[key];
 if(url&&/^https:\/\//i.test(url)){
  const link=document.createElement('a');link.className=control.className.replace('pending','').trim();link.innerHTML=control.innerHTML;
  link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label','Visit WizGrowth on '+PROFILE_LABELS[key]+' (opens in a new tab)');
  if(key==='trustpilot')link.querySelector('.review-sub').innerHTML='View our profile <svg class="arrow" aria-hidden="true"><use href="#arrow-up"/></svg>';
  control.replaceWith(link);
 }
 });
});
// The four supplied social URLs are also baked into the HTML for no-JavaScript access.
$$('[data-footer-service]').forEach(link=>link.addEventListener('click',event=>{
 const tab=$('#tab-'+link.dataset.footerService);if(!tab)return;event.preventDefault();selectService(tab);
 $('#expertise').scrollIntoView({behavior:paused||reduced.matches?'instant':'smooth',block:'start'});tab.focus({preventScroll:true});
}));

// Enquiry studio. Local state only: no backend calls, tracking, or remote draft storage.
function initLeadStudio(){
 const dialog=$('#contact-dialog'), form=$('#contact-form');
 const screens=$$('[data-lead-panel]',dialog), stepButtons=$$('[data-lead-nav]',dialog);
 const goals=$$('input[name="goals"]',form), note=$('#lead-wiz-note'), art=$('.lead-side-art',dialog);
 const review=$('#lead-review'), back=$('#lead-back'), next=$('#lead-next');
 const name=$('#contact-name'), email=$('#contact-email'), company=$('#contact-company'), website=$('#contact-website'), goal=$('#contact-goal'), phone=$('#contact-phone');
 let step=0,furthest=0,academy=false,cheerTimer=0,savedBrief='',openingFocus=null;
 const labels={ai:'AI visibility',seo:'SEO & search',social:'Social media',paid:'Paid campaigns',website:'Website & content',unsure:'Find the right starting point',academy:'WizGrowth Academy'};
 const notes={ai:'A good place to start: help your expertise become the answer.',seo:'Let\'s connect your expertise with the people looking for it.',social:'More good conversations. Less posting for the sake of it.',paid:'Let\'s give every campaign a clear job to do.',website:'A clearer website. Content with a reason to exist.',unsure:'No jargon required. Start with the problem, not the channel.',academy:'Curiosity is a great starting point. Tell us what you\'d like to learn.'};
 const stepNotes=['Choose what matters to you. We can start small.','A sentence or two is perfect. Tell me what you want to change.','Almost there. Your details help the team continue the conversation.'];
 function selected(){return academy?['academy']:goals.filter(g=>g.checked).map(g=>g.value);}
 function cheer(){clearTimeout(cheerTimer);art.classList.remove('is-cheering');void art.offsetWidth;if(!paused&&!reduced.matches)art.classList.add('is-cheering');cheerTimer=setTimeout(()=>art.classList.remove('is-cheering'),1100);}
 function setError(id,text){const el=$(id);el.textContent=text;el.hidden=!text;}
 function clearFieldError(input){input.removeAttribute('aria-invalid');setError('#'+input.id+'-error','');}
 function syncGoals(changed=''){
  const keys=selected();$('#lead-selected-count').textContent=keys.length?keys.length+' selected':'Choose your starting point';
  $('#lead-academy').setAttribute('aria-pressed',String(academy));$('#lead-academy').textContent=academy?'Academy selected - change':'Here to learn? Choose the academy';
  $$('.lead-float',dialog).forEach(el=>el.classList.toggle('is-picked',keys.includes(el.dataset.leadFloat)));
  if(changed){note.textContent=notes[changed]||stepNotes[0];cheer();}
  setError('#lead-goals-error','');syncMiniBrief();
 }
 goals.forEach(input=>input.addEventListener('change',()=>{
  academy=false;
  if(input.checked&&input.value==='unsure')goals.forEach(g=>{if(g!==input)g.checked=false;});
  if(input.checked&&input.value!=='unsure')goals.find(g=>g.value==='unsure').checked=false;
  syncGoals(input.checked?input.value:'');
 }));
 $('#lead-academy').addEventListener('click',()=>{academy=!academy;if(academy)goals.forEach(g=>g.checked=false);syncGoals(academy?'academy':'');});
 function tags(container){container.replaceChildren();selected().forEach(key=>{const item=document.createElement('span');item.textContent=labels[key];container.append(item);});}
 function syncMiniBrief(){tags($('#lead-mini-tags'));$('#lead-mini-copy').textContent=goal.value.trim()||'Your goals will appear here as you build your brief.';}
 function progress(){stepButtons.forEach((btn,i)=>{
  btn.disabled=i>furthest;btn.classList.toggle('is-complete',i<step||dialog.dataset.leadStep==='review');
  if(i===step&&dialog.dataset.leadStep!=='review')btn.setAttribute('aria-current','step');else btn.removeAttribute('aria-current');
  $('.step-index',btn).textContent=i<step||dialog.dataset.leadStep==='review'?'\u2713':String(i+1).padStart(2,'0');
 });}
 function showStep(index,focus=true){
  step=Math.max(0,Math.min(2,index));furthest=Math.max(furthest,step);dialog.dataset.leadStep=String(step);
  form.hidden=false;review.hidden=true;screens.forEach((screen,i)=>screen.hidden=i!==step);
  back.hidden=step===0;$('#lead-next-label').textContent=step===0?'A little about your business':step===1?'Add your contact details':'Review my brief';
  const titles=['Where should we grow next?','A little about your big idea.','Let\'s put a name to the plan.'];dialog.setAttribute('aria-labelledby',$('.lead-step-heading',screens[step]).id);
  note.textContent=step===0&&selected().length===1?notes[selected()[0]]:stepNotes[step];
  if(step===2)syncMiniBrief();progress();
  if(focus){$('.lead-step-heading',screens[step]).focus({preventScroll:true});dialog.scrollTop=0;}
 }
 function invalid(input,text){input.setAttribute('aria-invalid','true');setError('#'+input.id+'-error',text);return input;}
 function normalWebsite(){const v=website.value.trim();if(!v)return '';try{const url=new URL(/^[a-z]+:\/\//i.test(v)?v:'https://'+v);if(!['https:','http:'].includes(url.protocol)||!url.hostname.includes('.')||/\s/.test(v)||url.username||url.password)return null;return url.href;}catch{return null;}}
 function validate(index){
  let first=null;
  if(index===0){if(!selected().length){setError('#lead-goals-error','Choose a goal, or select "Help me decide".');goals[0].focus();return false;}return true;}
  if(index===1){clearFieldError(website);clearFieldError(goal);if(normalWebsite()===null)first=invalid(website,'Use a website like yourbrand.com, or leave this blank.');if(!goal.value.trim()){const el=invalid(goal,'Tell us a little about what you would like to achieve.');if(!first)first=el;}}
  if(index===2){[name,email,phone].forEach(clearFieldError);if(!name.value.trim())first=invalid(name,'What should we call you?');if(!email.value.trim()||!email.validity.valid){const el=invalid(email,'Enter an email address like you@company.com.');if(!first)first=el;}if(phone.value.trim()&&(!/^[+()\d\s.-]{7,25}$/.test(phone.value.trim())||phone.value.replace(/\D/g,'').length<7||phone.value.replace(/\D/g,'').length>15)){const el=invalid(phone,'Add a valid phone number, or leave this blank.');if(!first)first=el;}}
  if(first){first.focus();return false;}return true;
 }
 function buildBrief(){
  const lines=['Hi WizGrowth - I would like to talk about growing my business.','','Name: '+name.value.trim(),'Email: '+email.value.trim()];
  if(phone.value.trim())lines.push('Phone: '+phone.value.trim());if(company.value.trim())lines.push('Business / project: '+company.value.trim());if(normalWebsite())lines.push('Website: '+normalWebsite());
  lines.push('Interested in: '+selected().map(k=>labels[k]).join(', '));
  const timeline=$('input[name="timeline"]:checked',form);lines.push('Timing: '+(timeline?timeline.value:'Not specified'),'','My goal:',goal.value.trim());
  if(academy)lines[0]='Hi WizGrowth - I would like to talk about learning with the academy.';
  return lines.join('\n');
 }
 function prepareReview(){
  for(let i=0;i<3;i++){if(!validate(i)){showStep(i,false);validate(i);return;}}
  savedBrief=buildBrief();dialog.dataset.leadStep='review';dialog.setAttribute('aria-labelledby','lead-review-heading');form.hidden=true;review.hidden=false;
  $('#lead-review-name').textContent=company.value.trim()||name.value.trim()+"'s next chapter";
  $('#lead-review-meta').textContent=[name.value.trim(),email.value.trim(),phone.value.trim(),normalWebsite()].filter(Boolean).join(' / ');
  tags($('#lead-review-tags'));$('#lead-review-goal').textContent=goal.value.trim();
  const timeline=$('input[name="timeline"]:checked',form);$('#lead-review-timing').textContent='TIMING / '+(timeline?timeline.value:'Not specified');
  const wa=new URL('https://api.whatsapp.com/send/');wa.searchParams.set('phone','917907551261');wa.searchParams.set('text',savedBrief);wa.searchParams.set('type','phone_number');wa.searchParams.set('app_absent','0');
  $('#lead-whatsapp').href=wa.href;
  $('#lead-email').href='mailto:marketing@wizgrowth.com?subject='+encodeURIComponent('Growth enquiry - '+(company.value.trim()||name.value.trim()))+'&body='+encodeURIComponent(savedBrief);
  $('#lead-send-note').textContent='Choose WhatsApp or email. Review the draft and send it there. Nothing has been sent yet.';
  note.textContent='Your brief is ready. You choose when to say hello.';progress();cheer();$('#lead-review-heading').focus({preventScroll:true});dialog.scrollTop=0;
 }
 form.addEventListener('submit',event=>{event.preventDefault();if(!validate(step))return;if(step<2)showStep(step+1);else prepareReview();});
 back.addEventListener('click',()=>showStep(step-1));stepButtons.forEach((btn,i)=>btn.addEventListener('click',()=>{if(i<=furthest)showStep(i);}));
 $$('[data-lead-edit]',dialog).forEach(btn=>btn.addEventListener('click',()=>showStep(Number(btn.dataset.leadEdit))));
 [name,email,phone,website,goal].forEach(input=>input.addEventListener('input',()=>{clearFieldError(input);if(input===goal){$('#lead-char-count').textContent=goal.value.length+' / 1000';syncMiniBrief();}}));
 $$('[data-lead-prompt]',dialog).forEach(btn=>btn.addEventListener('click',()=>{const addition=btn.dataset.leadPrompt;if(!goal.value.includes(addition)){const updated=(goal.value.trim()?goal.value.trim()+'\n':'')+addition;goal.value=updated.slice(0,1000);goal.dispatchEvent(new Event('input'));}goal.focus();}));
 $('#lead-copy').addEventListener('click',async()=>{
  try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(savedBrief);else{const area=document.createElement('textarea');area.value=savedBrief;area.style.cssText='position:fixed;opacity:0;left:0;top:0';dialog.append(area);area.select();const ok=document.execCommand('copy');area.remove();$('#lead-copy').focus();if(!ok)throw new Error('copy unavailable');}$('#lead-copy-status').textContent='Brief copied. Nothing has been sent.';}catch{$('#lead-copy-status').textContent='Copy is unavailable here. Use Save brief instead.';}
 });
 $('#lead-save').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([savedBrief],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='WizGrowth-Enquiry-Brief.txt';dialog.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);$('#lead-copy-status').textContent='A local brief has been created. Nothing has been sent.';});
 $('#lead-reset').addEventListener('click',()=>{form.reset();academy=false;furthest=0;savedBrief='';$('#lead-char-count').textContent='0 / 1000';[name,email,phone,website,goal].forEach(clearFieldError);$('#lead-copy-status').textContent='';syncGoals();showStep(0);});
 $('#lead-whatsapp').addEventListener('click',()=>{$('#lead-send-note').textContent='Continue in the WhatsApp tab to review and send. If it does not open, copy or save your brief below.';});
 $('#lead-email').addEventListener('click',()=>{$('#lead-send-note').textContent='Your email app should open a draft. Review it and press Send there. If no app opens, copy or save the brief.';});
 function syncMotion(){const btn=$('#lead-motion');btn.setAttribute('aria-pressed',String(paused));btn.setAttribute('aria-label',paused?'Play animations':'Pause animations');$('.lead-motion-label',btn).textContent=paused?'Play motion':'Pause motion';$('svg',btn).innerHTML=paused?'<path d="M2 1 11 6 2 11Z"/>':'<path d="M2 1h3v10H2zM7 1h3v10H7z"/>';}
 $('#lead-motion').addEventListener('click',()=>motionButton.click());document.addEventListener('wg:motionchange',syncMotion);syncMotion();
 dialog.addEventListener('pointermove',e=>{if(paused||reduced.matches||e.pointerType==='touch')return;const r=art.getBoundingClientRect();const dx=Math.max(-3,Math.min(3,(e.clientX-r.left-r.width/2)*.015)),dy=Math.max(-2,Math.min(2,(e.clientY-r.top-r.height/2)*.015));$('.wiz-gaze',art).style.transform='translate('+dx+'px,'+dy+'px)';});
 dialog.addEventListener('pointerleave',()=>{$('.wiz-gaze',art).style.transform='';});
 // Keep keyboard navigation in the open enquiry, including at the final control.
 dialog.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const targets=$$('a[href],button,input,textarea,select,[tabindex]',dialog).filter(el=>!el.disabled&&el.tabIndex>=0&&el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden');
  if(!targets.length)return;
  const first=targets[0],last=targets[targets.length-1],current=document.activeElement;
  if(event.shiftKey&&(current===first||!targets.includes(current))){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&current===last){event.preventDefault();first.focus();}
 });
 dialog.addEventListener('close',()=>{clearTimeout(cheerTimer);art.classList.remove('is-cheering');if(openingFocus&&openingFocus.isConnected)openingFocus.focus({preventScroll:true});});
 function open(source){openingFocus=source||document.activeElement;if(source&&source.hasAttribute('data-academy-interest')){academy=true;goals.forEach(g=>g.checked=false);syncGoals('academy');showStep(0,false);}openDialog(dialog);if(dialog.dataset.leadStep==='review')$('#lead-review-heading').focus({preventScroll:true});else $('.lead-step-heading',screens[step]).focus({preventScroll:true});dialog.scrollTop=0;}
 syncGoals();showStep(0,false);return {open,get step(){return dialog.dataset.leadStep;},get selected(){return selected();}};
}
const leadStudio=initLeadStudio();
$$('[data-contact]').forEach(button=>button.addEventListener('click',()=>leadStudio.open(button)));

// A small, useful character-led guide. Suggestions are pre-written, not an audit.
function initLittleWiz(){
 const guide=$('#growth-guide'),buttons=$$('[data-guide-goal]',guide),gaze=$('.wiz-gaze',guide);
 const ideas={
  search:{speech:"Let's get your brand found.",channel:'SEO',title:'Answer a question your customers ask.',copy:'Give that question a clear, useful page. Start with what your audience actually needs.',cta:'See the SEO approach'},
  ai:{speech:"Help AI find your brand.",channel:'AI VISIBILITY',title:'Make your expertise easy to reference.',copy:'Publish clear answers with examples and sources. Help AI tools understand what your business does.',cta:'See the AI visibility approach'},
  social:{speech:"Let's grow your community.",channel:'SOCIAL MEDIA',title:'Give people a reason to join in.',copy:'Share one useful idea, ask a real question, and reply. Build conversations, not just a busier feed.',cta:'See the AI visibility service'}
 };
 const keys=Object.keys(ideas),duration=4400,total=duration*3;
 let time=0,last=0,index=-1,manual=false,visible=true,helloTimer=0,copyTimer=0,hello=false;
 function show(key,announce=false){
  const item=ideas[key];guide.dataset.goal=key;
  $('#guide-speech').textContent=hello?'A little help goes a long way.':item.speech;
  $('#guide-channel').textContent=item.channel;$('#guide-tip-title').textContent=item.title;$('#guide-tip-copy').textContent=item.copy;
  const link=$('#guide-to-service');link.firstChild.textContent=item.cta+' ';link.dataset.serviceTarget=key==='search'?'search':'ai';
  // Keep the supplied tip copy. Both AI and this requested cross-service CTA open the AI service page.
  link.href=key==='search'?'#expertise':'/services/ai-citations/';
  link.removeAttribute('target');link.removeAttribute('rel');link.removeAttribute('aria-label');
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.guideGoal===key)));
  guide.classList.remove('swapping');void guide.offsetWidth;guide.classList.add('swapping');clearTimeout(copyTimer);copyTimer=setTimeout(()=>guide.classList.remove('swapping'),500);
  if(announce)$('#guide-status').textContent=item.channel+'. '+item.title+' '+item.copy;
 }
 function paint(force=false,announce=false){
  const next=Math.min(2,Math.floor(time/duration));
  guide.style.setProperty('--guide-progress',String(manual||time>=total?1:Math.min(1,(time-next*duration)/duration)));
  if(next!==index||force){index=next;show(keys[index],announce);}
  guide.classList.toggle('is-idle',manual||time>=total);
 }
 function choose(key){manual=true;time=Math.max(0,keys.indexOf(key))*duration+duration*.9;paint(true,true);}
 buttons.forEach(button=>button.addEventListener('click',()=>choose(button.dataset.guideGoal)));
 $('#guide-replay').addEventListener('click',()=>{
  manual=false;time=0;
  if(paused||reduced.matches)manual=true;
  paint(true,true);$('#guide-prompt').textContent='Pick a goal. I\'ll help you find a starting point.';
 });
 $('#guide-to-service').addEventListener('click',event=>{
  const key=keys[index];if(key!=='search')return;event.preventDefault();const tab=$('#tab-'+key);if(!tab)return;selectService(tab);
  $('#expertise').scrollIntoView({behavior:paused||reduced.matches?'instant':'smooth',block:'start'});
  tab.focus({preventScroll:true});
 });
 $('#guide-hello').addEventListener('click',()=>{
  hello=true;clearTimeout(helloTimer);guide.classList.remove('hello');void guide.offsetWidth;guide.classList.add('hello');
  $('#guide-speech').textContent='A little help goes a long way.';$('#guide-status').textContent='Hello from Little Wiz. Pick a goal below for a starting point.';
  helloTimer=setTimeout(()=>{hello=false;guide.classList.remove('hello');$('#guide-speech').textContent=ideas[keys[index]].speech;},1800);
 });
 guide.addEventListener('pointermove',event=>{
  if(paused||reduced.matches||event.pointerType==='touch')return;
  const r=$('.wiz-scene',guide).getBoundingClientRect(),x=Math.max(-3,Math.min(3,((event.clientX-r.left)/r.width-.5)*9)),y=Math.max(-2,Math.min(2,((event.clientY-r.top)/r.height-.5)*7));
  gaze.style.transform='translate('+x.toFixed(2)+'px,'+y.toFixed(2)+'px)';
 });
 guide.addEventListener('pointerleave',()=>{gaze.style.transform='';});
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;guide.classList.toggle('offscreen',!visible);},{threshold:.1}).observe(guide);
 document.addEventListener('wg:motionchange',()=>{if(paused){gaze.style.transform='';guide.style.setProperty('--guide-progress','1');}});
 function frame(now){
  const dt=last?Math.min(now-last,80):0;last=now;
  if(visible&&!document.hidden&&!paused&&!introRunning&&!manual&&time<total){time=Math.min(total,time+dt);paint();if(time>=total)$('#guide-prompt').textContent='Your goal, your next move. Choose a starting point.';}
  requestAnimationFrame(frame);
 }
 if(paused)manual=true;
 paint(true);requestAnimationFrame(frame);
 return {select:choose,replay:()=>$('#guide-replay').click(),get goal(){return keys[index];},get elapsed(){return time;},get manual(){return manual;}};
}
const littleWiz=initLittleWiz();

// Search service demo: a real editable local input with clearly labelled illustrative output.
function initSearchDemo(){
 const demo=$('#search-demo'),input=$('#demo-query'),presets=$$('[data-query]',demo);
 const content={
  visibility:{query:'How do I get found?',title:'Help the right people find your business.',copy:'Clear services. Useful answers. Content that connects a real search to what you do best.',links:['What we do','How we help','Start a conversation']},
  content:{query:'What should I write?',title:'Useful content starts with a real question.',copy:'Answer what your audience actually needs to know. Give your experience, ideas and point of view a clear place to live.',links:['Your expertise','Useful answers','A clear next step']},
  technical:{query:'Can search find my site?',title:'A stronger foundation for being found.',copy:'Clear page structure, accessible content and technical checks help remove barriers between your website and a useful search.',links:['Site structure','Content clarity','Technical checks']}
 };
 let task=null,played=false,last=0,focused=false;
 function writeResult(key,custom=''){
  const item=content[key];$('#demo-result-title').textContent=custom?'Connect the question to your expertise.':item.title;
  $('#demo-result-copy').textContent=custom?'For "'+custom+'", this local demo shows how a useful page could introduce your brand and offer a clear next step.':item.copy;
  const links=$('#demo-result-links');links.replaceChildren();item.links.forEach(text=>{const span=document.createElement('span');span.textContent=text;links.append(span);});
 }
 function complete(){if(!task)return;input.value=task.query;writeResult(task.key,task.custom);demo.dataset.state='ready';task=null;}
 function start(key,typed=true,custom=''){
  const nextQuery=custom||content[key].query;
  presets.forEach(button=>button.setAttribute('aria-pressed',String(!custom&&button.dataset.query===key)));
  task={key,query:nextQuery,custom,time:0,typing:typed?Math.min(1050,nextQuery.length*27):0};played=true;
  if(paused||reduced.matches){complete();return;}
  demo.dataset.state=typed?'typing':'matching';if(typed)input.value='';
 }
 function frame(now){const dt=last?Math.min(now-last,65):0;last=now;
  if(task&&!paused&&!document.hidden&&!$('#panel-search').hidden&&!focused){
   task.time+=dt;
   if(task.time<task.typing){demo.dataset.state='typing';input.value=task.query.slice(0,Math.ceil(task.query.length*task.time/task.typing));}
   else if(task.time<task.typing+720){input.value=task.query;demo.dataset.state='matching';}
   else complete();
  }
  requestAnimationFrame(frame);
 }
 input.addEventListener('focus',()=>{focused=true;if(task)complete();});
 input.addEventListener('blur',()=>{focused=false;});
 input.addEventListener('input',()=>{task=null;demo.dataset.state='ready';presets.forEach(button=>button.setAttribute('aria-pressed','false'));});
 presets.forEach(button=>button.addEventListener('click',()=>{focused=false;start(button.dataset.query);}));
 $('#search-demo-form').addEventListener('submit',event=>{
  event.preventDefault();const q=input.value.trim();if(!q){input.value='';input.reportValidity();return;}
  const lower=q.toLowerCase(),exact=Object.entries(content).find(([,item])=>item.query===q);
  const key=exact?exact[0]:/content|read|writ|answer/.test(lower)?'content':/technical|website|site|crawl|index|speed/.test(lower)?'technical':'visibility';
  focused=false;start(key,false,exact?'':q);
 });
 // Play on entering the section, then wait for user input rather than looping.
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)&&!played&&!focused&&!$('#panel-search').hidden)start('visibility');
 },{threshold:.55}).observe(demo);
 document.addEventListener('wg:motionchange',()=>{if(paused&&task)complete();});
 requestAnimationFrame(frame);
 return {run:(key)=>start(content[key]?key:'visibility'),get state(){return demo.dataset.state;}};
}
const searchDemo=initSearchDemo();


if(reduced.matches||new URLSearchParams(location.search).has('skipintro')){body.classList.add('ready');}else{startIntro();}

// A short, meaningful motion study: three channels meet, then move forward together.
// Runs once on entry; replay is deliberate. No network data or third-party scripts.
function initDirectionMotion(){
 const heading=$('#direction-heading'),flow=$('#direction-flow'),replay=$('#direction-replay');
 if(!heading||!flow||!replay)return null;
 const routes=$$('.direction-route',flow),shared=$('.direction-shared',flow);
 const particles=$$('.direction-particles circle',flow),channels=$$('.direction-channel',flow);
 const destination=$('.direction-destination',flow),words=$$('.direction-word',heading);
 const underline=$('.direction-underline',heading);
 const lengths=routes.map(path=>path.getTotalLength()),sharedLength=shared.getTotalLength();
 const duration=4600;
 let time=duration,last=0,frameId=0,playing=false,hasPlayed=false,visible=false,auto=true;
 const clamp=n=>Math.max(0,Math.min(1,n));
 const ease=n=>1-Math.pow(1-clamp(n),3);
 function draw(ms){
  const progress=ease((ms-650)/2400);
  const merged=clamp((ms-2600)/1050);
  routes.forEach((path,i)=>{
   path.style.strokeDasharray=String(lengths[i]);
   path.style.strokeDashoffset=String(lengths[i]*(1-progress));
   path.style.opacity=String(.5+.5*progress);
   const point=path.getPointAtLength(lengths[i]*progress);
   particles[i].setAttribute('cx',point.x.toFixed(2));particles[i].setAttribute('cy',point.y.toFixed(2));
   particles[i].style.opacity=String(ms<2900?1:1-clamp((ms-2900)/300));
   const pop=Math.sin(Math.PI*clamp((ms-180-i*130)/560));
   channels[i].style.transform='translateX('+(-3*pop).toFixed(2)+'px)';
  });
  shared.style.strokeDasharray=String(sharedLength);shared.style.strokeDashoffset=String(sharedLength*(1-ease(merged)));
  const lift=Math.sin(Math.PI*clamp((ms-2900)/1000))*4;
  destination.setAttribute('transform','translate('+(278+lift).toFixed(2)+' '+(25-lift).toFixed(2)+')');
  words.forEach((word,i)=>{const entrance=ease((ms-i*110)/820);word.style.transform='translateY('+((1-entrance)*12).toFixed(2)+'px)';word.style.opacity=String(.5+.5*entrance);});
  underline.style.transform='scaleX('+ease((ms-1900)/1650).toFixed(4)+')';
  flow.dataset.motion=playing?'playing':'complete';
 }
 function schedule(){if(playing&&visible&&!paused&&!document.hidden&&!frameId)frameId=requestAnimationFrame(tick);}
 function tick(now){
  frameId=0;if(!playing||!visible||paused||document.hidden){last=0;return;}
  time+=last?Math.min(now-last,70):0;last=now;
  if(time>=duration){time=duration;playing=false;last=0;}
  draw(time);schedule();
 }
 function play(){
  if(reduced.matches||paused){time=duration;playing=false;draw(time);return;}
  if(frameId)cancelAnimationFrame(frameId);frameId=0;
  time=0;last=0;playing=true;hasPlayed=true;draw(0);schedule();
 }
 function stopFrame(){if(frameId)cancelAnimationFrame(frameId);frameId=0;last=0;}
 replay.addEventListener('click',play);
 // Hover replays only after the initial sequence has settled; it never interrupts it.
 $('.direction-line',heading).addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&hasPlayed&&!playing)play();});
 document.addEventListener('wg:motionchange',()=>{
  stopFrame();replay.disabled=paused;replay.title=paused?'Enable motion to replay':'Replay this animation';
  if(reduced.matches){time=duration;playing=false;draw(time);}
  else if(!paused&&visible&&!hasPlayed)play();else schedule();
 });
 document.addEventListener('visibilitychange',()=>{stopFrame();schedule();});
 draw(duration);replay.disabled=paused;
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
   visible=entries.some(e=>e.isIntersecting);
   if(visible){if(!hasPlayed&&!paused&&!reduced.matches&&auto)play();else schedule();}else stopFrame();
  },{threshold:.45});observer.observe(heading);
 }else{visible=true;if(!paused&&!reduced.matches)play();}
 return {replay:play,get time(){return time;},get playing(){return playing;},seek(ms){auto=false;stopFrame();hasPlayed=true;playing=false;time=Math.max(0,Math.min(duration,ms));draw(time);}};
}
const directionMotion=initDirectionMotion();

// Diagnostics used for local browser QA; no data leaves this document.
window.WizGrowthPreview={lead:leadStudio,get paused(){return paused;},replay:()=>startIntro(true),skip:finishIntro,guide:littleWiz,search:searchDemo,direction:directionMotion};
})();
