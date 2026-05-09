/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — EXERCICES & SÉCURITÉ DIASTASIS
═══════════════════════════════════════════════════ */

const EXERCICES_INTERDITS = [
  { id: "crunchs", nom: "Crunchs classiques", alternative: "Dead Bug", alternativeId: "transverse_dead_bug", raison: "Pression intra-abdominale excessive sur la ligne blanche" },
  { id: "situps", nom: "Relevés de buste (sit-ups)", alternative: "Bird-Dog", alternativeId: "bird_dog", raison: "Flexion de tronc = écartement du diastasis" },
  { id: "planche_complete", nom: "Planche complète (avant validation kiné)", alternative: "Planche sur genoux", alternativeId: "planche_genoux", raison: "Charge excessive sur la ligne blanche" },
  { id: "torsions_lourdes", nom: "Torsions sous charge lourde", alternative: "Rotation Pallof câble", alternativeId: "pallof_cable", raison: "Cisaillement de la ligne blanche en rotation" },
  { id: "valsalva", nom: "Blocage respiratoire (Valsalva)", alternative: "Respiration 360° continue", alternativeId: "transverse_4pattes", raison: "Pic de pression intra-abdominale critique" },
  { id: "russian_twists", nom: "Russian twists", alternative: "Dead Bug", alternativeId: "transverse_dead_bug", raison: "Rotation + flexion = double stress sur la ligne blanche" },
  { id: "leg_raises", nom: "Leg raises droites (jambes tendues)", alternative: "Dead Bug pied au sol", alternativeId: "transverse_dead_bug", raison: "Pression iliopsoas sur la ligne blanche" },
  { id: "burpees", nom: "Burpees", alternative: "Step-up + mouvement de bras", alternativeId: "step_up", raison: "Impact au sol + gainage intense non contrôlé" },
  { id: "mountain_climbers", nom: "Mountain climbers", alternative: "Bird-Dog lent", alternativeId: "bird_dog", raison: "Dynamisme excessif sur le core" },
  { id: "jumping_jacks", nom: "Jumping jacks / sauts", alternative: "Pas chassés latéraux", alternativeId: "step_up", raison: "Impact et pression au sol" },
];

const PROGRESSION_CHARGES = {
  "Tirage vertical large": {
    groupe: "haut",
    emoji: "🏋️",
    phases: {
      1: { charge: "30–35 kg", reps: 12, sets: 3 },
      2: { charge: "37–42 kg", reps: 10, sets: 4 },
      3: { charge: "45–52 kg", reps: "6-8", sets: 5 },
      4: { charge: "50–55 kg", reps: "6 ou 12*", sets: 5 },
    }
  },
  "Tirage vertical serré": {
    groupe: "haut",
    emoji: "🏋️",
    phases: {
      1: { charge: "28–33 kg", reps: 10, sets: 4 },
      2: { charge: "33–38 kg", reps: 10, sets: 4 },
      3: { charge: "40–48 kg", reps: 8, sets: 5 },
      4: { charge: "44–50 kg", reps: 10, sets: 5 },
    }
  },
  "Rowing câble assis": {
    groupe: "haut",
    emoji: "🚣",
    phases: {
      1: { charge: "25–30 kg", reps: 12, sets: 3 },
      2: { charge: "28–33 kg", reps: 10, sets: 4 },
      3: { charge: "35–42 kg", reps: 8, sets: 4 },
      4: { charge: "38–45 kg", reps: 10, sets: 4 },
    }
  },
  "Rowing barre": {
    groupe: "haut",
    emoji: "🚣",
    phases: {
      1: "—",
      2: { charge: "35–45 kg", reps: 10, sets: 4 },
      3: { charge: "50–60 kg", reps: 8, sets: 4 },
      4: { charge: "58–68 kg", reps: "6 ou 10*", sets: 4 },
    }
  },
  "Développé épaules haltères": {
    groupe: "haut",
    emoji: "🏆",
    phases: {
      1: { charge: "6–8 kg/h", reps: 10, sets: 3 },
      2: { charge: "8–10 kg/h", reps: 10, sets: 4 },
      3: { charge: "12–14 kg/h", reps: 8, sets: 4 },
      4: { charge: "14–16 kg/h", reps: "6-8", sets: 4 },
    }
  },
  "Élévations latérales": {
    groupe: "haut",
    emoji: "🦅",
    phases: {
      1: { charge: "4–5 kg/h", reps: 12, sets: 3 },
      2: { charge: "5–7 kg/h", reps: 12, sets: 3 },
      3: { charge: "6–8 kg/h (drop)", reps: "10+10+10", sets: 3 },
      4: { charge: "5–8 kg/h", reps: 12, sets: 4 },
    }
  },
  "Curl biceps haltères": {
    groupe: "haut",
    emoji: "💪",
    phases: {
      1: { charge: "6–8 kg/h", reps: 12, sets: 3 },
      2: { charge: "8–10 kg/h", reps: 10, sets: 4 },
      3: { charge: "10–12 kg/h (RP)", reps: "8+4+4", sets: 3 },
      4: { charge: "12–14 kg/h", reps: 8, sets: 4 },
    }
  },
  "Développé couché haltères": {
    groupe: "haut",
    emoji: "💪",
    phases: {
      1: { charge: "2×10–12 kg", reps: 12, sets: 3 },
      2: { charge: "2×13–16 kg", reps: 10, sets: 4 },
      3: { charge: "2×16–20 kg", reps: "6-8", sets: 5 },
      4: { charge: "2×15–18 kg", reps: 10, sets: 4 },
    }
  },
  "Extension triceps poulie": {
    groupe: "haut",
    emoji: "💪",
    phases: {
      1: { charge: "12–18 kg", reps: 12, sets: 3 },
      2: { charge: "18–22 kg", reps: 10, sets: 4 },
      3: { charge: "22–28 kg", reps: 10, sets: 4 },
      4: { charge: "22–26 kg", reps: 12, sets: 4 },
    }
  },
  "Hip thrust barre": {
    groupe: "bas",
    emoji: "🚀",
    phases: {
      1: { charge: "20–30 kg", reps: 12, sets: 3 },
      2: { charge: "35–55 kg", reps: 12, sets: 5 },
      3: { charge: "55–70 kg", reps: "8-10 (RP)", sets: 5 },
      4: { charge: "60–75 kg", reps: "6-8 ou 12*", sets: 5 },
    }
  },
  "Presse à cuisses": {
    groupe: "bas",
    emoji: "🦵",
    phases: {
      1: { charge: "50–60 kg", reps: 15, sets: 3 },
      2: { charge: "70–80 kg", reps: 12, sets: 4 },
      3: { charge: "90–100 kg (drop)", reps: "12+10+8", sets: 3 },
      4: { charge: "80–90 kg", reps: 10, sets: 4 },
    }
  },
  "Squat barre": {
    groupe: "bas",
    emoji: "🏋️",
    phases: {
      1: "—",
      2: { charge: "30–40 kg", reps: 10, sets: 4 },
      3: { charge: "45–55 kg", reps: "6-8", sets: 5 },
      4: { charge: "55–65 kg", reps: "5 ou 10*", sets: 5 },
    }
  },
  "Squat goblet": {
    groupe: "bas",
    emoji: "⬆️",
    phases: {
      1: { charge: "12–16 kg", reps: 12, sets: 3 },
      2: { charge: "20–24 kg", reps: 10, sets: 4 },
      3: { charge: "24–28 kg", reps: 10, sets: 4 },
      4: "→ Remplacé squat barre",
    }
  },
  "SDT roumain barre": {
    groupe: "bas",
    emoji: "⚡",
    phases: {
      1: { charge: "2×10–14 kg (haltères)", reps: 12, sets: 3 },
      2: { charge: "40–50 kg", reps: 10, sets: 4 },
      3: { charge: "50–60 kg", reps: 8, sets: 4 },
      4: { charge: "60–70 kg", reps: "6-8", sets: 4 },
    }
  },
  "Soulevé de terre complet": {
    groupe: "bas",
    emoji: "⚡",
    phases: {
      1: "—",
      2: "—",
      3: { charge: "55–70 kg", reps: 5, sets: 5 },
      4: { charge: "65–80 kg", reps: 5, sets: 5 },
    }
  },
  "Leg curl machine": {
    groupe: "bas",
    emoji: "🦵",
    phases: {
      1: { charge: "20–25 kg", reps: 12, sets: 3 },
      2: { charge: "28–33 kg", reps: "10 (tempo)", sets: 4 },
      3: { charge: "35–40 kg (drop)", reps: "10+8+6", sets: 3 },
      4: { charge: "30–38 kg", reps: 12, sets: 3 },
    }
  },
  "Fentes bulgares": {
    groupe: "bas",
    emoji: "🦶",
    phases: {
      1: "—",
      2: { charge: "2×8–10 kg", reps: 10, sets: 3 },
      3: { charge: "2×14–16 kg", reps: 8, sets: 4 },
      4: { charge: "2×16–20 kg", reps: 8, sets: 4 },
    }
  },
  "Abduction machine": {
    groupe: "bas",
    emoji: "⬅️",
    phases: {
      1: { charge: "25–30 kg", reps: 20, sets: 3 },
      2: { charge: "30–35 kg", reps: 15, sets: 3 },
      3: { charge: "35–40 kg", reps: 20, sets: 3 },
      4: { charge: "35–40 kg", reps: 15, sets: 3 },
    }
  },
  "Planche (genoux/complète)": {
    groupe: "core",
    emoji: "🛡️",
    phases: {
      1: { charge: "Genoux 25s", reps: "25s", sets: 3 },
      2: { charge: "Genoux 35s", reps: "35s", sets: 3 },
      3: { charge: "Complète 20s (si kiné)", reps: "20s", sets: 3 },
      4: { charge: "Complète 30–45s", reps: "30–45s", sets: 3 },
    }
  },
  "Dead Bug": {
    groupe: "core",
    emoji: "🐛",
    phases: {
      1: { charge: "PDC", reps: "10/côté", sets: 2 },
      2: { charge: "Bande résistance", reps: "12/côté", sets: 3 },
      3: { charge: "Bande + poids léger", reps: "12/côté", sets: 3 },
      4: { charge: "Progression libre", reps: "15/côté", sets: 3 },
    }
  },
  "Bird-Dog": {
    groupe: "core",
    emoji: "🐦",
    phases: {
      1: { charge: "PDC", reps: "10/côté", sets: 2 },
      2: { charge: "Bande chevilles", reps: "12/côté", sets: 3 },
      3: { charge: "Bande + tempo lent", reps: "12/côté", sets: 3 },
      4: { charge: "Progression libre", reps: "15/côté", sets: 3 },
    }
  },
  "Pallof press câble": {
    groupe: "core",
    emoji: "🎯",
    phases: {
      1: { charge: "10–15 kg", reps: "10/côté", sets: 3 },
      2: { charge: "15–20 kg", reps: "12/côté", sets: 3 },
      3: { charge: "18–25 kg", reps: "12/côté", sets: 3 },
      4: { charge: "20–28 kg", reps: "12/côté", sets: 3 },
    }
  },
};

// Vidéos YouTube recommandées par exercice/thème
const VIDEOS_EDUCATIVES = [
  {
    id: "diastasis_comprendre",
    titre: "Comprendre le diastasis des grands droits",
    description: "Explication complète du diastasis, causes et approche de récupération",
    videoId: "TDZ6m6WEeWo",
    categorie: "education",
    duree: "8 min",
    emoji: "🎓"
  },
  {
    id: "transverse_activation",
    titre: "Activer le transverse — Tutoriel complet",
    description: "Technique de respiration 360° et activation du muscle transverse",
    videoId: "RUMrVJaYkEA",
    categorie: "technique",
    duree: "6 min",
    emoji: "🫁"
  },
  {
    id: "dead_bug_tuto",
    titre: "Dead Bug — Du débutant à l'avancé",
    description: "Progressions du Dead Bug pour le diastasis",
    videoId: "4ZRimFD4lEM",
    categorie: "core",
    duree: "7 min",
    emoji: "🐛"
  },
  {
    id: "hip_thrust_tuto",
    titre: "Hip Thrust — Technique parfaite",
    description: "Positionnement, respiration, progression des charges",
    videoId: "xDmFkJxPzeM",
    categorie: "fessiers",
    duree: "10 min",
    emoji: "🚀"
  },
  {
    id: "squat_securite",
    titre: "Squat sécuritaire avec diastasis",
    description: "Adaptations du squat pour préserver la ligne blanche",
    videoId: "ultWZbUMPL8",
    categorie: "technique",
    duree: "9 min",
    emoji: "🏋️"
  },
  {
    id: "respiration_effort",
    titre: "Respiration pendant l'effort — Règles d'or",
    description: "Comment respirer à chaque exercice pour protéger le diastasis",
    videoId: "RUMrVJaYkEA",
    categorie: "education",
    duree: "5 min",
    emoji: "💨"
  },
  {
    id: "bird_dog_tuto",
    titre: "Bird-Dog — Stabilité et progressions",
    description: "Toutes les variantes du Bird-Dog pour renforcer le core",
    videoId: "wiFNA3sqjCA",
    categorie: "core",
    duree: "6 min",
    emoji: "🐦"
  },
  {
    id: "bilan_kine",
    titre: "Pourquoi voir un kiné pour le diastasis ?",
    description: "Importance du suivi kinésithérapeute pour un programme sécuritaire",
    videoId: "TDZ6m6WEeWo",
    categorie: "education",
    duree: "5 min",
    emoji: "👩‍⚕️"
  },
];
