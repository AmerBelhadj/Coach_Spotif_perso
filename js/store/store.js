/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — STATE STORE
═══════════════════════════════════════════════════ */

const Store = {
  state: {
    profil: null,
    currentWeek: 1,
    currentPhase: 1,
    todayDay: 'LUNDI',
    theme: 'light',
    mesures: [],
    seancesLog: [],
    nutritionLog: {},
    activeSeance: null,
    seanceTimer: 0,
    seanceStartTime: null,
    notifications: true,
  },

  listeners: {},

  // Subscribe to state changes
  on(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  },

  emit(event, data) {
    (this.listeners[event] || []).forEach(fn => fn(data));
  },

  // Initialize store
  async init() {
    // Load profil
    try {
      const profil = await DB.getProfil();
      if (profil) {
        this.state.profil = profil;
        this.state.currentWeek = HELPERS.getCurrentWeek(profil.dateDebut);
        this.state.currentPhase = getPhaseFromWeek(this.state.currentWeek);
      }
    } catch (e) { console.warn('No profil yet'); }

    // Theme
    const savedTheme = HELPERS.lsGet('theme', 'light');
    this.setTheme(savedTheme);

    // Today
    this.state.todayDay = HELPERS.dayName();

    // Load recent data
    await this.loadMesures();
    await this.loadNutritionToday();

    this.emit('ready', this.state);
  },

  // Getters
  get profil() { return this.state.profil; },
  get currentWeek() { return this.state.currentWeek; },
  get currentPhase() { return this.state.currentPhase; },
  get todayDay() { return this.state.todayDay; },
  get theme() { return this.state.theme; },
  get mesures() { return this.state.mesures; },
  get latestMesure() { return this.state.mesures[this.state.mesures.length - 1] || null; },

  // Profil
  async saveProfil(data) {
    this.state.profil = { ...this.state.profil, ...data };
    this.state.currentWeek = HELPERS.getCurrentWeek(this.state.profil.dateDebut);
    this.state.currentPhase = getPhaseFromWeek(this.state.currentWeek);
    await DB.saveProfil(this.state.profil);
    this.emit('profilUpdated', this.state.profil);
  },

  // Theme
  setTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    HELPERS.lsSet('theme', theme);

    const sunIcon = HELPERS.el('icon-sun');
    const moonIcon = HELPERS.el('icon-moon');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
      moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
    }
    this.emit('themeChanged', theme);
  },

  toggleTheme() {
    this.setTheme(this.state.theme === 'dark' ? 'light' : 'dark');
  },

  // Mesures
  async loadMesures() {
    try {
      this.state.mesures = await DB.getAll('mesures');
      this.state.mesures.sort((a, b) => new Date(a.date) - new Date(b.date));
    } catch (e) { this.state.mesures = []; }
  },

  async saveMesure(mesure) {
    const data = { ...mesure, date: mesure.date || HELPERS.today(), semaine: this.state.currentWeek };
    await DB.add('mesures', data);
    await this.loadMesures();
    this.emit('mesureAdded', data);
    return data;
  },

  // Seances
  async saveSeance(seance) {
    const data = { ...seance, semaine: this.state.currentWeek, phase: this.state.currentPhase };
    const id = await DB.add('seances', data);
    this.emit('seanceSaved', { ...data, id });
    return id;
  },

  async loadSeanceHistory() {
    try {
      const seances = await DB.getAll('seances');
      this.state.seancesLog = seances.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (e) { this.state.seancesLog = []; }
    return this.state.seancesLog;
  },

  // Sets logging
  async saveSet(setData) {
    return DB.add('sets', { ...setData, date: HELPERS.today() });
  },

  async getSetsForExercice(exerciceId) {
    try {
      const all = await DB.getByIndex('sets', 'exerciceId', exerciceId);
      return all.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch { return []; }
  },

  async getLastWeightForExercice(exerciceId) {
    const sets = await this.getSetsForExercice(exerciceId);
    if (sets.length === 0) return null;
    const latest = sets[0];
    return latest.chargeKg;
  },

  // Nutrition
  async loadNutritionToday() {
    try {
      const today = HELPERS.today();
      const data = await DB.getNutritionByDate(today);
      this.state.nutritionLog[today] = data || { kcal: 0, proteines: 0, glucides: 0, lipides: 0, repas: [] };
    } catch { this.state.nutritionLog[HELPERS.today()] = { kcal: 0, proteines: 0, glucides: 0, lipides: 0, repas: [] }; }
  },

  async saveNutrition(data) {
    const today = HELPERS.today();
    const existing = this.state.nutritionLog[today] || {};
    const updated = { ...existing, ...data, date: today };
    this.state.nutritionLog[today] = updated;

    // Update or insert
    const current = await DB.getNutritionByDate(today);
    if (current) {
      await DB.put('nutrition', { ...current, ...updated });
    } else {
      await DB.add('nutrition', updated);
    }
    this.emit('nutritionUpdated', updated);
    return updated;
  },

  getNutritionToday() {
    return this.state.nutritionLog[HELPERS.today()] || { kcal: 0, proteines: 0, glucides: 0, lipides: 0, repas: [] };
  },

  // Seance session management
  startSeance(jour) {
    this.state.activeSeance = { jour, startTime: Date.now(), sets: {}, notes: '' };
    this.state.seanceStartTime = Date.now();
    this.emit('seanceStarted', jour);
  },

  endSeance() {
    const active = this.state.activeSeance;
    this.state.activeSeance = null;
    this.state.seanceStartTime = null;
    return active;
  },

  logSet(exerciceId, setNum, chargeKg, reps) {
    if (!this.state.activeSeance) return;
    if (!this.state.activeSeance.sets[exerciceId]) this.state.activeSeance.sets[exerciceId] = {};
    this.state.activeSeance.sets[exerciceId][setNum] = { chargeKg, reps, time: Date.now() };
    this.emit('setLogged', { exerciceId, setNum, chargeKg, reps });
  },

  // Weekly stats
  async getWeekStats() {
    const seances = await this.loadSeanceHistory();
    const weekSeances = seances.filter(s => s.semaine === this.state.currentWeek);
    const kcalTotal = weekSeances.reduce((acc, s) => acc + (s.kcalTotal || 0), 0);
    const completed = weekSeances.length;
    const latest = this.latestMesure;

    return {
      kcalWeek: kcalTotal,
      seancesCompleted: completed,
      poids: latest?.poids || this.state.profil?.poidsInitial || 75,
      poidsObjectif: this.state.profil?.poidsObjectif || 60,
      tailleCm: latest?.tailleCm || '—',
    };
  },

  // Export data
  async exportData() {
    const data = await DB.exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coach-diastasis-backup-${HELPERS.today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
};
