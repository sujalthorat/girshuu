const $ = (selector) => document.querySelector(selector);

// Mobile navigation
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Fade sections in as they enter the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Soft background music: add your own royalty-free MP3 at music/love-song.mp3.
// Browsers require a user click before audio can start.
const audio = $("#backgroundMusic");
const musicButton = $("#musicButton");
const musicLabel = $("#musicLabel");
musicButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicButton.classList.add("playing");
      musicButton.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "Pause music";
    } catch {
      musicLabel.textContent = "Add music MP3";
      alert("Add your own MP3 file at music/love-song.mp3, then tap play again.");
    }
  } else {
    audio.pause();
    musicButton.classList.remove("playing");
    musicButton.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Play soft music";
  }
});
audio.addEventListener("ended", () => {
  musicButton.classList.remove("playing");
  musicButton.setAttribute("aria-pressed", "false");
  musicLabel.textContent = "Play soft music";
});

// Optional letter reveal.
$("#readLetter").addEventListener("click", () => {
  const extra = $("#extraLetter");
  extra.hidden = !extra.hidden;
  $("#readLetter").innerHTML = extra.hidden ? 'Read a little message <span>♡</span>' : 'A little more love <span>♥</span>';
  if (!extra.hidden) extra.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Surprise ending with tiny floating hearts.
const surpriseHeart = $("#surpriseHeart");
surpriseHeart.addEventListener("click", () => {
  $("#surpriseMessage").hidden = false;
  $("#surpriseHint").textContent = "A little reminder, just for you. ❤️";
  surpriseHeart.classList.add("opened");
  burstHearts();
  $("#surpriseMessage").scrollIntoView({ behavior: "smooth", block: "center" });
});
function burstHearts() {
  const container = $("#petals");
  for (let i = 0; i < 22; i++) {
    const heart = document.createElement("span");
    heart.className = "petal";
    heart.textContent = Math.random() > .45 ? "♥" : "♡";
    heart.style.left = `${42 + Math.random() * 16}%`;
    heart.style.top = `${48 + Math.random() * 12}%`;
    heart.style.fontSize = `${12 + Math.random() * 20}px`;
    heart.style.setProperty("--drift", `${(Math.random() - .5) * 420}px`);
    heart.style.animationDuration = `${2 + Math.random() * 2}s`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 4500);
  }
}

// Gentle falling hearts in the background.
const petalContainer = $("#petals");
function makePetal() {
  if (document.hidden) return;
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = Math.random() > .5 ? "♥" : "♡";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.fontSize = `${9 + Math.random() * 12}px`;
  petal.style.setProperty("--drift", `${(Math.random() - .5) * 150}px`);
  petal.style.animationDuration = `${7 + Math.random() * 8}s`;
  petalContainer.appendChild(petal);
  setTimeout(() => petal.remove(), 16000);
}
setInterval(makePetal, 900);

// Photo lightbox, activated only when a real photo exists.
const photoDialog = $("#photoDialog");
document.querySelectorAll(".photo-card").forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    if (!img || !img.complete || img.naturalWidth === 0) {
      alert(`Add your photo as photos/${card.dataset.photo}.jpg to show it here.`);
      return;
    }
    $("#dialogImage").src = img.src;
    $("#dialogCaption").textContent = card.querySelector(".photo-caption").innerText.replace("♥", "").trim();
    photoDialog.showModal();
  });
});
$("#closeDialog").addEventListener("click", () => photoDialog.close());
photoDialog.addEventListener("click", event => {
  if (event.target === photoDialog) photoDialog.close();
});
