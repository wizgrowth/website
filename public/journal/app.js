// WIZGROWTH / JOURNAL — behaviour for the blog's shared chrome.
// The enquiry dialog is the same one the home page uses; initLeadStudio below
// is copied verbatim from /fresh/app.js (regenerate this file from there
// rather than editing that function here). Everything the blog pages
// themselves do — topic filter, reading progress — lives in React components.
// Contact controls are bound by delegation because the blog navigates
// client-side between its own pages, so controls appear after this script ran.
(function(){'use strict';
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const body=document.body;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches;
const motionButton={click(){paused=!paused;body.classList.toggle('motion-paused',paused);document.dispatchEvent(new CustomEvent('wg:motionchange'));}};
function openDialog(dialog){dialog.showModal();body.style.overflow='hidden';}
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
const dialog=$('#contact-dialog');if(!dialog)return;
const leadStudio=initLeadStudio();
let source='journal',topic='unsure',started=false;
// No names, emails, brief text or contact details are sent to analytics.
function track(event,extra={}){const detail={event,article:source,topic,...extra};window.dataLayer=window.dataLayer||[];window.dataLayer.push(detail);document.dispatchEvent(new CustomEvent('wg:analytics',{detail}));}
document.addEventListener('click',event=>{
 const control=event.target.closest('[data-enquiry],[data-contact]');
 if(!control||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 event.preventDefault();
 source=control.dataset.source||'journal';topic=control.dataset.enquiry||'unsure';track('enquiry_cta_click');
 const selections=$$('input[name="goals"]',dialog);
 if(!selections.some(el=>el.checked)){const match=selections.find(el=>el.value===topic);if(match){match.checked=true;match.dispatchEvent(new Event('change',{bubbles:true}));}}
 const brief=$('#contact-goal'),heading=document.querySelector('main h1');
 if(!brief.value&&source!=='journal'&&heading){brief.value='I would like to discuss: '+heading.textContent.trim();brief.dispatchEvent(new Event('input'));}
 leadStudio.open(control);track('enquiry_open');
});
document.addEventListener('click',event=>{const top=event.target.closest('#back-top');if(top)window.scrollTo({top:0,behavior:paused?'instant':'smooth'});});
$$('[data-close]',dialog).forEach(control=>control.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{body.style.overflow='';});
dialog.addEventListener('input',event=>{if(event.isTrusted&&!started){started=true;track('enquiry_start');}});
$('#lead-reset').addEventListener('click',()=>{started=false;});
new MutationObserver(()=>{if(dialog.dataset.leadStep==='review')track('enquiry_review');}).observe(dialog,{attributes:true,attributeFilter:['data-lead-step']});
$('#lead-whatsapp').addEventListener('click',()=>track('enquiry_draft_open',{channel:'whatsapp'}));
$('#lead-email').addEventListener('click',()=>track('enquiry_draft_open',{channel:'email'}));
})();
