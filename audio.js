/* ═══ For Mehak 💗 — sound engine ═══
   Button sounds: synthesized originals (assets/*.wav) — no copyright.
   Background music: "Heartwarming" by Kevin MacLeod (incompetech.com),
   licensed under Creative Commons: By Attribution 4.0 (CC BY 4.0). */
(function audio() {
  if (window.FOR_MEHAK_AUDIO) return;
  window.FOR_MEHAK_AUDIO = true;

  /* ── tiny helpers ── */
  const ready = {};
  function fx(name, volume) {
    let a = ready[name];
    if (!a) { a = new Audio(); a.src = `assets/${name}.wav`; a.preload = "auto"; ready[name] = a; }
    const inst = a.cloneNode();
    inst.volume = volume;
    inst.play().catch(() => {});
  }

  let hoverCount = 0; // don't spam hover blips
  let hoverReset = 0;
  function hoverBlip(el) {
    if (el.dataset.silentHover === "1") return;
    const now = Date.now();
    if (now - hoverReset > 800) hoverReset = now;
    if (++hoverCount > 2) return;
    fx("hover", 0.12);
  }

  /* ── click / hover wiring via capture (works for every button, present or future) ── */
  const hoverSel = "button, a, .reason, .wheel, .m-item";
  document.addEventListener("pointerenter", (e) => {
    if (e.target.closest && e.target.closest(hoverSel)) hoverBlip(e.target.closest(hoverSel));
  }, true);

  document.addEventListener("click", (e) => {
    const t = e.target.closest ? e.target : e.target;
    if (t.closest && t.closest(".answer.wrong")) { fx("wrong", 0.5); return; }
    if (t.closest && t.closest(".answer.right")) { fx("success", 0.55); return; }
    if (t.closest && t.closest("button, a, .reason, .wheel, .m-item")) fx("click", 0.4);
  }, true);
  document.addEventListener("pointerdown", (e) => {
    const t = e.target.closest ? e.target : e.target;
    if (t.closest && t.closest("button, a, .reason, .wheel, .m-item")) fx("click", 0.4);
  }, true);

  /* ── floating music player ── */
  const KEY = "mehak-music";
  const music = new Audio();
  music.src = "assets/music.mp3";
  music.loop = true;
  music.preload = "auto";
  music.volume = 0; // fade in after unlock

  const btn = document.createElement("button");
  btn.className = "music-btn glass";
  btn.setAttribute("aria-label", "toggle music");
  btn.title = "music on/off";
  btn.dataset.silentHover = "1";
  btn.textContent = "🎵";
  document.body.appendChild(btn);

  function setBtn(on) {
    btn.classList.toggle("on", on);
    btn.textContent = on ? "🎵" : "🔇";
  }

  let playing = false;
  function startMusic() {
    music.play().then(() => {
      playing = true;
      localStorage.setItem(KEY, "on");
      setBtn(true);
      // gentle fade-in
      clearInterval(music._fade);
      music._fade = setInterval(() => {
        music.volume = Math.min(0.32, music.volume + 0.02);
        if (music.volume >= 0.32) clearInterval(music._fade);
      }, 60);
    }).catch(() => { setBtn(false); });
  }
  function stopMusic() {
    localStorage.setItem(KEY, "off");
    playing = false;
    clearInterval(music._fade);
    music.pause();
    music.volume = 0;
    setBtn(false);
  }

  btn.addEventListener("click", () => fx("click", 0.4));
  btn.addEventListener("click", () => (playing ? stopMusic() : startMusic()));

  /* expose a hook so other scripts can start the music after a user gesture */
  window.startMehakMusic = startMusic;
  window.stopMehakMusic = stopMusic;
})();
