document.addEventListener("DOMContentLoaded",()=>{
const $=id=>document.getElementById(id);
const lock=$("lockScreen"),site=$("site"),form=$("passwordForm"),input=$("password"),msg=$("passwordMessage"),show=$("showPassword");

show.addEventListener("click",()=>{
 const visible=input.type==="text";
 input.type=visible?"password":"text";
 show.textContent=visible?"○":"●";
});
form.addEventListener("submit",e=>{
 e.preventDefault();
 if(input.value==="2009"){
  lock.classList.add("hidden"); site.classList.add("visible"); site.setAttribute("aria-hidden","false");
  document.body.classList.remove("locked"); window.scrollTo({top:0,left:0,behavior:"instant"}); makeHeartBurst(18);
 }else{
  msg.textContent="Dat is hem niet... probeer het nog eens ♥"; input.value=""; input.focus();
  if(input.animate)input.animate([{transform:"translateX(-7px)"},{transform:"translateX(7px)"},{transform:"translateX(0)"}],{duration:260});
 }
});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const start=new Date("2026-03-20T00:00:00");
function updateDays(){ $("daysTogether").textContent=Math.max(0,Math.floor((new Date()-start)/86400000)); }
updateDays(); setInterval(updateDays,60000);

const reasons=[
"Je laat me gewoon mezelf zijn.",
"Je lach maakt mij blij.",
"Je bent open en eerlijk.",
"Je stem en je ogen.",
"De manier waarop je naar mij kijkt.",
"Je positieve houding.",
"Samen lachen om helemaal niets.",
"Hoe vrij we samen zijn.",
"Als je 'doperwt' zegt.",
"Gewoon jij."
];
let ri=0;
$("reasonButton").addEventListener("click",()=>{
 ri=(ri+1)%reasons.length;
 $("reasonNumber").textContent=String(ri+1).padStart(2,"0");
 const t=$("reasonText"); t.textContent=reasons[ri];
 if(t.animate)t.animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"translateY(0)"}],{duration:350});
 makeHeartBurst(4);
});

document.querySelectorAll(".memory-card").forEach(card=>{
 const path=card.dataset.image;
 if(path){
  const img=new Image();
  img.onload=()=>{card.classList.add("has-image");card.style.backgroundImage="url('"+path+"')";const p=card.querySelector(".photo-placeholder");if(p)p.style.opacity="0";};
  img.src=path;
 }
});

const lightbox=$("lightbox"),art=$("lightboxArt");
document.querySelectorAll(".memory-card").forEach(card=>card.addEventListener("click",()=>{
 $("lightboxTitle").textContent=card.dataset.title||"Herinnering";
 $("lightboxText").textContent=card.dataset.text||"Een klein moment.";
 art.classList.remove("has-image");art.style.backgroundImage="";
 if(card.classList.contains("has-image")){art.classList.add("has-image");art.style.backgroundImage=card.style.backgroundImage;}
 lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");
}));
const closeLightbox=()=>{lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true")};
$("closeLightbox").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});

document.querySelectorAll(".future-list input").forEach((box,i)=>{
 const key="mirthe-future-"+i;
 try{box.checked=localStorage.getItem(key)==="1"}catch(_){}
 box.addEventListener("change",()=>{try{localStorage.setItem(key,box.checked?"1":"0")}catch(_){}});
});

const song=$("ourSong"),music=$("musicButton"),play=$("musicPlayButton"),status=$("musicStatus");
let songAvailable=false;
song.addEventListener("loadedmetadata",()=>{songAvailable=true;if(status)status.textContent="family ties · klaar om te spelen ♥"});
song.addEventListener("error",()=>{songAvailable=false;if(status)status.textContent="Voeg jouw bestand toe als assets/song.mp3."});
function setPlaying(on){music.classList.toggle("playing",on);play.innerHTML=on?"Pauzeren <span>Ⅱ</span>":"Speel family ties <span>♫</span>";}
async function toggleSong(){
 if(!songAvailable){if(status)status.textContent="Er is nog geen audiobestand toegevoegd.";return;}
 try{if(song.paused){await song.play();setPlaying(true)}else{song.pause();setPlaying(false)}}catch(_){if(status)status.textContent="Afspelen lukte niet. Probeer opnieuw."}
}
music.addEventListener("click",toggleSong);play.addEventListener("click",toggleSong);song.addEventListener("ended",()=>setPlaying(false));

const secret=$("secretReveal");
$("secretButton").addEventListener("click",()=>{
 secret.classList.add("open");secret.setAttribute("aria-hidden","false");
 setTimeout(()=>secret.scrollIntoView({behavior:"smooth",block:"center"}),80);
 setTimeout(()=>secret.querySelector(".reveal").classList.add("visible"),350);makeHeartBurst(20);
});

document.addEventListener("keydown",e=>{if(e.key==="Escape"&&lightbox.classList.contains("open"))closeLightbox()});
function makeHeartBurst(count=12){
 const holder=$("hearts");
 for(let i=0;i<count;i++){
  const h=document.createElement("span");h.className="floating-heart";h.textContent=Math.random()>.25?"♥":"✦";
  h.style.left=(35+Math.random()*30)+"%";h.style.top=(45+Math.random()*15)+"%";h.style.fontSize=(9+Math.random()*15)+"px";h.style.animationDelay=(Math.random()*.8)+"s";
  holder.appendChild(h);setTimeout(()=>h.remove(),6000);
 }
}
input.focus();
});