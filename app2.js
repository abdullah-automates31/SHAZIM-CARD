(function(){
"use strict";
/* ================= EDIT THESE ================= */
var CONFIG={
  name:"Shazim",
  dateLong:"20 October 2026",
  dateShort:"20 OCT 2026",
  time:"9 PM",
  venueName:"Pathan – Clifton",
  venueShort:"PATHAN, CLIFTON",
  address:"D-10, Main Khalil ur Zaman Rd, Block 8, Flyover Khayaban-e-Iqbal Rd, Clifton, Karachi 75500, Pakistan",
  mapsLink:"",                 /* paste your Google Maps link here; empty = search by venue + address */
  whatsapp:"",                 /* digits with country code, e.g. 923001234567; empty = WhatsApp opens a contact chooser */
  eventISO:"2026-10-20T21:00:00+05:00"   /* kick-off, used by the live countdown */
};
/* Playlist for the CD player. To add a song, add another {title,src} entry (src = mp3 file or data: URI). */
var SONGS=[{title:"Match Day Theme",src:"{{SONG1}}"}];
/* ============================================== */
var $=function(id){return document.getElementById(id)};
var clamp=function(x,a,b){a=a==null?0:a;b=b==null?1:b;return Math.min(b,Math.max(a,x))};
var prog=function(t,a,b){return clamp((t-a)/(b-a))};
var lerp=function(a,b,x){return a+(b-a)*x};
var eo=function(x){return 1-Math.pow(1-x,3)};
var eio=function(x){return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
var eoBack=function(x){var c1=1.4,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
function rng(seed){var a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function mk(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;return c}
var reduced=false;try{reduced=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}

/* ---------- text + links ---------- */
var V={nameUp:CONFIG.name.toUpperCase()+'’S',dateLong:CONFIG.dateLong,dateShort:CONFIG.dateShort,time:CONFIG.time,venueName:CONFIG.venueName,venueShort:CONFIG.venueShort,address:CONFIG.address};
Array.prototype.forEach.call(document.querySelectorAll('[data-b]'),function(e){e.textContent=V[e.getAttribute('data-b')]});
var mapsHref=/^https?:\/\//i.test(CONFIG.mapsLink)?CONFIG.mapsLink:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(CONFIG.venueName+' '+CONFIG.address);
$('locBtn').href=mapsHref;
var digits=String(CONFIG.whatsapp).replace(/\D/g,'');
function wa(t){return 'https://wa.me/'+digits+'?text='+encodeURIComponent(t)}
$('yesBtn').href=wa('Hi! I’m excited to attend '+CONFIG.name+'’s Birthday Celebration! ⚽🎉');
$('noBtn').href=wa('Hi! Sadly we can’t make it to '+CONFIG.name+'’s Birthday Celebration, but we’re sending lots of love! ⚽');

/* ---------- football svg ---------- */
function pent(cx,cy,r,rot){var o=[];for(var i=0;i<5;i++){var a=(rot+i*72)*Math.PI/180;o.push((cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1))}return o.join(' ')}
function ballSVG(){
  var s='<svg viewBox="0 0 100 100" width="100%" height="100%"><defs><radialGradient id="bs" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".65" stop-color="#eceae2"/><stop offset="1" stop-color="#b3b0a2"/></radialGradient><clipPath id="bc"><circle cx="50" cy="50" r="48"/></clipPath></defs><circle cx="50" cy="50" r="48" fill="url(#bs)"/><g clip-path="url(#bc)" fill="#15191a" stroke="#15191a" stroke-linejoin="round" stroke-width="1.5"><polygon points="'+pent(50,50,15,-90)+'"/>';
  for(var i=0;i<5;i++){var d=-90+i*72,a=d*Math.PI/180;
    s+='<line x1="'+(50+15*Math.cos(a)).toFixed(1)+'" y1="'+(50+15*Math.sin(a)).toFixed(1)+'" x2="'+(50+38*Math.cos(a)).toFixed(1)+'" y2="'+(50+38*Math.sin(a)).toFixed(1)+'" fill="none" stroke-width="2"/>';
    s+='<polygon points="'+pent(50+50*Math.cos(a),50+50*Math.sin(a),14,d+180)+'"/>';}
  return s+'</g><circle cx="50" cy="50" r="48" fill="none" stroke="#15191a" stroke-width="2"/></svg>';
}
Array.prototype.forEach.call(document.querySelectorAll('[data-ball]'),function(e){e.innerHTML=ballSVG()});

/* ---------- gold wax seal (two halves) ---------- */
function sealPath(){var d='',N=90;for(var i=0;i<=N;i++){var a=i/N*Math.PI*2,r=32+1.7*Math.sin(7*a+.4)+1.1*Math.sin(13*a+1.3);d+=(i?'L':'M')+(38+r*Math.cos(a)).toFixed(2)+' '+(38+r*Math.sin(a)).toFixed(2)}return d+'Z'}
var FF='font-family="Big Shoulders Display,Impact,sans-serif" font-weight="900" font-size="41" text-anchor="middle"';
function sealBody(){return '<path d="'+sealPath()+'" fill="url(#sg)" stroke="#6f5210" stroke-width="1.2"/>'+
 '<circle cx="38" cy="38" r="25" fill="none" stroke="rgba(110,78,12,.75)" stroke-width="1.6"/>'+
 '<circle cx="38" cy="38" r="27" fill="none" stroke="rgba(255,244,190,.65)" stroke-width=".8"/>'+
 '<text x="38.9" y="53.6" '+FF+' fill="#6a4c0c">3</text><text x="37.3" y="52.4" '+FF+' fill="#fbe9a8">3</text><text x="38" y="53" '+FF+' fill="#c79a2e">3</text>'+
 '<ellipse cx="27" cy="22" rx="11" ry="5" fill="rgba(255,255,255,.35)" transform="rotate(-35 27 22)"/>';}
$('sealSvg').innerHTML='<defs><radialGradient id="sg" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fbe9a8"/><stop offset=".5" stop-color="#d9b44a"/><stop offset="1" stop-color="#8a6a17"/></radialGradient>'+
 '<clipPath id="clL"><rect x="0" y="0" width="38" height="76"/></clipPath><clipPath id="clR"><rect x="38" y="0" width="38" height="76"/></clipPath></defs>'+
 '<g id="sealL" clip-path="url(#clL)">'+sealBody()+'</g><g id="sealR" clip-path="url(#clR)">'+sealBody()+'</g>';
var sealL=$('sealL'),sealR=$('sealR');
sealL.style.transformOrigin='38px 38px';sealR.style.transformOrigin='38px 38px';
(function(){var c=$('paperNoise'),x=c.getContext('2d'),im=x.createImageData(256,256),r=rng(5);
  for(var i=0;i<256*256;i++){var v=r();im.data[i*4]=150;im.data[i*4+1]=125;im.data[i*4+2]=85;im.data[i*4+3]=v*46}
  x.putImageData(im,0,0)})();

/* ---------- layout (stage fits the screen, card lands exactly on the document) ---------- */
var stage=$('stage'),doc=$('doc'),docHolder=$('docHolder'),docPage=$('docPage');
var LY={sc:1,final:{x:0,y:0,w:540,h:960},docW:480,docScale:1};
function layout(){
  var vw=window.innerWidth,vh=window.innerHeight;
  var sc=Math.min(vw/540,vh/960),sl=(vw-540*sc)/2,st=(vh-960*sc)/2,docW=Math.min(vw,480);
  stage.style.transform='translate('+sl+'px,'+st+'px) scale('+sc+')';
  LY.sc=sc;LY.docW=docW;LY.docScale=docW/480;
  LY.final={x:((vw-docW)/2-sl)/sc,y:(0-st)/sc,w:docW/sc,h:vh/sc};
  docHolder.style.width=docW+'px';
  docPage.style.transform='scale('+LY.docScale+')';
  docHolder.style.height=(docPage.offsetHeight*LY.docScale)+'px';
  var fd=$('fxDoc'),d=Math.min(window.devicePixelRatio||1,2);fd.width=vw*d;fd.height=vh*d;
}
window.addEventListener('resize',function(){layout();if(mode==='doc')return;});

/* ---------- geometry ---------- */
var EL=60,ET=430;
function envState(t,u){
  var intro=eo(prog(t,0,3.4)),s=0.93+0.07*intro;
  var ty=Math.sin(u*1.5)*3*prog(u,0.9,1.6)*(1-prog(t,3.4,4.1)),tx=0;
  var pe=eio(prog(t,7.0,8.8));s*=1-0.2*pe;ty+=560*pe;
  return {s:s,tx:tx,ty:ty,op:1-prog(t,7.3,8.6)};
}
var cardLy=function(t){return lerp(22,-262,eio(prog(t,4.7,6.95)))};
function localToStage(lx,ly,es){return [EL+210+(lx-210)*es.s+es.tx,ET+145+(ly-145)*es.s+es.ty]}

/* ---------- stadium background ---------- */
var L={};
(function build(){
  var c=mk(540,960),x=c.getContext('2d'),r=rng(11),g=x.createLinearGradient(0,150,0,530);
  g.addColorStop(0,'rgba(10,4,6,0)');g.addColorStop(.35,'rgba(58,8,16,.6)');g.addColorStop(.8,'rgba(96,10,24,.8)');g.addColorStop(1,'rgba(20,6,8,0)');
  x.fillStyle=g;x.fillRect(0,150,540,380);
  for(var i=0;i<900;i++){
    var y=190+Math.pow(r(),.9)*310,xx=r()*540,size=1.4+(y-190)/310*3.2*r()+r()*1.4,pk=r();
    var col=pk<.5?'226,32,58':pk<.76?'255,255,255':pk<.9?'255,196,130':'30,150,96',al=.3+r()*.5;
    var gd=x.createRadialGradient(xx,y,0,xx,y,size*1.6);gd.addColorStop(0,'rgba('+col+','+al+')');gd.addColorStop(.55,'rgba('+col+','+al*.6+')');gd.addColorStop(1,'rgba('+col+',0)');
    x.fillStyle=gd;x.beginPath();x.arc(xx,y,size*1.6,0,6.283);x.fill();
  }
  L.crowd=c;
  c=mk(540,960);x=c.getContext('2d');
  var beam=function(x0,y0,x1,y1,x2,y2){var gr=x.createLinearGradient(x0,y0,(x1+x2)/2,(y1+y2)/2);gr.addColorStop(0,'rgba(255,246,222,.55)');gr.addColorStop(1,'rgba(255,246,222,0)');x.fillStyle=gr;x.beginPath();x.moveTo(x0,y0);x.lineTo(x1,y1);x.lineTo(x2,y2);x.closePath();x.fill()};
  beam(34,28,-70,780,400,780);beam(506,28,140,780,610,780);L.beams=c;
  c=mk(540,960);x=c.getContext('2d');
  var lamp=function(cx,cy,rot){x.save();x.translate(cx,cy);x.rotate(rot);
    for(var i=0;i<6;i++)for(var j=0;j<3;j++){var px=(i-2.5)*13,py=(j-1)*13;
      var gr=x.createRadialGradient(px,py,0,px,py,15);gr.addColorStop(0,'rgba(255,255,240,1)');gr.addColorStop(.25,'rgba(255,244,210,.7)');gr.addColorStop(1,'rgba(255,240,200,0)');
      x.fillStyle=gr;x.beginPath();x.arc(px,py,15,0,6.283);x.fill();}
    x.restore()};
  lamp(52,40,-.2);lamp(488,40,.2);L.lamps=c;
  c=mk(540,960);x=c.getContext('2d');
  var hz=600,vx=270,n=14,gr2;
  for(var k=-n;k<n;k++){var wh=13,wb=118;
    x.fillStyle=(k&1)?'rgba(9,58,36,.95)':'rgba(12,74,46,.95)';
    x.beginPath();x.moveTo(vx+k*wh,hz);x.lineTo(vx+(k+1)*wh,hz);x.lineTo(vx+(k+1)*wb,960);x.lineTo(vx+k*wb,960);x.closePath();x.fill();}
  gr2=x.createLinearGradient(0,hz,0,960);gr2.addColorStop(0,'rgba(4,8,6,1)');gr2.addColorStop(.35,'rgba(4,8,6,.45)');gr2.addColorStop(1,'rgba(0,0,0,.05)');x.fillStyle=gr2;x.fillRect(0,hz-2,540,362);
  x.strokeStyle='rgba(255,255,255,.3)';x.lineWidth=2;
  x.beginPath();x.ellipse(270,830,230,58,0,0,6.283);x.stroke();x.beginPath();x.moveTo(-20,772);x.lineTo(560,772);x.stroke();x.beginPath();x.rect(105,640,330,60);x.stroke();
  L.pitch=c;
})();
var flashes=(function(){var r=rng(77),a=[];for(var i=0;i<60;i++)a.push({t:0.5+r()*44,x:20+r()*500,y:200+r()*280,r:8+r()*10});return a})();
var dust=(function(){var r=rng(21),a=[];for(var i=0;i<45;i++)a.push({x:r()*540,y:r()*960,v:8+r()*22,ph:r()*6.28,s:.8+r()*1.6});return a})();
var bg=$('bg'),bx=bg.getContext('2d');
function drawStar(c,x,y,r,a){
  c.globalAlpha=a;var gr=c.createRadialGradient(x,y,0,x,y,r*1.1);gr.addColorStop(0,'rgba(255,240,190,.9)');gr.addColorStop(1,'rgba(255,220,140,0)');
  c.fillStyle=gr;c.beginPath();c.arc(x,y,r*1.1,0,6.283);c.fill();
  c.fillStyle='#fff';c.beginPath();
  for(var i=0;i<8;i++){var rr=i%2?r*.16:r,an=i*Math.PI/4;c.lineTo(x+Math.cos(an)*rr,y+Math.sin(an)*rr)}
  c.closePath();c.fill();c.globalAlpha=1;
}
function drawBG(u){
  bx.setTransform(1,0,0,1,0,0);bx.globalAlpha=1;bx.globalCompositeOperation='source-over';
  var gr=bx.createLinearGradient(0,0,0,960);gr.addColorStop(0,'#040405');gr.addColorStop(.55,'#0d0508');gr.addColorStop(1,'#04120b');
  bx.fillStyle=gr;bx.fillRect(0,0,540,960);
  var on=Math.min(1,prog(u,0.3,1.6)*1.15)*(1-.55*(Math.sin(u*46)*.5+.5)*(1-prog(u,.3,1.5)));
  var z=1+0.05*clamp(u/40);
  bx.save();bx.translate(270,440);bx.scale(z,z);bx.translate(-270,-440);
  bx.drawImage(L.crowd,0,0);bx.drawImage(L.pitch,0,0);
  bx.globalCompositeOperation='lighter';
  bx.globalAlpha=on*(.85+.15*Math.sin(u*1.1));bx.drawImage(L.beams,0,0);
  bx.globalAlpha=on;bx.drawImage(L.lamps,0,0);bx.globalAlpha=1;
  for(var i=0;i<flashes.length;i++){var f=flashes[i],d=u-f.t;if(d>=0&&d<.16)drawStar(bx,f.x,f.y,f.r*(1.2-d),1-d/.16)}
  bx.restore();
  bx.globalCompositeOperation='lighter';
  for(var j=0;j<dust.length;j++){var m=dust[j],y=((m.y-u*m.v)%980+980)%980-10,x=m.x+Math.sin(u*.6+m.ph)*14;bx.globalAlpha=(.25+.35*Math.sin(u*1.7+m.ph))*on*.9+.05;bx.fillStyle='#f6dc8b';bx.beginPath();bx.arc(x,y,m.s,0,6.283);bx.fill()}
  bx.globalAlpha=1;bx.globalCompositeOperation='source-over';
  var vg=bx.createRadialGradient(270,440,180,270,440,640);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.72)');
  bx.fillStyle=vg;bx.fillRect(0,0,540,960);
}

/* ---------- stage FX: tap ripples + sparks ---------- */
var FXS=1.5,fx=$('fx'),fc=fx.getContext('2d'),SPARKS=[];
(function(){
  var r=rng(303),es0=envState(3.55,3.55),sp0=localToStage(210,176,es0),i;
  for(i=0;i<40;i++)SPARKS.push({t0:3.55+r()*.05,x:sp0[0],y:sp0[1],a:r()*6.283,sp:70+r()*190,life:.7+r()*.7,sz:5+r()*8,g:110});
  for(i=0;i<70;i++){var t0=4.9+r()*2.4,es=envState(t0,t0),cy=cardLy(t0),p=localToStage(20+r()*380,cy+r()*40,es);
    SPARKS.push({t0:t0,x:p[0],y:p[1],a:-Math.PI/2+(r()-.5)*1.6,sp:30+r()*80,life:.9+r()*.9,sz:3+r()*6,g:-10})}
  for(i=0;i<26;i++)SPARKS.push({t0:9.42+r()*.04,x:270+(416-240)*1.125,y:324*1.125,a:r()*6.283,sp:120+r()*220,life:.5+r()*.5,sz:4+r()*7,g:120});
})();
function drawFX(t,u,idle){
  fc.setTransform(FXS,0,0,FXS,0,0);fc.clearRect(0,0,540,960);
  var es=envState(t,u),p=localToStage(210,176,es),i,q;
  if(idle&&u>1.9){for(i=0;i<2;i++){q=((u*.5+i*.5)%1);fc.strokeStyle='rgba(246,220,139,'+(.75*(1-q))+')';fc.lineWidth=2.2*(1-q)+.6;fc.beginPath();fc.arc(p[0],p[1],lerp(26,86,eo(q)),0,6.283);fc.stroke()}}
  else if(t>3.0&&t<3.75){for(i=0;i<2;i++){q=prog(t,2.85+i*.28,3.55+i*.28);if(q>0&&q<1){fc.strokeStyle='rgba(246,220,139,'+(.8*(1-q))+')';fc.lineWidth=2.2*(1-q)+.6;fc.beginPath();fc.arc(p[0],p[1],lerp(26,84,eo(q)),0,6.283);fc.stroke()}}}
  fc.globalCompositeOperation='lighter';
  for(i=0;i<SPARKS.length;i++){var s=SPARKS[i],d=t-s.t0;if(d<0||d>s.life)continue;var w=d/s.life,
    x=s.x+Math.cos(s.a)*s.sp*d*(1-.4*w),y=s.y+Math.sin(s.a)*s.sp*d*(1-.4*w)+.5*s.g*d*d,al=Math.pow(1-w,1.2)*(.6+.4*Math.sin(d*40+s.sz));
    drawStar(fc,x,y,s.sz*(1-.4*w),al)}
  fc.globalCompositeOperation='source-over';fc.globalAlpha=1;
}

/* ---------- reveal helper ---------- */
function rv(el,t,t0,d,o){o=o||{};var p=prog(t,t0,t0+d),e=(o.ease||eo)(p);
  el.style.opacity=p<=0?0:clamp(p*2.4);
  var tf='',dy=(o.dy==null?18:o.dy)*(1-e);if(dy)tf+='translateY('+dy+'px) ';
  if(o.s0!=null)tf+='scale('+lerp(o.s0,1,e)+') ';
  el.style.transform=tf||'none';
  if(o.wipe)el.style.clipPath=p>=1?'none':'inset(-12% '+(100*(1-eo(p)))+'% -12% 0)';
}
var eBack=$('eBack'),eGlow=$('eGlow'),ePocket=$('ePocket'),eSheen=$('eSheen'),eText=$('eText'),eFlapWrap=$('eFlapWrap'),eFlap=$('eFlap'),eSealWrap=$('eSealWrap'),eShadow=$('eShadow');
var envParts=[eShadow,eBack,eGlow,ePocket,eSheen,eText,eFlapWrap,eSealWrap];
var card=$('card'),cardIn=$('cardIn'),cardSheen=$('cardSheen'),tap=$('tapHint'),fadeIn=$('fadeIn'),eScript=$('eScript'),eCaps=$('eCaps');
var outFace=eFlap.querySelector('.out'),inFace=eFlap.querySelector('.in'),photoImg=document.querySelector('#photoWrap img');
card.style.display='block';

/* ---------- main seek: t = story time, u = wall time ---------- */
function seek(t,u,idle){
  var es=envState(t,u),i;
  drawBG(u);
  var tf='translate('+es.tx+'px,'+es.ty+'px) scale('+es.s+')';
  for(i=0;i<envParts.length;i++){var p=envParts[i];p.style.transform=tf;p.style.opacity=es.op;p.style.display=es.op<=0.001?'none':'block'}
  eShadow.style.opacity=es.op*(1-.6*prog(t,4.7,6.9));
  var th=180*eio(prog(t,3.75,5.1));
  eFlap.style.transform='perspective(1100px) rotateX('+th+'deg)';
  outFace.style.filter='brightness('+(1-.55*clamp(th/90))+')';
  inFace.style.filter='brightness('+(.5+.5*clamp((th-90)/90))+')';
  eFlapWrap.style.zIndex=th>=90?12:30;
  eSheen.style.backgroundPosition=(t<3.0?100*(1-((u*.3)%1)):100*(1-prog(t,1.2,3.3)))+'% 0';
  eScript.style.clipPath='inset(-20% '+(100*(1-eo(prog(u,0.7,2.0))))+'% -20% 0)';
  eCaps.style.opacity=prog(u,1.7,2.5);
  eGlow.style.opacity=es.op*.9*prog(t,3.85,4.9)*(1-.45*prog(t,5,6.5))*(1-prog(t,6.8,7.6));
  var press=prog(t,3.15,3.45),be=eo(prog(t,3.5,4.6));
  var sc=1-.07*press*(1-prog(t,3.45,3.5))+.05*prog(t,3.45,3.55)*(1-prog(t,3.55,3.9));
  sealL.style.transform='translate('+(-24*be)+'px,'+(110*be*be)+'px) rotate('+(-48*be)+'deg) scale('+sc+')';
  sealR.style.transform='translate('+(24*be)+'px,'+(100*be*be)+'px) rotate('+(52*be)+'deg) scale('+sc+')';
  eSealWrap.style.opacity=es.op*(1-prog(t,3.95,4.7));
  tap.style.opacity=prog(u,2.0,2.6)*(1-prog(t,3.25,3.55))*(.72+.28*Math.sin(u*7));
  // card
  var es7=envState(Math.min(t,7.0),u),cly=cardLy(t);
  var X0=EL+210+(20-210)*es7.s+es7.tx,Y0=ET+145+(cly-145)*es7.s+es7.ty,W0=380*es7.s,H0=258*es7.s;
  var pe2=eio(prog(t,7.0,8.7)),F=LY.final;
  var cx=lerp(X0,F.x,pe2),cy=lerp(Y0,F.y,pe2),cw=lerp(W0,F.w,pe2),ch=lerp(H0,F.h,pe2);
  card.style.visibility=t<4.6?'hidden':'visible';
  card.style.zIndex=t<7.0?17:60;
  card.style.left=cx+'px';card.style.top=cy+'px';card.style.width=cw+'px';card.style.height=ch+'px';
  card.style.borderRadius=lerp(6,0,pe2)+'px';
  var k=cw/480,shake=t>9.4?Math.sin((t-9.4)*95)*3.2*(1-prog(t,9.4,9.7)):0;
  cardIn.style.transform='translate(0px,'+(shake*k)+'px) scale('+k+')';
  photoImg.style.transform='scale('+(1+.09*prog(t,4.8,13))+')';
  var sp1=prog(t,8.85,9.95);
  cardSheen.style.opacity=(sp1>0&&sp1<1)?1:0;cardSheen.style.backgroundPosition=(100*(1-sp1))+'% 0';
  rv($('kicker'),t,7.9,.7,{dy:14});
  rv($('h1a'),t,8.15,.7,{dy:22,wipe:true});
  rv($('h1b'),t,8.4,.8,{dy:0,s0:1.18,ease:eoBack});
  rv($('h1c'),t,8.8,.7,{dy:14});
  rv($('cel1'),t,9.15,.6,{dy:12});
  rv($('cel2'),t,9.35,.7,{dy:0,s0:.82,ease:eoBack});
  rv($('cel3'),t,9.7,.25,{dy:0,wipe:true});
  var pb=prog(t,9.0,9.42),bdg=$('badge7');bdg.style.opacity=pb>0?1:0;bdg.style.transform='scale('+lerp(2.8,1,eo(pb))+') rotate('+lerp(-16,0,eo(pb))+'deg)';
  drawFX(t,u,idle);
  fadeIn.style.opacity=1-prog(u,0,0.9);
}

/* ---------- confetti on the document ---------- */
var fd=$('fxDoc'),fdc=fd.getContext('2d'),CP=[],cRun=false;
var CCOLS=['#e0193a','#f7f5ee','#d9b44a','#0f8a55','#f6dc8b','#c8102e'];
function confetti(kind){
  if(reduced)return;
  var now=performance.now()/1000,w=window.innerWidth,h=window.innerHeight,r=Math.random,i,d=Math.min(window.devicePixelRatio||1,2);
  if(kind==='cannons'){for(var s=0;s<2;s++)for(i=0;i<80;i++)CP.push({t0:now+r()*.12,x:s?w-10:10,y:h,vx:(s?-1:1)*(120+r()*280)*(w/540)*.9,vy:-(h*.75+r()*h*.7),g:h*1.1,k:.95,sz:5+r()*6,rot:r()*6.28,rv:(r()-.5)*14,fl:6+r()*10,c:CCOLS[i%6],round:r()<.2,long:r()<.15})}
  else{for(i=0;i<110;i++)CP.push({t0:now+r()*.5,x:r()*w,y:-20,vx:(r()-.5)*70,vy:60+r()*80,g:260,k:1.7,sz:5+r()*6,rot:r()*6.28,rv:(r()-.5)*10,fl:4+r()*8,c:CCOLS[(i*3)%6],round:r()<.2,long:r()<.2})}
  if(!cRun){cRun=true;requestAnimationFrame(cLoop)}
}
function cLoop(){
  var w=window.innerWidth,h=window.innerHeight,d=Math.min(window.devicePixelRatio||1,2),now=performance.now()/1000;
  fdc.setTransform(d,0,0,d,0,0);fdc.clearRect(0,0,w,h);
  CP=CP.filter(function(p){return now-p.t0<7&&!(p.cy>h+40&&now-p.t0>1)});
  for(var i=0;i<CP.length;i++){var p=CP[i],t=now-p.t0;if(t<0)continue;
    var e=Math.exp(-p.k*t),x=p.x+p.vx*(1-e)/p.k,y=p.y+(p.g/p.k)*t+(p.vy-p.g/p.k)*(1-e)/p.k,fl=Math.abs(Math.cos(t*p.fl));
    p.cy=y;fdc.save();fdc.translate(x,y);fdc.rotate(p.rot+p.rv*t);fdc.fillStyle=p.c;
    if(p.round){fdc.beginPath();fdc.arc(0,0,p.sz*.42,0,6.283);fdc.fill()}
    else if(p.long){fdc.fillRect(-p.sz*1.6,-1.2,p.sz*3.2,2.4*Math.max(.3,fl))}
    else{fdc.fillRect(-p.sz/2,-p.sz*.3*fl,p.sz,p.sz*.6*Math.max(.15,fl))}
    fdc.restore()}
  if(CP.length)requestAnimationFrame(cLoop);else{cRun=false;fdc.clearRect(0,0,w,h)}
}

/* ---------- countdown ---------- */
var target=new Date(CONFIG.eventISO).getTime(),cdTimer=0;
function pad(n){return n<10?'0'+n:''+n}
function tick(){
  var ms=target-Date.now();
  if(isNaN(ms))return;
  if(ms<=0){$('cdD').textContent='00';$('cdH').textContent='00';$('cdM').textContent='00';$('cdS').textContent='00';return}
  var s=Math.floor(ms/1000);
  $('cdD').textContent=pad(Math.floor(s/86400));$('cdH').textContent=pad(Math.floor(s%86400/3600));$('cdM').textContent=pad(Math.floor(s%3600/60));$('cdS').textContent=pad(s%60);
}


/* ---------- CD player ---------- */
var au=new Audio(),cur=0,cdp=$('cdp');
au.preload='none';au.loop=SONGS.length===1;
if(SONGS.length>1)cdp.classList.remove('solo');
function fmt(s){if(!isFinite(s))return'0:00';s=Math.floor(s);return Math.floor(s/60)+':'+pad(s%60)}
function loadSong(i,play){cur=(i+SONGS.length)%SONGS.length;au.src=SONGS[cur].src;if(play)au.play().catch(function(){})}
function toggleSong(){if(au.paused){var p=au.play();if(p&&p.catch)p.catch(function(){})}else au.pause()}
au.addEventListener('play',function(){cdp.classList.add('on');$('lcdTitle').textContent=SONGS[cur].title});
au.addEventListener('pause',function(){cdp.classList.remove('on');$('lcdTitle').textContent='TAP THE CD'});
au.addEventListener('ended',function(){if(SONGS.length>1)loadSong(cur+1,true)});
$('cdLid').addEventListener('click',toggleSong);
$('cdLid').addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();toggleSong()}});
loadSong(0,false);
/* ---------- hand-off: stage card becomes the scrolling page ---------- */
var mode='intro',playT0=0,u0=performance.now(),raf=0;
var HAND=10.0;
function handoff(u){
  if(mode==='doc')return;
  seek(HAND,u,false);
  var page=$('page');
  $('pageSlot').appendChild(page);
  page.style.left='0';page.style.top='0';
  ['tag','board','locBtn','locHint'].forEach(function(id){var e=$(id);e.style.cssText='';e.classList.add('rise')});
  ['bBar','bR1','bR2','bR3'].forEach(function(id){$(id).style.cssText=''});
  var e2=$('locBtn');e2.style.cssText='';
  doc.style.display='block';doc.scrollTop=0;
  layout();
  stage.style.display='none';
  if(window.innerWidth>520){var lastBG=0;(function bgLoop(now){if(now-lastBG>66){drawBG((now-u0)/1000);lastBG=now}requestAnimationFrame(bgLoop)})(0)}else{bg.style.display='none'}
  mode='doc';
  var els=document.querySelectorAll('.rise');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);if(x.target.id==='closing'){$('ballrow').classList.add('bounce');confetti('cannons')}}})},{root:doc,threshold:.18});
    Array.prototype.forEach.call(els,function(e){io.observe(e)});
  }else{Array.prototype.forEach.call(els,function(e){e.classList.add('in')});$('ballrow').classList.add('bounce')}
  tick();cdTimer=setInterval(tick,1000);
  setTimeout(function(){confetti('rain')},250);
}
function frame(now){
  if(mode==='doc')return;
  var u=(now-u0)/1000,t,idle=false;
  if(mode==='intro'){t=Math.min(u,2.6);if(u>=2.6)mode='idle'}
  else if(mode==='idle'){t=2.6;idle=true}
  else{t=3.0+(now-playT0)/1000;if(t>=HAND){handoff(u);return}}
  seek(t,u,idle);
  raf=requestAnimationFrame(frame);
}
function open(){
  if(mode==='doc'||mode==='play')return;
  if(reduced){handoff((performance.now()-u0)/1000);return}
  var now=performance.now(),u=(now-u0)/1000;
  if(mode==='intro'){u0-=Math.max(0,2.6-u)*1000}
  mode='play';playT0=performance.now();
}
stage.addEventListener('pointerdown',open);
$('openBtn').addEventListener('click',open);
$('replay').addEventListener('click',function(){location.reload()});
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&mode!=='doc'){e.preventDefault();open()}});

layout();
seek(0,0,false);
Promise.all([document.fonts?document.fonts.ready:0]).then(function(){layout();});
window.__test={au:au,seek:seek,handoff:function(){handoff((performance.now()-u0)/1000)},mode:function(){return mode}};
raf=requestAnimationFrame(frame);
})();
