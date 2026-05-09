/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — PROGRESSION PAGE
═══════════════════════════════════════════════════ */

const ProgressionPage = {
  activeGroup: 'haut',
  activePhase: Store.currentPhase || 1,

  async render(container) {
    container.innerHTML = `
      <div class="page-enter">
        <div style="padding:16px 16px 8px">
          <div class="tabs" id="group-tabs">
            <button class="tab-btn active" onclick="ProgressionPage.setGroup('haut')">Haut du corps</button>
            <button class="tab-btn" onclick="ProgressionPage.setGroup('bas')">Bas du corps</button>
            <button class="tab-btn" onclick="ProgressionPage.setGroup('core')">Core Safe</button>
          </div>
        </div>

        <!-- Rules card -->
        <div style="padding:0 16px 8px">
          <div class="card" style="background:var(--gradient-hero);border:none">
            <div style="display:flex;gap:16px;flex-wrap:wrap">
              <div style="flex:1;min-width:120px">
                <div style="font-size:11px;color:rgba(255,255,255,0.7);text-transform:uppercase;font-weight:700;letter-spacing:0.06em">Progression</div>
                <div style="font-size:13px;color:white;margin-top:4px">+5% / 2 semaines si technique parfaite</div>
              </div>
              <div style="flex:1;min-width:120px">
                <div style="font-size:11px;color:rgba(255,255,255,0.7);text-transform:uppercase;font-weight:700;letter-spacing:0.06em">Déload (S4/S8/S12)</div>
                <div style="font-size:13px;color:white;margin-top:4px">-20% des charges. Priorité technique.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Phase selector -->
        <div style="padding:0 16px 8px">
          <div class="phase-selector">
            ${[1,2,3,4].map(p => `
              <button class="phase-btn phase${p} ${this.activePhase === p ? 'active' : ''}"
                onclick="ProgressionPage.setPhase(${p})">
                Phase ${p} — ${PROGRAMME[`phase${p}`]?.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Exercise list -->
        <div style="padding:0 16px 16px" id="progression-list">
          ${this._renderExerciceList()}
        </div>
      </div>
    `;
  },

  setGroup(group) {
    this.activeGroup = group;
    HELPERS.qsa('.tab-btn').forEach((btn, i) => {
      btn.classList.toggle('active', ['haut','bas','core'][i] === group);
    });
    HELPERS.el('progression-list').innerHTML = this._renderExerciceList();
  },

  setPhase(phase) {
    this.activePhase = phase;
    HELPERS.qsa('.phase-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i + 1 === phase);
    });
    HELPERS.el('progression-list').innerHTML = this._renderExerciceList();
  },

  _renderExerciceList() {
    const exercises = Object.entries(PROGRESSION_CHARGES)
      .filter(([, data]) => data.groupe === this.activeGroup);

    if (exercises.length === 0) return '<p style="color:var(--color-muted);text-align:center;padding:24px">Aucun exercice</p>';

    return exercises.map(([name, data]) => {
      const currentPhaseData = data.phases[this.activePhase];
      const isString = typeof currentPhaseData === 'string';
      const charge = isString ? currentPhaseData : (currentPhaseData?.charge || '—');
      const reps = isString ? '—' : (currentPhaseData?.reps || '—');
      const sets = isString ? '—' : (currentPhaseData?.sets || '—');
      const isCurrentPhase = this.activePhase === Store.currentPhase;

      return `
        <div class="progression-exercise-row" style="${isCurrentPhase ? 'border:1.5px solid var(--color-accent)' : ''}">
          <div class="progression-row-header">
            <div style="display:flex;align-items:center;gap:10px;flex:1">
              <span style="font-size:20px">${data.emoji || '🏋️'}</span>
              <div>
                <div style="font-weight:600;font-size:14px;color:var(--color-text)">${name}</div>
                <div style="font-size:11px;color:var(--color-muted);margin-top:2px">
                  ${sets !== '—' ? `${sets} séries × ${reps} reps` : ''}
                </div>
              </div>
            </div>
            <div style="text-align:right">
              <div style="font-family:var(--font-display);font-size:16px;font-weight:800;color:${isCurrentPhase ? 'var(--color-accent)' : 'var(--color-text)'}">
                ${charge}
              </div>
              ${isCurrentPhase ? '<div style="font-size:10px;color:var(--color-accent);font-weight:600">Phase actuelle ▲</div>' : ''}
            </div>
          </div>

          <div class="progression-phases">
            ${[1,2,3,4].map(p => {
              const pd = data.phases[p];
              const isStr = typeof pd === 'string';
              return `
                <div class="phase-cell ${p === this.activePhase ? 'active-phase' : ''}">
                  <div class="phase-cell-num" style="color:${HELPERS.phaseColor(p)}">P${p}</div>
                  <div class="phase-cell-charge">${isStr ? pd : (pd?.charge || '—')}</div>
                  <div class="phase-cell-detail">${isStr ? '' : (pd ? `${pd.sets || '—'}×${pd.reps || '—'}` : '')}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  },
};

/* ═══════════════════════════════════════════════════
   NUTRITION PAGE
═══════════════════════════════════════════════════ */

const NutritionPage = {
  async render(container) {
    const phase = Store.currentPhase;
    const targets = NUTRITION_PHASES[phase];
    const current = Store.getNutritionToday();
    const conseils = CONSEILS_NUTRITION[phase];
    const repas = REPAS_TYPES[phase] || [];

    container.innerHTML = `
      <div class="page-enter">
        <!-- Phase selector -->
        <div style="padding:16px 16px 8px">
          <div class="phase-selector">
            ${[1,2,3,4].map(p => `
              <button class="phase-btn phase${p} ${phase === p ? 'active' : ''}">
                P${p} — ${NUTRITION_PHASES[p].label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Target card -->
        <div style="padding:0 16px 12px">
          <div class="card" style="background:var(--gradient-hero);border:none">
            <div style="color:rgba(255,255,255,0.7);font-size:11px;text-transform:uppercase;font-weight:700;letter-spacing:0.06em;margin-bottom:8px">
              Objectifs Phase ${phase}
            </div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
              ${[
                { label: 'Kcal', val: targets.kcal, unit: '' },
                { label: 'Prot.', val: targets.proteines, unit: 'g' },
                { label: 'Gluc.', val: targets.glucides, unit: 'g' },
                { label: 'Lip.', val: targets.lipides, unit: 'g' },
              ].map(t => `
                <div style="text-align:center;background:rgba(255,255,255,0.1);border-radius:10px;padding:8px">
                  <div style="font-family:var(--font-display);font-size:18px;font-weight:800;color:white">${t.val}</div>
                  <div style="font-size:10px;color:rgba(255,255,255,0.7)">${t.label}${t.unit}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Daily tracker -->
        <div style="padding:0 16px 12px">
          <div class="section-title" style="margin-bottom:12px">Aujourd'hui</div>
          <div class="nutrition-target-card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <div>
                <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--color-text)">
                  ${Math.round(current.kcal || 0)}
                  <span style="font-size:14px;color:var(--color-muted);font-weight:400">kcal</span>
                </div>
                <div style="font-size:12px;color:var(--color-muted)">
                  Reste: ${Math.max(0, targets.kcal - (current.kcal || 0))} kcal
                </div>
              </div>
              ${ProgressRing.render(
                HELPERS.pct(current.kcal, targets.kcal), 72,
                'var(--color-accent)',
                `${HELPERS.pct(current.kcal, targets.kcal)}%`,
                'Kcal'
              )}
            </div>

            <div class="nutrition-macros-grid">
              ${this._macroItem('Protéines', current.proteines || 0, targets.proteines, '#E85D26')}
              ${this._macroItem('Glucides', current.glucides || 0, targets.glucides, '#2D4A7A')}
              ${this._macroItem('Lipides', current.lipides || 0, targets.lipides, '#2E7D32')}
            </div>

            <button class="btn btn-primary btn-full" style="margin-top:16px" onclick="NutritionPage.openAddMeal()">
              + Ajouter un repas
            </button>
          </div>
        </div>

        <!-- Meal examples -->
        <div style="padding:0 16px 12px">
          <div class="section-title" style="margin-bottom:12px">Repas types Phase ${phase}</div>
          ${repas.slice(0, 5).map(r => `
            <div class="meal-card">
              <div class="meal-emoji">${r.emoji}</div>
              <div class="meal-info">
                <div style="font-size:10px;font-weight:700;color:var(--color-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">${r.moment}</div>
                <div class="meal-name">${r.nom}</div>
                <div style="font-size:12px;color:var(--color-muted);margin:4px 0">${r.ingredients}</div>
                <div class="meal-macros">
                  <span class="meal-macro"><strong style="color:var(--color-accent)">${r.kcal}</strong> kcal</span>
                  <span class="meal-macro">P: <strong>${r.proteines}g</strong></span>
                  <span class="meal-macro">G: <strong>${r.glucides}g</strong></span>
                  <span class="meal-macro">L: <strong>${r.lipides}g</strong></span>
                </div>
              </div>
              <button class="btn btn-ghost btn-sm" onclick="NutritionPage.useMeal('${r.id}')">+</button>
            </div>
          `).join('')}
        </div>

        <!-- Conseils -->
        <div style="padding:0 16px 24px">
          <div class="section-title" style="margin-bottom:12px">${conseils?.titre}</div>
          <div class="card">
            ${(conseils?.conseils || []).map(c => `
              <div style="padding:8px 0;border-bottom:1px solid var(--color-border);font-size:13px;color:var(--color-text-2);line-height:1.5">
                ${c}
              </div>
            `).join('')}
            <div style="margin-top:12px">
              <div style="font-size:12px;font-weight:700;color:var(--color-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Sources protéines recommandées</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px">
                ${(conseils?.sources_proteines || []).map(s => `<span class="badge badge-safe">${s}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _macroItem(name, val, target, color) {
    const pct = HELPERS.pct(val, target);
    return `
      <div class="macro-bar-item">
        <div class="macro-bar-name">${name}</div>
        <div class="macro-bar-val" style="color:${color}">${Math.round(val)}<span style="font-size:12px;font-weight:400;color:var(--color-muted)">g</span></div>
        <div class="macro-bar-target">/ ${target}g</div>
        <div style="height:4px;background:var(--color-surface-2);border-radius:999px;overflow:hidden;margin-top:4px">
          <div style="width:${pct}%;height:4px;background:${color};border-radius:999px;transition:width 0.8s"></div>
        </div>
      </div>
    `;
  },

  openAddMeal() {
    UI.showModal(`
      <h3 style="margin-bottom:16px">Ajouter un repas</h3>
      <div class="form-group">
        <label class="form-label">Nom du repas</label>
        <input type="text" class="form-input" id="meal-name" placeholder="Ex: Poulet riz légumes">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group">
          <label class="form-label">Kcal</label>
          <input type="number" class="form-input" id="meal-kcal" placeholder="400">
        </div>
        <div class="form-group">
          <label class="form-label">Protéines (g)</label>
          <input type="number" class="form-input" id="meal-prot" placeholder="35">
        </div>
        <div class="form-group">
          <label class="form-label">Glucides (g)</label>
          <input type="number" class="form-input" id="meal-gluc" placeholder="45">
        </div>
        <div class="form-group">
          <label class="form-label">Lipides (g)</label>
          <input type="number" class="form-input" id="meal-lip" placeholder="12">
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:8px">
        <button class="btn btn-secondary btn-full modal-close" onclick="UI.closeModal()">Annuler</button>
        <button class="btn btn-primary btn-full" onclick="NutritionPage.addMeal()">Ajouter</button>
      </div>
    `);
  },

  async addMeal() {
    const kcal = parseFloat(HELPERS.el('meal-kcal')?.value) || 0;
    const prot = parseFloat(HELPERS.el('meal-prot')?.value) || 0;
    const gluc = parseFloat(HELPERS.el('meal-gluc')?.value) || 0;
    const lip = parseFloat(HELPERS.el('meal-lip')?.value) || 0;
    const name = HELPERS.el('meal-name')?.value || 'Repas';

    const current = Store.getNutritionToday();
    await Store.saveNutrition({
      kcal: (current.kcal || 0) + kcal,
      proteines: (current.proteines || 0) + prot,
      glucides: (current.glucides || 0) + gluc,
      lipides: (current.lipides || 0) + lip,
      repas: [...(current.repas || []), { name, kcal, prot, gluc, lip, time: new Date().toISOString() }],
    });

    UI.closeModal();
    UI.toast(`${name} ajouté ✅`, 'success');
    App.navigate('nutrition');
  },

  async useMeal(mealId) {
    const phase = Store.currentPhase;
    const meal = (REPAS_TYPES[phase] || []).find(r => r.id === mealId);
    if (!meal) return;

    const current = Store.getNutritionToday();
    await Store.saveNutrition({
      kcal: (current.kcal || 0) + meal.kcal,
      proteines: (current.proteines || 0) + meal.proteines,
      glucides: (current.glucides || 0) + meal.glucides,
      lipides: (current.lipides || 0) + meal.lipides,
      repas: [...(current.repas || []), { name: meal.nom, kcal: meal.kcal, time: new Date().toISOString() }],
    });

    UI.toast(`${meal.nom} ajouté ✅`, 'success');
    App.navigate('nutrition');
  },
};

/* ═══════════════════════════════════════════════════
   SUIVI PAGE
═══════════════════════════════════════════════════ */

const SuiviPage = {
  async render(container) {
    const mesures = Store.mesures;
    const week = Store.currentWeek;
    const profil = Store.profil;
    const latest = Store.latestMesure;

    container.innerHTML = `
      <div class="page-enter">
        <!-- Saisie formulaire -->
        <div style="padding:16px">
          <div class="section-title" style="margin-bottom:12px">📝 Saisir les mesures</div>
          <div class="suivi-form">
            <div class="measurement-grid">
              <div class="form-group">
                <label class="form-label">⚖️ Poids (kg)</label>
                <input type="number" class="form-input" id="input-poids" 
                  value="${latest?.poids || ''}" step="0.1" placeholder="${profil?.poidsInitial || 75}">
              </div>
              <div class="form-group">
                <label class="form-label">📏 Taille (cm)</label>
                <input type="number" class="form-input" id="input-taille" 
                  value="${latest?.tailleCm || ''}" step="0.5">
              </div>
              <div class="form-group">
                <label class="form-label">📐 Hanches (cm)</label>
                <input type="number" class="form-input" id="input-hanches" 
                  value="${latest?.hanchesCm || ''}" step="0.5">
              </div>
              <div class="form-group">
                <label class="form-label">📏 Diastasis (cm)</label>
                <input type="number" class="form-input" id="input-diastasis" 
                  value="${latest?.diastasisCm || ''}" step="0.1" 
                  placeholder="${profil?.diastasisInitial || '2.5'}">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="display:flex;justify-content:space-between">
                <span>⚡ Énergie du jour</span>
                <span id="energie-val" style="color:var(--color-accent);font-weight:700">5/10</span>
              </label>
              <input type="range" class="form-range" id="input-energie" 
                min="1" max="10" value="5"
                oninput="HELPERS.el('energie-val').textContent = this.value + '/10'">
            </div>

            <div class="form-group">
              <label class="form-label">💪 Charge clé du jour (ex: Hip thrust 60 kg)</label>
              <input type="text" class="form-input" id="input-charge-key" 
                placeholder="Ex: Hip thrust 60 kg" value="${latest?.chargeKey || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">📝 Note</label>
              <textarea class="form-input form-textarea" id="input-note" 
                placeholder="Ressenti, fatigue, douleurs, progressions..."></textarea>
            </div>

            <div style="font-size:12px;color:var(--color-muted);margin-bottom:12px">
              Semaine ${week} — ${HELPERS.formatDate(HELPERS.today())}
            </div>

            <button class="btn btn-primary btn-full" onclick="SuiviPage.saveMesure()">
              💾 Enregistrer les mesures
            </button>
          </div>
        </div>

        <!-- Graphiques -->
        <div style="padding:0 16px 12px">
          <div class="section-title" style="margin-bottom:12px">📈 Évolution poids</div>
          <div class="chart-wrapper">
            <canvas id="chart-poids" height="160" style="width:100%"></canvas>
          </div>
        </div>

        <div style="padding:0 16px 12px">
          <div class="section-title" style="margin-bottom:12px">📏 Tour de taille & hanches</div>
          <div class="chart-wrapper">
            <canvas id="chart-mensurations" height="160" style="width:100%"></canvas>
          </div>
        </div>

        <div style="padding:0 16px 12px">
          <div class="section-title" style="margin-bottom:12px">🔬 Évolution diastasis</div>
          <div class="chart-wrapper">
            <canvas id="chart-diastasis" height="140" style="width:100%"></canvas>
            <div style="font-size:11px;color:var(--color-success);margin-top:6px">
              ✅ Objectif : &lt; 1,5 cm (ligne verte)
            </div>
          </div>
        </div>

        <!-- Tableau 16 semaines -->
        <div style="padding:0 16px 24px">
          <div class="section-header" style="margin-bottom:12px">
            <span class="section-title">Tableau 16 semaines</span>
            <button class="btn btn-ghost btn-sm" onclick="SuiviPage.exportCSV()">📥 CSV</button>
          </div>
          <div class="card" style="padding:0;overflow:auto">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Sem.</th>
                  <th>Poids</th>
                  <th>Taille</th>
                  <th>Hanches</th>
                  <th>Diastasis</th>
                  <th>⚡</th>
                </tr>
              </thead>
              <tbody id="mesures-table">
                ${this._renderMesuresTable(mesures, profil)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Render charts after DOM
    setTimeout(() => {
      this._renderCharts(mesures, profil);
    }, 100);
  },

  _renderMesuresTable(mesures, profil) {
    const rows = [];
    for (let s = 1; s <= 16; s++) {
      const m = mesures.find(m => m.semaine === s) || null;
      const isDeload = isDeloadWeek(s);
      const isBilan = isBilanWeek(s);
      const isCurrent = s === Store.currentWeek;
      const phase = getPhaseFromWeek(s);

      rows.push(`
        <tr class="${isDeload ? 'deload' : ''} ${isBilan ? 'bilan' : ''} ${isCurrent ? 'current' : ''}">
          <td>
            <div style="font-weight:700;font-size:13px">S${s}</div>
            <div style="font-size:10px;color:${HELPERS.phaseColor(phase)}">P${phase}${isDeload ? ' 🔻' : ''}${isBilan ? ' 👩‍⚕️' : ''}</div>
          </td>
          <td>${m?.poids ? `<strong>${m.poids}</strong> kg` : '—'}</td>
          <td>${m?.tailleCm ? `${m.tailleCm} cm` : '—'}</td>
          <td>${m?.hanchesCm ? `${m.hanchesCm} cm` : '—'}</td>
          <td style="color:${m?.diastasisCm > 2 ? 'var(--color-warning)' : m?.diastasisCm > 0 ? 'var(--color-success)' : 'var(--color-muted)'}">
            ${m?.diastasisCm ? `${m.diastasisCm} cm` : '—'}
          </td>
          <td>${m?.energie ? `${m.energie}/10` : '—'}</td>
        </tr>
      `);
    }
    return rows.join('');
  },

  _renderCharts(mesures, profil) {
    // Poids chart
    const poidsData = Array.from({ length: 16 }, (_, i) => {
      const m = mesures.find(m => m.semaine === i + 1);
      return { label: `S${i + 1}`, value: m?.poids || null };
    });
    Charts.drawLine('chart-poids', poidsData, {
      min: 55, max: 80,
      unit: ' kg',
      color: '#E85D26',
      target: profil?.poidsObjectif || 60,
    });

    // Mensurations chart
    const mensuData = Array.from({ length: 16 }, (_, i) => {
      const m = mesures.find(m => m.semaine === i + 1);
      return { label: `S${i + 1}`, value: m?.tailleCm || null };
    });
    Charts.drawLine('chart-mensurations', mensuData, { unit: ' cm', color: '#2D4A7A' });

    // Diastasis chart
    const diData = Array.from({ length: 16 }, (_, i) => {
      const m = mesures.find(m => m.semaine === i + 1);
      return { label: `S${i + 1}`, value: m?.diastasisCm || null };
    });
    Charts.drawLine('chart-diastasis', diData, {
      min: 0, max: 4,
      unit: ' cm',
      color: '#B71C1C',
      target: 1.5,
    });
  },

  async saveMesure() {
    const poids = parseFloat(HELPERS.el('input-poids')?.value);
    const tailleCm = parseFloat(HELPERS.el('input-taille')?.value);
    const hanchesCm = parseFloat(HELPERS.el('input-hanches')?.value);
    const diastasisCm = parseFloat(HELPERS.el('input-diastasis')?.value);
    const energie = parseInt(HELPERS.el('input-energie')?.value);
    const chargeKey = HELPERS.el('input-charge-key')?.value;
    const note = HELPERS.el('input-note')?.value;

    if (!poids && !tailleCm) {
      UI.toast('Renseigner au moins le poids ou le tour de taille', 'warning');
      return;
    }

    await Store.saveMesure({ poids, tailleCm, hanchesCm, diastasisCm, energie, chargeKey, note });

    HELPERS.vibrateSuccess();
    UI.toast('Mesures enregistrées ✅', 'success');
    App.navigate('suivi');
  },

  exportCSV() {
    const mesures = Store.mesures;
    const headers = ['Semaine', 'Date', 'Phase', 'Poids (kg)', 'Taille (cm)', 'Hanches (cm)', 'Diastasis (cm)', 'Énergie', 'Charge clé', 'Note'];
    const rows = mesures.map(m => [
      m.semaine, m.date, getPhaseFromWeek(m.semaine),
      m.poids, m.tailleCm, m.hanchesCm, m.diastasisCm,
      m.energie, m.chargeKey, (m.note || '').replace(/,/g, ';')
    ]);

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suivi-diastasis-${HELPERS.today()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    UI.toast('Export CSV téléchargé 📥', 'success');
  },
};

/* ═══════════════════════════════════════════════════
   PROFIL PAGE
═══════════════════════════════════════════════════ */

const ProfilPage = {
  async render(container) {
    const profil = Store.profil || {};

    container.innerHTML = `
      <div class="page-enter">
        <!-- Avatar & Info -->
        <div style="padding:24px 16px 16px;text-align:center">
          <div class="profil-avatar">${profil.prenom ? profil.prenom[0].toUpperCase() : '💪'}</div>
          <h2 style="font-size:20px;margin-bottom:4px">${profil.prenom || 'Coach'}</h2>
          <p style="font-size:13px;color:var(--color-muted)">Semaine ${Store.currentWeek} / 16 — Phase ${Store.currentPhase}</p>
        </div>

        <!-- Progression résumé -->
        <div style="padding:0 16px 16px">
          <div class="card" style="background:var(--gradient-hero);border:none;color:white">
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center">
              <div>
                <div style="font-family:var(--font-display);font-size:22px;font-weight:800">${profil.poidsInitial || 75}</div>
                <div style="font-size:11px;opacity:0.75">Poids initial</div>
              </div>
              <div>
                <div style="font-size:28px">→</div>
              </div>
              <div>
                <div style="font-family:var(--font-display);font-size:22px;font-weight:800;color:var(--color-accent)">${profil.poidsObjectif || 60}</div>
                <div style="font-size:11px;opacity:0.75">Objectif kg</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Informations -->
        <div style="padding:0 16px 12px">
          <div class="section-title" style="margin-bottom:8px">Informations cliente</div>
          <div class="section-card">
            <div class="section-card-body" style="padding:0">
              <div class="setting-row">
                <div class="setting-info">
                  <div class="setting-label">Prénom</div>
                </div>
                <input type="text" value="${profil.prenom || ''}" 
                  class="form-input" style="width:140px;text-align:right;padding:8px"
                  onchange="ProfilPage.update('prenom', this.value)"
                  placeholder="Prénom">
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <div class="setting-label">Poids initial</div>
                </div>
                <input type="number" value="${profil.poidsInitial || 75}" 
                  class="form-input" style="width:80px;text-align:right;padding:8px"
                  onchange="ProfilPage.update('poidsInitial', parseFloat(this.value))"> kg
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <div class="setting-label">Poids objectif</div>
                </div>
                <input type="number" value="${profil.poidsObjectif || 60}"
                  class="form-input" style="width:80px;text-align:right;padding:8px"
                  onchange="ProfilPage.update('poidsObjectif', parseFloat(this.value))"> kg
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <div class="setting-label">Date de début</div>
                </div>
                <input type="date" value="${profil.dateDebut || HELPERS.today()}"
                  class="form-input" style="width:160px;padding:8px"
                  onchange="ProfilPage.update('dateDebut', this.value)">
              </div>
            </div>
          </div>
        </div>

        <!-- Diastasis -->
        <div style="padding:0 16px 12px">
          <div class="section-title" style="margin-bottom:8px">Paramètres diastasis</div>
          <div class="section-card">
            <div class="section-card-body" style="padding:0">
              <div class="setting-row">
                <div class="setting-info">
                  <div class="setting-label">Largeur initiale</div>
                  <div class="setting-desc">Mesure en cm à la 1ère consultation</div>
                </div>
                <div style="display:flex;align-items:center;gap:6px">
                  <input type="number" value="${profil.diastasisInitial || 2.5}" step="0.1"
                    class="form-input" style="width:70px;padding:8px;text-align:right"
                    onchange="ProfilPage.update('diastasisInitial', parseFloat(this.value))"> cm
                </div>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <div class="setting-label">Suivi kiné</div>
                </div>
                <label class="toggle">
                  <input type="checkbox" ${profil.suiviKine ? 'checked' : ''}
                    onchange="ProfilPage.update('suiviKine', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <div class="setting-label">Validation planche complète</div>
                  <div class="setting-desc">Accordée par le kiné</div>
                </div>
                <label class="toggle">
                  <input type="checkbox" ${profil.kineValidated ? 'checked' : ''}
                    onchange="ProfilPage.update('kineValidated', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Préférences -->
        <div style="padding:0 16px 12px">
          <div class="section-title" style="margin-bottom:8px">Préférences</div>
          <div class="section-card">
            <div class="section-card-body" style="padding:0">
              <div class="setting-row">
                <div class="setting-info">
                  <div class="setting-label">Thème</div>
                </div>
                <select class="form-input" style="width:120px;padding:8px" onchange="Store.setTheme(this.value)">
                  <option value="light" ${Store.theme === 'light' ? 'selected' : ''}>☀️ Clair</option>
                  <option value="dark" ${Store.theme === 'dark' ? 'selected' : ''}>🌙 Sombre</option>
                </select>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <div class="setting-label">Sons timer de repos</div>
                </div>
                <label class="toggle">
                  <input type="checkbox" checked onchange="ProfilPage.update('soundEnabled', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <div class="setting-label">Vibrations</div>
                </div>
                <label class="toggle">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Vidéos éducatives -->
        <div style="padding:0 16px 12px">
          <div class="section-title" style="margin-bottom:12px">🎓 Vidéos éducatives</div>
          <div class="card" style="padding:0;overflow:hidden">
            ${VIDEOS_EDUCATIVES.slice(0, 5).map(v => `
              <div class="list-item" onclick="UI.openVideo('${HELPERS.ytEmbed(v.videoId)}', '${v.titre.replace(/'/g, "\\'")}')">
                <span style="font-size:20px">${v.emoji}</span>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600;color:var(--color-text)">${v.titre}</div>
                  <div style="font-size:11px;color:var(--color-muted)">${v.duree} • ${v.categorie}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Données -->
        <div style="padding:0 16px 32px">
          <div class="section-title" style="margin-bottom:8px">Données</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn btn-secondary btn-full" onclick="Store.exportData()">
              📤 Exporter toutes les données (JSON)
            </button>
            <button class="btn btn-secondary btn-full" style="color:var(--color-danger);border-color:var(--color-danger)" 
              onclick="ProfilPage.confirmReset()">
              🗑️ Réinitialiser le programme
            </button>
          </div>
          <p style="font-size:11px;color:var(--color-muted);text-align:center;margin-top:12px">
            Coach Diastasis v1.0 — Programme 16 semaines Basic Fit
          </p>
        </div>
      </div>
    `;
  },

  async update(key, value) {
    await Store.saveProfil({ [key]: value });
    UI.toast('Profil mis à jour ✅', 'success');
  },

  async confirmReset() {
    const confirmed = await UI.confirm(
      '⚠️ Réinitialiser ?',
      'Toutes les données seront supprimées (séances, mesures, nutrition). Cette action est irréversible.',
      '🗑️ Oui, supprimer',
      'Annuler'
    );

    if (!confirmed) return;

    await Promise.all(['seances', 'sets', 'mesures', 'nutrition', 'photos'].map(s => DB.clear(s)));
    Store.state.mesures = [];
    Store.state.seancesLog = [];
    UI.toast('Programme réinitialisé', 'default');
    App.navigate('profil');
  },
};
