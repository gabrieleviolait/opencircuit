(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const ready=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
const NOOP=`void setup() {}\nvoid loop() { delay(20); }\n`;
const FADE=`// Diode Classic: Slow Fade LED\nconst int LED = 9;\nint brightness = 0;\nint stepValue = 5;\n\nvoid setup() {\n  pinMode(LED, OUTPUT);\n}\n\nvoid loop() {\n  analogWrite(LED, brightness);\n  brightness = brightness + stepValue;\n  if (brightness >= 255) { brightness = 255; stepValue = -5; }\n  if (brightness <= 0) { brightness = 0; stepValue = 5; }\n  delay(25);\n}\n`;
const part=(id,type,position,params={})=>({id,type,position,rotation:[0,0,0],params});
const wire=(a,ap,b,bp,color=0xe9b441)=>({from:{partId:a,terminal:ap},to:{partId:b,terminal:bp},color});
const project=(parts,wires,code=NOOP)=>({app:'OpenCircuit3D',version:3,activePreset:null,scene:{version:2,snapEnabled:true,wireColor:0xef5350,parts,wires},code,hex:'',runtimeMode:'fast',instruments:{meter:[null,null],scope:[],logic:[]}});
const CLASSICS={
  npn:{name:'NPN Transistor Switch',note:'Toggle the green logic source. HIGH drives the NPN and lights the LED.',data:project([
    part('classic_board','arduino',[-4,0,0]),part('classic_logic','logic',[-2.5,0,2],{high:false,voltage:5}),part('classic_r','resistor',[-1.3,0,-1],{resistance:330}),part('classic_led','led',[.3,0,-1]),part('classic_q','npn',[2.1,0,-.4],{beta:100})
  ],[
    wire('classic_board','5V','classic_r','1',0xd64d55),wire('classic_r','2','classic_led','A'),wire('classic_led','K','classic_q','C'),wire('classic_q','E','classic_board','GND',0x333333),wire('classic_logic','OUT','classic_q','B',0x7896ff),wire('classic_logic','GND','classic_board','GND2',0x333333)
  ])},
  pnp:{name:'PNP Transistor Switch',note:'Toggle the logic source. LOW turns the PNP on; HIGH turns it off.',data:project([
    part('classic_board','arduino',[-4,0,0]),part('classic_logic','logic',[-2.4,0,2],{high:true,voltage:5}),part('classic_q','pnp',[-.5,0,-.3],{beta:100}),part('classic_led','led',[1.2,0,-.3]),part('classic_r','resistor',[2.8,0,-.3],{resistance:330})
  ],[
    wire('classic_board','5V','classic_q','E',0xd64d55),wire('classic_q','C','classic_led','A'),wire('classic_led','K','classic_r','1'),wire('classic_r','2','classic_board','GND',0x333333),wire('classic_logic','OUT','classic_q','B',0x7896ff),wire('classic_logic','GND','classic_board','GND2',0x333333)
  ])},
  nand:{name:'Two-Transistor NAND Gate',note:'Toggle A and B. The output LED is OFF only when both inputs are HIGH.',data:project([
    part('classic_board','arduino',[-4.5,0,0]),part('classic_bb','breadboard',[1,0,0]),part('logic_a','logic',[-3.3,0,2],{high:false,voltage:5}),part('logic_b','logic',[-1.8,0,2],{high:false,voltage:5}),part('pullup','resistor',[-1.4,0,-1.3],{resistance:1000}),part('q1','npn',[.2,0,-.4],{beta:120}),part('q2','npn',[1.3,0,-.4],{beta:120}),part('out_led','led',[2.4,0,-1.1]),part('out_r','resistor',[3.7,0,-1.1],{resistance:330})
  ],[
    wire('classic_board','5V','pullup','1',0xd64d55),wire('pullup','2','classic_bb','e10'),wire('q1','C','classic_bb','d10'),wire('classic_bb','c10','out_led','A'),wire('out_led','K','out_r','1'),wire('out_r','2','classic_board','GND',0x333333),wire('q1','E','q2','C'),wire('q2','E','classic_board','GND2',0x333333),wire('logic_a','OUT','q1','B',0x7896ff),wire('logic_b','OUT','q2','B',0x7896ff),wire('logic_a','GND','classic_board','GND',0x333333),wire('logic_b','GND','classic_board','GND2',0x333333)
  ])},
  timer555:{name:'NE555 Astable Multivibrator',note:'Classic free-running 555 oscillator. The RC network drives the output LED without Arduino code.',data:project([
    part('classic_board','arduino',[-4.5,0,0]),part('classic_bb','breadboard',[1,0,.4]),part('timer','timer555',[-.5,0,.2]),part('r1','resistor',[-1.1,0,-1.3],{resistance:1000}),part('r2','resistor',[.5,0,-1.3],{resistance:10000}),part('cap','capacitor',[2.2,0,.7],{capacitance:0.0001}),part('led','led',[2.4,0,-1.1]),part('load','resistor',[3.8,0,-1.1],{resistance:330})
  ],[
    wire('classic_board','5V','timer','8',0xd64d55),wire('classic_board','5V','timer','4',0xd64d55),wire('classic_board','5V','r1','1',0xd64d55),wire('r1','2','classic_bb','e10'),wire('timer','7','classic_bb','d10'),wire('r2','1','classic_bb','c10'),wire('r2','2','classic_bb','e15'),wire('timer','2','classic_bb','d15'),wire('timer','6','classic_bb','c15'),wire('cap','+','classic_bb','b15'),wire('cap','-','classic_board','GND',0x333333),wire('timer','1','classic_board','GND2',0x333333),wire('timer','3','led','A'),wire('led','K','load','1'),wire('load','2','classic_board','GND',0x333333)
  ])},
  fade:{name:'Slow Fade LED',note:'Arduino PWM gradually fades the LED up and down on D9.',data:project([
    part('classic_board','arduino',[-3.5,0,0]),part('classic_bb','breadboard',[1.4,0,0]),part('classic_r','resistor',[-.2,0,-.5],{resistance:220}),part('classic_led','led',[1.3,0,-.5])
  ],[
    wire('classic_board','D9','classic_r','1',0xe9b441),wire('classic_r','2','classic_led','A',0xe9b441),wire('classic_led','K','classic_board','GND',0x333333)
  ],FADE)}
};
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
  const loadClassic=(id)=>{
    const preset=CLASSICS[id],json=$('#jsonText'),importBtn=$('#importJsonBtn');
    if(!preset||!json||!importBtn)return;
    json.value=JSON.stringify(preset.data);
    importBtn.click();
    setMode(true); closeDrawers(); menu?.classList.add('hidden');
    setTimeout(()=>$('#runBtn')?.click(),80);
    const c=$('#console'); if(c){c.textContent+=`[classic] ${preset.name} loaded. ${preset.note}\n`;c.scrollTop=c.scrollHeight;}
  };

  if(menu){
    const presetLabel=menu.querySelector('.menu-label'); if(presetLabel&&presetLabel.textContent.trim()==='PRESETS')presetLabel.textContent='CLASSIC LABS';
    const rename={blink:'01 / Arduino Blink',logicLed:'02 / LED & Switch',sensorLcd:'03 / Sensor → LCD',potServo:'04 / Pot → Servo'};
    $$('[data-preset]').forEach(b=>{if(rename[b.dataset.preset])b.textContent=rename[b.dataset.preset]});
    const classicSep=document.createElement('div'); classicSep.className='menu-separator';
    const classicLabel=document.createElement('div'); classicLabel.className='menu-label'; classicLabel.textContent='DIODE CLASSICS — REBUILT';
    menu.append(classicSep,classicLabel);
    [['npn','05 / NPN Transistor'],['pnp','06 / PNP Transistor'],['nand','07 / NAND Gate'],['timer555','08 / NE555 Astable'],['fade','09 / Slow Fade LED']].forEach(([id,title])=>{const b=document.createElement('button');b.textContent=title;b.title=CLASSICS[id].note;b.onclick=()=>loadClassic(id);menu.appendChild(b)});
    const sep=document.createElement('div'); sep.className='menu-separator';
    const label=document.createElement('div'); label.className='menu-label'; label.textContent='CONTINUITY';
    const classic=document.createElement('button'); classic.textContent='Classic / Diode-style mode'; classic.onclick=()=>{setMode(true);menu.classList.add('hidden')};
    const embed=document.createElement('button'); embed.textContent='Embed this circuit'; embed.onclick=()=>{menu.classList.add('hidden');const url=location.href;showModal('Embed OpenCircuit','Paste this iframe into any site. The current shared hash, when present, is preserved.',`<iframe src="${url.replaceAll('"','&quot;')}" width="100%" height="640" style="border:0;border-radius:12px" loading="lazy" allow="clipboard-write"></iframe>`)};
    const fork=document.createElement('button'); fork.textContent='Fork / duplicate locally'; fork.onclick=()=>{menu.classList.add('hidden');const raw=localStorage.getItem('opencircuit3d-project-v3')||localStorage.getItem('opencircuit3d-project');if(!raw){alert('No local project snapshot available yet.');return}const key=`opencircuit3d-fork-${Date.now()}`;localStorage.setItem(key,raw);showModal('Local fork created','A private browser copy was created without an account. Keep the JSON below as an extra portable backup.',raw)};
    menu.append(sep,label,classic,embed,fork);
  }
});
})();
