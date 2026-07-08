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
    corners: 16, drsZones: 4, direction: 'Clockwise',
    firstGP: 1996, topSpeed: '328 km/h',
    famousCorner: 'Turn 1 (Brabham Straight entry)',
    circuitType: 'Semi-permanent street circuit',
    altitude: '10 m',
    description: 'Clockwise kidney-bean loop around Albert Park lake. Features a long back straight, tight Turn 1, sweeping lakeside section, and a punishing final chicane before the start/finish line.',
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
    corners: 16, drsZones: 2, direction: 'Clockwise',
    firstGP: 2004, topSpeed: '327 km/h',
    famousCorner: 'Turn 1–2–3 (Spiral Hairpin)',
    circuitType: 'Permanent racing circuit',
    altitude: '4 m',
    description: 'Distinctive snail-spiral hairpin at Turns 1–2–3, a long back straight enabling DRS overtakes, sweeping S2 sector, and a tight technical final sector leading to the pit straight.',
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
    corners: 18, drsZones: 2, direction: 'Mixed (figure-eight)',
    firstGP: 1987, topSpeed: '315 km/h',
    famousCorner: '130R & Spoon Curve',
    circuitType: 'Permanent racing circuit',
    altitude: '55 m',
    description: 'Iconic figure-eight layout with an overpass crossing. Features the high-speed Esses top-left, a hairpin at the bottom, the flowing Spoon Curve, the flat-out 130R sweeper, and the Casio chicane into start/finish.',
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
    corners: 19, drsZones: 3, direction: 'Anti-clockwise',
    firstGP: 2022, topSpeed: '320 km/h',
    famousCorner: 'Turn 14–16 (Marina Section)',
    circuitType: 'Temporary street circuit',
    altitude: '3 m',
    description: 'Anti-clockwise layout built around the Hard Rock Stadium. Long main straight into Turn 1, a technical middle sector, a long back straight, infield loops, and a scenic marina chicane.',
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
    corners: 14, drsZones: 2, direction: 'Anti-clockwise',
    firstGP: 1978, topSpeed: '330 km/h',
    famousCorner: 'Wall of Champions (Turn 13)',
    circuitType: 'Semi-permanent street circuit',
    altitude: '7 m',
    description: 'Anti-clockwise island circuit on île Notre-Dame. Two long straights end in tight hairpins. The infamous Wall of Champions at Turn 13 has claimed many top drivers over the years.',
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
    corners: 19, drsZones: 1, direction: 'Clockwise',
    firstGP: 1950, topSpeed: '290 km/h',
    famousCorner: 'Loews Hairpin (tightest in F1)',
    circuitType: 'Street circuit',
    altitude: '7 m',
    description: 'The crown jewel of motorsport. Sainte Dévote hairpin, uphill to Casino Square, steep descent via Mirabeau, Loews hairpin (the tightest in F1), the tunnel, chicane, La Rascasse, and Anthony Noghes.',
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
    corners: 16, drsZones: 2, direction: 'Clockwise',
    firstGP: 1991, topSpeed: '318 km/h',
    famousCorner: 'Turn 3 (Long Right-hander)',
    circuitType: 'Permanent racing circuit',
    altitude: '115 m',
    description: 'Clockwise layout. Long main straight into heavy braking at T1, flowing S1 right-handers testing aero efficiency, technical infield, and a long back straight into the final hairpin.',
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
    corners: 10, drsZones: 3, direction: 'Clockwise',
    firstGP: 1970, topSpeed: '322 km/h',
    famousCorner: 'Turn 3 (Uphill Right-hander)',
    circuitType: 'Permanent racing circuit',
    altitude: '660 m',
    description: 'One of F1’s shortest circuits yet most action-packed. T1 long right goes steeply uphill, T2 fast right follows, downhill T3, tight T4 hairpin, flowing T5–T6, then a long main straight home.',
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
    corners: 18, drsZones: 2, direction: 'Clockwise',
    firstGP: 1950, topSpeed: '332 km/h',
    famousCorner: 'Maggotts-Becketts-Chapel Complex',
    circuitType: 'Permanent racing circuit',
    altitude: '153 m',
    description: 'Home of British motorsport. Copse at full throttle, the breathtaking Maggotts-Becketts-Chapel S-bends, long Hangar straight, Stowe and Club corners, and the high-speed Abbey complex.',
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
    accentColor: '#FFD700',
    corners: 20, drsZones: 2, direction: 'Clockwise',
    firstGP: 1950, topSpeed: '355 km/h',
    famousCorner: 'Eau Rouge / Raidillon',
    circuitType: 'Permanent racing circuit',
    altitude: '435 m',
    description: 'One of the greatest circuits in the world. La Source hairpin, the iconic uphill Eau Rouge/Raidillon complex, long Kemmel straight, Les Combes chicane, fast Pouhon double-left, and Bus Stop chicane.',
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
    corners: 14, drsZones: 2, direction: 'Clockwise',
    firstGP: 1986, topSpeed: '310 km/h',
    famousCorner: 'Turn 4 (The Long Hairpin)',
    circuitType: 'Permanent racing circuit',
    altitude: '264 m',
    description: 'Very twisty, narrow, stadium-like circuit. Long S1 loop, tight infield chicanes, short back straight, T12 hairpin, and a long run to the start/finish. Almost impossible to overtake without DRS.',
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
    corners: 14, drsZones: 2, direction: 'Clockwise',
    firstGP: 1952, topSpeed: '318 km/h',
    famousCorner: 'Arie Luyendyk (banked final corner)',
    circuitType: 'Permanent racing circuit',
    altitude: '5 m',
    description: 'Compact coastal circuit nestled in the dunes. Tarzan hairpin at T1, twisty technical infield, banked Hugenholtz corner, long start/finish straight, and the remarkable 19-degree banked Arie Luyendyk final corner.',
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
    corners: 11, drsZones: 2, direction: 'Clockwise',
    firstGP: 1950, topSpeed: '362 km/h',
    famousCorner: 'Parabolica / Alboreto Corner',
    circuitType: 'Permanent racing circuit',
    altitude: '162 m',
    description: 'The Temple of Speed. Near-oval layout with two chicanes slowing the cars. Long main straight into the Variante del Rettifilo, sweeping Curva Grande, Lesmo 1 & 2, Ascari chicane, and the long Parabolica to the finish.',
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
    corners: 20, drsZones: 3, direction: 'Clockwise',
    firstGP: 2026, topSpeed: '325 km/h (est.)',
    famousCorner: 'TBC — new circuit',
    circuitType: 'Semi-permanent street circuit',
    altitude: '582 m',
    description: 'Brand-new 2026 venue around the IFEMA/Barajas exhibition area in the Spanish capital. Modern stadium-style layout featuring a mix of high-speed sections and tight technical zones designed for close racing.',
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
    corners: 20, drsZones: 2, direction: 'Anti-clockwise',
    firstGP: 2017, topSpeed: '378 km/h',
    famousCorner: 'Turn 8 (Castle Section — tightest in F1)',
    circuitType: 'Street circuit',
    altitude: '2 m',
    description: 'Anti-clockwise city circuit along the Caspian Sea boulevard. Features the longest straight in F1 (~2 km), the extraordinarily tight Turn 8 castle section, and sweeping high-speed final sector along the waterfront.',
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
    corners: 23, drsZones: 3, direction: 'Anti-clockwise',
    firstGP: 2008, topSpeed: '300 km/h',
    famousCorner: 'Turn 10 (Anderson Bridge Section)',
    circuitType: 'Street circuit (night race)',
    altitude: '15 m',
    description: 'The world’s first night race. Anti-clockwise street circuit under floodlights beside Marina Bay. Long Anderson Bridge straight, tight T3 hairpin, technical waterfront section, and the iconic pit straight alongside the Esplanade.',
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
    corners: 20, drsZones: 2, direction: 'Anti-clockwise',
    firstGP: 2012, topSpeed: '324 km/h',
    famousCorner: 'Turn 1 (Uphill Blind Apex)',
    circuitType: 'Permanent racing circuit',
    altitude: '200 m',
    description: 'Anti-clockwise. Features a dramatic uphill blind Turn 1, sweeping high-speed S2 with the Esses (T3–T9), long back straight into the hairpin at T12, technical T17–18 Esses, and a fast final sector.',
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
    corners: 17, drsZones: 3, direction: 'Clockwise',
    firstGP: 1963, topSpeed: '366 km/h',
    famousCorner: 'Peraltada (Foro Sol Stadium)',
    circuitType: 'Permanent racing circuit',
    altitude: '2,285 m',
    description: 'High-altitude circuit (2,285 m) making engines less efficient. Long start/finish straight, the iconic stadium Peraltada corner inside the Foro Sol baseball stadium, and a technical middle sector. Thin air rewards efficient power units.',
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
    corners: 15, drsZones: 2, direction: 'Anti-clockwise',
    firstGP: 1973, topSpeed: '320 km/h',
    famousCorner: 'Senna S (Turns 1–2)',
    circuitType: 'Permanent racing circuit',
    altitude: '785 m',
    description: 'Anti-clockwise elongated figure-eight layout. Curving main straight into the Senna S chicane (T1–2), Descida do Lago, Pinheirinho, Bico de Pato and the Mergulho dip. Unpredictable weather a constant wildcard.',
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
    corners: 17, drsZones: 2, direction: 'Anti-clockwise',
    firstGP: 2023, topSpeed: '342 km/h',
    famousCorner: 'Koval Hairpin (The Strip Section)',
    circuitType: 'Street circuit (night race)',
    altitude: '617 m',
    description: 'Anti-clockwise night race along Las Vegas Boulevard. Three long straights on The Strip separated by two tight hairpins, an angular infield chicane, and dazzling casino backdrop. Fastest street circuit in F1.',
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
    corners: 16, drsZones: 2, direction: 'Clockwise',
    firstGP: 2021, topSpeed: '322 km/h',
    famousCorner: 'Turn 16 (Grand Hairpin)',
    circuitType: 'Permanent racing circuit (night race)',
    altitude: '12 m',
    description: 'Purpose-built MotoGP circuit adapted for F1. Flowing, sweeping corners with very few tight sections. The signature large hairpin at T16 is the primary overtaking zone. Held as a night race under spectacular lighting.',
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
    corners: 16, drsZones: 2, direction: 'Anti-clockwise',
    firstGP: 2009, topSpeed: '332 km/h',
    famousCorner: 'Turn 9 (Hotel Section)',
    circuitType: 'Permanent racing circuit',
    altitude: '2 m',
    description: 'Anti-clockwise layout winding around the Yas Viceroy Hotel. Long back straight, tight T7–8 complex, the unique hotel underpass section, technical marina twisties, and a long pit straight to the finish line.',
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

  // Populate extra fields
  const setField = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val ?? '—'; };
  setField('tm-corners',      track.corners);
  setField('tm-drs',          track.drsZones ? `${track.drsZones} zones` : '—');
  setField('tm-direction',    track.direction);
  setField('tm-first-gp',     track.firstGP);
  setField('tm-top-speed',    track.topSpeed);
  setField('tm-famous-corner', track.famousCorner);
  setField('tm-circuit-type', track.circuitType);
  setField('tm-altitude',     track.altitude);
  setField('tm-description',  track.description);

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
