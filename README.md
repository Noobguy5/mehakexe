# For Mehak 🐧💗

A little world, made for one person. A single-page romantic website — pink & lavender glassmorphism, polaroids, and every photo/video you have.

## Run it

```bash
node serve.js          # → http://localhost:5057
```

(or any static server, e.g. `npx serve`)

## What's inside

| Section | Details |
|---|---|
| 💗 Intro gate | A playful question she has to answer before entering |
| 🌍 Hero | "mehak.exe — a little world made for you" |
| ⏳ Days counter | Live count since **14 Jan 2026** (days / months / hours / minutes) |
| 🌟 Timeline | 15 Dec (met) · 14 Jan (began) · 10 May (online marriage) · 14 Sep (9 months) · 17 Sep (her birthday) |
| 🏃‍♀️ How we met | The story of Sangee's introduction + the runaway penguin |
| 💌 A–Z reasons | 26 flip-cards, one reason per letter |
| 💬 Phrases marquee | "You are my cutu", "You are my baby"… scrolling infinitely |
| 🎵 Songs | Made in Japan · Tu Rang Sharbaton Ka · Mast Magan |
| 📸 Memory Vault | **All 188 photos + 324 videos**, tabs, lightbox, keyboard arrows |
| 🎡 Spin Wheel | 8 cute rewards |
| 💞 Compatibility | Mehak + Piyush = **∞%** |
| 💌 Letter | Personal reassurance letter |

## Files

- `index.html` — structure & all the words
- `styles.css` — the pink/lavender glass world
- `app.js` — gate, counter, vault, lightbox, games
- `media.js` — auto-generated list of your media
- `make-manifest.js` — regenerates `media.js` if you add photos: `node make-manifest.js`
- `serve.js` — tiny static server
- `phtotos/` — your 512 photos & videos (loaded directly from here)

## Tips

- **Add new photos/videos?** Drop them in `phtotos/` and run `node make-manifest.js`.
- **Hosting it online?** Any static host works (Netlify, Vercel, GitHub Pages). Rename `phtotos/` only if you also update the paths in `media.js`.
- **Change the anniversary:** edit `ANNIV` in `app.js`.
