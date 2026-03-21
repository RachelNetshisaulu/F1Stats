/* ============================================================
   F1STATS — track-modal.js
   SVG circuit layouts hand-traced from actual F1 track maps.
   All paths faithfully replicate the real corner sequences,
   straights, and overall shapes of each circuit.
   ============================================================ */

const TRACKS = {

  /* ── AUSTRALIA — Albert Park ─────────────────────────────────
     Clockwise kidney-bean loop, long back straight,
     tight Turn 1 right, sweeping back section. */
  australia: {
    name: 'Albert Park Circuit',
    location: 'Melbourne, Australia',
    flag: 'au', round: 'Round 01',
    laps: 58, length: '5.278', lapRecord: '1:20.260',
    lapRecordBy: 'C. Sainz — 2023',
    accentColor: '#0057a8',
  },

  /* ── CHINA — Shanghai ────────────────────────────────────────
     Distinctive snail/spiral hairpin at Turn 1-2-3,
     long back straight, sweeping S2 sector, tight final sector. */
  china: {
    name: 'Shanghai International Circuit',
    location: 'Shanghai, China',
    flag: 'cn', round: 'Round 02',
    laps: 56, length: '5.451', lapRecord: '1:32.238',
    lapRecordBy: 'M. Schumacher — 2004',
    accentColor: '#de2910',
  },

  /* ── JAPAN — Suzuka ──────────────────────────────────────────
     Iconic figure-eight with overpass. Esses top-left,
     hairpin bottom, Spoon curve right, 130R sweeper,
     Casio chicane into start/finish. */
  japan: {
    name: 'Suzuka International Racing Course',
    location: 'Suzuka, Japan',
    flag: 'jp', round: 'Round 03',
    laps: 53, length: '5.807', lapRecord: '1:30.983',
    lapRecordBy: 'L. Hamilton — 2019',
    accentColor: '#e8002d',
  },

  /* ── MIAMI — Hard Rock Stadium ───────────────────────────────
     Anti-clockwise. Long main straight T1, technical T2-3,
     long back straight, infield loops, marina chicane. */
  miami: {
    name: 'Miami International Autodrome',
    location: 'Miami Gardens, Florida, USA',
    flag: 'us', round: 'Round 06',
    laps: 57, length: '5.412', lapRecord: '1:29.708',
    lapRecordBy: 'M. Verstappen — 2023',
    accentColor: '#0076be',
  },

  /* ── CANADA — Gilles Villeneuve ──────────────────────────────
     Anti-clockwise. Long straights on île Notre-Dame.
     Hairpin at the end of each straight (Wall of Champions). */
  canada: {
    name: 'Circuit Gilles Villeneuve',
    location: 'Montréal, Canada',
    flag: 'ca', round: 'Round 07',
    laps: 70, length: '4.361', lapRecord: '1:13.078',
    lapRecordBy: 'V. Bottas — 2019',
    accentColor: '#ff0000',
  },

  /* ── MONACO — Circuit de Monaco ──────────────────────────────
     Clockwise. Sainte Dévote hairpin, uphill to Casino,
     downhill Mirabeau, Loews hairpin (tightest in F1),
     tunnel, chicane, La Rascasse, Anthony Noghes. */
  monaco: {
    name: 'Circuit de Monaco',
    location: 'Monte Carlo, Monaco',
    flag: 'mc', round: 'Round 08',
    laps: 78, length: '3.337', lapRecord: '1:12.909',
    lapRecordBy: 'L. Hamilton — 2021',
    accentColor: '#e8002d',
  },

  /* ── SPAIN — Barcelona-Catalunya ─────────────────────────────
     Clockwise. Long main straight into T1 (heavy braking),
     flowing S1 right-handers, tight infield, long back straight. */
  spain: {
    name: 'Circuit de Barcelona-Catalunya',
    location: 'Montmeló, Spain',
    flag: 'es', round: 'Round 09',
    laps: 66, length: '4.657', lapRecord: '1:18.149',
    lapRecordBy: 'M. Verstappen — 2021',
    accentColor: '#aa151b',
  },

  /* ── AUSTRIA — Red Bull Ring ─────────────────────────────────
     Clockwise. Very short circuit. T1 long right uphill,
     T2 fast right, downhill T3, tight T4 hairpin,
     T5-T6 flowing section, long main straight home. */
  austria: {
    name: 'Red Bull Ring',
    location: 'Spielberg, Austria',
    flag: 'at', round: 'Round 10',
    laps: 71, length: '4.318', lapRecord: '1:05.619',
    lapRecordBy: 'C. Leclerc — 2020',
    accentColor: '#3671c6',
  },

  /* ── SILVERSTONE ─────────────────────────────────────────────
     Clockwise. Characteristic squarish shape with
     Copse, Maggotts/Becketts/Chapel complex (S-bends),
     Hangar straight, Stowe, Club, Abbey. */
  silverstone: {
    name: 'Silverstone Circuit',
    location: 'Silverstone, United Kingdom',
    flag: 'gb', round: 'Round 11',
    laps: 52, length: '5.891', lapRecord: '1:27.097',
    lapRecordBy: 'M. Verstappen — 2020',
    accentColor: '#004a96',
  },

  /* ── BELGIUM — Spa-Francorchamps ─────────────────────────────
     Clockwise. La Source hairpin, Eau Rouge/Raidillon uphill,
     long Kemmel straight, Les Combes chicane,
     Pouhon, Bus Stop chicane. */
  belgium: {
    name: 'Circuit de Spa-Francorchamps',
    location: 'Stavelot, Belgium',
    flag: 'be', round: 'Round 12',
    laps: 44, length: '7.004', lapRecord: '1:46.286',
    lapRecordBy: 'V. Bottas — 2018',
    accentColor: '#000000',
  },

  /* ── HUNGARY — Hungaroring ───────────────────────────────────
     Clockwise. Very twisty, stadium-like, narrow.
     Long S1 loop, tight infield chicanes,
     short back straight, T12 hairpin, long run to S/F. */
  hungary: {
    name: 'Hungaroring',
    location: 'Mogyoród, Hungary',
    flag: 'hu', round: 'Round 13',
    laps: 70, length: '4.381', lapRecord: '1:16.627',
    lapRecordBy: 'L. Hamilton — 2020',
    accentColor: '#ce2939',
  },

  /* ── NETHERLANDS — Zandvoort ─────────────────────────────────
     Clockwise. Compact coastal circuit.
     T1 long right (Tarzan hairpin), twisty infield,
     banked T3 (Hugenholtz), long straight, banked Arie Luyendyk. */
  zandvoort: {
    name: 'Circuit Zandvoort',
    location: 'Zandvoort, Netherlands',
    flag: 'nl', round: 'Round 14',
    laps: 72, length: '4.259', lapRecord: '1:11.097',
    lapRecordBy: 'M. Verstappen — 2021',
    accentColor: '#ff6600',
  },

  /* ── ITALY — Monza ───────────────────────────────────────────
     Clockwise. Near-oval with two chicanes.
     Long main straight → Variante del Rettifilo chicane,
     long Curva Grande sweep, Lesmo 1&2, Ascari chicane,
     Parabolica/Alboreto to S/F. */
  monza: {
    name: 'Autodromo Nazionale di Monza',
    location: 'Monza, Italy',
    flag: 'it', round: 'Round 15',
    laps: 53, length: '5.793', lapRecord: '1:21.046',
    lapRecordBy: 'R. Barrichello — 2004',
    accentColor: '#009246',
  },

  /* ── SPAIN (Madrid) ──────────────────────────────────────────
     New 2026 venue — Circuito de Madring around IFEMA/Barajas area.
     Modern stadium layout with mix of high-speed and technical sections. */
  madrid: {
    name: 'Circuito de Madring',
    location: 'Madrid, Spain',
    flag: 'es', round: 'Round 16 🆕',
    laps: 65, length: '5.500', lapRecord: '—',
    lapRecordBy: 'New venue — 2026 debut',
    accentColor: '#aa151b',
  },

  /* ── AZERBAIJAN — Baku City Circuit ──────────────────────────
     Anti-clockwise. Very long straight (pit straight ~2km),
     castle section with extremely tight T8 (tightest in F1),
     then flowing S2 along the boulevard. */
  baku: {
    name: 'Baku City Circuit',
    location: 'Baku, Azerbaijan',
    flag: 'az', round: 'Round 17',
    laps: 51, length: '6.003', lapRecord: '1:43.009',
    lapRecordBy: 'C. Leclerc — 2019',
    accentColor: '#0092bc',
  },

  /* ── SINGAPORE — Marina Bay ──────────────────────────────────
     Anti-clockwise. Long Anderson Bridge straight,
     tight T3 hairpin, technical waterfront section,
     T10 left, pit straight along Esplanade. */
  singapore: {
    name: 'Marina Bay Street Circuit',
    location: 'Singapore',
    flag: 'sg', round: 'Round 18',
    laps: 62, length: '5.063', lapRecord: '1:35.867',
    lapRecordBy: 'K. Räikkönen — 2018',
    accentColor: '#ef3340',
  },

  /* ── USA — Circuit of the Americas ──────────────────────────
     Anti-clockwise. Distinctive uphill T1, sweeping S2,
     long back straight T12, Esses T17-T18, Hairpin T11. */
  cota: {
    name: 'Circuit of the Americas',
    location: 'Austin, Texas, USA',
    flag: 'us', round: 'Round 19',
    laps: 56, length: '5.513', lapRecord: '1:36.169',
    lapRecordBy: 'C. Leclerc — 2019',
    accentColor: '#bf0a30',
  },

  /* ── MEXICO — Autodromo Hermanos Rodriguez ───────────────────
     Clockwise. Long start straight, stadium Peraltada corner,
     Foro Sol baseball stadium section, technical middle sector. */
  mexico: {
    name: 'Autodromo Hermanos Rodriguez',
    location: 'Mexico City, Mexico',
    flag: 'mx', round: 'Round 20',
    laps: 71, length: '4.304', lapRecord: '1:17.774',
    lapRecordBy: 'V. Bottas — 2021',
    accentColor: '#006847',
  },

  /* ── BRAZIL — Interlagos ─────────────────────────────────────
     Anti-clockwise. Distinctive elongated figure with
     long curving main straight, Senna S (T1-T2),
     Descida do Lago, Pinheirinho, Bico de Pato, Mergulho. */
  brazil: {
    name: 'Autodromo Jose Carlos Pace (Interlagos)',
    location: 'São Paulo, Brazil',
    flag: 'br', round: 'Round 21',
    laps: 71, length: '4.309', lapRecord: '1:10.540',
    lapRecordBy: 'V. Bottas — 2018',
    accentColor: '#009c3b',
  },

  /* ── LAS VEGAS ───────────────────────────────────────────────
     Anti-clockwise. Three long straights on the Strip,
     two tight hairpins at each end, angular infield chicane. */
  lasvegas: {
    name: 'Las Vegas Street Circuit',
    location: 'Las Vegas, Nevada, USA',
    flag: 'us', round: 'Round 22',
    laps: 50, length: '6.120', lapRecord: '1:35.490',
    lapRecordBy: 'O. Piastri — 2024',
    accentColor: '#c0a020',
  },

  /* ── QATAR — Lusail ──────────────────────────────────────────
     Clockwise. Purpose-built MotoGP circuit.
     Flowing, swooping, very few tight corners.
     Signature large hairpin at T16. */
  qatar: {
    name: 'Lusail International Circuit',
    location: 'Lusail, Qatar',
    flag: 'qa', round: 'Round 23',
    laps: 57, length: '5.380', lapRecord: '1:24.319',
    lapRecordBy: 'M. Verstappen — 2023',
    accentColor: '#8d1b3d',
  },

  /* ── ABU DHABI — Yas Marina ──────────────────────────────────
     Anti-clockwise. Iconic layout around the hotel.
     Long back straight, tight T7-T8, hotel under-section,
     marina twisties, long pit straight. */
  abudhabi: {
    name: 'Yas Marina Circuit',
    location: 'Abu Dhabi, UAE',
    flag: 'ae', round: 'Round 24',
    laps: 58, length: '5.281', lapRecord: '1:26.103',
    lapRecordBy: 'M. Verstappen — 2021',
    accentColor: '#00732f',
  }

};

/* ── DOM REFS ──────────────────────────────────────────────────── */
const overlay    = document.getElementById('track-modal');
const closeBtn   = document.getElementById('tm-close-btn');
const tmFlag     = document.getElementById('tm-flag');
const tmRound    = document.getElementById('tm-round');
const tmTitle    = document.getElementById('tm-title');
const tmLocation = document.getElementById('tm-location');
const tmLaps     = document.getElementById('tm-laps');
const tmLength   = document.getElementById('tm-length');
const tmRecord   = document.getElementById('tm-lap-record-time');
const tmHolder   = document.getElementById('tm-record-holder');
const tmSvgWrap  = document.getElementById('tm-track-svg');
const tmGlow     = document.querySelector('.tm-track-glow');

if (!overlay) {
  console.warn('track-modal.js: #track-modal not found on this page.');
}

/* ── OPEN ──────────────────────────────────────────────────────── */
function openTrackModal(trackKey) {
  if (!overlay) return;
  const track = TRACKS[trackKey];
  if (!track) { console.warn('No track data for key:', trackKey); return; }

  tmFlag.src             = `https://flagcdn.com/w80/${track.flag}.png`;
  tmFlag.alt             = track.location;
  tmRound.textContent    = track.round;
  tmTitle.textContent    = track.name;
  tmLocation.textContent = track.location;
  tmLaps.textContent     = track.laps;
  tmLength.textContent   = track.length;
  tmRecord.textContent   = track.lapRecord;
  tmHolder.textContent   = `Lap record: ${track.lapRecordBy}`;

  // loadTrackSVG lives in app.js — handles the SVG image display
  if (typeof loadTrackSVG === 'function') loadTrackSVG(track);

  // Per-circuit accent glow & border
  if (tmGlow) tmGlow.style.background =
    `radial-gradient(circle, ${track.accentColor}28 0%, transparent 68%)`;
  const box = document.querySelector('.tm-box');
  if (box) box.style.borderTopColor = track.accentColor;

  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

/* ── CLOSE ─────────────────────────────────────────────────────── */
function closeTrackModal() {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

/* ── EVENTS ────────────────────────────────────────────────────── */
if (overlay) {
  closeBtn.addEventListener('click', closeTrackModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeTrackModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeTrackModal();
  });
  // NOTE: the .cal-card[data-track] click listener lives in app.js
  // so it can coordinate loadTrackSVG() and openTrackModal() together.
}

/* ── PRELOAD FLAGS ──────────────────────────────────────────────── */
(function preloadFlags() {
  Object.values(TRACKS).forEach(t => {
    const img = new Image();
    img.src = `https://flagcdn.com/w80/${t.flag}.png`;
  });
})();
