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
  sauber:   '#52E252',
  rb:       '#6692FF',
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

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyStoredTheme();
  applyStoredTeam();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
