const pages=["intro","lock","opening","birthday","story","letter","surprise1","surprise2","surprise3","surprise4","surprise5","finalLetter","finalVideo","final"];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

let unlocked = false;

function show(id){
  // Do not allow access to anything except intro and lock
  // until the correct password has been entered.
  if (!unlocked && id !== "intro" && id !== "lock") {
    id = "lock";
  }

  pages.forEach(p => $("#" + p)?.classList.remove("active"));
  $("#" + id)?.classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});
}
$$("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));

// Password
const code="1505"; let entered="";
function dots(){$$("#dots i").forEach((d,i)=>d.classList.toggle("filled",i<entered.length))}
$$(".keypad button").forEach(b=>b.onclick=()=>{
  const k=b.dataset.key;
  if(k==="clear") entered=entered.slice(0,-1);
  else if(k==="enter"){
    if(entered===code){
  unlocked = true;
  entered="";
  $("#error").textContent="";
  dots();
  show("opening");
  heartBurst();
}
    else{$("#error").textContent="Not quite. Try again ❤️";entered=""}
  } else if(entered.length<4) entered+=k;
  dots();
});
function heartBurst(){
  for(let i=0;i<18;i++){
    const h=document.createElement("span");h.textContent=["♥","♡","🤍","✨"][Math.floor(Math.random()*4)];
    h.style.cssText=`position:fixed;left:${45+Math.random()*10}vw;top:${48+Math.random()*8}vh;font-size:${16+Math.random()*25}px;z-index:40;transition:3s`;
    document.body.appendChild(h);
    requestAnimationFrame(()=>{h.style.transform=`translate(${(Math.random()-.5)*350}px,${-180-Math.random()*350}px) rotate(${Math.random()*180}deg)`;h.style.opacity="0"});
    setTimeout(()=>h.remove(),3200);
  }
}

// Memories
const memories=[
 {img:"assets/01-first-photo.jpg",note:"The first photo of us ❤️‍🩹"},
 {img:"assets/02-important.jpg",note:"The day I got to know that I was too important in your life ❤️"},
 {img:"assets/03-hope.jpg",note:"Got the hope that u will be mine one day 🤞🏻"},
 {img:"assets/04-before-love.jpg",note:"Before the love was spoken 👀"},
 {img:"assets/05-love-life.jpg",note:"The day we started our love life 🥹🫶"},
 {img:"assets/06-she-is-the-one.jpg",note:"The day I said proudly that she is the one 💗🫂"}
];
memories.forEach((m,i)=>{
 const card=document.createElement("article");card.className="memory";
 card.style.setProperty("--r",((i%2?1:-1)*(1+i%3))+"deg");
 card.innerHTML=`<img src="${m.img}" alt="Memory ${i+1}"><div class="memory-caption">Memory ${i+1} 💗</div>`;
 card.onclick=()=>{ $("#modalImg").src=m.img;$("#modalNote").textContent=m.note;$("#memoryModal").classList.add("open") };
 $("#memories").appendChild(card);
});
$("#closeModal").onclick=()=>$("#memoryModal").classList.remove("open");
$("#memoryModal").onclick=e=>{if(e.target.id==="memoryModal")$("#memoryModal").classList.remove("open")};

// Surprise 1
$("#heartReveal").onclick=()=>{
 $("#heartReveal").classList.add("revealed");
 $("#heartHint").textContent="A memory that deserves a special place. ❤️";
 $("#heartWords").classList.remove("hidden");
 $("#openHeartMessage").classList.remove("hidden");
};
$("#openHeartMessage").onclick=()=>{
 $("#heartMessage").classList.remove("hidden");
 $("#openHeartMessage").classList.add("hidden");
 $("#s1Next").classList.remove("hidden");
};

// Surprise 2
$("#gift").onclick=()=>{
 $("#gift").textContent="🫂";
 $("#hug").classList.remove("hidden");
 $("#s2Next").classList.remove("hidden");
};

// Surprise 5
$("#loveRange").oninput=e=>{
 const v=Number(e.target.value);
 $("#loveValue").textContent=v+"%";
 if(v===100){$("#loveReveal").classList.remove("hidden");$("#s5Next").classList.remove("hidden")}
};

// Final letter
const finalText=`I don't know what the future has planned for us,

but I know one thing for sure…

I want you to be a part of it. 🫂

From a random person I never expected to meet,

to the person who became such a huge part of my life…

I wouldn't change a single moment that brought me to you.

You've given me memories I'll always keep close to my heart,

on your birthday, I just want you to remember one thing:

You are loved.

You are special.

And you will always have a very special place in my heart. ❤️

Happy Birthday once again, my darling. 🥹❤️`;

let typed=false;
$("#openEnvelope").onclick=()=>{
 $("#envelope").classList.add("open");
 $("#openEnvelope").classList.add("hidden");
 $("#ancientLetter").classList.remove("hidden");
 if(typed)return; typed=true;
 let i=0;
 const out=$("#typedText");
 (function type(){
   if(i<finalText.length){out.textContent+=finalText[i++];setTimeout(type,22)}
   else $("#letterNext").classList.remove("hidden");
 })();
};

// Floating hearts
setInterval(()=>{
 const h=document.createElement("span");h.className="fh";h.textContent=["♡","🤍","♥"][Math.floor(Math.random()*3)];
 h.style.left=Math.random()*100+"vw";h.style.fontSize=10+Math.random()*18+"px";h.style.color=["#ff4f91","#e95c9d","#b75c9b"][Math.floor(Math.random()*3)];
 $("#floatingHearts").appendChild(h);setTimeout(()=>h.remove(),6500);
},900);


// Final date question + future reveal
const dateQuestion = $("#dateQuestion");
const futureReveal = $("#futureReveal");
const yesDate = $("#yesDate");
const noDate = $("#noDate");
const noWarning = $("#noWarning");
let noAttempts = 0;

if (yesDate) yesDate.onclick = () => {
  dateQuestion.classList.add("question-exit");
  setTimeout(() => {
    dateQuestion.classList.add("hidden");
    futureReveal.classList.remove("hidden");
    futureReveal.classList.add("future-start");
    setTimeout(() => futureReveal.classList.add("show"), 80);
  }, 650);
};

if (noDate) {
  const moveNoButton = () => {
    noAttempts++;
    const messages = [
      "Nice try 😌 But that button isn't an option.",
      "Heyyy! You can't escape that easily 😂❤️",
      "Nope. I'm taking that as a 'yes' attempt. 😏",
      "The universe says: try YES. ❤️",
      "Okay, enough bullying the NO button. Click YES. 😂🫂"
    ];
    noWarning.textContent = messages[Math.min(noAttempts - 1, messages.length - 1)];
    const box = noDate.parentElement.getBoundingClientRect();
    const maxX = Math.max(80, box.width / 2 - noDate.offsetWidth / 2);
    const maxY = 80;
    noDate.style.position = "relative";
    noDate.style.transform = `translate(${(Math.random() * maxX * 2 - maxX).toFixed(0)}px, ${(Math.random() * maxY * 2 - maxY).toFixed(0)}px)`;
  };
  noDate.onclick = moveNoButton;
  noDate.onmouseenter = moveNoButton;
  noDate.ontouchstart = e => { e.preventDefault(); moveNoButton(); };
}
