const hearts = document.getElementById("hearts");
const message = document.getElementById("message");

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.35 ? "♡" : "🤍";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 18) + "px";
  heart.style.animationDuration = (5 + Math.random() * 4) + "s";
  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 9500);
}

setInterval(createHeart, 850);

document.getElementById("openBtn").addEventListener("click", () => {
  message.classList.add("show");
});

document.getElementById("backBtn").addEventListener("click", () => {
  message.classList.remove("show");
});
