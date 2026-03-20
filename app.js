/* ============================================================
   F1STATS — app.js
   SPA routing, theming, countdown
   ============================================================ */

// ── PAGE ROUTER ─────────────────────────────────────────────
function showPage(id, linkEl) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (linkEl) linkEl.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
  document.querySelector('.team-bar').style.background = color;
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

// ── COUNTDOWN ─────────────────────────────────────────────────
function updateCountdown() {
  const target = new Date('2025-05-25T13:00:00Z');
  const now = new Date();
  const diff = target - now;

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

  const pad = n => String(n).padStart(2, '0');

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
