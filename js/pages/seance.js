/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — SÉANCE PAGE
═══════════════════════════════════════════════════ */

const SeancePage = {
  selectedDay: null,
  timerInterval: null,
  timerSeconds: 0,
  seanceActive: false,

  async render(container) {
    const todayDay = Store.todayDay;
    this.selectedDay = this.selectedDay || todayDay;
    const week = Store.currentWeek;
    const phase = Store.currentPhase;
    const seance = getSeanceForDay(this.selectedDay, week);
    const isDeload = isDeloadWeek(week);

    container.innerHTML = `
      <div class="page-enter">
        <!-- Day Selector -->
        <div class="day-selector" id="day-selector"></div>

        <!-- Seance Content -->
        <div id="seance-content"></div>
      </div>
    `;

    this._renderDaySelector(todayDay, week);
    this._renderSeanceContent(seance, week, phase, isDeload);
  },

  _renderDaySelector(todayDay, week) {
    const selector = HELPERS.el('day-selector');
    if (!selector) return;

    selector.innerHTML = JOURS_ORDER.map(jour => {
      const planning = PLANNING_SEMAINE[jour];
      const isActive = jour === this.selectedDay;
      const isToday = jour === todayDay;
      const isRepos = planning?.repos;

      return `
        <button class="day-select-btn ${isActive ? 'active' : ''} ${isRepos ? 'repos' : ''}"
          onclick="SeancePage.selectDay('${jour}')"
          ${isRepos ? 'title="Repos"' : ''}>
          ${planning?.emoji || ''} ${HELPERS.frDayName(jour)}
          ${isToday ? ' •' : ''}
        </button>
      `;
    }).join('');
  },

  selectDay(jour) {
    this.selectedDay = jour;
    const week = Store.currentWeek;
    const phase = Store.currentPhase;
    const isDeload = isDeloadWeek(week);
    const seance = getSeanceForDay(jour, week);

    // Update selector active state
    HELPERS.qsa('.day-select-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.includes(HELPERS.frDayName(jour)));
    });

    this._renderSeanceContent(seance, week, phase, isDeload);
  },

  _renderSeanceContent(seance, week, phase, isDeload) {
    const content = HELPERS.el('seance-content');
    if (!content) return;

    if (!seance || seance.repos) {
      content.innerHTML = `
        <div style="padding:16px">
          ${UI.emptyState(
            PLANNING_SEMAINE[this.selectedDay]?.emoji || '🌿',
            `${PLANNING_SEMAINE[this.selectedDay]?.label || 'Repos'}`,
            'Journée de récupération. La récupération est essentielle à la progression !',
            `<button class="btn btn-secondary" style="margin-top:16px" onclick="SeancePage.selectDay('${Store.todayDay}')">
              Aller à aujourd'hui
            </button>`
          )}
        </div>
      `;
      return;
    }

    const phaseData = PROGRAMME[`phase${phase}`];

    content.innerHTML = `
      <!-- Seance Header -->
      <div class="seance-header">
        <div class="seance-meta">
          ${UI.phaseBadge(phase)}
          ${UI.durationBadge(seance.duree)}
          ${UI.kcalBadge(seance.kcalTotal)}
          ${isDeload ? '<span class="badge badge-danger">🔻 Déload</span>' : ''}
        </div>
        <div class="seance-title">${HELPERS.frDayName(this.selectedDay)} — ${seance.label}</div>
        <div style="font-size:13px;color:var(--color-muted);margin-top:2px">${seance.subtitle || ''}</div>

        <div class="seance-timer-row" style="margin-top:12px">
          <div>
            <div class="seance-global-timer" id="global-timer">00:00</div>
            <div style="font-size:10px;color:var(--color-muted);text-transform:uppercase;letter-spacing:0.06em">Durée séance</div>
          </div>
          <div id="seance-start-btn">
            ${this.seanceActive ? 
              `<button class="btn btn-danger btn-sm" onclick="SeancePage.endSeance()">
                🏁 Terminer
              </button>` :
              `<button class="btn btn-primary" onclick="SeancePage.startSeance()">
                ▶️ Démarrer
              </button>`
            }
          </div>
        </div>
      </div>

      <!-- Diastasis Alert -->
      <div style="padding:0 16px;margin-top:12px">
        ${UI.diastasisAlert('warning', '⚠️ Rappel diastasis', 
          'Activation transverse AVANT chaque exercice. Expirer à l\'effort. Ne pas retenir son souffle.'
        )}
      </div>

      <!-- Exercise List -->
      <div style="padding:12px 16px" id="exercise-list">
        ${this._renderExerciceList(seance, phase, isDeload)}
      </div>
    `;
  },

  _renderExerciceList(seance, phase, isDeload) {
    if (!seance.exercices || seance.exercices.length === 0) return '<p style="color:var(--color-muted);text-align:center;padding:24px">Aucun exercice</p>';

    return seance.exercices.map((ex, idx) => {
      const safety = DiastasisSafety.check(ex, Store.profil?.diastasisActuel || 2.0, Store.profil?.kineValidated || false);

      if (safety.level === 'danger' && !ex.diastasisSafe && !ex.priorite) {
        return UI.forbiddenCard(ex);
      }

      const chargeKey = `chargePhase${phase}`;
      let charge = ex[chargeKey] || ex.chargePhase1 || '';
      if (isDeload && charge) charge = HELPERS.adjustCharge(charge, Store.currentWeek);

      return `
        <div class="exercise-card ${ex.priorite ? 'priority' : ''}" id="excard-${ex.id}">
          <div class="exercise-card-header" onclick="SeancePage.toggleExercice('${ex.id}')">
            <div class="exercise-icon" style="background:${ex.priorite ? 'var(--color-primary-pale)' : 'var(--color-surface)'}">
              ${ex.emoji || '🏋️'}
            </div>
            <div class="exercise-info">
              <div class="exercise-name">
                ${ex.priorite ? '<span style="color:var(--color-primary);font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;display:block">PRIORITÉ</span>' : ''}
                ${ex.nom}
              </div>
              <div class="exercise-meta">
                <span class="badge badge-muted" style="font-size:10px">${ex.sets}×${ex.reps}</span>
                ${charge ? `<span class="badge badge-muted" style="font-size:10px">⚖️ ${charge}</span>` : ''}
                ${UI.kcalBadge(ex.kcal)}
                ${UI.diastasisBadge(ex.diastasisSafe, safety.level)}
                ${ex.repos ? `<span class="badge badge-muted" style="font-size:10px">⏱️ ${ex.repos}s</span>` : ''}
              </div>
            </div>
            <div class="exercise-chevron">
              ${HELPERS.svgChevron(true)}
            </div>
          </div>

          <div class="exercise-card-body" id="exbody-${ex.id}">
            <!-- Consigne -->
            ${ex.consigne ? `
              <div class="consigne-box">
                🎯 <strong>Consigne :</strong> ${ex.consigne}
              </div>
            ` : ''}

            <!-- Safety warning -->
            ${safety.level === 'warning' ? UI.diastasisAlert('warning', 'Attention', safety.message) + '<div style="height:8px"></div>' : ''}

            <!-- Video -->
            ${ex.videoId ? `
              <div style="margin-bottom:12px">
                ${UI.videoThumb(ex.videoId, ex.videoLabel || ex.nom)}
              </div>
            ` : ''}

            <!-- Set Logger -->
            ${ex.sets && typeof ex.sets === 'number' && ex.sets > 0 ? SetLogger.render(ex, Store.state.activeSeance?.sets, null) : ''}

            <!-- Note -->
            <div style="margin-top:12px">
              <textarea class="form-input form-textarea" 
                placeholder="Note coach (ressenti, charge utilisée, remarque...)" 
                rows="2" style="font-size:13px"
                id="note-${ex.id}"></textarea>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  toggleExercice(exerciceId) {
    const card = HELPERS.el(`excard-${exerciceId}`);
    if (card) card.classList.toggle('open');
  },

  startSeance() {
    this.seanceActive = true;
    this.timerSeconds = 0;
    Store.startSeance(this.selectedDay);

    // Update UI
    const btn = HELPERS.el('seance-start-btn');
    if (btn) btn.innerHTML = `<button class="btn btn-danger btn-sm" onclick="SeancePage.endSeance()">🏁 Terminer</button>`;

    // Start timer
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      const el = HELPERS.el('global-timer');
      if (el) el.textContent = HELPERS.formatSeconds(this.timerSeconds);
    }, 1000);

    HELPERS.vibrate([30, 50, 30]);
    UI.toast('Séance démarrée ! 💪', 'success');
  },

  async endSeance() {
    const confirmed = await UI.confirm(
      'Terminer la séance ?',
      `Durée : ${HELPERS.formatSeconds(this.timerSeconds)}\nVoulez-vous sauvegarder cette séance ?`,
      'Sauvegarder',
      'Continuer'
    );

    if (!confirmed) return;

    clearInterval(this.timerInterval);
    this.seanceActive = false;

    const activeData = Store.endSeance();
    const seance = getSeanceForDay(this.selectedDay, Store.currentWeek);

    await Store.saveSeance({
      jour: this.selectedDay,
      date: HELPERS.today(),
      dureeReelle: this.timerSeconds,
      kcalTotal: seance?.kcalTotal || 0,
      phase: Store.currentPhase,
      completed: true,
      notes: activeData?.notes || '',
    });

    HELPERS.vibrateComplete();
    this._showCompletionScreen(seance);
  },

  _showCompletionScreen(seance) {
    const content = HELPERS.el('seance-content');
    if (!content) return;

    content.innerHTML = `
      <div style="padding:16px">
        <div class="completion-card">
          <h2>Séance terminée ! 🎉</h2>
          <p>Excellent travail !</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px">
            <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:12px;text-align:center">
              <div style="font-family:var(--font-display);font-size:22px;font-weight:800;color:white">
                ${HELPERS.formatSeconds(this.timerSeconds)}
              </div>
              <div style="font-size:11px;color:rgba(255,255,255,0.8);margin-top:4px">Durée</div>
            </div>
            <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:12px;text-align:center">
              <div style="font-family:var(--font-display);font-size:22px;font-weight:800;color:white">
                ~${seance?.kcalTotal || 0}
              </div>
              <div style="font-size:11px;color:rgba(255,255,255,0.8);margin-top:4px">kcal brûlées</div>
            </div>
          </div>
        </div>

        <div style="margin-top:16px;display:flex;flex-direction:column;gap:12px">
          <button class="btn btn-primary btn-full" onclick="App.navigate('suivi')">
            📊 Saisir mes mesures
          </button>
          <button class="btn btn-secondary btn-full" onclick="App.navigate('dashboard')">
            🏠 Retour au tableau de bord
          </button>
        </div>
      </div>
    `;
  },
};
