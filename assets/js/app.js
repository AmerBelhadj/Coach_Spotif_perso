// ─── STATE ───────────────────────────────────────────────────────────────────
const STATE = {
  profile: {
    poids: 85.1, poids_cible: 74.6,
    graisse: 25.5, graisse_cible: 18.0,
    igv: 11, igv_cible: 7,
    tmb: 1854, muscles: 70.6,
    eau: 51.7, proteines: 18.9,
    imc: 26.3, masse_maigre: 63.4,
    score_corp: 77
  },
  seances: [],
  reports: [],
  streak: [],
  badges: [],
  currentActivity: null,
  currentIntensity: 'moderee',
  currentDuration: 20,
  timerInterval: null,
  timerSeconds: 0,
  timerRunning: false,
  exercicesDone: [],
  charts: {}
};

// ─── PERSISTENCE ─────────────────────────────────────────────────────────────
function save() {
  try {
    const toSave = { seances:STATE.seances, reports:STATE.reports, streak:STATE.streak, badges:STATE.badges, profile:STATE.profile };
    localStorage.setItem('fitcoach_v1', JSON.stringify(toSave));
  } catch(e) {}
}
function load() {
  try {
    const d = localStorage.getItem('fitcoach_v1');
    if (d) {
      const parsed = JSON.parse(d);
      Object.assign(STATE, parsed);
    }
  } catch(e) {}
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.getElementById('nav-' + page).classList.add('active');
  if (page === 'stats') setTimeout(initCharts, 100);
  if (page === 'home') updateHome();
  if (page === 'balance') renderReportsHistory();
}

// ─── SPLASH ───────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  load();
  updateHome();
  buildStreak();
  updateProgress();
  setTimeout(() => {
    const splash = document.getElementById('splash');
    splash.style.opacity = '0';
    setTimeout(() => splash.style.display = 'none', 600);
  }, 2000);
  setDailyCoach();
  setDateDisplay();
  renderBadges();
});

function setDateDisplay() {
  const now = new Date();
  const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  const months = ['jan','fév','mar','avr','mai','juin','juil','août','sep','oct','nov','déc'];
  document.getElementById('date-display').textContent =
    `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
}

// ─── COACH MESSAGES ───────────────────────────────────────────────────────────
const COACH_MSGS = [
  "Graisse viscérale à 11 : c'est ton ennemi #1 ! La marche rapide 30 min/jour est l'arme la plus efficace. Tu peux le faire ! 💪",
  "Ton TMB est excellent (1854 kcal) — ton métabolisme travaille pour toi. Ajoute du cardio et la graisse fondra ! 🔥",
  "Objectif : -10.5 kg. Avec 3-4 séances/semaine, tu peux y arriver en 4-6 mois. Chaque séance compte ! 🎯",
  "Muscles à 70.6% — un peu bas. Combine cardio + musculation pour brûler la graisse ET tonifier en même temps 💡",
  "Eau corporelle à 51.7% : bois 2-3L d'eau aujourd'hui. L'hydratation booste ton métabolisme de 3% ! 💧",
  "La plongée est top pour toi : cardio doux, full-body, zéro impact articulaire. 400 kcal/h brûlées ! 🤿",
  "IGV à 11 : la graisse viscérale est liée aux maladies cardio. Les abdos et le cardio sont tes meilleurs alliés ! 🏃",
  "Séance de natation prévue ? Excellent choix pour brûler la graisse sans stresser les articulations 🏊",
];

function setDailyCoach() {
  const idx = new Date().getDay() % COACH_MSGS.length;
  document.getElementById('coach-daily-msg').textContent = COACH_MSGS[idx];
}

// ─── STREAK ───────────────────────────────────────────────────────────────────
function buildStreak() {
  const row = document.getElementById('streak-row');
  const days = ['L','M','M','J','V','S','D'];
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;
  row.innerHTML = '';
  days.forEach((d, i) => {
    const div = document.createElement('div');
    div.className = 'streak-day' + (STATE.streak.includes(i) ? ' done' : '') + (i === todayIdx ? ' today' : '');
    div.innerHTML = `<span>${d}</span><span style="font-size:0.9rem">${STATE.streak.includes(i) ? '✅' : (i === todayIdx ? '⚡' : '○')}</span>`;
    row.appendChild(div);
  });
  const total = STATE.streak.length;
  document.getElementById('streak-msg').textContent =
    total === 0 ? 'Lance ta première séance aujourd\'hui ! 🚀' :
    total === 7 ? '🏆 Semaine parfaite ! Tu es une machine !' :
    `${total} séance${total>1?'s':''} cette semaine — continue ! 💪`;
}

// ─── PROGRESS BARS ────────────────────────────────────────────────────────────
function updateProgress() {
  const p = STATE.profile;
  // poids: 85.1 → 74.6, start 85.1
  const startPoids = 85.1;
  const poidsProgress = Math.min(100, Math.max(0, ((startPoids - p.poids) / (startPoids - p.poids_cible)) * 100));
  const startGraisse = 25.5;
  const graisseProgress = Math.min(100, Math.max(0, ((startGraisse - p.graisse) / (startGraisse - p.graisse_cible)) * 100));
  const startIgv = 11;
  const igvProgress = Math.min(100, Math.max(0, ((startIgv - p.igv) / (startIgv - p.igv_cible)) * 100));
  setTimeout(() => {
    document.getElementById('prog-poids').style.width = Math.max(2, poidsProgress) + '%';
    document.getElementById('prog-graisse').style.width = Math.max(2, graisseProgress) + '%';
    document.getElementById('prog-igv').style.width = Math.max(2, igvProgress) + '%';
  }, 300);
  document.getElementById('prog-poids-txt').textContent = `${p.poids.toFixed(1)} / ${p.poids_cible} kg`;
}

function updateHome() {
  document.getElementById('m-poids').textContent = STATE.profile.poids.toFixed(1) + ' kg';
  updateProgress();
  buildStreak();
}

// ─── ACTIVITY SELECTION ───────────────────────────────────────────────────────
function selectActivity(act) {
  STATE.currentActivity = act;
  document.querySelectorAll('.act-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('act-' + act).classList.add('selected');
  checkCanGenerate();
}

function selectIntensity(lvl) {
  STATE.currentIntensity = lvl;
  document.querySelectorAll('.int-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('int-' + lvl).classList.add('selected');
}

function selectDuration(mins, el) {
  STATE.currentDuration = mins;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function checkCanGenerate() {
  const btn = document.getElementById('btn-gen-seance');
  if (STATE.currentActivity) {
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

// ─── EXERCISE DATABASE ────────────────────────────────────────────────────────
const EXERCISES = {
  marche: {
    echauffement: [
      { name:'Marche lente', detail:'5 min — rythme tranquille', icon:'🚶', kcal:25 },
      { name:'Rotation des chevilles', detail:'30 sec chaque côté', icon:'⭕', kcal:2 },
    ],
    principal: [
      { name:'Marche rapide', detail:'15-20 min — bras actifs, pas énergiques', icon:'🚶‍♂️', kcal:120 },
      { name:'Côtes / dénivelé', detail:'5 min — cherche un terrain vallonné', icon:'⛰️', kcal:80 },
      { name:'Intervalles', detail:'1 min vite / 2 min normal × 4', icon:'⚡', kcal:70 },
    ],
    retour: [
      { name:'Étirements mollets', detail:'30 sec chaque jambe', icon:'🦵', kcal:3 },
      { name:'Marche récupération', detail:'3 min — rythme lent', icon:'🧘', kcal:12 },
    ]
  },
  course: {
    echauffement: [
      { name:'Marche rapide', detail:'5 min', icon:'🚶', kcal:30 },
      { name:'Talons-fesses', detail:'20m × 2', icon:'🦵', kcal:10 },
      { name:'Montées de genoux', detail:'20m × 2', icon:'🏃', kcal:10 },
    ],
    principal: [
      { name:'Run 5-10 min', detail:'Allure conversationnelle — tu peux parler', icon:'🏃', kcal:90 },
      { name:'Intervalles run', detail:'30s rapide / 90s lent × 5', icon:'⚡', kcal:100 },
      { name:'Sprint final', detail:'100m × 2 — tout donner !', icon:'🔥', kcal:40 },
    ],
    retour: [
      { name:'Marche récup', detail:'5 min lent', icon:'🧘', kcal:20 },
      { name:'Étirements ischios', detail:'30 sec chaque jambe', icon:'🦵', kcal:3 },
    ]
  },
  velo: {
    echauffement: [
      { name:'Pédalage léger', detail:'5 min — résistance minimale', icon:'🚴', kcal:35 },
      { name:'Rotation épaules', detail:'15 × chaque sens', icon:'⭕', kcal:2 },
    ],
    principal: [
      { name:'Endurance base', detail:'15 min — rythme stable, cardio 65%', icon:'🚴', kcal:140 },
      { name:'Intervalles vélo', detail:'1 min résistance max / 2 min récup × 4', icon:'⚡', kcal:100 },
      { name:'Côtes simulées', detail:'5 min résistance élevée', icon:'⛰️', kcal:70 },
    ],
    retour: [
      { name:'Pédalage récup', detail:'5 min résistance zéro', icon:'🧘', kcal:20 },
      { name:'Étirements cuissards', detail:'Quadriceps, ischios 30s chaque', icon:'🦵', kcal:3 },
    ]
  },
  natation: {
    echauffement: [
      { name:'Nage libre lente', detail:'2 longueurs à ton rythme', icon:'🏊', kcal:40 },
      { name:'Battements de jambes', detail:'1 longueur planche', icon:'🦵', kcal:20 },
    ],
    principal: [
      { name:'Crawl endurance', detail:'6-8 longueurs — respiration 3 temps', icon:'🏊', kcal:150 },
      { name:'Brasse cardio', detail:'4 longueurs soutenu', icon:'💪', kcal:80 },
      { name:'Dos crawlé', detail:'4 longueurs — excellent pour le dos !', icon:'🌊', kcal:70 },
      { name:'Intervalles nagés', detail:'50m vite / 50m lent × 4', icon:'⚡', kcal:100 },
    ],
    retour: [
      { name:'Flottaison / récup', detail:'2 min dos au calme', icon:'🧘', kcal:8 },
      { name:'Étirements bord bassin', detail:'Épaules, dos, jambes', icon:'🌿', kcal:5 },
    ]
  },
  musculation: {
    echauffement: [
      { name:'Cardio léger', detail:'5 min vélo ou tapis — FC 120', icon:'❤️', kcal:35 },
      { name:'Mobilisation articulaire', detail:'Épaules, hanches, poignets', icon:'⭕', kcal:5 },
    ],
    principal: [
      { name:'Squats', detail:'3 × 12 — brûle graisse + quad/fessiers', icon:'🏋️', kcal:60 },
      { name:'Pompes', detail:'3 × 10 — pectoraux, triceps, core', icon:'💪', kcal:45 },
      { name:'Rowing câble/haltère', detail:'3 × 12 — dos large, contre la graisse IGV', icon:'🔝', kcal:50 },
      { name:'Planche isométrique', detail:'3 × 30s — core profond clé pour IGV', icon:'📐', kcal:20 },
      { name:'Fentes marchées', detail:'3 × 10 / jambe — équilibre + fessiers', icon:'🦵', kcal:55 },
      { name:'Gainage latéral', detail:'2 × 20s / côté', icon:'📐', kcal:15 },
    ],
    retour: [
      { name:'Étirements full body', detail:'5 min — quadris, dos, épaules', icon:'🧘', kcal:10 },
      { name:'Respiration profonde', detail:'2 min — récupération active', icon:'🌬️', kcal:3 },
    ]
  },
  plongee: {
    echauffement: [
      { name:'Respiration diaphragmatique', detail:'10 respirations profondes — apnée prépa', icon:'🌬️', kcal:5 },
      { name:'Mobilisation cervicale', detail:'Rotations douces — sécurité plongée', icon:'⭕', kcal:3 },
      { name:'Étirements intercostaux', detail:'Ouvre la cage thoracique pour l\'apnée', icon:'🫁', kcal:5 },
    ],
    principal: [
      { name:'Exercices palmes', detail:'15 min battements — jambes, cardio, fessiers', icon:'🤿', kcal:180 },
      { name:'Apnée statique eau peu profonde', detail:'3 × 30-45s — vide ton esprit', icon:'🌊', kcal:20 },
      { name:'Exercices bras / nage subaquatique', detail:'10 min — épaules, dos complet', icon:'💪', kcal:100 },
      { name:'Équilibre flottaison', detail:'5 min — core profond, stabilité', icon:'⚖️', kcal:30 },
    ],
    retour: [
      { name:'Respiration récup', detail:'5 respirations 4-7-8 — retour calme', icon:'🧘', kcal:5 },
      { name:'Étirements épaules / dos', detail:'2 min — muscles travaillés avec palmes', icon:'🌿', kcal:5 },
    ]
  }
};

const SEANCE_NAMES = {
  marche: 'Marche Active 🚶', course: 'Run & Cardio 🏃',
  velo: 'Vélo Endurance 🚴', natation: 'Natation Cardio 🏊',
  musculation: 'Circuit Muscu 🏋️', plongee: 'Plongée & Apnée 🤿'
};

const SEANCE_TIPS = {
  marche: "Pour toi : la marche rapide brûle directement la graisse viscérale. Garde un rythme où tu peux parler mais pas chanter ! 🎵",
  course: "Commence doucement ! Alterner marche/course est excellent pour ton niveau. L'important c'est la régularité. 🏃",
  velo: "Le vélo est parfait pour ton IGV élevé — cardio efficace, sans choc articulaire. Vise 70% de ta FC max ! 🚴",
  natation: "La natation est l'activité REINE pour toi : full-body, anti-graisse viscérale, et douce pour les articulations. Go ! 🏊",
  musculation: "Focus sur les grands groupes musculaires : squat, rowing, pompes. Plus de muscle = métabolisme plus rapide ! 💪",
  plongee: "Apnée + palmes = combo magique ! Travail cardio, gainage profond, et décompression mentale totale. Tu vas adorer 🤿"
};

function generateSeance() {
  const act = STATE.currentActivity;
  const dur = STATE.currentDuration;
  const int = STATE.currentIntensity;
  if (!act) return;

  const exoData = EXERCISES[act];
  let exos = [];
  exos.push(...exoData.echauffement);
  // Adapter selon durée
  const mainCount = dur <= 20 ? 2 : dur <= 30 ? 3 : dur <= 45 ? 4 : exoData.principal.length;
  exos.push(...exoData.principal.slice(0, mainCount));
  exos.push(...exoData.retour);

  const totalKcal = Math.round(exos.reduce((s,e) => s + e.kcal, 0) * (int==='douce'?0.7:int==='intense'?1.4:1));

  document.getElementById('seance-title').textContent = SEANCE_NAMES[act];
  document.getElementById('seance-dur-tag').textContent = `⏱ ${dur} min`;
  document.getElementById('seance-kcal-tag').textContent = `🔥 ~${totalKcal} kcal`;
  document.getElementById('seance-level-tag').textContent = {douce:'🌿 Douce', moderee:'⚡ Modérée', intense:'🔥 Intense'}[int];
  document.getElementById('seance-coach-tip').textContent = SEANCE_TIPS[act];

  const list = document.getElementById('exercises-list');
  list.innerHTML = '';
  STATE.exercicesDone = new Array(exos.length).fill(false);

  let section = '';
  exos.forEach((ex, i) => {
    let sectionLabel = '';
    if (i < exoData.echauffement.length) {
      if (section !== 'ech') { sectionLabel = '<div class="section-label">🔄 Échauffement</div>'; section = 'ech'; }
    } else if (i < exoData.echauffement.length + mainCount) {
      if (section !== 'main') { sectionLabel = '<div class="section-label">🔥 Programme principal</div>'; section = 'main'; }
    } else {
      if (section !== 'ret') { sectionLabel = '<div class="section-label">🧘 Retour au calme</div>'; section = 'ret'; }
    }
    list.innerHTML += sectionLabel + `
      <div class="exercise-card" id="ex-${i}">
        <div class="ex-num">${i+1}</div>
        <div class="ex-info">
          <div class="ex-name">${ex.icon} ${ex.name}</div>
          <div class="ex-detail">${ex.detail} · ~${ex.kcal} kcal</div>
        </div>
        <div class="ex-check" id="check-${i}" onclick="toggleExercice(${i})"></div>
      </div>`;
  });

  document.getElementById('seance-selector').style.display = 'none';
  document.getElementById('seance-active').style.display = 'block';

  // Store for finish
  STATE._currentSeanceExos = exos;
  STATE._currentSeanceKcal = totalKcal;
  resetTimer();
}

function toggleExercice(i) {
  STATE.exercicesDone[i] = !STATE.exercicesDone[i];
  const card = document.getElementById('ex-' + i);
  const check = document.getElementById('check-' + i);
  if (STATE.exercicesDone[i]) {
    card.classList.add('done-ex');
    check.classList.add('checked');
    check.textContent = '✓';
    showToast('Super ! +1 exercice ✅');
  } else {
    card.classList.remove('done-ex');
    check.classList.remove('checked');
    check.textContent = '';
  }
  // Check si tous terminés
  if (STATE.exercicesDone.every(Boolean)) {
    setTimeout(() => { showToast('🎉 Tous les exercices faits ! Clique Terminer !'); }, 500);
  }
}

// ─── TIMER ────────────────────────────────────────────────────────────────────
function toggleTimer() {
  if (STATE.timerRunning) {
    clearInterval(STATE.timerInterval);
    STATE.timerRunning = false;
    document.getElementById('timer-btn').textContent = '▶ REPRENDRE';
  } else {
    STATE.timerRunning = true;
    document.getElementById('timer-btn').textContent = '⏸ PAUSE';
    STATE.timerInterval = setInterval(() => {
      STATE.timerSeconds++;
      const m = String(Math.floor(STATE.timerSeconds/60)).padStart(2,'0');
      const s = String(STATE.timerSeconds%60).padStart(2,'0');
      document.getElementById('timer-display').textContent = `${m}:${s}`;
    }, 1000);
  }
}
function resetTimer() {
  clearInterval(STATE.timerInterval);
  STATE.timerRunning = false;
  STATE.timerSeconds = 0;
  document.getElementById('timer-display').textContent = '00:00';
  document.getElementById('timer-btn').textContent = '▶ START';
}

// ─── FINISH SEANCE ────────────────────────────────────────────────────────────
function finishSeance() {
  clearInterval(STATE.timerInterval);
  const doneCount = STATE.exercicesDone.filter(Boolean).length;
  const totalCount = STATE.exercicesDone.length;
  const kcal = Math.round(STATE._currentSeanceKcal * (doneCount / totalCount));

  const seance = {
    date: new Date().toISOString(),
    activite: STATE.currentActivity,
    duree: STATE.timerSeconds,
    kcal,
    intensity: STATE.currentIntensity,
    doneCount, totalCount,
    icon: {marche:'🚶',course:'🏃',velo:'🚴',natation:'🏊',musculation:'🏋️',plongee:'🤿'}[STATE.currentActivity]
  };
  STATE.seances.push(seance);

  // Streak
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  if (!STATE.streak.includes(todayIdx)) STATE.streak.push(todayIdx);

  // Badges
  checkBadges();
  save();
  confetti();
  showToast(`🎉 Séance terminée ! ${kcal} kcal brûlées !`);
  cancelSeance();
  updateHome();
}

function cancelSeance() {
  resetTimer();
  document.getElementById('seance-selector').style.display = 'block';
  document.getElementById('seance-active').style.display = 'none';
  STATE.currentActivity = null;
  document.querySelectorAll('.act-card').forEach(c => c.classList.remove('selected'));
  const btn = document.getElementById('btn-gen-seance');
  btn.disabled = true; btn.style.opacity = '0.4';
}

// ─── BADGES ───────────────────────────────────────────────────────────────────
const ALL_BADGES = [
  { id:'first', icon:'🥇', name:'Première séance', condition:s => s.seances.length >= 1 },
  { id:'five', icon:'🏅', name:'5 séances', condition:s => s.seances.length >= 5 },
  { id:'ten', icon:'🏆', name:'10 séances', condition:s => s.seances.length >= 10 },
  { id:'swimmer', icon:'🏊', name:'Nageur', condition:s => s.seances.filter(x=>x.activite==='natation').length >= 3 },
  { id:'runner', icon:'🏃', name:'Runner', condition:s => s.seances.filter(x=>x.activite==='course').length >= 3 },
  { id:'diver', icon:'🤿', name:'Plongeur Pro', condition:s => s.seances.filter(x=>x.activite==='plongee').length >= 2 },
  { id:'streak3', icon:'🔥', name:'3 jours consécutifs', condition:s => s.streak.length >= 3 },
  { id:'streekweek', icon:'⭐', name:'Semaine parfaite', condition:s => s.streak.length >= 7 },
  { id:'kcal1000', icon:'💥', name:'1000 kcal brûlées', condition:s => s.seances.reduce((a,x)=>a+x.kcal,0) >= 1000 },
];

function checkBadges() {
  ALL_BADGES.forEach(b => {
    if (!STATE.badges.includes(b.id) && b.condition(STATE)) {
      STATE.badges.push(b.id);
      setTimeout(() => showToast(`🏅 Badge débloqué : ${b.name} !`), 1500);
    }
  });
}
function renderBadges() {
  const el = document.getElementById('badges-list');
  if (!el) return;
  if (STATE.badges.length === 0) {
    el.innerHTML = '<span style="color:var(--text2);font-size:0.8rem">Lance ta première séance pour débloquer des badges ! 🚀</span>';
    return;
  }
  el.innerHTML = STATE.badges.map(id => {
    const b = ALL_BADGES.find(x=>x.id===id);
    return b ? `<div style="background:var(--card2);border-radius:10px;padding:8px 12px;display:flex;align-items:center;gap:6px;font-size:0.78rem">
      <span style="font-size:1.2rem">${b.icon}</span><span>${b.name}</span>
    </div>` : '';
  }).join('');
}

// ─── BALANCE ANALYSIS ─────────────────────────────────────────────────────────
async function analyzeReport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const zone = document.getElementById('analyse-zone');

  zone.innerHTML = `<div class="card ai-thinking">
    <div class="dot-anim"><span></span><span></span><span></span></div>
    <span>Coach IA analyse ton rapport...</span>
  </div>`;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result.split(',')[1];
    const mediaType = file.type || 'image/jpeg';
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{
            role:"user",
            content:[
              { type:"image", source:{type:"base64",media_type:mediaType,data:base64} },
              { type:"text", text:`Tu es un coach sportif expert en composition corporelle. Analyse ce rapport de balance corporelle.
Réponds UNIQUEMENT en JSON valide, sans markdown, avec ce format exact:
{
  "poids": nombre ou null,
  "graisse_pct": nombre ou null,
  "muscles_pct": nombre ou null,
  "imc": nombre ou null,
  "igv": nombre ou null,
  "eau_pct": nombre ou null,
  "tmb": nombre ou null,
  "points_positifs": ["...", "..."],
  "points_ameliorer": ["...", "..."],
  "conseil_coach": "message motivant personnalisé de 2 phrases max",
  "score_evolution": "meilleur | stable | à surveiller",
  "date_rapport": "JJ/MM/AAAA ou null"
}` }
            ]
          }]
        })
      });
      const data = await response.json();
      const text = data.content.map(i => i.text||'').join('');
      let parsed;
      try { parsed = JSON.parse(text.replace(/```json|```/g,'').trim()); }
      catch(e) { throw new Error('Parse error'); }
      displayAnalyse(parsed, file);
    } catch(err) {
      zone.innerHTML = `<div class="card"><p style="color:var(--fire)">⚠️ Erreur d'analyse. Vérifie que l'image est bien visible et réessaie.</p></div>`;
    }
  };
  reader.readAsDataURL(file);
}

function displayAnalyse(data, file) {
  const zone = document.getElementById('analyse-zone');

  // Update profile if data found
  if (data.poids) STATE.profile.poids = data.poids;
  if (data.graisse_pct) STATE.profile.graisse = data.graisse_pct;
  if (data.igv) STATE.profile.igv = data.igv;
  if (data.muscles_pct) STATE.profile.muscles = data.muscles_pct;
  if (data.eau_pct) STATE.profile.eau = data.eau_pct;
  if (data.tmb) STATE.profile.tmb = data.tmb;

  // Save report
  const report = { date: new Date().toISOString(), data, img: null };
  STATE.reports.push(report);
  save();
  updateHome();

  const evolution = { 'meilleur':'🟢 Meilleur', 'stable':'🟡 Stable', 'à surveiller':'🔴 À surveiller' }[data.score_evolution] || '🟡';

  zone.innerHTML = `<div class="card analyse-result">
    <div class="card-title">📊 ANALYSE IA — ${data.date_rapport || 'Aujourd\'hui'}</div>
    <div style="background:rgba(0,245,160,0.05);border-radius:10px;padding:14px;margin-bottom:14px">
      <div style="font-size:0.8rem;color:var(--text2);margin-bottom:4px">Évolution globale</div>
      <div style="font-size:1.1rem;font-weight:600">${evolution}</div>
    </div>
    ${data.poids ? `<div class="analyse-item"><span>Poids</span><strong>${data.poids} kg</strong></div>` : ''}
    ${data.graisse_pct ? `<div class="analyse-item"><span>Graisse corp.</span><strong>${data.graisse_pct}%</strong></div>` : ''}
    ${data.muscles_pct ? `<div class="analyse-item"><span>Muscles</span><strong>${data.muscles_pct}%</strong></div>` : ''}
    ${data.igv ? `<div class="analyse-item"><span>Graisse viscérale</span><strong>${data.igv}</strong></div>` : ''}
    ${data.eau_pct ? `<div class="analyse-item"><span>Eau corporelle</span><strong>${data.eau_pct}%</strong></div>` : ''}
    ${data.tmb ? `<div class="analyse-item"><span>TMB</span><strong>${data.tmb} kcal</strong></div>` : ''}
    ${data.points_positifs?.length ? `
    <div style="margin-top:12px">
      <div class="section-label">✅ Points positifs</div>
      ${data.points_positifs.map(p=>`<div style="font-size:0.82rem;color:var(--neon);padding:4px 0">• ${p}</div>`).join('')}
    </div>` : ''}
    ${data.points_ameliorer?.length ? `
    <div style="margin-top:10px">
      <div class="section-label">⚡ À améliorer</div>
      ${data.points_ameliorer.map(p=>`<div style="font-size:0.82rem;color:var(--fire);padding:4px 0">• ${p}</div>`).join('')}
    </div>` : ''}
    <div class="coach-bubble" style="margin-top:14px;margin-bottom:0">
      <p class="coach-msg">${data.conseil_coach || 'Continue comme ça !'}</p>
    </div>
  </div>`;

  renderReportsHistory();
  showToast('✅ Rapport analysé !');
}

function renderReportsHistory() {
  const el = document.getElementById('reports-list');
  if (!el) return;
  if (STATE.reports.length === 0) {
    el.innerHTML = '<p style="color:var(--text2);font-size:0.82rem;text-align:center;padding:20px">Aucun rapport encore. Importe ta première photo de balance ! 📸</p>';
    return;
  }
  el.innerHTML = STATE.reports.slice().reverse().map((r,i) => {
    const d = new Date(r.date);
    const dateStr = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
    const poids = r.data?.poids || '—';
    const graisse = r.data?.graisse_pct || '—';
    return `<div class="history-item">
      <div class="hist-icon">📊</div>
      <div class="hist-info">
        <div class="hist-name">Rapport du ${dateStr}</div>
        <div class="hist-date">${poids} kg · Graisse ${graisse}%</div>
      </div>
      <div class="hist-score">${r.data?.score_evolution === 'meilleur' ? '🟢' : r.data?.score_evolution === 'stable' ? '🟡' : '🔴'}</div>
    </div>`;
  }).join('');
}

// ─── CHARTS ───────────────────────────────────────────────────────────────────
function initCharts() {
  // Collect data from reports + initial
  const poidsData = [85.1, ...STATE.reports.filter(r=>r.data?.poids).map(r=>r.data.poids)];
  const graisseData = [25.5, ...STATE.reports.filter(r=>r.data?.graisse_pct).map(r=>r.data.graisse_pct)];
  const labels = ['Départ', ...STATE.reports.map((_,i)=>`J+${i+1}`)];

  Chart.defaults.color = '#8888bb';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';

  const chartOpts = (color, data, lbl, target) => ({
    type:'line',
    data:{
      labels: lbl,
      datasets:[{
        data, borderColor:color, backgroundColor:color+'22',
        tension:0.4, fill:true, pointBackgroundColor:color, pointRadius:5
      },{
        data: lbl.map(()=>target),
        borderColor:'rgba(0,245,160,0.3)', borderDash:[4,4],
        pointRadius:0, fill:false
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        x:{grid:{display:false}},
        y:{grid:{color:'rgba(255,255,255,0.04)'}}
      }
    }
  });

  const destroyAndCreate = (id, config) => {
    const existing = STATE.charts[id];
    if (existing) existing.destroy();
    const ctx = document.getElementById(id);
    if (ctx) STATE.charts[id] = new Chart(ctx, config);
  };

  destroyAndCreate('chart-poids', chartOpts('#00f5a0', poidsData, labels, 74.6));
  destroyAndCreate('chart-graisse', chartOpts('#f472b6', graisseData, labels, 18));

  // Activité par semaine
  const actLabels = ['L','M','M','J','V','S','D'];
  const actData = actLabels.map((_,i) => STATE.seances.filter(s => {
    const d = new Date(s.date); const day = d.getDay()===0?6:d.getDay()-1;
    return day === i;
  }).reduce((a,s)=>a+s.kcal,0));

  destroyAndCreate('chart-activite', {
    type:'bar',
    data:{
      labels: actLabels,
      datasets:[{ data:actData, backgroundColor:'rgba(0,245,160,0.3)', borderColor:'#00f5a0', borderWidth:2, borderRadius:6 }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(255,255,255,0.04)'}}}
    }
  });

  // Update big stats
  const totalSeances = STATE.seances.length;
  const totalKcal = STATE.seances.reduce((a,s)=>a+s.kcal,0);
  document.getElementById('stat-seances').textContent = totalSeances;
  document.getElementById('stat-kcal').textContent = totalKcal;
  document.getElementById('stat-streak').textContent = STATE.streak.length;

  const poidsActuel = STATE.profile.poids;
  const poidsInit = 85.1;
  const delta = (poidsInit - poidsActuel).toFixed(1);
  document.getElementById('stat-poids').textContent = poidsActuel.toFixed(1);
  document.getElementById('stat-poids-delta').textContent = delta > 0 ? `−${delta} kg` : '−0 kg';

  const graisseActuel = STATE.profile.graisse;
  document.getElementById('stat-graisse').textContent = graisseActuel.toFixed(1);

  renderBadges();
}

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
function confetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#00f5a0','#00d9f5','#ff6b35','#f472b6','#ffd700'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random()*colors.length)];
    el.style.cssText = `position:absolute;width:8px;height:8px;background:${color};
      border-radius:${Math.random()>0.5?'50%':'2px'};
      left:${Math.random()*100}%;top:-10px;
      animation:fall ${1+Math.random()*2}s linear forwards;
      animation-delay:${Math.random()*0.5}s;`;
    container.appendChild(el);
    setTimeout(()=>el.remove(), 3000);
  }
  const style = document.createElement('style');
  style.textContent = `@keyframes fall{to{transform:translateY(100vh) rotate(720deg);opacity:0}}`;
  document.head.appendChild(style);
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
let toastTimeout;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(()=>t.classList.remove('show'), 3000);
}

// ─── DRAG & DROP UPLOAD ───────────────────────────────────────────────────────
const uz = document.getElementById('upload-zone');
if (uz) {
  uz.addEventListener('dragover', e => { e.preventDefault(); uz.classList.add('drag'); });
  uz.addEventListener('dragleave', () => uz.classList.remove('drag'));
  uz.addEventListener('drop', e => {
    e.preventDefault(); uz.classList.remove('drag');
    const file = e.dataTransfer.files[0];
    if (file) { const dt = new DataTransfer(); dt.items.add(file); document.getElementById('file-input').files = dt.files; analyzeReport({target:{files:[file]}}); }
  });
}

// ─── SERVICE WORKER ───────────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
