/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — PROGRESS RING COMPONENT
═══════════════════════════════════════════════════ */

const ProgressRing = {
  render(percent, size = 80, color = 'var(--color-accent)', label = '', sublabel = '', strokeWidth = 6) {
    const { r, c, offset, cx, cy } = HELPERS.ringPath(percent, size, strokeWidth);
    return `
      <div class="progress-ring-wrap" style="width:${size}px;height:${size}px">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--color-surface-2)" stroke-width="${strokeWidth}"/>
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"
            stroke-dasharray="${c}" stroke-dashoffset="${offset}"
            stroke-linecap="round"
            style="transition: stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)"/>
        </svg>
        <div class="progress-ring-label">
          <div style="font-size:${size > 70 ? 16 : 13}px;font-weight:800;color:var(--color-text);font-family:var(--font-display)">${label}</div>
          ${sublabel ? `<div style="font-size:9px;color:var(--color-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.05em">${sublabel}</div>` : ''}
        </div>
      </div>
    `;
  },
};

/* ═══════════════════════════════════════════════════
   SET LOGGER COMPONENT
═══════════════════════════════════════════════════ */

const SetLogger = {
  // Render set logger for an exercise
  render(exercice, seanceState, onSetComplete) {
    const sets = exercice.sets || 3;
    const defaultWeight = exercice[`chargePhase${Store.currentPhase}`] || '';
    const defaultReps = typeof exercice.reps === 'number' ? exercice.reps : '';

    // Parse default weight (take first number)
    let numericWeight = 0;
    if (typeof defaultWeight === 'string') {
      const match = defaultWeight.match(/(\d+)/);
      if (match) numericWeight = parseInt(match[1]);
    }

    let html = `<div class="set-logger" id="logger-${exercice.id}">`;

    // Sets header
    html += `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <span style="font-size:12px;font-weight:700;color:var(--color-muted);text-transform:uppercase;letter-spacing:0.06em">
          ${sets} séries
        </span>
        <span style="font-size:11px;color:var(--color-muted)">Repos: ${exercice.repos}s</span>
      </div>
    `;

    // Header row
    html += `
      <div style="display:grid;grid-template-columns:28px 1fr 80px 40px;gap:6px;margin-bottom:6px">
        <div style="font-size:10px;color:var(--color-muted);font-weight:600">#</div>
        <div style="font-size:10px;color:var(--color-muted);font-weight:600">CHARGE</div>
        <div style="font-size:10px;color:var(--color-muted);font-weight:600;text-align:center">REPS</div>
        <div></div>
      </div>
    `;

    for (let i = 1; i <= sets; i++) {
      const setKey = `${exercice.id}_set${i}`;
      const completed = seanceState?.[setKey]?.completed || false;
      const savedWeight = seanceState?.[setKey]?.weight || numericWeight;
      const savedReps = seanceState?.[setKey]?.reps || defaultReps;

      html += `
        <div class="set-row ${completed ? 'completed' : ''}" id="set-row-${setKey}">
          <div class="set-num" id="set-num-${setKey}">${completed ? HELPERS.svgCheckmark() : i}</div>
          
          <div class="weight-control">
            <button class="weight-btn" onclick="SetLogger.adjustWeight('${setKey}', -2.5)" aria-label="Diminuer">−</button>
            <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
              <input type="number" class="weight-input" id="weight-${setKey}" 
                value="${savedWeight}" min="0" step="2.5"
                oninput="SetLogger.onWeightChange('${setKey}', this.value)">
              <span class="weight-label">kg</span>
            </div>
            <button class="weight-btn" onclick="SetLogger.adjustWeight('${setKey}', 2.5)" aria-label="Augmenter">+</button>
          </div>

          <div style="display:flex;flex-direction:column;align-items:center;gap:2px;margin-left:4px">
            <input type="number" class="reps-input" id="reps-${setKey}" 
              value="${savedReps}" min="0" step="1">
            <span class="reps-label">reps</span>
          </div>

          <button class="set-complete-btn ${completed ? 'done' : ''}" 
            id="done-${setKey}"
            onclick="SetLogger.completeSet('${exercice.id}', ${i}, '${setKey}')"
            aria-label="Valider le set">
            ${completed ? HELPERS.svgCheckmark() : 
              `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
            }
          </button>
        </div>
      `;
    }

    html += '</div>';
    return html;
  },

  adjustWeight(setKey, delta) {
    const input = HELPERS.el(`weight-${setKey}`);
    if (!input) return;
    const current = parseFloat(input.value) || 0;
    input.value = Math.max(0, HELPERS.round1(current + delta));
    HELPERS.vibrate([10]);
  },

  onWeightChange(setKey, value) {
    // Save to session state
  },

  completeSet(exerciceId, setNum, setKey) {
    const weightInput = HELPERS.el(`weight-${setKey}`);
    const repsInput = HELPERS.el(`reps-${setKey}`);
    const row = HELPERS.el(`set-row-${setKey}`);
    const btn = HELPERS.el(`done-${setKey}`);
    const numEl = HELPERS.el(`set-num-${setKey}`);

    if (!weightInput || !repsInput) return;

    const weight = parseFloat(weightInput.value) || 0;
    const reps = parseInt(repsInput.value) || 0;

    // Toggle completed state
    const isCompleted = row.classList.contains('completed');

    if (!isCompleted) {
      row.classList.add('completed');
      btn.classList.add('done');
      btn.innerHTML = HELPERS.svgCheckmark();
      numEl.innerHTML = HELPERS.svgCheckmark();
      numEl.style.background = 'var(--color-success)';

      // Log in store
      Store.logSet(exerciceId, setNum, weight, reps);
      Store.saveSet({ exerciceId, setNum, chargeKg: weight, repsRealises: reps });

      HELPERS.vibrateSuccess();

      // Start rest timer if not last set
      const logger = HELPERS.el(`logger-${exerciceId}`);
      if (logger) {
        const allRows = logger.querySelectorAll('.set-row');
        const completedRows = logger.querySelectorAll('.set-row.completed');
        if (completedRows.length < allRows.length) {
          // Show rest timer
          const exercice = this._findExercice(exerciceId);
          if (exercice) {
            RestTimer.show(exercice.repos || 60, exerciceId);
          }
        } else {
          UI.toast('Tous les sets complétés ! 💪', 'success');
          HELPERS.vibrateComplete();
        }
      }
    } else {
      row.classList.remove('completed');
      btn.classList.remove('done');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
      numEl.textContent = setNum;
      numEl.style.background = '';
    }
  },

  _findExercice(exerciceId) {
    // Search across all phases/days
    for (const phaseKey of ['phase1','phase2','phase3','phase4']) {
      const phase = PROGRAMME[phaseKey];
      for (const jour of Object.keys(phase.seances)) {
        const seance = phase.seances[jour];
        const ex = seance.exercices?.find(e => e.id === exerciceId);
        if (ex) return ex;
      }
    }
    return null;
  },
};

/* ═══════════════════════════════════════════════════
   REST TIMER COMPONENT
═══════════════════════════════════════════════════ */

const RestTimer = {
  _interval: null,
  _remaining: 0,

  show(seconds, exerciceId) {
    this._remaining = seconds;
    clearInterval(this._interval);

    const overlay = document.createElement('div');
    overlay.className = 'rest-timer-overlay';
    overlay.id = 'rest-timer-overlay';

    // Find next exercise
    const nextEx = this._getNextExercise(exerciceId);

    overlay.innerHTML = `
      <div class="rest-timer-card">
        <div class="rest-timer-title">⏱️ TEMPS DE REPOS</div>
        <div class="rest-timer-circle" style="width:140px;height:140px">
          <svg width="140" height="140" viewBox="0 0 140 140" style="transform:rotate(-90deg)" id="rest-ring-svg">
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--color-surface-2)" stroke-width="8"/>
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--color-accent)" stroke-width="8"
              stroke-dasharray="${2 * Math.PI * 60}"
              stroke-dashoffset="0"
              stroke-linecap="round"
              id="rest-ring-circle"
              style="transition: stroke-dashoffset 1s linear"/>
          </svg>
          <div class="rest-timer-count" id="rest-timer-count">${HELPERS.formatSeconds(seconds)}</div>
        </div>
        ${nextEx ? `
          <div class="next-exercise-hint">
            <div style="color:var(--color-muted);margin-bottom:4px;font-size:11px;text-transform:uppercase;font-weight:600">Exercice suivant</div>
            <strong>${nextEx.emoji || '🏋️'} ${nextEx.nom}</strong>
            <div style="font-size:11px;color:var(--color-muted);margin-top:2px">${nextEx.sets}×${nextEx.reps}</div>
          </div>
        ` : '<div style="height:8px"></div>'}
        <div style="display:flex;gap:12px">
          <button class="btn btn-secondary" style="flex:1" onclick="RestTimer.skip()">
            Passer
          </button>
          <button class="btn btn-primary" style="flex:1" id="rest-add-btn" onclick="RestTimer.addTime(30)">
            +30s
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this._startCountdown(seconds);
  },

  _startCountdown(total) {
    let remaining = this._remaining;
    const countEl = HELPERS.el('rest-timer-count');
    const circle = HELPERS.el('rest-ring-circle');
    const circumference = 2 * Math.PI * 60;

    this._interval = setInterval(() => {
      remaining--;
      this._remaining = remaining;

      if (countEl) countEl.textContent = HELPERS.formatSeconds(remaining);
      if (circle) {
        const offset = circumference * (1 - remaining / total);
        circle.style.strokeDashoffset = offset;
      }

      if (remaining <= 3) HELPERS.vibrate([20]);
      if (remaining <= 0) this.complete();
    }, 1000);
  },

  addTime(seconds) {
    this._remaining += seconds;
    const countEl = HELPERS.el('rest-timer-count');
    if (countEl) countEl.textContent = HELPERS.formatSeconds(this._remaining);
  },

  skip() {
    this.complete();
    HELPERS.vibrate([30]);
  },

  complete() {
    clearInterval(this._interval);
    HELPERS.vibrate([50, 30, 80]);
    HELPERS.el('rest-timer-overlay')?.remove();
  },

  _getNextExercise(currentExerciceId) {
    const jour = Store.todayDay;
    const week = Store.currentWeek;
    const seance = getSeanceForDay(jour, week);
    if (!seance || !seance.exercices) return null;

    const idx = seance.exercices.findIndex(e => e.id === currentExerciceId);
    if (idx === -1 || idx >= seance.exercices.length - 1) return null;
    return seance.exercices[idx + 1];
  },
};

/* ═══════════════════════════════════════════════════
   CHARTS COMPONENT (Canvas-based)
═══════════════════════════════════════════════════ */

const Charts = {
  // Line chart
  drawLine(canvasId, data, options = {}) {
    const canvas = HELPERS.el(canvasId);
    if (!canvas || !data || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth || canvas.width;
    const H = canvas.offsetHeight || canvas.height;
    canvas.width = W;
    canvas.height = H;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#8896AC' : '#9CA3AF';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

    const PAD = { top: 20, right: 16, bottom: 40, left: 44 };
    const chartW = W - PAD.left - PAD.right;
    const chartH = H - PAD.top - PAD.bottom;

    ctx.clearRect(0, 0, W, H);

    const values = data.map(d => d.value).filter(v => v != null);
    if (values.length === 0) return;

    const minVal = options.min ?? Math.min(...values) * 0.95;
    const maxVal = options.max ?? Math.max(...values) * 1.05;
    const range = maxVal - minVal || 1;

    const toX = i => PAD.left + (i / (data.length - 1 || 1)) * chartW;
    const toY = v => PAD.top + chartH - ((v - minVal) / range) * chartH;

    // Grid lines
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = PAD.top + (i / gridLines) * chartH;
      const val = maxVal - (i / gridLines) * range;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(PAD.left + chartW, y);
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = '10px DM Sans, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(HELPERS.round1(val) + (options.unit || ''), PAD.left - 6, y + 4);
    }

    // X labels
    const step = Math.ceil(data.length / 8);
    data.forEach((d, i) => {
      if (i % step === 0 || i === data.length - 1) {
        ctx.fillStyle = textColor;
        ctx.font = '9px DM Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.label || `S${i + 1}`, toX(i), H - 8);
      }
    });

    // Objective line
    if (options.target != null) {
      const y = toY(options.target);
      ctx.strokeStyle = 'rgba(46, 125, 50, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(PAD.left + chartW, y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(46, 125, 50, 0.8)';
      ctx.font = '9px DM Sans, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Objectif ${options.target}${options.unit || ''}`, PAD.left + 4, y - 4);
    }

    // Area fill
    const color = options.color || '#E85D26';
    const validData = data.filter(d => d.value != null);
    if (validData.length > 1) {
      const gradArea = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + chartH);
      gradArea.addColorStop(0, color + '30');
      gradArea.addColorStop(1, color + '00');

      ctx.beginPath();
      ctx.moveTo(toX(data.indexOf(validData[0])), chartH + PAD.top);
      validData.forEach(d => {
        const i = data.indexOf(d);
        ctx.lineTo(toX(i), toY(d.value));
      });
      ctx.lineTo(toX(data.indexOf(validData[validData.length - 1])), chartH + PAD.top);
      ctx.fillStyle = gradArea;
      ctx.fill();
    }

    // Line
    if (validData.length > 0) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();

      validData.forEach((d, idx) => {
        const i = data.indexOf(d);
        if (idx === 0) ctx.moveTo(toX(i), toY(d.value));
        else ctx.lineTo(toX(i), toY(d.value));
      });
      ctx.stroke();

      // Dots
      validData.forEach(d => {
        const i = data.indexOf(d);
        ctx.beginPath();
        ctx.arc(toX(i), toY(d.value), 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'var(--color-card, #fff)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }
  },

  // Bar chart
  drawBars(canvasId, data, options = {}) {
    const canvas = HELPERS.el(canvasId);
    if (!canvas || !data || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth || canvas.width;
    const H = canvas.offsetHeight || canvas.height;
    canvas.width = W;
    canvas.height = H;

    const PAD = { top: 16, right: 16, bottom: 32, left: 8 };
    const maxVal = Math.max(...data.map(d => d.value), 1);
    const barW = (W - PAD.left - PAD.right) / data.length * 0.65;
    const gap = (W - PAD.left - PAD.right) / data.length;

    ctx.clearRect(0, 0, W, H);

    data.forEach((d, i) => {
      const x = PAD.left + i * gap + gap * 0.175;
      const barH = ((d.value || 0) / maxVal) * (H - PAD.top - PAD.bottom);
      const y = H - PAD.bottom - barH;

      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      const color = d.color || options.color || '#E85D26';
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '80');

      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
      ctx.fillStyle = grad;
      ctx.fill();

      // Label
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#8896AC' : '#9CA3AF';
      ctx.font = '9px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.label || '', x + barW / 2, H - 6);
    });
  },
};
