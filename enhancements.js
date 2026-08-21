(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const ready=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
ready(()=>{
  const toolbar=$('.toolbar'), viewportWrap=$('.viewport-wrap'), menu=$('#projectMenu');
  if(!toolbar||!viewportWrap)return;
  const group=document.createElement('div'); group.className='oc-enhance-group';
  const mode=document.createElement('button'); mode.className='small oc-mode-btn'; mode.type='button';
  const mobile=document.createElement('div'); mobile.className='oc-mobile-tools';
  const parts=document.createElement('button'); parts.className='small'; parts.textContent='Parts';
  const lab=document.createElement('button'); lab.className='small'; lab.textContent='Lab';
  mobile.append(parts,lab); group.append(mode,mobile); toolbar.appendChild(group);
  const badge=document.createElement('div'); badge.className='oc-classic-badge hidden'; badge.textContent='CLASSIC MODE'; viewportWrap.appendChild(badge);
  const setMode=(classic)=>{document.body.classList.toggle('oc-classic',classic);mode.classList.toggle('active',classic);mode.textContent=classic?'Classic ✓':'Classic';badge.classList.toggle('hidden',!classic);localStorage.setItem('opencircuit-ui-mode',classic?'classic':'advanced');};
  setMode(localStorage.getItem('opencircuit-ui-mode')==='classic'); mode.onclick=()=>setMode(!document.body.classList.contains('oc-classic'));
  const closeDrawers=()=>document.body.classList.remove('oc-left-open','oc-right-open');
  parts.onclick=()=>{const v=!document.body.classList.contains('oc-left-open');closeDrawers();document.body.classList.toggle('oc-left-open',v)};
  lab.onclick=()=>{const v=!document.body.classList.contains('oc-right-open');closeDrawers();document.body.classList.toggle('oc-right-open',v)};
  viewportWrap.addEventListener('pointerdown',()=>{if(innerWidth<=760)closeDrawers()});

  const modal=document.createElement('div'); modal.className='oc-modal'; modal.innerHTML='<div class="oc-card"><h2 id="ocModalTitle"></h2><p id="ocModalText"></p><textarea id="ocModalCode" spellcheck="false"></textarea><div class="oc-actions"><button id="ocClose">Close</button><button id="ocCopy" class="primary">Copy</button></div></div>'; document.body.appendChild(modal);
  const showModal=(title,text,code)=>{$('#ocModalTitle').textContent=title;$('#ocModalText').textContent=text;$('#ocModalCode').value=code;modal.classList.add('open');};
  $('#ocClose').onclick=()=>modal.classList.remove('open'); modal.addEventListener('pointerdown',e=>{if(e.target===modal)modal.classList.remove('open')});
  $('#ocCopy').onclick=async()=>{const ta=$('#ocModalCode');try{await navigator.clipboard.writeText(ta.value);$('#ocCopy').textContent='Copied ✓';setTimeout(()=>$('#ocCopy').textContent='Copy',1200)}catch{ta.select();document.execCommand('copy')}};

  if(menu){
    const sep=document.createElement('div'); sep.className='menu-separator';
    const label=document.createElement('div'); label.className='menu-label'; label.textContent='CONTINUITY';
    const classic=document.createElement('button'); classic.textContent='Classic / Diode-style mode'; classic.onclick=()=>{setMode(true);menu.classList.add('hidden')};
    const embed=document.createElement('button'); embed.textContent='Embed this circuit'; embed.onclick=()=>{menu.classList.add('hidden');const url=location.href;showModal('Embed OpenCircuit','Paste this iframe into any site. The current shared hash, when present, is preserved.',`<iframe src="${url.replaceAll('"','&quot;')}" width="100%" height="640" style="border:0;border-radius:12px" loading="lazy" allow="clipboard-write"></iframe>`)};
    const fork=document.createElement('button'); fork.textContent='Fork / duplicate locally'; fork.onclick=()=>{menu.classList.add('hidden');const raw=localStorage.getItem('opencircuit3d-project-v3')||localStorage.getItem('opencircuit3d-project');if(!raw){alert('No local project snapshot available yet.');return}const key=`opencircuit3d-fork-${Date.now()}`;localStorage.setItem(key,raw);showModal('Local fork created','A private browser copy was created without an account. Keep the JSON below as an extra portable backup.',raw)};
    menu.append(sep,label,classic,embed,fork);
    const presetLabel=menu.querySelector('.menu-label'); if(presetLabel&&presetLabel.textContent.trim()==='PRESETS')presetLabel.textContent='CLASSIC LABS';
    const rename={blink:'01 / Arduino Blink',logicLed:'02 / LED & Switch',sensorLcd:'03 / Sensor → LCD',potServo:'04 / Pot → Servo'};
    $$('[data-preset]').forEach(b=>{if(rename[b.dataset.preset])b.textContent=rename[b.dataset.preset]});
  }
});
})();
