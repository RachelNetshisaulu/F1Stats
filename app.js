/* ============================================================
   F1STATS — app.js
   Theming, countdown, mobile nav
   ============================================================ */

// ── THEME TOGGLE ─────────────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  html.setAttribute('data-theme', isLight ? 'dark' : 'light');
  document.querySelector('.theme-icon').textContent = isLight ? '☀' : '🌙';
  localStorage.setItem('f1stats-theme', isLight ? 'dark' : 'light');
}

function applyStoredTheme() {
  const stored = localStorage.getItem('f1stats-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', stored);
  document.querySelector('.theme-icon').textContent = stored === 'dark' ? '☀' : '🌙';
}

// ── TEAM THEMING ─────────────────────────────────────────────
const TEAM_COLORS = {
  redbull:  '#3671C6',
  ferrari:  '#E8002D',
  mclaren:  '#FF8000',
  mercedes: '#00D2BE',
  alpine:   '#0093CC',
  aston:    '#229971',
  williams: '#64C4FF',
  haas:     '#B6BABD',
  sauber:   '#9B9B9B',   /* Audi */
  rb:       '#4169C8',   /* Racing Bulls */
  default:  '#e10600',
};

function selectTeamTheme(team) {
  const color = TEAM_COLORS[team] || TEAM_COLORS.default;
  document.documentElement.style.setProperty('--team-active', color);
  document.documentElement.style.setProperty('--accent', color);
  const bar = document.querySelector('.team-bar');
  if (bar) bar.style.background = color;
  localStorage.setItem('f1stats-team', team);
}

function applyStoredTeam() {
  const team = localStorage.getItem('f1stats-team') || 'default';
  selectTeamTheme(team);
}

// ── TABS (Standings) ─────────────────────────────────────────
function switchTab(panelId, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(panelId).classList.add('active');
  btn.classList.add('active');
}

// ── MOBILE NAV ───────────────────────────────────────────────
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.hamburger');
  if (!nav || !btn) return;
  const isOpen = nav.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen);
}

// Close mobile nav on outside click
document.addEventListener('click', function (e) {
  const nav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.hamburger');
  if (!nav || !btn) return;
  if (!nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', false);
  }
});

// ── COUNTDOWN ─────────────────────────────────────────────────
function updateCountdown() {
  const target = new Date('2026-03-29T05:00:00Z'); // Japanese GP 2026
  const now = new Date();
  const diff = target - now;

  const pad = n => String(n).padStart(2, '0');

  if (diff <= 0) {
    ['cd-days','cd-hrs','cd-min','cd-sec'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '00';
    });
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hrs  = Math.floor((diff % 86400000) / 3600000);
  const min  = Math.floor((diff % 3600000) / 60000);
  const sec  = Math.floor((diff % 60000) / 1000);

  const daysEl = document.getElementById('cd-days');
  const hrsEl  = document.getElementById('cd-hrs');
  const minEl  = document.getElementById('cd-min');
  const secEl  = document.getElementById('cd-sec');

  if (daysEl) daysEl.textContent = pad(days);
  if (hrsEl)  hrsEl.textContent  = pad(hrs);
  if (minEl)  minEl.textContent  = pad(min);
  if (secEl)  secEl.textContent  = pad(sec);
}

// ── TRACK MODAL ───────────────────────────────────────────────
// Maps each data-track key to its SVG file in the tracks/ folder.
// Download files from:
// ── TRACK MODAL ───────────────────────────────────────────────
// Maps each data-track key to its SVG filename inside tracks/.
// Only the RIGHT side (the filename string) ever needs editing —
// match it exactly to whatever file you have saved in tracks/.
const TRACK_SVG_MAP = {
  australia:   'tracks/melbourne-1.svg',
  china:       'tracks/shanghai-1.svg',
  japan:       'tracks/suzuka-1.svg',
  miami:       'tracks/miami-1.svg',
  canada:      'tracks/montreal-2.svg',
  monaco:      'tracks/monaco-4.svg',
  spain:       'tracks/catalunya-3.svg',
  austria:     'tracks/spielberg-2.svg',
  silverstone: 'tracks/silverstone-7.svg',
  belgium:     'tracks/spa-francorchamps-3.svg',
  hungary:     'tracks/hungaroring-2.svg',
  zandvoort:   'tracks/zandvoort-3.svg',
  monza:       'tracks/monza-5.svg',
  madrid:      'tracks/madring-1.svg',
  baku:        'tracks/baku-1.svg',
  singapore:   'tracks/marina-bay-2.svg',
  cota:        'tracks/austin-1.svg',
  mexico:      'tracks/mexico-city-3.svg',
  brazil:      'tracks/interlagos-2.svg',
  lasvegas:    'tracks/las-vegas-1.svg',
  qatar:       'tracks/lusail-1.svg',
  abudhabi:    'tracks/yas-marina-2.svg',
};

/**
 * loadTrackSVG(track)
 *
 * Uses an <img> tag to display the SVG file.
 * This works with file:// (double-click open) AND http:// servers
 * because browsers load <img src> without any CORS/fetch restriction.
 *
 * The accent colour is applied via a CSS filter approximation and
 * a matching glow behind the image.
 */
function loadTrackSVG(track) {
  var wrap = document.getElementById('tm-track-svg');
  var glow = document.querySelector('.tm-track-glow');
  if (!wrap) return;

  var key    = Object.keys(TRACKS || {}).find(function(k){ return TRACKS[k] === track; }) || '';
  var src    = TRACK_SVG_MAP[key] || null;
  var accent = track.accentColor || '#e10600';

  // Update ambient glow colour
  if (glow) {
    glow.style.background =
      'radial-gradient(ellipse at 50% 50%, ' + accent + '20 0%, transparent 65%)';
  }

  if (!src) {
    wrap.innerHTML = '<p class="tm-track-fallback">No layout mapped for this circuit.</p>';
    return;
  }

  // Build an <img> that points directly at the SVG file.
  // Works on file://, no fetch() needed.
  var img = document.createElement('img');
  img.className   = 'tm-track-img';
  img.alt         = track.name + ' circuit layout';
  img.draggable   = false;

  img.onerror = function() {
    wrap.innerHTML =
      '<p class="tm-track-fallback">Layout unavailable — check the filename in TRACK_SVG_MAP matches the file in your tracks/ folder.</p>';
  };

  // Clear previous content and show the image
  wrap.innerHTML = '';
  wrap.appendChild(img);

  // Set src AFTER appending so onerror fires reliably in all browsers
  img.src = src;
}

// Delegated listener — intercepts clicks on .cal-card[data-track]
document.addEventListener('click', function(e) {
  var card = e.target.closest('.cal-card[data-track]');
  if (!card) return;
  var trackKey = card.getAttribute('data-track');
  var box = document.querySelector('.tm-box');
  if (box) box.setAttribute('data-open-track', trackKey);
  if (typeof openTrackModal === 'function') openTrackModal(trackKey);
});

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  applyStoredTheme();
  applyStoredTeam();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
