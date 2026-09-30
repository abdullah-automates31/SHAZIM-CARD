# SHAZIM-CARD
Interactive Ronaldo-themed 3rd birthday invitation (tap-to-open envelope, countdown, CD player, RSVP).

- `index.html` – ready-to-deploy page (Vercel: Framework "Other", no build step).
- `card.src.html` + `app2.js` – source template and logic. Edit `CONFIG` at the top of `app2.js` (date, venue, `mapsLink`, `whatsapp`).
- `assets/` – photos, song and fonts.

Rebuild: `python3 build.py && python3 make_index.py` (needs Python 3 only).
