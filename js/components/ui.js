/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — UI COMPONENTS
═══════════════════════════════════════════════════ */

const UI = {
  // Toast notifications
  toast(message, type = 'default', duration = 3000) {
    const container = HELPERS.el('toast-container');
    if (!container) return;

    const toast = HELPERS.ce('div', `toast ${type}`);
    const icons = { success: '✅', error: '❌', warning: '⚠️', default: 'ℹ️' };
    toast.innerHTML = `<span>${icons[type] || icons.default}</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'none';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Modal
  showModal(content, onClose) {
    const overlay = HELPERS.el('modal-overlay');
    const container = HELPERS.el('modal-container');
    if (!overlay || !container) return;

    container.innerHTML = `
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        ${content}
      </div>
    `;

    overlay.classList.remove('hidden');
    container.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const close = () => {
      overlay.classList.add('hidden');
      container.classList.add('hidden');
      document.body.style.overflow = '';
      if (onClose) onClose();
    };

    overlay.onclick = close;
    container.querySelector('.modal-close')?.addEventListener('click', close);

    return close;
  },

  closeModal() {
    HELPERS.el('modal-overlay')?.classList.add('hidden');
    HELPERS.el('modal-container')?.classList.add('hidden');
    document.body.style.overflow = '';
  },

  // Confirm dialog
  async confirm(title, message, confirmText = 'Confirmer', cancelText = 'Annuler') {
    return new Promise(resolve => {
      const content = `
        <h3 style="margin-bottom:12px;font-size:18px">${title}</h3>
        <p style="color:var(--color-muted);margin-bottom:24px;font-size:14px">${message}</p>
        <div style="display:flex;gap:12px">
          <button class="btn btn-secondary btn-full modal-close" onclick="UI.closeModal()">
            ${cancelText}
          </button>
          <button class="btn btn-primary btn-full" id="confirm-btn">
            ${confirmText}
          </button>
        </div>
      `;
      this.showModal(content);
      HELPERS.el('confirm-btn').onclick = () => { this.closeModal(); resolve(true); };
    });
  },

  // Phase badge
  phaseBadge(phase, label = null) {
    const labels = { 1: 'Phase 1 — Fondations', 2: 'Phase 2 — Activation', 3: 'Phase 3 — Intensification', 4: 'Phase 4 — Affinage' };
    return `<span class="badge badge-phase${phase}">${label || labels[phase] || `Phase ${phase}`}</span>`;
  },

  // Kcal badge
  kcalBadge(value) {
    if (!value) return '';
    return `<span class="badge badge-kcal">🔥 ${value} kcal</span>`;
  },

  // Diastasis safety badge
  diastasisBadge(safe, level = 'ok') {
    if (level === 'danger') return `<span class="badge badge-danger">🚫 INTERDIT</span>`;
    if (level === 'warning') return `<span class="badge badge-warning">⚠️ Attention</span>`;
    if (safe) return `<span class="badge badge-safe">✅ Safe</span>`;
    return '';
  },

  // Duration badge
  durationBadge(min) {
    if (!min) return '';
    return `<span class="badge badge-muted">⏱️ ${min} min</span>`;
  },

  // Progress bar
  progressBar(percent, color = 'var(--color-accent)', height = 8) {
    return `
      <div class="progress-bar-wrap" style="height:${height}px">
        <div class="progress-bar-fill" style="width:${percent}%;height:${height}px;background:${color}"></div>
      </div>
    `;
  },

  // Stat card
  statCard(icon, value, label, sub = '', bgColor = 'var(--color-accent-pale)', iconBg = 'var(--color-accent)') {
    return `
      <div class="stat-card">
        <div class="stat-card-icon" style="background:${bgColor}">
          <span style="font-size:18px">${icon}</span>
        </div>
        <div class="stat-card-value">${value}</div>
        <div class="stat-card-label">${label}</div>
        ${sub ? `<div class="stat-card-sub">${sub}</div>` : ''}
      </div>
    `;
  },

  // Diastasis alert block
  diastasisAlert(level, title, message) {
    const icons = { ok: '✅', warning: '⚠️', danger: '🚫' };
    return `
      <div class="diastasis-alert ${level}">
        <div class="diastasis-alert-icon">${icons[level] || '⚠️'}</div>
        <div class="diastasis-alert-content">
          <h4>${title}</h4>
          <p>${message}</p>
        </div>
      </div>
    `;
  },

  // Video thumbnail
  videoThumb(videoId, title, duration = '') {
    if (!videoId) return '';
    const thumb = HELPERS.ytThumb(videoId);
    const embed = HELPERS.ytEmbed(videoId);
    return `
      <div class="video-thumb" onclick="UI.openVideo('${embed}', '${title.replace(/'/g, "\\'")}')">
        <img src="${thumb}" alt="${title}" loading="lazy" onerror="this.style.display='none'">
        <div class="video-play-btn">
          <div class="video-play-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
        ${duration ? `<div style="position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.7);color:white;font-size:11px;padding:2px 6px;border-radius:4px">${duration}</div>` : ''}
      </div>
    `;
  },

  // Open video in modal
  openVideo(embedUrl, title) {
    const content = `
      <h3 style="margin-bottom:16px;font-size:16px">${title}</h3>
      <div class="video-container">
        <iframe src="${embedUrl}" allowfullscreen allow="autoplay; encrypted-media"></iframe>
      </div>
      <button class="btn btn-secondary btn-full modal-close" style="margin-top:16px" onclick="UI.closeModal()">Fermer</button>
    `;
    this.showModal(content);
  },

  // Skeleton loader
  skeleton(height = 60, radius = 12) {
    return `<div class="skeleton" style="height:${height}px;border-radius:${radius}px;margin-bottom:8px"></div>`;
  },

  // Empty state
  emptyState(icon, title, message, action = '') {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">${icon}</div>
        <h3>${title}</h3>
        <p>${message}</p>
        ${action}
      </div>
    `;
  },

  // Forbidden exercise card
  forbiddenCard(exercice) {
    const alt = EXERCICES_INTERDITS.find(e => e.nom === exercice.nom) || {};
    return `
      <div class="exercise-card forbidden">
        <div class="exercise-card-header">
          <div class="exercise-icon" style="background:var(--color-danger-pale)">🚫</div>
          <div class="exercise-info">
            <div class="exercise-name" style="color:var(--color-danger)">${exercice.nom}</div>
            <div class="exercise-meta">
              <span class="badge badge-danger">INTERDIT DIASTASIS</span>
            </div>
          </div>
        </div>
        <div class="exercise-forbidden-body">
          <p style="font-size:13px;color:var(--color-danger);margin-bottom:8px">
            <strong>Pourquoi ?</strong> ${alt.raison || 'Pression excessive sur la ligne blanche'}
          </p>
          ${alt.alternative ? `
            <div style="background:var(--color-success-pale);border-radius:var(--radius-sm);padding:10px;border-left:3px solid var(--color-success)">
              <p style="font-size:12px;color:var(--color-success);font-weight:600">✅ Alternative : ${alt.alternative}</p>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },
};
