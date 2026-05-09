/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — DASHBOARD PAGE
═══════════════════════════════════════════════════ */

const DashboardPage = {
  weekStats: null,

  async render(container) {
    const week = Store.currentWeek;
    const phase = Store.currentPhase;
    const profil = Store.profil;
    const todayDay = Store.todayDay;
    const isDeload = isDeloadWeek(week);
    const isBilan = isBilanWeek(week);
    const phaseData = PROGRAMME[`phase${phase}`];

    container.innerHTML = `
      <div class="page-enter">
        <!-- HERO BANNER -->
        <div class="dashboard-hero">
          <div class="hero-greeting">
            <div class="hero-top">
              <div>
                <div class="hero-name">Bonjour ${profil?.prenom || 'Coach'} 💪</div>
                <div class="hero-desc">Semaine ${week} / 16 — ${phaseData?.label || 'Phase 1'}</div>
              </div>
              <span class="hero-phase-badge">${UI.phaseBadge(phase, `P${phase}`)}</span>
            </div>

            <div class="hero-progress">
              <div class="hero-progress-label">
                <span>Progression programme</span>
                <span>${Math.round((week / 16) * 100)}%</span>
              </div>
              <div class="hero-progress-bar">
                <div class="hero-progress-fill" id="hero-prog-fill" style="width:0%"></div>
              </div>
            </div>

            ${this._getTodaySeance(todayDay, week) ? `
              <div class="hero-cta">
                <button class="btn btn-primary btn-full" onclick="App.navigate('seance')">
                  🏋️ Démarrer la séance du jour
                </button>
              </div>
            ` : `
              <div class="hero-cta">
                <div style="background:rgba(255,255,255,0.1);border-radius:var(--radius);padding:10px 14px;font-size:13px;color:rgba(255,255,255,0.8)">
                  ${PLANNING_SEMAINE[todayDay]?.emoji || '🌿'} ${PLANNING_SEMAINE[todayDay]?.label || 'Repos'} aujourd'hui
                </div>
              </div>
            `}
          </div>
        </div>

        <!-- ALERTES PRIORITAIRES -->
        <div style="padding: 0 16px;margin-top:16px" id="alerts-zone"></div>

        <!-- CALENDRIER SEMAINE -->
        <div class="scroll-section" style="padding-bottom:0">
          <div class="section-header">
            <span class="section-title">Cette semaine</span>
            <button class="btn btn-ghost btn-sm" onclick="App.navigate('seance')">Voir tout →</button>
          </div>
        </div>
        <div style="padding: 0 16px 8px">
          <div class="week-calendar" id="week-calendar"></div>
        </div>

        <!-- STATS GRID -->
        <div class="scroll-section" style="padding-bottom:0">
          <div class="section-title">Stats de la semaine</div>
        </div>
        <div class="stats-grid stagger-children" id="stats-grid">
          ${UI.skeleton(90)} ${UI.skeleton(90)} ${UI.skeleton(90)} ${UI.skeleton(90)}
        </div>

        <!-- NUTRITION DU JOUR -->
        <div class="scroll-section" style="padding-bottom:0">
          <div class="section-header">
            <span class="section-title">Nutrition du jour</span>
            <button class="btn btn-ghost btn-sm" onclick="App.navigate('nutrition')">Saisir →</button>
          </div>
          <div class="section-card" id="nutrition-summary"></div>
        </div>

        <!-- RAPPELS DIASTASIS -->
        <div class="scroll-section">
          <div class="section-title" style="margin-bottom:12px">Rappels diastasis</div>
          <div class="card">
            ${DiastasisSafety.getPermanentReminders().map(r => `
              <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--color-border)">
                <span style="font-size:20px;flex-shrink:0">${r.icon}</span>
                <span style="font-size:13px;color:var(--color-text-2);line-height:1.4">${r.text}</span>
              </div>
            `).join('')}
            <div style="margin-top:12px">
              <button class="btn btn-ghost btn-sm" onclick="DashboardPage.showStopSigns()">
                🛑 Voir les signes d'alerte
              </button>
            </div>
          </div>
        </div>

        <!-- PROGRAMME INFO -->
        <div class="scroll-section" style="padding-top:0">
          <div class="section-card">
            <div class="section-card-header">
              <span style="font-size:14px;font-weight:700">Programme — Phase ${phase}</span>
              ${UI.phaseBadge(phase)}
            </div>
            <div class="section-card-body">
              <p style="font-size:13px;color:var(--color-text-2);line-height:1.6;margin-bottom:12px">
                ${phaseData?.description || ''}
              </p>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <span class="badge badge-muted">💪 ${phaseData?.intensite || ''}</span>
                <span class="badge badge-muted">📅 Semaines ${phaseData?.semaines?.[0]}–${phaseData?.semaines?.[3]}</span>
                ${isDeload ? '<span class="badge badge-danger">🔻 Semaine DÉLOAD</span>' : ''}
                ${isBilan ? '<span class="badge badge-warning">👩‍⚕️ Bilan kiné</span>' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Animate progress bar
    setTimeout(() => {
      const fill = HELPERS.el('hero-prog-fill');
      if (fill) fill.style.width = `${(week / 16) * 100}%`;
    }, 200);

    // Load alerts
    this._renderAlerts(week, phase);

    // Render week calendar
    this._renderWeekCalendar();

    // Load and render stats
    const stats = await Store.getWeekStats();
    this.weekStats = stats;
    this._renderStats(stats);

    // Render nutrition summary
    this._renderNutritionSummary();
  },

  _getTodaySeance(day, week) {
    const planning = PLANNING_SEMAINE[day];
    if (!planning || planning.repos) return null;
    return getSeanceForDay(day, week);
  },

  _renderAlerts(week, phase) {
    const zone = HELPERS.el('alerts-zone');
    if (!zone) return;

    const alerts = [];

    // Bilan kiné alert
    const bilanAlert = DiastasisSafety.getBilanAlert(week);
    if (bilanAlert) alerts.push(bilanAlert);

    // Déload alert
    if (isDeloadWeek(week)) {
      alerts.push({
        level: 'warning',
        icon: '🔻',
        title: 'Semaine de déload',
        message: 'Réduire les charges de 20% cette semaine. Priorité à la récupération et à la technique.'
      });
    }

    // Diastasis width alert
    const profil = Store.profil;
    if (profil?.diastasisInitial > 2.5) {
      alerts.push({
        level: 'warning',
        icon: '⚠️',
        title: `Diastasis initial : ${profil.diastasisInitial} cm`,
        message: 'Engagement transverse renforcé à chaque exercice. Suivi kiné indispensable.'
      });
    }

    if (alerts.length === 0) return;

    zone.innerHTML = alerts.map(a => UI.diastasisAlert(a.level, `${a.icon} ${a.title}`, a.message)).join('');
  },

  _renderWeekCalendar() {
    const cal = HELPERS.el('week-calendar');
    if (!cal) return;

    const today = HELPERS.dayName();
    const week = Store.currentWeek;

    cal.innerHTML = JOURS_ORDER.map(jour => {
      const planning = PLANNING_SEMAINE[jour];
      const isToday = jour === today;
      const isRepos = planning?.repos;
      const seance = getSeanceForDay(jour, week);

      let statusClass = '';
      if (isToday) statusClass = 'today';
      else if (isRepos) statusClass = 'repos';

      return `
        <div class="day-card ${statusClass}" onclick="${isRepos ? '' : `App.navigate('seance')`}">
          <div class="day-name">${HELPERS.frDayShort(jour)}</div>
          <div class="day-icon">${planning?.emoji || '🌿'}</div>
          <div class="day-label">${planning?.label || 'Repos'}</div>
          ${planning?.duree ? `<div class="day-status" style="color:var(--color-muted)">${planning.duree}min</div>` : ''}
          ${isToday ? `<div class="day-status" style="color:var(--color-accent);font-weight:700">Aujourd'hui</div>` : ''}
        </div>
      `;
    }).join('');
  },

  _renderStats(stats) {
    const grid = HELPERS.el('stats-grid');
    if (!grid) return;

    const poidsActuel = stats.poids || 75;
    const poidsObj = stats.poidsObjectif || 60;
    const poidsProgress = HELPERS.pct(75 - poidsActuel, 75 - poidsObj);
    const profil = Store.profil;

    grid.innerHTML = `
      ${UI.statCard('🔥', HELPERS.formatKcal(stats.kcalWeek), 'Calories brûlées', 'cette semaine', 'var(--color-accent-pale)')}
      ${UI.statCard('⚖️', HELPERS.formatKg(poidsActuel), 'Poids actuel', `Objectif: ${HELPERS.formatKg(poidsObj)}`, 'var(--color-primary-pale)')}
      ${UI.statCard('💪', `${stats.seancesCompleted}/5`, 'Séances', 'cette semaine', 'var(--color-success-pale)')}
      ${UI.statCard('📏', HELPERS.formatCm(stats.tailleCm), 'Tour de taille', profil?.dateDebut ? `Depuis S1` : 'À mesurer', 'var(--color-purple-pale)')}
    `;
  },

  _renderNutritionSummary() {
    const el = HELPERS.el('nutrition-summary');
    if (!el) return;

    const nutrition = Store.getNutritionToday();
    const phase = Store.currentPhase;
    const targets = NUTRITION_PHASES[phase];

    const protPct = HELPERS.pct(nutrition.proteines, targets.proteines);
    const glucPct = HELPERS.pct(nutrition.glucides, targets.glucides);
    const lipPct = HELPERS.pct(nutrition.lipides, targets.lipides);
    const kcalPct = HELPERS.pct(nutrition.kcal, targets.kcal);

    el.innerHTML = `
      <div class="section-card-body">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div>
            <div style="font-size:22px;font-weight:800;font-family:var(--font-display);color:var(--color-accent)">
              ${Math.round(nutrition.kcal || 0)} <span style="font-size:14px;color:var(--color-muted)">/ ${targets.kcal} kcal</span>
            </div>
            <div style="font-size:11px;color:var(--color-muted);margin-top:2px">${kcalPct}% objectif journalier</div>
          </div>
          ${ProgressRing.render(kcalPct, 64, 'var(--color-accent)', `${kcalPct}%`, 'Kcal')}
        </div>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
          ${this._macroBar('Protéines', nutrition.proteines, targets.proteines, 'g', '#E85D26')}
          ${this._macroBar('Glucides', nutrition.glucides, targets.glucides, 'g', '#2D4A7A')}
          ${this._macroBar('Lipides', nutrition.lipides, targets.lipides, 'g', '#2E7D32')}
        </div>
      </div>
    `;
  },

  _macroBar(name, val, target, unit, color) {
    const pct = HELPERS.pct(val, target);
    return `
      <div style="background:var(--color-surface);border-radius:var(--radius-sm);padding:10px;text-align:center">
        <div style="font-size:10px;font-weight:700;color:var(--color-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">${name}</div>
        <div style="font-family:var(--font-display);font-size:18px;font-weight:800;color:${color}">${Math.round(val || 0)}</div>
        <div style="font-size:10px;color:var(--color-muted);margin-bottom:6px">/ ${target}${unit}</div>
        <div style="height:4px;background:var(--color-surface-2);border-radius:999px;overflow:hidden">
          <div style="width:${pct}%;height:4px;background:${color};border-radius:999px;transition:width 0.8s ease"></div>
        </div>
      </div>
    `;
  },

  showStopSigns() {
    const signs = DiastasisSafety.getStopSigns();
    UI.showModal(`
      <h3 style="margin-bottom:16px;color:var(--color-danger)">🛑 Signes d'arrêt</h3>
      <p style="font-size:13px;color:var(--color-muted);margin-bottom:16px">
        Stopper l'exercice immédiatement en cas de :
      </p>
      ${signs.map(s => `
        <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid var(--color-border)">
          <span style="color:var(--color-danger);font-size:16px;flex-shrink:0">⚠️</span>
          <span style="font-size:13px;color:var(--color-text-2)">${s}</span>
        </div>
      `).join('')}
      <button class="btn btn-secondary btn-full modal-close" style="margin-top:16px" onclick="UI.closeModal()">
        Compris
      </button>
    `);
  },
};
