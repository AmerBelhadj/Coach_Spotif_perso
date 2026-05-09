/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — HELPERS
═══════════════════════════════════════════════════ */

const HELPERS = {
  // Date utilities
  today() { return new Date().toISOString().split('T')[0]; },

  todayJS() { return new Date(); },

  formatDate(dateStr, opts = {}) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d)) return '—';
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', ...opts });
  },

  formatDateShort(dateStr) {
    return this.formatDate(dateStr, { day: 'numeric', month: 'short' });
  },

  dayName(date = new Date()) {
    const days = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'];
    return days[date.getDay()];
  },

  frDayName(day) {
    const map = { LUNDI: 'Lundi', MARDI: 'Mardi', MERCREDI: 'Mercredi', JEUDI: 'Jeudi', VENDREDI: 'Vendredi', SAMEDI: 'Samedi', DIMANCHE: 'Dimanche' };
    return map[day] || day;
  },

  frDayShort(day) {
    const map = { LUNDI: 'Lun', MARDI: 'Mar', MERCREDI: 'Mer', JEUDI: 'Jeu', VENDREDI: 'Ven', SAMEDI: 'Sam', DIMANCHE: 'Dim' };
    return map[day] || day.slice(0, 3);
  },

  // Week calculation from start date
  getCurrentWeek(startDate) {
    if (!startDate) return 1;
    const start = new Date(startDate);
    const now = new Date();
    const diff = now - start;
    const weeks = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
    return Math.min(Math.max(weeks, 1), 16);
  },

  // Numbers
  round1(n) { return Math.round(n * 10) / 10; },

  formatKcal(n) { return n ? `${Math.round(n)} kcal` : '—'; },

  formatKg(n) { return n ? `${this.round1(n)} kg` : '—'; },

  formatCm(n) { return n ? `${this.round1(n)} cm` : '—'; },

  // Percentage
  pct(val, total) {
    if (!total) return 0;
    return Math.min(100, Math.max(0, Math.round((val / total) * 100)));
  },

  // SVG Progress Ring
  ringPath(percent, size = 80, stroke = 6) {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const offset = c - (percent / 100) * c;
    return { r, c, offset, cx: size / 2, cy: size / 2 };
  },

  // String
  initials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  },

  // Time formatting
  formatSeconds(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  },

  formatMinutes(min) {
    if (!min) return '—';
    return `${min} min`;
  },

  // Color utilities
  phaseColor(phase) {
    const colors = { 1: '#1A2B4A', 2: '#E85D26', 3: '#2E7D32', 4: '#6A1B9A' };
    return colors[phase] || '#1A2B4A';
  },

  phaseBg(phase) {
    const colors = { 1: '#E8EDF5', 2: '#FEF0E8', 3: '#E8F5E9', 4: '#F3E5F5' };
    return colors[phase] || '#E8EDF5';
  },

  phaseLabel(phase) {
    const labels = { 1: 'Phase 1', 2: 'Phase 2', 3: 'Phase 3', 4: 'Phase 4' };
    return labels[phase] || 'Phase 1';
  },

  // Deload charge adjustment
  adjustCharge(chargeStr, week) {
    if (!isDeloadWeek(week)) return chargeStr;
    if (!chargeStr || chargeStr === '—') return chargeStr;
    // Parse and reduce by 20%
    return chargeStr.replace(/(\d+)/g, n => Math.round(parseInt(n) * 0.8));
  },

  // DOM helpers
  el(id) { return document.getElementById(id); },
  qs(sel) { return document.querySelector(sel); },
  qsa(sel) { return [...document.querySelectorAll(sel)]; },

  // Create element
  ce(tag, cls = '', html = '') {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html) el.innerHTML = html;
    return el;
  },

  // SVG
  svgCheckmark() {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`;
  },

  svgChevron(down = true) {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="${down ? '6 9 12 15 18 9' : '18 15 12 9 6 15'}"/>
    </svg>`;
  },

  // Haptic feedback
  vibrate(pattern = [30]) {
    if ('vibrate' in navigator) navigator.vibrate(pattern);
  },

  vibrateSuccess() { this.vibrate([20, 50, 20]); },
  vibrateComplete() { this.vibrate([50, 30, 80]); },

  // Local storage helpers
  lsGet(key, def = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
  },

  lsSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.warn('LS write failed:', e); }
  },

  // Deep clone
  clone(obj) { return JSON.parse(JSON.stringify(obj)); },

  // Debounce
  debounce(fn, ms = 300) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  },

  // YouTube thumb
  ytThumb(videoId, quality = 'hqdefault') {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  },

  // YouTube embed
  ytEmbed(videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  },
};
