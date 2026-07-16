/**
 * F1Stats — api.js
 * Handles fetching live data from OpenF1 API and updating the DOM dynamically.
 */

const API_BASE = 'https://api.openf1.org/v1';

// We fallback to 2024 if the current year has no data in the OpenF1 API yet.
async function fetchMeetings() {
  const currentYear = new Date().getFullYear();
  let meetings = await fetch(`${API_BASE}/meetings?year=${currentYear}`).then(res => res.json());
  if (!meetings || meetings.length === 0) {
    meetings = await fetch(`${API_BASE}/meetings?year=2024`).then(res => res.json());
  }
  return meetings;
}

async function fetchDrivers() {
  const drivers = await fetch(`${API_BASE}/drivers?session_key=latest`).then(res => res.json());
  return drivers;
}

async function fetchDriverStandings() {
  const standings = await fetch(`${API_BASE}/championship_drivers?session_key=latest`).then(res => res.json());
  return standings;
}

function showLoader() {
  const overlay = document.getElementById('api-loading-overlay');
  if (overlay) overlay.classList.remove('hidden');
}

function hideLoader() {
  const overlay = document.getElementById('api-loading-overlay');
  if (overlay) overlay.classList.add('hidden');
}

// ── DATA PROCESSING ──────────────────────────────────────────

function processStandings(driversData, standingsData) {
  // Map drivers by number for easy lookup
  const driverMap = {};
  driversData.forEach(d => {
    driverMap[d.driver_number] = d;
  });

  // Combine standing and driver info
  let combined = standingsData.map(s => {
    const d = driverMap[s.driver_number] || {};
    return {
      pos: s.position_current,
      driverNumber: s.driver_number,
      firstName: d.first_name || '',
      lastName: d.last_name || '',
      fullName: d.full_name || 'Unknown Driver',
      acronym: d.name_acronym || 'UNK',
      team: d.team_name || 'Unknown Team',
      teamColor: d.team_colour || 'ffffff',
      headshot: d.headshot_url || '',
      points: s.points_current || 0
    };
  });

  // Sort by position
  combined.sort((a, b) => a.pos - b.pos);
  return combined;
}

function getConstructorStandings(combinedDrivers) {
  const teamMap = {};
  combinedDrivers.forEach(d => {
    if (!teamMap[d.team]) {
      teamMap[d.team] = {
        teamName: d.team,
        points: 0,
        color: d.teamColor,
        drivers: []
      };
    }
    teamMap[d.team].points += d.points;
    teamMap[d.team].drivers.push(d.acronym);
  });

  const teams = Object.values(teamMap);
  teams.sort((a, b) => b.points - a.points);
  
  // Assign positions
  teams.forEach((t, i) => t.pos = i + 1);
  return teams;
}

// Map team names to css variables for colors
function getTeamCssVar(teamName) {
  const t = teamName.toLowerCase();
  if (t.includes('mercedes')) return 'var(--team-mercedes)';
  if (t.includes('ferrari')) return 'var(--team-ferrari)';
  if (t.includes('mclaren')) return 'var(--team-mclaren)';
  if (t.includes('red bull')) return 'var(--team-redbull)';
  if (t.includes('alpine')) return 'var(--team-alpine)';
  if (t.includes('aston')) return 'var(--team-aston)';
  if (t.includes('williams')) return 'var(--team-williams)';
  if (t.includes('haas')) return 'var(--team-haas)';
  if (t.includes('sauber') || t.includes('audi')) return 'var(--team-sauber)';
  if (t.includes('racing bulls') || t.includes('rb')) return 'var(--team-rb)';
  if (t.includes('cadillac')) return '#B40A29';
  return '#ffffff';
}

// ── RENDERERS ────────────────────────────────────────────────

function renderHomeDriverStandings(drivers) {
  const tbody = document.getElementById('home-driver-standings');
  if (!tbody) return;
  tbody.innerHTML = '';

  const top10 = drivers.slice(0, 10);
  top10.forEach(d => {
    const tr = document.createElement('tr');
    tr.className = `standing-row ${d.pos === 1 ? 'p1' : ''}`;
    tr.innerHTML = `
      <td class="pos-cell"><span class="pos">${d.pos || '-'}</span></td>
      <td class="driver-cell">
        <img src="${d.headshot}" alt="${d.acronym}" class="driver-thumb" onerror="this.src='https://ui-avatars.com/api/?name=${d.acronym}&background=333&color=fff&size=32&bold=true&rounded=true'"/>
        <div><span class="driver-name">${d.fullName}</span><span class="driver-abbr">${d.acronym}</span></div>
      </td>
      <td><span class="team-dot" style="background:${getTeamCssVar(d.team)}"></span>${d.team}</td>
      <td class="pts-col"><strong>${d.points !== null && d.points !== undefined ? d.points : '-'}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderHomeConstructorStandings(teams) {
  const container = document.getElementById('home-constructor-standings');
  if (!container) return;
  container.innerHTML = '';
  
  if (teams.length === 0) return;
  const maxPoints = Math.max(...teams.map(t => t.points), 1);

  teams.forEach(t => {
    const widthPct = Math.max(1, (t.points / maxPoints) * 100);
    const div = document.createElement('div');
    div.className = 'chart-row';
    div.innerHTML = `
      <span class="chart-team-name">${t.teamName}</span>
      <div class="chart-bar-track">
        <div class="chart-bar-fill" style="width:${widthPct}%;background:${getTeamCssVar(t.teamName)}">
          <span class="chart-bar-pos" style="color: ${widthPct < 5 ? '#111' : 'rgba(255,255,255,0.7)'}">P${t.pos || '-'}</span>
        </div>
      </div>
      <span class="chart-pts">${t.points !== null && t.points !== undefined ? t.points : '-'}</span>
    `;
    container.appendChild(div);
  });
}

function renderFullDriverStandings(drivers) {
  const tbody = document.getElementById('standings-drivers-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  drivers.forEach(d => {
    const tr = document.createElement('tr');
    tr.className = `fst-row ${d.pos === 1 ? 'p1' : ''}`;
    
    let badgeClass = '';
    if (d.pos === 1) badgeClass = 'gold';
    else if (d.pos === 2) badgeClass = 'silver';
    else if (d.pos === 3) badgeClass = 'bronze';

    const posHtml = badgeClass ? `<span class="pos-badge ${badgeClass}">${d.pos}</span>` : `<span class="pos-badge">${d.pos || '-'}</span>`;

    tr.innerHTML = `
      <td>${posHtml}</td>
      <td class="driver-cell">${d.fullName}</td>
      <td><span class="team-dot" style="background:${getTeamCssVar(d.team)}"></span> ${d.team}</td>
      <td class="pts-col"><strong>${d.points !== null && d.points !== undefined ? d.points : '-'}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderFullConstructorStandings(teams) {
  const tbody = document.getElementById('standings-constructors-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  teams.forEach(t => {
    const tr = document.createElement('tr');
    tr.className = `fst-row ${t.pos === 1 ? 'p1' : ''}`;
    
    let badgeClass = '';
    if (t.pos === 1) badgeClass = 'gold';
    else if (t.pos === 2) badgeClass = 'silver';
    else if (t.pos === 3) badgeClass = 'bronze';

    const posHtml = badgeClass ? `<span class="pos-badge ${badgeClass}">${t.pos}</span>` : `<span class="pos-badge">${t.pos || '-'}</span>`;

    tr.innerHTML = `
      <td>${posHtml}</td>
      <td><span class="team-dot" style="background:${getTeamCssVar(t.teamName)}"></span><strong>${t.teamName}</strong></td>
      <td>${t.drivers.join(' · ')}</td>
      <td class="pts-col"><strong>${t.points !== null && t.points !== undefined ? t.points : '-'}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

function getTrackKey(meeting) {
  const c = (meeting.country_code || '').toUpperCase();
  const loc = (meeting.location || '').toLowerCase();
  
  if (c === 'AUS') return 'australia';
  if (c === 'CHN') return 'china';
  if (c === 'JPN') return 'japan';
  if (c === 'USA') {
    if (loc.includes('miami')) return 'miami';
    if (loc.includes('vegas')) return 'lasvegas';
    return 'cota';
  }
  if (c === 'CAN') return 'canada';
  if (c === 'MCO') return 'monaco';
  if (c === 'ESP') {
    if (loc.includes('madrid')) return 'madrid';
    return 'spain';
  }
  if (c === 'AUT') return 'austria';
  if (c === 'GBR') return 'silverstone';
  if (c === 'BEL') return 'belgium';
  if (c === 'HUN') return 'hungary';
  if (c === 'NLD') return 'zandvoort';
  if (c === 'ITA') return 'monza';
  if (c === 'AZE') return 'baku';
  if (c === 'SGP') return 'singapore';
  if (c === 'MEX') return 'mexico';
  if (c === 'BRA') return 'brazil';
  if (c === 'QAT') return 'qatar';
  if (c === 'ARE') return 'abudhabi';
  
  if (meeting.circuit_short_name) {
    return meeting.circuit_short_name.toLowerCase().replace(/[^a-z0-9]/g, '');
  }
  return null;
}

function renderCalendar(meetings) {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const now = new Date();
  
  meetings.forEach((m, index) => {
    const isCancelled = m.is_cancelled || false;
    const meetingDate = new Date(m.date_end || m.date_start);
    const isPast = meetingDate < now;
    
    // Check if it's the next upcoming race
    let isNext = false;
    if (!isCancelled && !isPast) {
      const firstFuture = meetings.find(meet => !meet.is_cancelled && new Date(meet.date_start) >= now);
      if (firstFuture && firstFuture.meeting_key === m.meeting_key) {
        isNext = true;
      }
    }

    const padRound = String(index + 1).padStart(2, '0');
    
    const div = document.createElement('div');
    div.className = 'cal-card';
    if (isCancelled) div.classList.add('cal-cancelled');
    else if (isPast) div.classList.add('done');
    else if (isNext) div.classList.add('next');

    // Make it clickable if it has a valid mapping to show track layout
    const trackKey = getTrackKey(m);
    if (trackKey) {
      div.setAttribute('data-track', trackKey);
    }

    const startDate = new Date(m.date_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endDate = new Date(m.date_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const dateStr = `${startDate} – ${endDate}`;

    let statusBadge = '';
    if (isCancelled) {
      statusBadge = '<div class="cal-upcoming-badge cal-badge-cancelled">CANCELLED</div>';
    } else if (isNext) {
      statusBadge = '<div class="cal-upcoming-badge">NEXT RACE</div>';
    }

    const flagUrl = m.country_flag ? m.country_flag : `https://flagcdn.com/w40/${(m.country_code || '').substring(0,2).toLowerCase()}.png`;

    div.innerHTML = `
      <div class="cal-round">R${padRound}</div>
      <div class="cal-country"><img src="${flagUrl}" alt="${m.country_code || ''}" class="cal-flag" onerror="this.style.display='none'"/> ${m.country_name || m.location || '-'}</div>
      <div class="cal-name">${m.meeting_name || m.meeting_official_name || '-'}</div>
      <div class="cal-date">${dateStr}</div>
      ${statusBadge}
    `;
    
    grid.appendChild(div);
  });
}

// ── INIT ──────────────────────────────────────────────────────

async function initApiData() {
  showLoader();

  try {
    const [meetings, drivers, standings] = await Promise.all([
      fetchMeetings(),
      fetchDrivers(),
      fetchDriverStandings()
    ]);

    const combinedDrivers = processStandings(drivers, standings);
    const combinedTeams = getConstructorStandings(combinedDrivers);

    // -- Update Dynamic Descriptions --
    const now = new Date();
    const completedMeetings = meetings.filter(m => !m.is_cancelled && new Date(m.date_end || m.date_start) < now);
    const currentRound = completedMeetings.length;
    const lastMeeting = completedMeetings[completedMeetings.length - 1];

    const heroDesc = document.getElementById('hero-sub-desc');
    if (heroDesc) {
      if (combinedDrivers.length > 0) {
        const leader = combinedDrivers[0];
        heroDesc.textContent = `New cars, new teams, new era. ${leader.lastName || leader.acronym} leads the championship after ${currentRound} rounds.`;
      } else {
        heroDesc.textContent = `New cars, new teams, new era. Follow the championship standings.`;
      }
    }

    const chartSub = document.getElementById('home-chart-sub');
    if (chartSub) {
      if (lastMeeting) {
        chartSub.textContent = `After Round ${currentRound} — ${lastMeeting.country_name || lastMeeting.location}`;
      } else {
        chartSub.textContent = `Championship Standings`;
      }
    }

    const standingsSub = document.getElementById('standings-page-sub');
    if (standingsSub) {
      if (lastMeeting) {
        standingsSub.textContent = `2026 World Championship — After Round ${currentRound} (${lastMeeting.meeting_name || 'GP'})`;
      } else {
        standingsSub.textContent = `2026 World Championship Standings`;
      }
    }

    // -- Populate Next Race block --
    const nextMeeting = meetings.find(meet => !meet.is_cancelled && new Date(meet.date_end || meet.date_start) >= now);
    if (nextMeeting) {
      const nextRoundEl = document.getElementById('next-race-round');
      if (nextRoundEl) nextRoundEl.textContent = `Round ${String(meetings.indexOf(nextMeeting) + 1).padStart(2, '0')}`;
      
      const nextNameEl = document.getElementById('next-race-name');
      if (nextNameEl) nextNameEl.textContent = nextMeeting.meeting_name || nextMeeting.meeting_official_name || '-';
      
      const nextLocEl = document.getElementById('next-race-location');
      if (nextLocEl) {
        const flagUrl = nextMeeting.country_flag ? nextMeeting.country_flag : `https://flagcdn.com/w40/${(nextMeeting.country_code || '').substring(0,2).toLowerCase()}.png`;
        nextLocEl.innerHTML = `<img src="${flagUrl}" alt="${nextMeeting.country_code || ''}" class="race-flag" onerror="this.style.display='none'"/> ${nextMeeting.location || nextMeeting.country_name}`;
      }
      
      const nextDateEl = document.getElementById('next-race-date');
      if (nextDateEl) {
        const startDate = new Date(nextMeeting.date_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const endDate = new Date(nextMeeting.date_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        nextDateEl.textContent = `${startDate} – ${endDate}`;
      }

      if (window.setNextRaceDate) {
        window.setNextRaceDate(nextMeeting.date_start); 
      }
    }

    renderHomeDriverStandings(combinedDrivers);
    renderHomeConstructorStandings(combinedTeams);
    renderFullDriverStandings(combinedDrivers);
    renderFullConstructorStandings(combinedTeams);
    renderCalendar(meetings);

  } catch (err) {
    console.error("Error fetching F1 live data:", err);
  } finally {
    hideLoader();
  }
}

document.addEventListener('DOMContentLoaded', initApiData);
