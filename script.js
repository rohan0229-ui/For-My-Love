const pages = [
  "intro",
  "lock",
  "opening",
  "birthday",
  "story",
  "letter",
  "surprise1",
  "surprise2",
  "surprise3",
  "surprise4",
  "surprise5",
  "finalLetter",
  "finalVideo",
  "final"
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

// =====================================================
// PAGE NAVIGATION + PASSWORD PROTECTION
// =====================================================

let unlocked = false;

function show(id) {
  // Before the correct password, ONLY intro and lock are allowed.
  if (!unlocked && id !== "intro" && id !== "lock") {
    id = "lock";
  }

  pages.forEach(page => {
    const el = $("#" + page);
    if (el) el.classList.remove("active");
  });

  const target = $("#" + id);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Always start at the intro when the page loads.
// This also prevents an old/cached active page from being shown.
pages.forEach(page => {
  const el = $("#" + page);
  if (el) el.classList.remove("active");
});

const introPage = $("#intro");
if (introPage) introPage.classList.add("active");

// All normal navigation buttons
$$("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    show(button.dataset.go);
  });
});

// =====================================================
// PASSWORD
// =====================================================

const code = "1505";
let entered = "";

function dots() {
  $$("#dots i").forEach((dot, index) => {
    dot.classList.toggle("filled", index < entered.length);
  });
}

$$(".keypad button").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.key;

    if (key === "clear") {
      entered = entered.slice(0, -1);
    }

    else if (key === "enter") {
      if (entered === code) {
        // Unlock ONLY after the correct password.
        unlocked = true;
        entered = "";
        $("#error").textContent = "";
        dots();

        show("opening");
        heartBurst();
      } else {
        $("#error").textContent = "Not quite. Try again ❤️";
        entered = "";
        dots();
      }
    }

    else if (entered.length < 4) {
      entered += key;
    }

    dots();
  });
});

// =====================================================
// HEART BURST
// =====================================================

function heartBurst() {
  for (let i = 0; i < 18; i++) {
    const h = document.createElement("span");

    h.textContent = ["♥", "♡", "🤍", "✨"][
      Math.floor(Math.random() * 4)
    ];

    h.style.cssText =
      `position:fixed;` +
      `left:${45 + Math.random() * 10}vw;` +
      `top:${48 + Math.random() * 8}vh;` +
      `font-size:${16 + Math.random() * 25}px;` +
      `z-index:40;` +
      `transition:3s;`;

    document.body.appendChild(h);

    requestAnimationFrame(() => {
      h.style.transform =
        `translate(${(Math.random() - 0.5) * 350}px,` +
        `${-180 - Math.random() * 350}px)` +
        ` rotate(${Math.random() * 180}deg)`;

      h.style.opacity = "0";
    });

    setTimeout(() => h.remove(), 3200);
  }
}

// =====================================================
// MEMORIES
// =====================================================

const memories = [
  {
    img: "assets/01-first-photo.jpg",
    note: "The first photo of us ❤️‍🩹"
  },
  {
    img: "assets/02-important.jpg",
    note: "The day I got to know that I was too important in your life ❤️"
  },
  {
    img: "assets/03-hope.jpg",
    note: "Got the hope that u will be mine one day 🤞🏻"
  },
  {
    img: "assets/04-before-love.jpg",
    note: "Before the love was spoken 👀"
  },
  {
    img: "assets/05-love-life.jpg",
    note: "The day we started our love life 🥹🫶"
  },
  {
    img: "assets/06-she-is-the-one.jpg",
    note: "The day I said proudly that she is the one 💗🫂"
  }
];

const memoriesContainer = $("#memories");

if (memoriesContainer) {
  memories.forEach((memory, index) => {
    const card = document.createElement("article");
    card.className = "memory";

    card.style.setProperty(
      "--r",
      ((index % 2 ? 1 : -1) * (1 + index % 3)) + "deg"
    );

    card.innerHTML =
      `<img src="${memory.img}" alt="Memory ${index + 1}">` +
      `<div class="memory-caption">Memory ${index + 1} 💗</div>`;

    card.addEventListener("click", () => {
      const modalImg = $("#modalImg");
      const modalNote = $("#modalNote");
      const modal = $("#memoryModal");

      if (modalImg) modalImg.src = memory.img;
      if (modalNote) modalNote.textContent = memory.note;
      if (modal) modal.classList.add("open");
    });

    memoriesContainer.appendChild(card);
  });
}

const closeModal = $("#closeModal");
if (closeModal) {
  closeModal.addEventListener("click", () => {
    $("#memoryModal")?.classList.remove("open");
  });
}

const memoryModal = $("#memoryModal");
if (memoryModal) {
  memoryModal.addEventListener("click", event => {
    if (event.target.id === "memoryModal") {
      memoryModal.classList.remove("open");
    }
  });
}

// =====================================================
// SURPRISE 1
// =====================================================

const heartReveal = $("#heartReveal");

if (heartReveal) {
  heartReveal.addEventListener("click", () => {
    heartReveal.classList.add("revealed");

    if ($("#heartHint")) {
      $("#heartHint").textContent =
        "A memory that deserves a special place. ❤️";
    }

    $("#heartWords")?.classList.remove("hidden");
    $("#openHeartMessage")?.classList.remove("hidden");
  });
}

const openHeartMessage = $("#openHeartMessage");

if (openHeartMessage) {
  openHeartMessage.addEventListener("click", () => {
    $("#heartMessage")?.classList.remove("hidden");
    openHeartMessage.classList.add("hidden");
    $("#s1Next")?.classList.remove("hidden");
  });
}

// =====================================================
// SURPRISE 2
// =====================================================

const gift = $("#gift");

if (gift) {
  gift.addEventListener("click", () => {
    gift.textContent = "🫂";
    $("#hug")?.classList.remove("hidden");
    $("#s2Next")?.classList.remove("hidden");
  });
}

// =====================================================
// SURPRISE 5
// =====================================================

const loveRange = $("#loveRange");

if (loveRange) {
  loveRange.addEventListener("input", event => {
    const value = Number(event.target.value);

    $("#loveValue").textContent = value + "%";

    if (value === 100) {
      $("#loveReveal")?.classList.remove("hidden");
      $("#s5Next")?.classList.remove("hidden");
    }
  });
}

// =====================================================
// FINAL LETTER
// =====================================================

const finalText = `I don't know what the future has planned for us,

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

let typed = false;

const openEnvelope = $("#openEnvelope");

if (openEnvelope) {
  openEnvelope.addEventListener("click", () => {
    $("#envelope")?.classList.add("open");
    openEnvelope.classList.add("hidden");
    $("#ancientLetter")?.classList.remove("hidden");

    if (typed) return;
    typed = true;

    let index = 0;
    const output = $("#typedText");

    if (!output) return;

    function typeLetter() {
      if (index < finalText.length) {
        output.textContent += finalText[index++];
        setTimeout(typeLetter, 22);
      } else {
        $("#letterNext")?.classList.remove("hidden");
      }
    }

    typeLetter();
  });
}

// =====================================================
// FLOATING HEARTS
// =====================================================

setInterval(() => {
  const container = $("#floatingHearts");
  if (!container) return;

  const heart = document.createElement("span");

  heart.className = "fh";
  heart.textContent = ["♡", "🤍", "♥"][
    Math.floor(Math.random() * 3)
  ];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 10 + Math.random() * 18 + "px";
  heart.style.color = ["#ff4f91", "#e95c9d", "#b75c9b"][
    Math.floor(Math.random() * 3)
  ];

  container.appendChild(heart);

  setTimeout(() => heart.remove(), 6500);
}, 900);

// =====================================================
// AFTER VIDEO — DATE QUESTION
// =====================================================

const dateQuestion = $("#dateQuestion");
const futureReveal = $("#futureReveal");
const yesDate = $("#yesDate");
const noDate = $("#noDate");
const noWarning = $("#noWarning");

let noAttempts = 0;

// YES BUTTON
if (yesDate && dateQuestion && futureReveal) {
  yesDate.addEventListener("click", () => {
    dateQuestion.classList.add("question-exit");

    setTimeout(() => {
      dateQuestion.classList.add("hidden");
      futureReveal.classList.remove("hidden");
      futureReveal.classList.add("future-start");

      setTimeout(() => {
        futureReveal.classList.add("show");
      }, 80);
    }, 650);
  });
}

// =====================================================
// NO BUTTON — RUNS AWAY
// =====================================================

if (noDate) {

  function moveNoButton(event) {
    if (event) event.preventDefault();

    noAttempts++;

    const messages = [
      "Nice try 😌 But that button isn't an option.",
      "Heyyy! You can't escape that easily 😂❤️",
      "Nope. Try YES instead. 😏",
      "The universe says: try YES. ❤️",
      "Okay, enough bullying the NO button. Click YES. 😂🫂"
    ];

    if (noWarning) {
      noWarning.textContent =
        messages[Math.min(noAttempts - 1, messages.length - 1)];
    }

    const parent = noDate.parentElement;

    if (!parent) return;

    const box = parent.getBoundingClientRect();

    // Keep the button inside a reasonable area.
    const rangeX = Math.max(
      70,
      Math.min(180, box.width / 2 - noDate.offsetWidth / 2)
    );

    const rangeY = 70;

    noDate.style.position = "relative";

    noDate.style.transform =
      `translate(` +
      `${(Math.random() * rangeX * 2 - rangeX).toFixed(0)}px,` +
      `${(Math.random() * rangeY * 2 - rangeY).toFixed(0)}px)`;
  }

  noDate.addEventListener("click", moveNoButton);
  noDate.addEventListener("mouseenter", moveNoButton);
  noDate.addEventListener("touchstart", moveNoButton, {
    passive: false
  });
}

// =====================================================
// END
// =====================================================
