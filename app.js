/* ═══ For Mehak 💗 — interactions ═══ */

/* ── ambient floating hearts ── */
(function ambient() {
  const holder = document.getElementById("ambient");
  const emojis = ["💗", "🩷", "🤍", "🌸", "✨", "💕"];
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = Math.random() * 100 + "%";
    h.style.fontSize = 12 + Math.random() * 18 + "px";
    h.style.animationDuration = 9 + Math.random() * 9 + "s";
    h.style.animationDelay = Math.random() * 12 + "s";
    holder.appendChild(h);
  }
})();

/* ── intro gate ── */
const gate = document.getElementById("gate");

/* Belt & braces: fade, then force the gate out of the layout completely.
   If CSS transitions never fire (some webviews throttle/pause compositor
   animations — exactly the "stuck on the loading screen" symptom), the
   hard timeout still guarantees the gate disappears and the world shows. */
function hideGateAndEnter() {
  gate.classList.add("gone");
  const finish = () => {
    gate.style.display = "none";
    gate.style.opacity = "0";
    gate.style.visibility = "hidden";
  };
  gate.addEventListener("transitionend", finish, { once: true });
  setTimeout(finish, 900);
}

document.querySelectorAll(".answer").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("right")) {
      btn.classList.add("chosen");
      if (window.startMehakMusic) window.startMehakMusic(); // start inside the gesture so autoplay is allowed
      document.querySelectorAll(".answer.wrong").forEach((w) => (w.disabled = true));
      setTimeout(() => {
        hideGateAndEnter();
        document.getElementById("world").classList.remove("hidden");
        startCounter();
      }, 850);
    } else {
      btn.classList.add("shake");
      setTimeout(() => btn.classList.remove("shake"), 500);
    }
  });
});

/* ── reveal on scroll ── */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ── days-together counter ── */
const ANNIV = new Date(2026, 0, 14); // 14 January — the day it began
function daysTogether() {
  const now = new Date();
  return Math.max(0, Math.floor((now - ANNIV) / 86400000));
}
function startCounter() {
  const target = daysTogether();
  const el = document.getElementById("c-days");
  const t0 = performance.now();
  const dur = 1600;
  (function tick(t) {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
  updateBreakdown();
  setInterval(updateBreakdown, 60000);
}
function updateBreakdown() {
  const d = daysTogether();
  const months = Math.floor(d / 30.44);
  const weeks = Math.floor(d / 7);
  const hours = d * 24;
  const mins = hours * 60;
  document.getElementById("c-breakdown").innerHTML = `
    <div><strong>${months}</strong>months</div>
    <div><strong>${weeks}</strong>weeks</div>
    <div><strong>${hours.toLocaleString()}</strong>hours</div>
    <div><strong>${mins.toLocaleString()}</strong>minutes</div>`;
}

/* ── story polaroids ── */
(function story() {
  const wrap = document.getElementById("story-media");
  if (!wrap || !MEDIA.photos.length) return;
  const picks = [10, 65, 130].map((i) => MEDIA.photos[Math.min(i, MEDIA.photos.length - 1)]);
  const caps = ["the penguin 🐧", "my favourite view", "us, always"];
  picks.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "polaroid";
    d.style.transitionDelay = i * 0.08 + "s";
    d.innerHTML = `<img src="${p.src}" alt="memory ${i + 1}" loading="lazy" /><span class="cap">${caps[i]}</span>`;
    wrap.appendChild(d);
  });
})();

/* ── A–Z reasons ── */
(function reasons() {
  const data = [
    ["A", "Adorable", "From your penguin waddle to your sleepy voice — unfairly cute, always."],
    ["B", "Beautiful", "You are the most pretty. Inside, outside, every side."],
    ["C", "Caring", "You notice when something's off even when I say I'm fine."],
    ["D", "Dramatic (cutely)", "Every tiny thing becomes a whole movie — and I love watching it."],
    ["E", "Enough", "You are enough. Exactly as you are. Never doubt it."],
    ["F", "Funny", "You make me laugh even on the days my brain refuses to cooperate."],
    ["G", "Gentle", "Patient and understanding with me, always."],
    ["H", "Home", "You're my safe place. That's the whole reason."],
    ["I", "Innocent", "That childlike sweetness makes everything feel lighter."],
    ["J", "Jolly", "Playful, silly, alive — my favourite energy."],
    ["K", "Kind", "Soft-hearted in a world that isn't always."],
    ["L", "Loving", "The way you love is quiet, steady and real."],
    ["M", "Mehak", "Your name means fragrance — you linger in everything I do."],
    ["N", "No judgement", "I can be my weirdest self around you."],
    ["O", "Our songs", "Every playlist somehow leads back to you."],
    ["P", "Penguin", "My favourite nickname in the world. 🐧"],
    ["Q", "Quiet peace", "Even silence with you feels comfortable."],
    ["R", "Runner", "You ran away the first time we met — best plot twist of my life."],
    ["S", "Sangee's gift", "Her introduction turned out to be my life's biggest win."],
    ["T", "Twenty-four seven", "You make the effort. You show up. Every time."],
    ["U", "Understanding", "Patient with my moods, my work, my everything."],
    ["V", "Victory", "Every milestone with you feels like winning. (10 May forever 😭💍)"],
    ["W", "Whole list", "'Why I love you' deserved its own website. This is just the trailer."],
    ["X", "X factor", "That effortless star power only you have."],
    ["Y", "You", "Simply. Just you."],
    ["Z", "Zero doubts", "I never question us. Not once."],
  ];
  const grid = document.getElementById("reasons-grid");
  data.forEach(([letter, short, more], i) => {
    const c = document.createElement("div");
    c.className = "reason reveal";
    c.style.transitionDelay = (i % 6) * 0.06 + "s";
    c.innerHTML = `<span class="r-letter">${letter}</span><span class="r-short">${short}</span><span class="r-more">${more}</span>`;
    c.addEventListener("click", () => c.classList.toggle("open"));
    grid.appendChild(c);
    io.observe(c);
  });
})();

/* ── memory vault ── */
const VAULT = (() => {
  const photos = (MEDIA.photos || []).map((p) => ({ ...p, kind: "photo" }));
  const videos = (MEDIA.videos || []).map((v) => ({ ...v, kind: "video" }));
  const all = [...photos, ...videos].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date.localeCompare(b.date);
  });
  return { all, photos, videos, filtered: all, shown: 0, batch: 60 };
})();

const fmtDate = (iso) => {
  if (!iso) return "our archive";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

function vaultCounts() {
  document.getElementById("count-all").textContent = VAULT.all.length;
  document.getElementById("count-photos").textContent = VAULT.photos.length;
  document.getElementById("count-videos").textContent = VAULT.videos.length;
}

function renderVault(reset) {
  const grid = document.getElementById("masonry");
  if (reset) { grid.innerHTML = ""; VAULT.shown = 0; }
  const end = Math.min(VAULT.shown + VAULT.batch, VAULT.filtered.length);
  const frag = document.createDocumentFragment();
  for (let i = VAULT.shown; i < end; i++) {
    const m = VAULT.filtered[i];
    const item = document.createElement("div");
    item.className = "m-item";
    item.dataset.idx = i;
    if (m.kind === "photo") {
      item.innerHTML = `<img src="${m.src}" alt="memory" loading="lazy" />${m.date ? `<span class="m-date">${fmtDate(m.date)}</span>` : ""}`;
    } else {
      item.innerHTML = `<video src="${m.src}#t=0.1" muted playsinline preload="metadata"></video><span class="v-badge">▶ video</span>${m.date ? `<span class="m-date">${fmtDate(m.date)}</span>` : ""}`;
    }
    item.addEventListener("click", () => openLightbox(i));
    frag.appendChild(item);
  }
  grid.appendChild(frag);
  VAULT.shown = end;
  document.getElementById("load-more").style.display =
    VAULT.shown < VAULT.filtered.length ? "block" : "none";
  document.getElementById("vault-end").style.display =
    VAULT.shown >= VAULT.filtered.length ? "block" : "none";
}

document.querySelectorAll(".vtab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".vtab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const which = tab.dataset.tab;
    VAULT.filtered = which === "all" ? VAULT.all : which === "photos" ? VAULT.photos : VAULT.videos;
    renderVault(true);
  });
});
document.getElementById("load-more").addEventListener("click", () => renderVault(false));

/* ── lightbox ── */
const lb = document.getElementById("lightbox");
const lbStage = document.getElementById("lb-stage");
const lbCaption = document.getElementById("lb-caption");
let lbIdx = 0;

function openLightbox(i) {
  lbIdx = i;
  showLightbox();
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  lbStage.innerHTML = "";
  document.body.style.overflow = "";
}
function showLightbox() {
  const m = VAULT.filtered[lbIdx];
  if (!m) return closeLightbox();
  lbStage.innerHTML = "";
  if (m.kind === "photo") {
    const img = document.createElement("img");
    img.src = m.src;
    lbStage.appendChild(img);
  } else {
    const v = document.createElement("video");
    v.src = m.src;
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    lbStage.appendChild(v);
  }
  lbCaption.textContent = `${m.kind === "photo" ? "📸" : "🎬"} ${fmtDate(m.date)} — one of our ${VAULT.filtered.length} saved moments`;
}
document.getElementById("lb-close").addEventListener("click", closeLightbox);
document.getElementById("lb-prev").addEventListener("click", () => { lbIdx = (lbIdx - 1 + VAULT.filtered.length) % VAULT.filtered.length; showLightbox(); });
document.getElementById("lb-next").addEventListener("click", () => { lbIdx = (lbIdx + 1) % VAULT.filtered.length; showLightbox(); });
lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") document.getElementById("lb-prev").click();
  if (e.key === "ArrowRight") document.getElementById("lb-next").click();
});

/* ── spin wheel ── */
(function wheel() {
  const prizes = [
    "One tight hug 🤗", "Movie night 🎬", "Your favourite snack 🍫",
    "Sleep early tonight 😴", "One cute selfie 🤳", "No-phone hour 📵",
    "Ice cream date 🍦", "You pick, I pay 🤑",
  ];
  const wheel = document.getElementById("wheel");
  const result = document.getElementById("wheel-result");
  const center = wheel.querySelector(".wheel-center");
  let rotation = 0;
  const spin = () => {
    rotation += 1800 + Math.random() * 1080; // 5–8 extra turns
    wheel.style.transform = `rotate(${rotation}deg)`;
    result.textContent = "spinning…";
    const seg = Math.floor(((360 - (rotation % 360)) % 360) / 45);
    setTimeout(() => { result.textContent = prizes[seg]; }, 4600);
  };
  wheel.addEventListener("click", spin);
})();

/* ── compatibility ── */
(function compat() {
  const fill = document.getElementById("compat-fill");
  const pct = document.getElementById("compat-pct");
  const verdict = document.getElementById("compat-verdict");
  const btn = document.getElementById("compat-btn");
  const lines = [
    "matching energies…",
    "aligning penguin levels…",
    "consulting the stars…",
    "overflow detected…",
  ];
  let lineTimer;
  function run() {
    clearInterval(lineTimer);
    fill.style.width = "0%";
    pct.textContent = "0%";
    void fill.offsetWidth; // restart transition
    fill.style.width = "100%";
    let li = 0;
    verdict.textContent = lines[0];
    lineTimer = setInterval(() => { li = (li + 1) % lines.length; verdict.textContent = lines[li]; }, 700);
    const t0 = performance.now();
    (function count(t) {
      const p = Math.min(1, (t - t0) / 2400);
      pct.textContent = Math.round(p * 100) + "%";
      if (p < 1) requestAnimationFrame(count);
      else {
        clearInterval(lineTimer);
        pct.textContent = "∞%";
        verdict.textContent = "Mehak + Piyush = infinite. science gave up. 💞";
      }
    })(t0);
  }
  btn.addEventListener("click", run);
  const once = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { run(); once.disconnect(); } }),
    { threshold: 0.4 }
  );
  once.observe(document.getElementById("games"));
})();

/* ── init vault ── */
vaultCounts();
renderVault(true);
