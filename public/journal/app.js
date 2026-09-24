// WIZGROWTH / JOURNAL — behaviour for the blog's shared chrome.
// The enquiry dialog is the same one the home page uses; initLeadStudio below
// is copied verbatim from /fresh/app.js (regenerate this file from there
// rather than editing that function here). Everything the blog pages
// themselves do — topic filter, pager, reading progress — lives in React.
// Contact controls are bound by delegation because the blog navigates
// client-side between its own pages, so controls appear after this script ran.
(function(){'use strict';
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const body=document.body;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function openDialog(dialog){dialog.showModal();body.style.overflow='hidden';}
function initLeadStudio(){
 const dialog=$('#contact-dialog'), form=$('#contact-form');
 const goals=$$('input[name="goals"]',form), goal=$('#contact-goal'), name=$('#contact-name'), email=$('#contact-email'), phone=$('#contact-phone'), company=$('#contact-company'), website=$('#contact-website'), note=$('#lead-send-note'), more=$('.lead-more',dialog);
 const labels={ai:'AI visibility',seo:'SEO & search',social:'Social media',paid:'Paid campaigns',website:'Website & content',academy:'Learning at the academy',unsure:'Not sure yet'};
 let openingFocus=null;
 function selected(){return goals.filter(g=>g.checked).map(g=>g.value);}
 function setError(id,text){const el=$(id);if(!el)return;el.textContent=text;el.hidden=!text;}
 function clearFieldError(input){input.removeAttribute('aria-invalid');setError('#'+input.id+'-error','');}
 function invalid(input,text){input.setAttribute('aria-invalid','true');setError('#'+input.id+'-error',text);return input;}
 // "Not sure yet" stands alone; picking a real goal clears it and vice versa.
 goals.forEach(input=>input.addEventListener('change',()=>{
  if(input.checked&&input.value==='unsure')goals.forEach(g=>{if(g!==input)g.checked=false;});
  if(input.checked&&input.value!=='unsure'){const u=goals.find(g=>g.value==='unsure');if(u)u.checked=false;}
  setError('#lead-goals-error','');
 }));
 function normalWebsite(){const v=website.value.trim();if(!v)return '';try{const url=new URL(/^[a-z]+:\/\//i.test(v)?v:'https://'+v);if(!['https:','http:'].includes(url.protocol)||!url.hostname.includes('.')||/\s/.test(v)||url.username||url.password)return null;return url.href;}catch{return null;}}
 function validate(){
  let first=null;const flag=el=>{if(!first)first=el;};
  [goal,name,email,phone,website].forEach(clearFieldError);
  if(!selected().length){setError('#lead-goals-error','Choose at least one, or "Not sure yet".');flag(goals[0]);}
  if(!goal.value.trim())flag(invalid(goal,'Tell us a little about what you would like to change.'));
  if(!name.value.trim())flag(invalid(name,'What should we call you?'));
  if(!email.value.trim()||!email.validity.valid)flag(invalid(email,'Enter an email address like you@company.com.'));
  const digits=phone.value.replace(/\D/g,'').length;
  if(phone.value.trim()&&(!/^[+()\d\s.-]{7,25}$/.test(phone.value.trim())||digits<7||digits>15)){flag(invalid(phone,'Add a valid phone number, or leave this blank.'));more.open=true;}
  if(normalWebsite()===null){flag(invalid(website,'Use a website like yourbrand.com, or leave this blank.'));more.open=true;}
  if(first){first.focus();return false;}return true;
 }
 function buildBrief(){
  const keys=selected();
  const lines=[keys.length===1&&keys[0]==='academy'?'Hi WizGrowth - I would like to talk about learning with the academy.':'Hi WizGrowth - I would like to talk about growing my business.','','Name: '+name.value.trim(),'Email: '+email.value.trim()];
  if(phone.value.trim())lines.push('Phone: '+phone.value.trim());if(company.value.trim())lines.push('Business / project: '+company.value.trim());if(normalWebsite())lines.push('Website: '+normalWebsite());
  lines.push('Interested in: '+keys.map(k=>labels[k]).join(', '));
  const timeline=$('input[name="timeline"]:checked',form);lines.push('Timing: '+(timeline?timeline.value:'Not specified'),'','My goal:',goal.value.trim());
  return lines.join('\n');
 }
 function whatsappUrl(text){const wa=new URL('https://api.whatsapp.com/send/');wa.searchParams.set('phone','917907551261');wa.searchParams.set('text',text);wa.searchParams.set('type','phone_number');wa.searchParams.set('app_absent','0');return wa.href;}
 function emailUrl(text){return 'mailto:marketing@wizgrowth.com?subject='+encodeURIComponent('Growth enquiry - '+(company.value.trim()||name.value.trim()))+'&body='+encodeURIComponent(text);}
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!validate())return;
  const channel=(event.submitter&&event.submitter.dataset.channel)||'whatsapp', brief=buildBrief();
  if(channel==='email'){location.href=emailUrl(brief);note.textContent='Your email app should open a draft. Review it and press Send there. If nothing opens, copy the message instead.';}
  else{const win=window.open(whatsappUrl(brief),'_blank','noopener');note.textContent=win?'WhatsApp opened in a new tab with your message. Press Send there to finish.':'WhatsApp could not open. Copy the message and send it to +91 79075 51261.';}
  document.dispatchEvent(new CustomEvent('wg:enquiry',{detail:{channel}}));
 });
 $('#lead-copy').addEventListener('click',async()=>{
  if(!validate())return;const brief=buildBrief();
  try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(brief);else{const area=document.createElement('textarea');area.value=brief;area.style.cssText='position:fixed;opacity:0;left:0;top:0';dialog.append(area);area.select();const ok=document.execCommand('copy');area.remove();$('#lead-copy').focus();if(!ok)throw new Error('copy unavailable');}note.textContent='Message copied. Nothing has been sent; paste it wherever you like.';}
  catch{note.textContent='Copy is unavailable here. Email marketing@wizgrowth.com or WhatsApp +91 79075 51261 instead.';}
  document.dispatchEvent(new CustomEvent('wg:enquiry',{detail:{channel:'copy'}}));
 });
 [goal,name,email,phone,website].forEach(input=>input.addEventListener('input',()=>clearFieldError(input)));
 // Keep keyboard navigation in the open enquiry, including at the final control.
 dialog.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const targets=$$('a[href],button,input,textarea,select,summary,[tabindex]',dialog).filter(el=>!el.disabled&&el.tabIndex>=0&&el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden');
  if(!targets.length)return;
  const first=targets[0],last=targets[targets.length-1],current=document.activeElement;
  if(event.shiftKey&&(current===first||!targets.includes(current))){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&current===last){event.preventDefault();first.focus();}
 });
 dialog.addEventListener('close',()=>{if(openingFocus&&openingFocus.isConnected)openingFocus.focus({preventScroll:true});});
 function open(source){
  openingFocus=source||document.activeElement;
  if(source&&source.hasAttribute('data-academy-interest')&&!selected().length){const a=goals.find(g=>g.value==='academy');if(a)a.checked=true;}
  openDialog(dialog);$('#contact-dialog-title').focus({preventScroll:true});dialog.scrollTop=0;
 }
 return {open,get selected(){return selected();}};
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
document.addEventListener('click',event=>{const top=event.target.closest('#back-top');if(top)window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});});
$$('[data-close]',dialog).forEach(control=>control.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{body.style.overflow='';});
dialog.addEventListener('input',event=>{if(event.isTrusted&&!started){started=true;track('enquiry_start');}});
document.addEventListener('wg:enquiry',event=>track('enquiry_send',{channel:event.detail.channel}));
})();
