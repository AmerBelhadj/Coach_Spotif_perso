/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — PROGRAMME DATA (16 SEMAINES)
═══════════════════════════════════════════════════ */

const PROGRAMME = {

  // ─── PHASE 1 : Semaines 1–4 ───────────────────────────────────────────
  phase1: {
    label: "Réparation & Fondations",
    semaines: [1, 2, 3, 4],
    intensite: "55–60% 1RM",
    color: "#1A2B4A",
    description: "Activation du transverse, renforcement en douceur, reprogrammation neuromusculaire.",
    seances: {
      MARDI: {
        label: "Haut du corps",
        subtitle: "Dos + Épaules + Bras + Core",
        duree: 40,
        kcalTotal: 335,
        exercices: [
          {
            id: "transverse_4pattes",
            nom: "Activation transverse (4 pattes, respiration 360°)",
            sets: 3, reps: "10 resp", repos: 20,
            kcal: 25,
            muscles: ["Core profond", "Transverse"],
            diastasisSafe: true,
            priorite: true,
            consigne: "PRIORITÉ ABSOLUE — Ventre rentré, expirer lentement et complètement. Sentir le plancher pelvien remonter à l'expiration.",
            categorie: "core_diastasis",
            emoji: "🫁",
            videoId: "RUMrVJaYkEA",
            videoLabel: "Activation transverse abdominale"
          },
          {
            id: "lat_pulldown",
            nom: "Tirage vertical prise large (lat pulldown)",
            sets: 3, reps: 12, repos: 60,
            kcal: 65,
            muscles: ["Dos", "Grand dorsal", "Biceps"],
            diastasisSafe: true,
            consigne: "Expirer en tirant, coudes vers les hanches. Omoplates abaissées avant de tirer.",
            equipement: "Machine lat pulldown",
            chargePhase1: "30–35 kg",
            emoji: "🏋️",
            videoId: "CAwf7n6Luuc",
            videoLabel: "Lat pulldown prise large"
          },
          {
            id: "rowing_cable",
            nom: "Rowing câble assis prise neutre",
            sets: 3, reps: 12, repos: 60,
            kcal: 60,
            muscles: ["Dos", "Rhomboïdes", "Biceps"],
            diastasisSafe: true,
            consigne: "Omoplates rapprochées à la fin du mouvement, ventre engagé tout au long. Dos droit.",
            equipement: "Câble poulie basse",
            chargePhase1: "25–30 kg",
            emoji: "🚣",
            videoId: "GZbfZ033f74",
            videoLabel: "Rowing câble assis"
          },
          {
            id: "epaules_halteres_assis",
            nom: "Développé épaules haltères assis (léger)",
            sets: 3, reps: 10, repos: 60,
            kcal: 50,
            muscles: ["Épaules", "Deltoïdes", "Triceps"],
            diastasisSafe: true,
            consigne: "Pas de lordose, expirer à la montée, dos bien appuyé contre le banc. Prise neutre recommandée.",
            chargePhase1: "6–8 kg / haltère",
            emoji: "🏆",
            videoId: "qEwKCR5JCog",
            videoLabel: "Développé épaules assis"
          },
          {
            id: "elev_laterales",
            nom: "Élévations latérales haltères",
            sets: 3, reps: 12, repos: 45,
            kcal: 40,
            muscles: ["Deltoïde moyen"],
            diastasisSafe: true,
            consigne: "Coudes légèrement fléchis, tempo 2-1-2. Monter jusqu'à l'horizontale, pas plus haut.",
            chargePhase1: "4–5 kg / haltère",
            emoji: "🦅",
            videoId: "3VcKaXpzqRo",
            videoLabel: "Élévations latérales"
          },
          {
            id: "curl_halteres",
            nom: "Curl biceps haltères alternés",
            sets: 3, reps: 12, repos: 45,
            kcal: 40,
            muscles: ["Biceps"],
            diastasisSafe: true,
            consigne: "Pas de balancement du buste, contraction volontaire en supination. Coude fixe.",
            chargePhase1: "6–8 kg / haltère",
            emoji: "💪",
            videoId: "ykJmrZ5v0Oo",
            videoLabel: "Curl biceps alternés"
          },
          {
            id: "bird_dog",
            nom: "Bird-Dog (4 pattes — bras + jambe opposés)",
            sets: 2, reps: "10/côté", repos: 30,
            kcal: 25,
            muscles: ["Core profond", "Transverse", "Fessiers"],
            diastasisSafe: true,
            consigne: "Colonne neutre, engagement transverse AVANT le mouvement. Extension lente, retour contrôlé.",
            categorie: "core_diastasis",
            emoji: "🐦",
            videoId: "wiFNA3sqjCA",
            videoLabel: "Bird-Dog core"
          },
        ],
      },

      JEUDI: {
        label: "Bas du corps",
        subtitle: "Fessiers + Cuisses + Core diastasis-safe",
        duree: 40,
        kcalTotal: 283,
        exercices: [
          {
            id: "transverse_dead_bug",
            nom: "Activation transverse + Dead Bug",
            sets: 2, reps: "10/côté", repos: 20,
            kcal: 30,
            muscles: ["Transverse", "Core profond"],
            diastasisSafe: true,
            priorite: true,
            consigne: "Lombaires PLAQUÉES au sol, expiration contrôlée à chaque mouvement. Si le bas du dos se décolle → stop.",
            categorie: "core_diastasis",
            emoji: "🫁",
            videoId: "4ZRimFD4lEM",
            videoLabel: "Dead Bug activation transverse"
          },
          {
            id: "glute_bridge",
            nom: "Pont fessier Glute Bridge (sol)",
            sets: 3, reps: 15, repos: 45,
            kcal: 50,
            muscles: ["Fessiers", "Ischio-jambiers", "Plancher pelvien"],
            diastasisSafe: true,
            consigne: "Serrer les fessiers, expirer en montant, maintien 1s en haut. Pieds à largeur de hanches.",
            categorie: "fessiers",
            emoji: "🍑",
            videoId: "wPM8icPu6H8",
            videoLabel: "Glute Bridge"
          },
          {
            id: "presse_cuisses",
            nom: "Presse à cuisses (charge légère, pieds hauts)",
            sets: 3, reps: 15, repos: 60,
            kcal: 85,
            muscles: ["Quadriceps", "Fessiers"],
            diastasisSafe: true,
            consigne: "Dos plaqué sur le siège, éviter d'écraser les lombaires. Pieds hauts = focus fessiers.",
            equipement: "Machine leg press",
            chargePhase1: "50–60 kg",
            emoji: "🦵",
            videoId: "IZxyjW7MPJQ",
            videoLabel: "Leg press pieds hauts"
          },
          {
            id: "abduction_machine",
            nom: "Abduction hanche machine",
            sets: 3, reps: 20, repos: 45,
            kcal: 50,
            muscles: ["Fessier moyen", "Hanches"],
            diastasisSafe: true,
            consigne: "Contrôle lent, pas d'élan, contraction latérale à la fin. Expiration à l'ouverture.",
            equipement: "Machine abduction",
            chargePhase1: "25–30 kg",
            emoji: "⬅️",
            videoId: "p7MEfS0RSEM",
            videoLabel: "Abduction machine"
          },
          {
            id: "planche_genoux",
            nom: "Planche sur genoux (isométrique)",
            sets: 3, reps: "25s", repos: 30,
            kcal: 20,
            muscles: ["Transverse", "Core"],
            diastasisSafe: true,
            consigne: "Hanches à hauteur des épaules, ventre engagé, respiration NORMALE pendant l'effort. Ne pas retenir son souffle.",
            categorie: "core_diastasis",
            emoji: "🛡️",
            videoId: "yeKv5ML5yD4",
            videoLabel: "Planche sur genoux diastasis-safe"
          },
          {
            id: "gainage_lateral_genoux",
            nom: "Gainage latéral sur genoux",
            sets: 3, reps: "20s/côté", repos: 30,
            kcal: 18,
            muscles: ["Obliques", "Core latéral"],
            diastasisSafe: true,
            consigne: "Corps aligné épaule-hanche-genou, respiration normale, éviter de chuter les hanches.",
            categorie: "core_diastasis",
            emoji: "⬛",
            videoId: "7nz5EBNHiAQ",
            videoLabel: "Gainage latéral sur genoux"
          },
        ],
      },

      VENDREDI: {
        label: "Corps entier",
        subtitle: "Force + Gainage + Fonctionnel",
        duree: 60,
        kcalTotal: 530,
        exercices: [
          { id: "activation_v", nom: "Activation transverse + Respiration 360°", sets: 3, reps: "8 resp", repos: 20, kcal: 20, muscles: ["Transverse"], diastasisSafe: true, priorite: true, consigne: "Même protocole que mardi. Sentir la cage thoracique s'élargir latéralement.", emoji: "🫁", videoId: "RUMrVJaYkEA" },
          { id: "squat_goblet", nom: "Squat goblet (haltère ou kettlebell)", sets: 3, reps: 12, repos: 60, kcal: 95, muscles: ["Quadriceps", "Fessiers", "Core"], diastasisSafe: true, consigne: "Haltère contre le sternum, dos droit, genoux dans l'axe des orteils. Expirer en montant.", chargePhase1: "12–16 kg", emoji: "🏋️", videoId: "MxsFDhcyFyE", videoLabel: "Squat goblet" },
          { id: "fentes_statiques", nom: "Fentes statiques (sur place)", sets: 3, reps: "10/jambe", repos: 60, kcal: 80, muscles: ["Quadriceps", "Fessiers", "Ischio"], diastasisSafe: true, consigne: "Tronc vertical, genou arrière proche du sol. Pas de translation avant du genou.", chargePhase1: "Poids du corps", emoji: "🦶", videoId: "D7KaRcUTQeE", videoLabel: "Fentes statiques" },
          { id: "sdt_roumain", nom: "Soulevé de terre roumain haltères", sets: 3, reps: 12, repos: 60, kcal: 90, muscles: ["Ischio-jambiers", "Fessiers", "Dos bas"], diastasisSafe: true, consigne: "Hanches en arrière, dos plat, genoux légèrement fléchis. Haltères proches du corps. EXPIRER en montant.", chargePhase1: "2×10–14 kg", emoji: "⚡", videoId: "jEy_czb3RKA", videoLabel: "SDT roumain haltères" },
          { id: "rowing_unilateral", nom: "Rowing unilatéral haltère (appui banc)", sets: 3, reps: "10/côté", repos: 45, kcal: 70, muscles: ["Grand dorsal", "Biceps", "Rhomboïdes"], diastasisSafe: true, consigne: "Main et genou au banc, coude vers le plafond. Ventre engagé durant tout le set.", chargePhase1: "14–16 kg", emoji: "🚣", videoId: "pYcpY20QaE8", videoLabel: "Rowing unilatéral" },
          { id: "tirage_face", nom: "Tirage face (face pull câble)", sets: 3, reps: 15, repos: 45, kcal: 50, muscles: ["Deltoïde postérieur", "Trapèze"], diastasisSafe: true, consigne: "Coudes hauts, poignets vers les oreilles. Concentration sur les muscles arrière de l'épaule.", chargePhase1: "10–15 kg", emoji: "🎯", videoId: "rep-qVOkqgk", videoLabel: "Face pull câble" },
          { id: "step_up", nom: "Step-up (montée de marche)", sets: 3, reps: "10/jambe", repos: 45, kcal: 75, muscles: ["Fessiers", "Quadriceps"], diastasisSafe: true, consigne: "Pousser sur le talon de la jambe haute, corps droit. Haltères optionnels.", chargePhase1: "2×5–8 kg", emoji: "📈", videoId: "dQqApCGd5Ss", videoLabel: "Step-up" },
          { id: "dead_bug_advanced", nom: "Dead Bug progression (bras + jambe)", sets: 2, reps: "12/côté", repos: 30, kcal: 25, muscles: ["Transverse", "Core profond"], diastasisSafe: true, consigne: "Progression du jeudi. Ajouter un léger poids si aucune douleur lombo-pelvienne.", categorie: "core_diastasis", emoji: "🐛", videoId: "4ZRimFD4lEM" },
          { id: "extension_triceps", nom: "Extension triceps poulie haute", sets: 3, reps: 12, repos: 45, kcal: 35, muscles: ["Triceps"], diastasisSafe: true, consigne: "Coudes fixés, extension complète, contraction en bas. Expirer à l'extension.", chargePhase1: "12–18 kg", emoji: "💪", videoId: "2-LAMcpzODU", videoLabel: "Extension triceps" },
        ],
      },

      SAMEDI: {
        label: "Bas du corps +",
        subtitle: "Fessiers focus + Cardio doux",
        duree: 60,
        kcalTotal: 495,
        exercices: [
          { id: "activation_s", nom: "Activation transverse + Dead Bug", sets: 2, reps: "10/côté", repos: 20, kcal: 25, muscles: ["Transverse"], diastasisSafe: true, priorite: true, consigne: "Reprise du protocole jeudi. Qualité d'activation avant tout.", emoji: "🫁", videoId: "4ZRimFD4lEM" },
          { id: "pont_1jambe", nom: "Pont fessier 1 jambe (progression glute bridge)", sets: 3, reps: "12/jambe", repos: 45, kcal: 60, muscles: ["Fessiers", "Ischio", "Core"], diastasisSafe: true, consigne: "Jambe non-active tendue, monter les hanches par poussée de la jambe d'appui. Stabilisation du bassin.", emoji: "🍑", videoId: "wPM8icPu6H8" },
          { id: "fentes_marchees", nom: "Fentes marchées (walking lunges)", sets: 3, reps: "12/jambe", repos: 60, kcal: 85, muscles: ["Fessiers", "Quadriceps", "Ischio"], diastasisSafe: true, consigne: "Pas larges, tronc vertical. Alterner les jambes. Poids de corps ou haltères légers.", chargePhase1: "Poids du corps", emoji: "🚶", videoId: "L8fvypPrzzs", videoLabel: "Walking lunges" },
          { id: "leg_curl", nom: "Leg curl machine allongé", sets: 3, reps: 12, repos: 60, kcal: 75, muscles: ["Ischio-jambiers"], diastasisSafe: true, consigne: "Bassin plaqué sur la machine, flexion contrôlée. Expiration à la flexion.", equipement: "Machine leg curl", chargePhase1: "20–25 kg", emoji: "🦵", videoId: "1Tq3QdYUuHs", videoLabel: "Leg curl machine" },
          { id: "adduction_machine", nom: "Adduction hanche machine", sets: 3, reps: 20, repos: 45, kcal: 45, muscles: ["Adducteurs", "Face interne cuisse"], diastasisSafe: true, consigne: "Fermeture lente et contrôlée. Expiration à la fermeture.", equipement: "Machine adduction", chargePhase1: "20–25 kg", emoji: "➡️", videoId: "EwvEb5Vhrs4", videoLabel: "Adduction machine" },
          { id: "hip_thrust_intro", nom: "Hip thrust barre (initiation — charge légère)", sets: 3, reps: 12, repos: 60, kcal: 80, muscles: ["Fessiers", "Ischio", "Plancher pelvien"], diastasisSafe: true, consigne: "Dos sur banc, barre sur les hanches (serviette). Extension complète, menton rentré. Expirer en haut.", equipement: "Barre + banc", chargePhase1: "20–30 kg", emoji: "🚀", videoId: "xDmFkJxPzeM", videoLabel: "Hip thrust initiation" },
          { id: "elliptique_p1", nom: "Elliptique ou marche inclinée (15 min)", sets: 1, reps: "15 min", repos: 0, kcal: 95, muscles: ["Cardio", "Membres inférieurs"], diastasisSafe: true, consigne: "Rythme conversationnel (zone 2), ventilation abdominale. Pas d'essoufflement excessif.", emoji: "🏃", videoId: null },
          { id: "gainage_lateral_v2", nom: "Gainage latéral sur genoux — progression", sets: 3, reps: "25s/côté", repos: 30, kcal: 20, muscles: ["Obliques", "Core"], diastasisSafe: true, consigne: "Augmentation du temps par rapport à jeudi. Maintenir la stabilité du bassin.", emoji: "⬛", videoId: "7nz5EBNHiAQ" },
        ],
      },

      DIMANCHE: {
        label: "Haut du corps +",
        subtitle: "Push/Pull + Core avancé + Étirements",
        duree: 60,
        kcalTotal: 450,
        exercices: [
          { id: "activation_d", nom: "Activation transverse — Respiration latérale", sets: 3, reps: "10 resp", repos: 20, kcal: 20, muscles: ["Transverse"], diastasisSafe: true, priorite: true, consigne: "Variante : mains sur les côtés de la cage thoracique. Sentir les côtes s'écarter latéralement.", emoji: "🫁", videoId: "RUMrVJaYkEA" },
          { id: "tirage_serre", nom: "Tirage vertical prise serrée (undergrip)", sets: 4, reps: 10, repos: 60, kcal: 75, muscles: ["Grand dorsal", "Biceps"], diastasisSafe: true, consigne: "Prise supination, coudes proches du corps. Amplitude complète, étirement en haut.", chargePhase1: "28–33 kg", emoji: "🏋️", videoId: "CAwf7n6Luuc" },
          { id: "dev_couche", nom: "Développé couché haltères (prise neutre)", sets: 3, reps: 12, repos: 60, kcal: 75, muscles: ["Pectoraux", "Triceps", "Deltoïde antérieur"], diastasisSafe: true, consigne: "Prise neutre (pouces vers le visage), coudes à 45° du corps. Expirer à la poussée.", chargePhase1: "2×10–12 kg", emoji: "💪", videoId: "VmB1G1K7v94", videoLabel: "Développé couché haltères" },
          { id: "pull_over", nom: "Pull-over haltère (dos à plat)", sets: 3, reps: 12, repos: 45, kcal: 60, muscles: ["Grand dorsal", "Dentelé", "Pectoraux"], diastasisSafe: true, consigne: "Dos à plat sur le banc, ne pas cambrer. Arc de cercle contrôlé, expiration en revenant.", chargePhase1: "10–12 kg", emoji: "🌙", videoId: "FK4rHpWC4Cg", videoLabel: "Pull-over haltère" },
          { id: "elev_frontales", nom: "Élévations frontales alternées", sets: 3, reps: "10/côté", repos: 45, kcal: 40, muscles: ["Deltoïde antérieur"], diastasisSafe: true, consigne: "Pouce vers le haut, montée jusqu'à l'horizontale. Contrôle de la descente.", chargePhase1: "4–6 kg / haltère", emoji: "⬆️", videoId: "gYbSNmHBnvE", videoLabel: "Élévations frontales" },
          { id: "curl_ez", nom: "Curl EZ (barre EZ)", sets: 3, reps: 12, repos: 45, kcal: 45, muscles: ["Biceps", "Brachial"], diastasisSafe: true, consigne: "Coudes fixes sur les côtés, supination complète. Pause en bas.", chargePhase1: "15–20 kg", emoji: "💪", videoId: "kwG2ipFRgfo", videoLabel: "Curl barre EZ" },
          { id: "dips_banc", nom: "Dips sur banc (poids du corps)", sets: 3, reps: 10, repos: 60, kcal: 55, muscles: ["Triceps", "Pectoraux bas"], diastasisSafe: true, consigne: "Dos près du banc, coudes vers l'arrière. Descente à 90°, expiration en poussant.", emoji: "⬇️", videoId: "0326dy_-CzM", videoLabel: "Dips sur banc" },
          { id: "pallof_cable", nom: "Pallof press câble (anti-rotation)", sets: 3, reps: "10/côté", repos: 30, kcal: 30, muscles: ["Transverse", "Obliques", "Core"], diastasisSafe: true, consigne: "Résister à la rotation = SEUL mouvement autorisé pour les obliques en P1. Expiration à la poussée.", categorie: "core_diastasis", emoji: "🎯", videoId: "AH_QZLm_0-s", videoLabel: "Pallof press anti-rotation" },
          { id: "etirements", nom: "Étirements actifs (dos, épaules, ischio)", sets: 1, reps: "10 min", repos: 0, kcal: 25, muscles: ["Tout le corps"], diastasisSafe: true, consigne: "Étirements en respiration abdominale. Aucun étirement brusque.", emoji: "🧘", videoId: null },
        ],
      },

      MERCREDI: {
        label: "Cardio doux",
        subtitle: "Marche / Yoga / Mobilité",
        duree: 50,
        kcalTotal: 185,
        repos: false,
        exercices: [
          { id: "marche_rapide", nom: "Marche rapide ou nordique (30 min)", sets: 1, reps: "30 min", repos: 0, kcal: 120, muscles: ["Cardio"], diastasisSafe: true, consigne: "Zone 2 cardiaque. Respiration nasale si possible. Bonne posture.", emoji: "🚶" },
          { id: "yoga_mobilite", nom: "Yoga / mobilité (20 min)", sets: 1, reps: "20 min", repos: 0, kcal: 65, muscles: ["Flexibilité", "Core"], diastasisSafe: true, consigne: "Éviter les poses de torsion profondes et les postures inversées si diastasis > 2 cm.", emoji: "🧘" },
        ],
      },

      LUNDI: {
        label: "Repos actif",
        subtitle: "Récupération",
        duree: null,
        kcalTotal: 70,
        repos: true,
        exercices: [
          { id: "marche_douce", nom: "Marche douce ou vélo léger (30 min optionnel)", sets: 1, reps: "30 min", repos: 0, kcal: 70, muscles: ["Cardio léger"], diastasisSafe: true, consigne: "Récupération active. Pas d'effort intense.", emoji: "🌿" },
        ],
      },
    },
  },

  // ─── PHASE 2 : Semaines 5–8 ───────────────────────────────────────────
  phase2: {
    label: "Activation & Progression",
    semaines: [5, 6, 7, 8],
    intensite: "65–70% 1RM",
    color: "#E85D26",
    description: "Augmentation progressive des charges (+10–15%), ajout de supersets, consolidation des patterns.",
    seances: {
      MARDI: {
        label: "Haut du corps",
        subtitle: "Dos + Épaules + Bras + Supersets",
        duree: 40,
        kcalTotal: 370,
        exercices: [
          { id: "transverse_p2", nom: "Activation transverse + Pallof latéral", sets: 3, reps: "12 resp", repos: 20, kcal: 30, muscles: ["Transverse", "Core"], diastasisSafe: true, priorite: true, consigne: "Variation : respiration latérale avec bande résistance autour des cuisses.", emoji: "🫁", videoId: "RUMrVJaYkEA" },
          { id: "lat_pulldown_p2", nom: "Tirage vertical large — 4 séries", sets: 4, reps: 10, repos: 75, kcal: 90, muscles: ["Grand dorsal", "Biceps"], diastasisSafe: true, consigne: "Même technique, charges augmentées. Tempo 3-1-2 (descente 3s).", chargePhase2: "37–42 kg", emoji: "🏋️", videoId: "CAwf7n6Luuc" },
          { id: "superset_row_fly", nom: "SUPERSET : Rowing câble + Élév. latérales", sets: 4, reps: "10+12", repos: 60, kcal: 80, muscles: ["Dos", "Épaules"], diastasisSafe: true, consigne: "Enchaîner sans repos entre les deux exercices. 60s après le superset.", chargePhase2: "28–33 kg / 5–6 kg", emoji: "⚡", videoId: "GZbfZ033f74" },
          { id: "dev_epaules_p2", nom: "Développé militaire haltères (debout)", sets: 4, reps: 10, repos: 60, kcal: 65, muscles: ["Épaules", "Triceps", "Stabilisateurs"], diastasisSafe: true, consigne: "Debout = activation accrue des stabilisateurs. Gainage permanent, expiration à la poussée.", chargePhase2: "8–10 kg / haltère", emoji: "🏆", videoId: "qEwKCR5JCog" },
          { id: "superset_curl_ext", nom: "SUPERSET : Curl EZ + Extension triceps", sets: 4, reps: "10+10", repos: 60, kcal: 75, muscles: ["Biceps", "Triceps"], diastasisSafe: true, consigne: "Biceps puis triceps. Antagonistes = récupération active.", chargePhase2: "18–22 kg / 18–22 kg", emoji: "💪", videoId: "ykJmrZ5v0Oo" },
          { id: "bird_dog_charge", nom: "Bird-Dog avec bande résistance", sets: 3, reps: "12/côté", repos: 30, kcal: 30, muscles: ["Core profond", "Fessiers"], diastasisSafe: true, consigne: "Bande autour des chevilles. Progression naturelle du bird-dog standard.", categorie: "core_diastasis", emoji: "🐦", videoId: "wiFNA3sqjCA" },
        ],
      },
      JEUDI: {
        label: "Bas du corps",
        subtitle: "Fessiers + Hypertrophie + Core",
        duree: 40,
        kcalTotal: 320,
        exercices: [
          { id: "dead_bug_p2", nom: "Dead Bug + bande résistance bras", sets: 3, reps: "12/côté", repos: 20, kcal: 35, muscles: ["Transverse", "Core"], diastasisSafe: true, priorite: true, consigne: "Bande de résistance aux poignets. Maintien de la stabilité accru.", emoji: "🐛", videoId: "4ZRimFD4lEM" },
          { id: "hip_thrust_p2", nom: "Hip thrust barre — 4 séries", sets: 4, reps: 12, repos: 60, kcal: 100, muscles: ["Fessiers", "Ischio", "Plancher pelvien"], diastasisSafe: true, consigne: "Charge augmentée. Focus sur la contraction maximale en haut, maintien 2s.", chargePhase2: "35–45 kg", emoji: "🚀", videoId: "xDmFkJxPzeM" },
          { id: "squat_barre_p2", nom: "Squat barre (prise haute ou goblet guidé)", sets: 4, reps: 10, repos: 75, kcal: 105, muscles: ["Quadriceps", "Fessiers", "Core"], diastasisSafe: true, consigne: "Si première fois avec barre : commencer avec goblet pour vérifier la maîtrise technique.", chargePhase2: "30–40 kg", emoji: "🏋️", videoId: "ultWZbUMPL8", videoLabel: "Back squat" },
          { id: "leg_press_p2", nom: "Presse à cuisses pieds hauts — 4 séries", sets: 4, reps: 12, repos: 75, kcal: 100, muscles: ["Fessiers", "Quadriceps"], diastasisSafe: true, consigne: "Augmentation de 15–20% vs phase 1. Toujours dos plaqué.", chargePhase2: "70–80 kg", emoji: "🦵", videoId: "IZxyjW7MPJQ" },
          { id: "abduction_p2", nom: "Abduction + Adduction machine (enchaîné)", sets: 3, reps: "15+15", repos: 45, kcal: 60, muscles: ["Fessier moyen", "Adducteurs"], diastasisSafe: true, consigne: "Superset abduction/adduction sur le même siège. Efficacité maximale.", chargePhase2: "30–35 kg", emoji: "↔️", videoId: "p7MEfS0RSEM" },
          { id: "planche_sur_genoux_p2", nom: "Planche sur genoux — 35 secondes", sets: 3, reps: "35s", repos: 30, kcal: 25, muscles: ["Transverse", "Core"], diastasisSafe: true, consigne: "10 secondes de plus vs phase 1. Respiration continuellement normale.", categorie: "core_diastasis", emoji: "🛡️", videoId: "yeKv5ML5yD4" },
        ],
      },
      VENDREDI: {
        label: "Corps entier",
        subtitle: "Force + Supersets + Cardio HIIT doux",
        duree: 60,
        kcalTotal: 580,
        exercices: [
          { id: "activation_v2", nom: "Activation complète transverse (5 min)", sets: 3, reps: "10 resp", repos: 20, kcal: 25, muscles: ["Transverse"], diastasisSafe: true, priorite: true, consigne: "Respiration 360° + activation pelvienne avant chaque séance corps entier.", emoji: "🫁", videoId: "RUMrVJaYkEA" },
          { id: "squat_goblet_p2", nom: "Squat goblet lourd (KB ou haltère)", sets: 4, reps: 10, repos: 75, kcal: 110, muscles: ["Quadriceps", "Fessiers", "Core"], diastasisSafe: true, consigne: "Charge maximale pour 10 reps propres. Talons au sol, genoux ouverts.", chargePhase2: "20–24 kg", emoji: "⬆️", videoId: "MxsFDhcyFyE" },
          { id: "sdt_roumain_p2", nom: "Soulevé de terre roumain barre", sets: 4, reps: 10, repos: 75, kcal: 110, muscles: ["Ischio", "Fessiers", "Dos"], diastasisSafe: true, consigne: "Transition haltères → barre. Même principe, amplitude légèrement réduite si besoin.", chargePhase2: "40–50 kg", emoji: "⚡", videoId: "jEy_czb3RKA" },
          { id: "superset_row_tirage", nom: "SUPERSET : Rowing unilatéral + Face pull", sets: 4, reps: "10+15", repos: 60, kcal: 100, muscles: ["Dos", "Épaules arrière"], diastasisSafe: true, consigne: "Chaîne postérieure complète. Maintien du gainage entre les exercices.", chargePhase2: "18–20 kg / 15–20 kg", emoji: "🚣", videoId: "pYcpY20QaE8" },
          { id: "fentes_marchees_p2", nom: "Fentes marchées avec haltères", sets: 3, reps: "12/jambe", repos: 60, kcal: 95, muscles: ["Fessiers", "Quadriceps"], diastasisSafe: true, consigne: "Ajout de poids vs phase 1. Maintenir tronc vertical.", chargePhase2: "2×8–10 kg", emoji: "🚶", videoId: "L8fvypPrzzs" },
          { id: "step_up_p2", nom: "Step-up avec haltères lourds", sets: 3, reps: "10/jambe", repos: 60, kcal: 90, muscles: ["Fessiers", "Quadriceps"], diastasisSafe: true, consigne: "Priorité à la poussée du talon. Hanche arrière abaissée.", chargePhase2: "2×10–12 kg", emoji: "📈", videoId: "dQqApCGd5Ss" },
          { id: "cardio_hiit_doux", nom: "Cardio HIIT doux (vélo ou elliptique 15 min)", sets: 1, reps: "15 min", repos: 0, kcal: 120, muscles: ["Cardio"], diastasisSafe: true, consigne: "Intervalles : 40s effort modéré / 20s repos. Zone 3 maximum.", emoji: "🏃", videoId: null },
          { id: "dead_bug_p2b", nom: "Dead Bug avec bandes (fin de séance)", sets: 2, reps: "12/côté", repos: 30, kcal: 30, muscles: ["Core"], diastasisSafe: true, consigne: "Finir par le core. Maintenir la qualité même en fatigue.", emoji: "🐛", videoId: "4ZRimFD4lEM" },
        ],
      },
      SAMEDI: {
        label: "Bas du corps +",
        subtitle: "Hypertrophie fessiers + Endurance musculaire",
        duree: 60,
        kcalTotal: 540,
        exercices: [
          { id: "act_s2", nom: "Activation + Travail proprioceptif", sets: 2, reps: "10/côté", repos: 20, kcal: 25, muscles: ["Core"], diastasisSafe: true, priorite: true, consigne: "Ajout d'un exercice d'équilibre sur une jambe (30s) après le dead bug.", emoji: "⚖️", videoId: "4ZRimFD4lEM" },
          { id: "hip_thrust_lourd", nom: "Hip thrust barre lourd — Pause 2s", sets: 5, reps: 10, repos: 75, kcal: 130, muscles: ["Fessiers"], diastasisSafe: true, consigne: "5 séries ! Pause de 2s en contraction maximale. C'est la séance reine des fessiers.", chargePhase2: "45–55 kg", emoji: "🚀", videoId: "xDmFkJxPzeM" },
          { id: "fentes_bulgares", nom: "Fentes bulgares (pied arrière surélevé)", sets: 3, reps: "10/jambe", repos: 75, kcal: 95, muscles: ["Fessiers", "Quadriceps", "Équilibre"], diastasisSafe: true, consigne: "Pied arrière sur le banc. Descente verticale. Gainage actif.", chargePhase2: "2×8–10 kg", emoji: "🦶", videoId: "2C-uNgKwPLE", videoLabel: "Fentes bulgares" },
          { id: "leg_curl_p2", nom: "Leg curl machine — Tempo lent", sets: 4, reps: 10, repos: 60, kcal: 85, muscles: ["Ischio-jambiers"], diastasisSafe: true, consigne: "Tempo 3-1-3 (flexion 3s, pause 1s, extension 3s). Intensification maximale.", chargePhase2: "28–33 kg", emoji: "🦵", videoId: "1Tq3QdYUuHs" },
          { id: "abduction_elastique", nom: "Abduction avec élastique (debout, lateral walk)", sets: 3, reps: "15/côté", repos: 45, kcal: 50, muscles: ["Fessier moyen"], diastasisSafe: true, consigne: "Élastique aux chevilles ou genoux. Marche latérale 15 pas de chaque côté.", emoji: "🔴", videoId: "p7MEfS0RSEM" },
          { id: "rdl_1jambe", nom: "Soulevé de terre 1 jambe (haltère léger)", sets: 3, reps: "10/jambe", repos: 60, kcal: 75, muscles: ["Ischio", "Fessiers", "Équilibre"], diastasisSafe: true, consigne: "Progression du SDT roumain. Équilibre sur une jambe. Hanches parallèles au sol.", chargePhase2: "10–14 kg", emoji: "🦩", videoId: "jEy_czb3RKA" },
          { id: "cardio_p2s", nom: "Cardio elliptique (20 min zone 2)", sets: 1, reps: "20 min", repos: 0, kcal: 110, muscles: ["Cardio"], diastasisSafe: true, consigne: "Augmentation de 5 min vs phase 1.", emoji: "🏃", videoId: null },
        ],
      },
      DIMANCHE: {
        label: "Haut du corps +",
        subtitle: "Force + Volume + Étirements",
        duree: 60,
        kcalTotal: 490,
        exercices: [
          { id: "act_d2", nom: "Activation + Respiration charge légère", sets: 3, reps: "10 resp", repos: 20, kcal: 25, muscles: ["Transverse"], diastasisSafe: true, priorite: true, consigne: "Haltère léger en mains pendant la respiration 360°.", emoji: "🫁", videoId: "RUMrVJaYkEA" },
          { id: "lat_serre_p2", nom: "Tirage vertical prise serrée — 4 séries", sets: 4, reps: 10, repos: 75, kcal: 95, muscles: ["Grand dorsal", "Biceps"], diastasisSafe: true, consigne: "Amplitude maximale. Poitrine vers la barre.", chargePhase2: "33–38 kg", emoji: "🏋️", videoId: "CAwf7n6Luuc" },
          { id: "dev_couche_p2", nom: "Développé couché haltères lourds", sets: 4, reps: 10, repos: 75, kcal: 90, muscles: ["Pectoraux", "Triceps"], diastasisSafe: true, consigne: "Pause 1s en bas, explosion à la poussée. Expiration complète.", chargePhase2: "2×13–16 kg", emoji: "💪", videoId: "VmB1G1K7v94" },
          { id: "rowing_barre_p2", nom: "Rowing barre (penché, prise pronation)", sets: 4, reps: 10, repos: 75, kcal: 95, muscles: ["Dos", "Biceps", "Trapèze"], diastasisSafe: true, consigne: "Dos plat, buste incliné à 45°. Tirer vers le nombril. Gainage abdominal actif.", chargePhase2: "35–45 kg", emoji: "🚣", videoId: "FWJR5Ve8bnQ", videoLabel: "Rowing barre" },
          { id: "laterales_p2", nom: "Élévations latérales 21s (7+7+7)", sets: 3, reps: "21", repos: 60, kcal: 50, muscles: ["Deltoïde moyen"], diastasisSafe: true, consigne: "7 reps bas, 7 reps haut, 7 reps complet. Technique avancée.", chargePhase2: "5–7 kg", emoji: "🦅", videoId: "3VcKaXpzqRo" },
          { id: "pallof_p2", nom: "Pallof press — 3 directions", sets: 3, reps: "12/côté", repos: 30, kcal: 40, muscles: ["Transverse", "Obliques", "Core"], diastasisSafe: true, consigne: "Pousser en avant, en haut, en diagonale. Variété pour le gainage anti-rotation.", categorie: "core_diastasis", emoji: "🎯", videoId: "AH_QZLm_0-s" },
          { id: "etirements_p2", nom: "Étirements actifs + Foam roller (10 min)", sets: 1, reps: "10 min", repos: 0, kcal: 30, muscles: ["Tout le corps"], diastasisSafe: true, consigne: "Foam roller : dos, IT-band, mollets. Étirements passifs 30s chacun.", emoji: "🧘", videoId: null },
        ],
      },
      MERCREDI: {
        label: "Cardio doux",
        subtitle: "Marche / Vélo / Mobilité",
        duree: 50,
        kcalTotal: 200,
        repos: false,
        exercices: [
          { id: "marche_p2", nom: "Marche rapide ou vélo (35 min)", sets: 1, reps: "35 min", repos: 0, kcal: 145, muscles: ["Cardio"], diastasisSafe: true, consigne: "+5 min vs phase 1. Maintenir zone 2.", emoji: "🚴" },
          { id: "mobilite_p2", nom: "Yoga hip-hop ou mobilité (15 min)", sets: 1, reps: "15 min", repos: 0, kcal: 55, muscles: ["Flexibilité"], diastasisSafe: true, consigne: "Focus sur les hanches et les épaules.", emoji: "🧘" },
        ],
      },
      LUNDI: {
        label: "Repos actif",
        subtitle: "Récupération",
        duree: null,
        kcalTotal: 70,
        repos: true,
        exercices: [
          { id: "repos_p2", nom: "Repos total ou marche très douce", sets: 1, reps: "optionnel", repos: 0, kcal: 70, muscles: ["Récupération"], diastasisSafe: true, consigne: "La récupération est partie du programme.", emoji: "🌿" },
        ],
      },
    },
  },

  // ─── PHASE 3 : Semaines 9–12 ──────────────────────────────────────────
  phase3: {
    label: "Intensification & Sculpture",
    semaines: [9, 10, 11, 12],
    intensite: "75–80% 1RM",
    color: "#2E7D32",
    description: "Charges lourdes, techniques avancées (rest-pause, drop sets), cardio HIIT augmenté.",
    seances: {
      MARDI: {
        label: "Haut du corps — Force",
        subtitle: "Charges lourdes + Techniques avancées",
        duree: 40,
        kcalTotal: 400,
        exercices: [
          { id: "act_p3", nom: "Activation transverse intensifiée (6 min)", sets: 3, reps: "15 resp", repos: 15, kcal: 30, muscles: ["Core"], diastasisSafe: true, priorite: true, consigne: "Ajout de la progression : activation en position debout (wall press).", emoji: "🫁", videoId: "RUMrVJaYkEA" },
          { id: "lat_p3", nom: "Tirage vertical — Force (6–8 reps lourds)", sets: 5, reps: "6-8", repos: 90, kcal: 100, muscles: ["Grand dorsal", "Biceps"], diastasisSafe: true, consigne: "5 séries ! Charges maximales pour 6–8 reps. Repos complet entre les séries.", chargePhase3: "45–52 kg", emoji: "🏋️", videoId: "CAwf7n6Luuc" },
          { id: "rowing_barre_p3", nom: "Rowing barre lourd — Pause en haut", sets: 4, reps: 8, repos: 90, kcal: 95, muscles: ["Dos", "Trapèze"], diastasisSafe: true, consigne: "Pause de 1s en contraction. Charges les plus lourdes du programme.", chargePhase3: "50–60 kg", emoji: "🚣", videoId: "FWJR5Ve8bnQ" },
          { id: "militaire_p3", nom: "Développé militaire haltères — Force", sets: 4, reps: 8, repos: 90, kcal: 75, muscles: ["Épaules", "Triceps"], diastasisSafe: true, consigne: "Charges max pour 8 reps. Maintien gainage strict debout.", chargePhase3: "12–14 kg / haltère", emoji: "🏆", videoId: "qEwKCR5JCog" },
          { id: "drop_set_laterales", nom: "Élévations latérales DROP SET", sets: 3, reps: "10+10+10", repos: 75, kcal: 55, muscles: ["Deltoïde moyen"], diastasisSafe: true, consigne: "3 poids successifs sans repos. Ex: 8kg→6kg→4kg enchaîné.", chargePhase3: "8→6→4 kg", emoji: "🦅", videoId: "3VcKaXpzqRo" },
          { id: "rest_pause_curl", nom: "Curl biceps REST-PAUSE", sets: 3, reps: "8+4+4", repos: 75, kcal: 50, muscles: ["Biceps"], diastasisSafe: true, consigne: "8 reps lourdes, 20s repos, 4 reps, 20s repos, 4 reps. Technique avancée.", chargePhase3: "10–12 kg / haltère", emoji: "💪", videoId: "ykJmrZ5v0Oo" },
          { id: "planche_complete_p3", nom: "Planche complète (si kiné validé)", sets: 3, reps: "20s", repos: 30, kcal: 30, muscles: ["Core complet"], diastasisSafe: false, consigne: "⚠️ UNIQUEMENT si validation kiné à S8. Sinon rester sur planche genoux.", categorie: "core_diastasis", emoji: "🛡️", videoId: "yeKv5ML5yD4", prerequisKine: true },
        ],
      },
      JEUDI: {
        label: "Bas du corps — Hypertrophie",
        subtitle: "Volume maximum + Techniques avancées",
        duree: 40,
        kcalTotal: 370,
        exercices: [
          { id: "act_j3", nom: "Activation + Gainage debout (wall press)", sets: 3, reps: "10/côté", repos: 15, kcal: 35, muscles: ["Core"], diastasisSafe: true, priorite: true, consigne: "Wall press : pousser le mur avec les mains, activation transverse maximale.", emoji: "🧱", videoId: "RUMrVJaYkEA" },
          { id: "hip_thrust_p3", nom: "Hip thrust barre LOURD — 5×10", sets: 5, reps: 10, repos: 90, kcal: 135, muscles: ["Fessiers"], diastasisSafe: true, consigne: "5 séries ! Charges maximales pour 10 reps propres. La reine des séances fessiers.", chargePhase3: "55–65 kg", emoji: "🚀", videoId: "xDmFkJxPzeM" },
          { id: "squat_p3", nom: "Squat barre — Force (6–8 reps)", sets: 4, reps: "6-8", repos: 90, kcal: 120, muscles: ["Quadriceps", "Fessiers", "Core"], diastasisSafe: true, consigne: "Charges lourdes. Ceinture abdominale conseillée. EXPIRER en montant — pas de blocage Valsalva.", chargePhase3: "45–55 kg", emoji: "🏋️", videoId: "ultWZbUMPL8" },
          { id: "sdt_roumain_p3", nom: "SDT roumain barre + fentes bulgares (superset)", sets: 4, reps: "8+8", repos: 75, kcal: 110, muscles: ["Ischio", "Fessiers", "Quadriceps"], diastasisSafe: true, consigne: "Chaîne postérieure + quadriceps en superset. Fatigue maximale sur les jambes.", chargePhase3: "50–60 kg / 2×12 kg", emoji: "⚡", videoId: "jEy_czb3RKA" },
          { id: "leg_press_drop_p3", nom: "Leg press DROP SET (3 charges)", sets: 3, reps: "12+10+8", repos: 75, kcal: 110, muscles: ["Quadriceps", "Fessiers"], diastasisSafe: true, consigne: "Baisser la charge à chaque série enchaînée. Volume intense.", chargePhase3: "90→70→50 kg", emoji: "🦵", videoId: "IZxyjW7MPJQ" },
          { id: "gainage_dyn_p3", nom: "Gainage dynamique diastasis-safe (Copenhagen)", sets: 3, reps: "10/côté", repos: 30, kcal: 30, muscles: ["Adducteurs", "Core"], diastasisSafe: true, consigne: "Planche latérale avec montée du genou supérieur. Progression avancée.", categorie: "core_diastasis", emoji: "🔥", videoId: "7nz5EBNHiAQ" },
        ],
      },
      VENDREDI: {
        label: "Corps entier — Peak Force",
        subtitle: "Séance la plus intense du programme",
        duree: 60,
        kcalTotal: 620,
        exercices: [
          { id: "act_v3", nom: "Activation complète (6 min)", sets: 3, reps: "12 resp", repos: 15, kcal: 25, muscles: ["Core"], diastasisSafe: true, priorite: true, consigne: "Inclure l'activation debout et les dead bug.", emoji: "🫁", videoId: "RUMrVJaYkEA" },
          { id: "squat_force_p3", nom: "Squat barre — Record personnel", sets: 5, reps: "5-6", repos: 120, kcal: 130, muscles: ["Tout le bas du corps"], diastasisSafe: true, consigne: "Séance record. Charges max pour 5–6 reps. Sécurité prioritaire.", chargePhase3: "50–60 kg", emoji: "🏆", videoId: "ultWZbUMPL8" },
          { id: "dev_couche_p3", nom: "Développé couché barre ou haltères", sets: 5, reps: "6-8", repos: 120, kcal: 105, muscles: ["Pectoraux", "Triceps"], diastasisSafe: true, consigne: "Variante barre possible si technique solide.", chargePhase3: "2×16–20 kg ou barre 40–50 kg", emoji: "💪", videoId: "VmB1G1K7v94" },
          { id: "sdt_p3", nom: "Soulevé de terre barre (charge max)", sets: 5, reps: "5", repos: 120, kcal: 130, muscles: ["Tout le corps"], diastasisSafe: true, consigne: "⚠️ Priorité absolue à la technique. Dos plat, gainage abdominal. EXPIRER avant de tirer.", chargePhase3: "55–70 kg", emoji: "⚡", videoId: "op9kVnSso6Q", videoLabel: "Soulevé de terre barre" },
          { id: "rowing_force_p3", nom: "Rowing barre lourd", sets: 4, reps: 8, repos: 90, kcal: 100, muscles: ["Dos"], diastasisSafe: true, consigne: "Complémentaire au SDT. Chaîne postérieure totale.", chargePhase3: "55–65 kg", emoji: "🚣", videoId: "FWJR5Ve8bnQ" },
          { id: "hiit_p3", nom: "HIIT vélo (20 min 30/30)", sets: 1, reps: "20 min", repos: 0, kcal: 130, muscles: ["Cardio HIIT"], diastasisSafe: true, consigne: "30s sprint / 30s récupération. 20 cycles. Zone 4–5 pendant les sprints.", emoji: "🔥", videoId: null },
          { id: "core_final_p3", nom: "Série core finale (Pallof + Bird-Dog)", sets: 2, reps: "10+10", repos: 30, kcal: 30, muscles: ["Core"], diastasisSafe: true, consigne: "Core en fin de séance pour préserver la qualité.", emoji: "🎯", videoId: "AH_QZLm_0-s" },
        ],
      },
      SAMEDI: {
        label: "Bas du corps — Sculpture",
        subtitle: "Volume fessiers + Endurance",
        duree: 60,
        kcalTotal: 570,
        exercices: [
          { id: "act_s3", nom: "Activation + Mobilité ciblée", sets: 2, reps: "12/côté", repos: 15, kcal: 25, muscles: ["Core"], diastasisSafe: true, priorite: true, consigne: "Foam roller fessiers avant la séance.", emoji: "🎱", videoId: "4ZRimFD4lEM" },
          { id: "hip_thrust_rest_pause", nom: "Hip thrust — REST-PAUSE lourd", sets: 3, reps: "8+4+4", repos: 90, kcal: 115, muscles: ["Fessiers"], diastasisSafe: true, consigne: "Technique rest-pause : 8 reps → 20s repos → 4 → 20s → 4. Intensité max.", chargePhase3: "60–70 kg", emoji: "🚀", videoId: "xDmFkJxPzeM" },
          { id: "fentes_bulgares_p3", nom: "Fentes bulgares chargées", sets: 4, reps: "8/jambe", repos: 75, kcal: 110, muscles: ["Fessiers", "Quadriceps"], diastasisSafe: true, consigne: "Charges lourdes. Si déséquilibre latéral : corriger avant d'augmenter.", chargePhase3: "2×14–16 kg", emoji: "🦶", videoId: "2C-uNgKwPLE" },
          { id: "rdl_1jambe_p3", nom: "SDT 1 jambe barre légère", sets: 4, reps: "10/jambe", repos: 60, kcal: 90, muscles: ["Ischio", "Fessiers"], diastasisSafe: true, consigne: "Transition vers barre légère (technique ++).", chargePhase3: "15–20 kg", emoji: "🦩", videoId: "jEy_czb3RKA" },
          { id: "leg_curl_p3", nom: "Leg curl — drop set", sets: 3, reps: "10+8+6", repos: 60, kcal: 85, muscles: ["Ischio"], diastasisSafe: true, consigne: "3 charges successives décroissantes. Focus sur la flexion.", chargePhase3: "35→28→22 kg", emoji: "🦵", videoId: "1Tq3QdYUuHs" },
          { id: "abduction_superset_p3", nom: "Abduction élastique + Clamshell bande", sets: 3, reps: "20+20", repos: 45, kcal: 55, muscles: ["Fessier moyen"], diastasisSafe: true, consigne: "Superset isolation fessier moyen. Épuisement complet.", emoji: "🔴", videoId: "p7MEfS0RSEM" },
          { id: "cardio_p3s", nom: "Cardio LISS (25 min zone 2)", sets: 1, reps: "25 min", repos: 0, kcal: 115, muscles: ["Cardio"], diastasisSafe: true, consigne: "Zone 2 pour oxydation des graisses après la force.", emoji: "🏃", videoId: null },
        ],
      },
      DIMANCHE: {
        label: "Haut du corps — Volume",
        subtitle: "Hypertrophie complète",
        duree: 60,
        kcalTotal: 510,
        exercices: [
          { id: "act_d3", nom: "Activation + Pull-apart bande", sets: 3, reps: "15", repos: 15, kcal: 25, muscles: ["Core", "Épaules"], diastasisSafe: true, priorite: true, consigne: "Pull-apart bande de résistance : tenir en avant, écarter horizontalement.", emoji: "🎋", videoId: "RUMrVJaYkEA" },
          { id: "tirage_large_p3", nom: "Tirage lat large — Volume 5×8", sets: 5, reps: 8, repos: 90, kcal: 110, muscles: ["Grand dorsal"], diastasisSafe: true, consigne: "5 séries ! Technique impeccable à chaque répétition.", chargePhase3: "48–55 kg", emoji: "🏋️", videoId: "CAwf7n6Luuc" },
          { id: "dev_couche_d3", nom: "Développé couché — Volume 4×10", sets: 4, reps: 10, repos: 75, kcal: 95, muscles: ["Pectoraux"], diastasisSafe: true, consigne: "Retour au volume après la semaine de force.", chargePhase3: "2×14–17 kg", emoji: "💪", videoId: "VmB1G1K7v94" },
          { id: "pull_over_p3", nom: "Pull-over + Extension triceps (superset)", sets: 4, reps: "10+12", repos: 60, kcal: 80, muscles: ["Grand dorsal", "Triceps"], diastasisSafe: true, consigne: "Enchaîner les deux exercices. Grand dorsal + triceps long.", chargePhase3: "14–16 kg / 25–30 kg", emoji: "🌙", videoId: "FK4rHpWC4Cg" },
          { id: "superset_epaules_p3", nom: "SUPERSET épaules : frontales + latérales + arrière", sets: 3, reps: "10+10+10", repos: 75, kcal: 65, muscles: ["Épaules 3 faisceaux"], diastasisSafe: true, consigne: "Round the world épaules. Charges légères, contrôle maximum.", chargePhase3: "5–7 kg / 6–8 kg / 5 kg", emoji: "🦅", videoId: "3VcKaXpzqRo" },
          { id: "curl_hammer_p3", nom: "Curl hammer + Curl concentré (superset)", sets: 3, reps: "10+10", repos: 60, kcal: 55, muscles: ["Biceps"], diastasisSafe: true, consigne: "Brachial + pic du biceps. Double attaque.", chargePhase3: "10–12 kg", emoji: "🔨", videoId: "ykJmrZ5v0Oo" },
          { id: "pallof_avance_p3", nom: "Pallof + Press overhead anti-rotation", sets: 3, reps: "12/côté", repos: 30, kcal: 45, muscles: ["Core", "Obliques"], diastasisSafe: true, consigne: "Extension des bras vers le haut après la poussée horizontale. Difficulté ++.", categorie: "core_diastasis", emoji: "🎯", videoId: "AH_QZLm_0-s" },
          { id: "etirements_p3", nom: "Étirements + Foam roller complet (12 min)", sets: 1, reps: "12 min", repos: 0, kcal: 35, muscles: ["Tout le corps"], diastasisSafe: true, consigne: "Séance intensifiée → récupération soignée. Foam roller IT-band, quadriceps, dos.", emoji: "🧘", videoId: null },
        ],
      },
      MERCREDI: {
        label: "Cardio modéré",
        subtitle: "Zone 2 + Mobilité",
        duree: 55,
        kcalTotal: 230,
        repos: false,
        exercices: [
          { id: "cardio_m3", nom: "Vélo ou elliptique (40 min zone 2)", sets: 1, reps: "40 min", repos: 0, kcal: 185, muscles: ["Cardio"], diastasisSafe: true, consigne: "+5 min vs phase 2. Zone 2 = récupération active et oxydation.", emoji: "🚴" },
          { id: "mobilite_m3", nom: "Stretching ciblé fessiers/ischio (15 min)", sets: 1, reps: "15 min", repos: 0, kcal: 45, muscles: ["Flexibilité"], diastasisSafe: true, consigne: "Zones les plus sollicitées en P3.", emoji: "🧘" },
        ],
      },
      LUNDI: { label: "Repos actif", subtitle: "Récupération", duree: null, kcalTotal: 70, repos: true, exercices: [{ id: "repos_p3", nom: "Repos total", sets: 1, reps: "-", repos: 0, kcal: 70, muscles: ["Récupération"], diastasisSafe: true, consigne: "Récupération obligatoire avant semaine de force.", emoji: "🌿" }] },
    },
  },

  // ─── PHASE 4 : Semaines 13–16 ─────────────────────────────────────────
  phase4: {
    label: "Affinage & Consolidation",
    semaines: [13, 14, 15, 16],
    intensite: "Undulating Periodization",
    color: "#6A1B9A",
    description: "Alternance force/volume (UP), consolidation des acquis, préparation au programme de maintenance.",
    seances: {
      MARDI: {
        label: "Haut du corps — UP",
        subtitle: "Alternance Force (S13/15) & Volume (S14/16)",
        duree: 40,
        kcalTotal: 410,
        exercices: [
          { id: "act_p4", nom: "Activation transverse + Planche progression", sets: 3, reps: "15s→30s", repos: 15, kcal: 35, muscles: ["Core"], diastasisSafe: true, priorite: true, consigne: "Si kiné validé : planche complète progressive. Sinon genoux.", emoji: "🫁", videoId: "yeKv5ML5yD4" },
          { id: "lat_p4", nom: "Tirage lat (alternance: 5×6 force / 4×12 volume)", sets: 5, reps: "6 ou 12", repos: 90, kcal: 105, muscles: ["Grand dorsal"], diastasisSafe: true, consigne: "Semaines impaires = force (6 reps lourdes). Semaines paires = volume (12 reps).", chargePhase4: "50–55 kg / 40–45 kg", emoji: "🏋️", videoId: "CAwf7n6Luuc" },
          { id: "rowing_p4", nom: "Rowing barre (même alternance UP)", sets: 4, reps: "6 ou 10", repos: 90, kcal: 100, muscles: ["Dos", "Biceps"], diastasisSafe: true, consigne: "Même principe d'alternance. Charges maximales sur les semaines force.", chargePhase4: "58–68 kg / 48–55 kg", emoji: "🚣", videoId: "FWJR5Ve8bnQ" },
          { id: "militaire_p4", nom: "Développé militaire haltères lourd", sets: 4, reps: "6-8", repos: 90, kcal: 80, muscles: ["Épaules"], diastasisSafe: true, consigne: "Charges les plus lourdes du programme sur les semaines force.", chargePhase4: "14–16 kg / haltère", emoji: "🏆", videoId: "qEwKCR5JCog" },
          { id: "bras_p4", nom: "Curl biceps + Extension triceps superset LOURD", sets: 4, reps: "8+8", repos: 60, kcal: 75, muscles: ["Biceps", "Triceps"], diastasisSafe: true, consigne: "Charges maximales bras. Dernier mois = record des bras.", chargePhase4: "12–14 kg / 22–26 kg", emoji: "💪", videoId: "ykJmrZ5v0Oo" },
          { id: "core_p4", nom: "Core advanced : Pallof + Copenhagen", sets: 3, reps: "12+10", repos: 30, kcal: 45, muscles: ["Core complet"], diastasisSafe: true, consigne: "Combinaison des meilleurs exercices des phases précédentes.", categorie: "core_diastasis", emoji: "🎯", videoId: "AH_QZLm_0-s" },
        ],
      },
      JEUDI: {
        label: "Bas du corps — UP",
        subtitle: "Force/Volume alternés + Fessiers peak",
        duree: 40,
        kcalTotal: 385,
        exercices: [
          { id: "act_j4", nom: "Activation complète + Mobilité ciblée", sets: 3, reps: "15/côté", repos: 15, kcal: 35, muscles: ["Core"], diastasisSafe: true, priorite: true, consigne: "Routine complète + étirement fléchisseurs hanches.", emoji: "🎱", videoId: "4ZRimFD4lEM" },
          { id: "hip_thrust_p4", nom: "Hip thrust barre — Semaine record", sets: 5, reps: "6-8 ou 12", repos: 90, kcal: 140, muscles: ["Fessiers"], diastasisSafe: true, consigne: "Alternance UP : S13/15 = 5×6 lourd (60–70 kg). S14/16 = 5×12 volume (45–55 kg).", chargePhase4: "60–70 kg / 45–55 kg", emoji: "🚀", videoId: "xDmFkJxPzeM" },
          { id: "squat_p4", nom: "Squat barre — Record programme", sets: 5, reps: "5 ou 10", repos: 120, kcal: 130, muscles: ["Quadriceps", "Fessiers"], diastasisSafe: true, consigne: "Séance record. Viser 5–10% de plus que phase 3.", chargePhase4: "55–65 kg / 40–50 kg", emoji: "🏆", videoId: "ultWZbUMPL8" },
          { id: "sdt_p4", nom: "SDT roumain barre lourde", sets: 4, reps: "6-8", repos: 90, kcal: 110, muscles: ["Ischio", "Fessiers", "Dos"], diastasisSafe: true, consigne: "Force maximale ischio/fessiers.", chargePhase4: "60–70 kg", emoji: "⚡", videoId: "jEy_czb3RKA" },
          { id: "isolation_p4", nom: "Superset isolation : leg curl + leg ext légère", sets: 3, reps: "12+15", repos: 60, kcal: 85, muscles: ["Ischio", "Quadriceps"], diastasisSafe: true, consigne: "Finisseur d'isolation jambes. Leg extension léger = ne pas forcer sur genoux.", chargePhase4: "30–35 kg / 20–25 kg", emoji: "🔥", videoId: "1Tq3QdYUuHs" },
          { id: "gainage_p4", nom: "Gainage anti-rotation complexe", sets: 3, reps: "10/côté", repos: 30, kcal: 35, muscles: ["Core"], diastasisSafe: true, consigne: "Meilleure expression du gainage du programme.", categorie: "core_diastasis", emoji: "🛡️", videoId: "AH_QZLm_0-s" },
        ],
      },
      VENDREDI: {
        label: "Corps entier — Peak",
        subtitle: "Meilleure séance du programme",
        duree: 60,
        kcalTotal: 650,
        exercices: [
          { id: "act_v4", nom: "Activation + Échauffement global", sets: 3, reps: "12", repos: 10, kcal: 30, muscles: ["Core"], diastasisSafe: true, priorite: true, consigne: "Échauffement complet 8 min. Derniers vendredis → meilleure forme possible.", emoji: "🔥", videoId: "RUMrVJaYkEA" },
          { id: "sdt_complet_p4", nom: "Soulevé de terre RECORD (Deadlift)", sets: 5, reps: "5", repos: 180, kcal: 145, muscles: ["Corps entier"], diastasisSafe: true, consigne: "Record du programme. Échauffement progressif. Gainage ABSOLU. Expirer avant de tirer.", chargePhase4: "65–80 kg", emoji: "⚡", videoId: "op9kVnSso6Q" },
          { id: "squat_force_p4", nom: "Back squat lourd + presse volume (superset)", sets: 4, reps: "5+10", repos: 120, kcal: 135, muscles: ["Tout le bas du corps"], diastasisSafe: true, consigne: "Squat lourd → immédiatement presse volume. Précharge totale quadriceps-fessiers.", chargePhase4: "58–65 kg / 80–90 kg", emoji: "🏋️", videoId: "ultWZbUMPL8" },
          { id: "pull_pousse_p4", nom: "Superset Tirage lat + Développé couché", sets: 4, reps: "8+8", repos: 90, kcal: 120, muscles: ["Dos", "Pectoraux"], diastasisSafe: true, consigne: "Push-pull superset. Récupération agoniste/antagoniste.", chargePhase4: "50–58 kg / 2×17–20 kg", emoji: "🚀", videoId: "CAwf7n6Luuc" },
          { id: "complexe_final", nom: "Complexe final : 5 exercices enchaînés", sets: 3, reps: "10 chacun", repos: 120, kcal: 120, muscles: ["Corps entier"], diastasisSafe: true, consigne: "SDT léger → rowing → squat → militaire → curl barre (sans poser). Haltères ou barre légère.", chargePhase4: "20–30 kg barre", emoji: "🎖️", videoId: null },
          { id: "hiit_final", nom: "HIIT finale (25 min 20/40)", sets: 1, reps: "25 min", repos: 0, kcal: 155, muscles: ["Cardio"], diastasisSafe: true, consigne: "20s sprint / 40s récupération. 30 cycles. Meilleure cardio du programme.", emoji: "🔥", videoId: null },
          { id: "core_final_p4", nom: "Core final — meilleure routine du programme", sets: 2, reps: "x2", repos: 20, kcal: 45, muscles: ["Core complet"], diastasisSafe: true, consigne: "Dead Bug + Bird-Dog + Pallof + Copenhagen → série de 4 sans repos.", categorie: "core_diastasis", emoji: "🎯", videoId: "4ZRimFD4lEM" },
        ],
      },
      SAMEDI: {
        label: "Bas du corps — Affinage",
        subtitle: "Sculpture finale + Endurance",
        duree: 60,
        kcalTotal: 590,
        exercices: [
          { id: "act_s4", nom: "Activation complète 8 min", sets: 3, reps: "x", repos: 10, kcal: 30, muscles: ["Core"], diastasisSafe: true, priorite: true, consigne: "Derniers samedis. Qualité maximale de chaque rep.", emoji: "⭐", videoId: "4ZRimFD4lEM" },
          { id: "hip_thrust_final", nom: "Hip thrust — 5×8 record absolu", sets: 5, reps: 8, repos: 90, kcal: 140, muscles: ["Fessiers"], diastasisSafe: true, consigne: "Record final du programme hip thrust. 5×8 lourds.", chargePhase4: "65–75 kg", emoji: "🚀", videoId: "xDmFkJxPzeM" },
          { id: "bulgares_final", nom: "Fentes bulgares — Record par jambe", sets: 4, reps: "8/jambe", repos: 90, kcal: 120, muscles: ["Fessiers", "Quadriceps"], diastasisSafe: true, consigne: "Record final bulgares.", chargePhase4: "2×16–20 kg", emoji: "🦶", videoId: "2C-uNgKwPLE" },
          { id: "circuit_fessiers", nom: "Circuit fessiers final (4 exercices)", sets: 3, reps: "15 chacun", repos: 60, kcal: 110, muscles: ["Fessiers"], diastasisSafe: true, consigne: "Hip thrust + abduction élastique + clamshell + donkey kicks. Sans repos entre exercices.", emoji: "🍑", videoId: "wPM8icPu6H8" },
          { id: "iso_jambes_final", nom: "Isolation jambes complète (leg curl + extension)", sets: 3, reps: "12+12", repos: 60, kcal: 90, muscles: ["Ischio", "Quadriceps"], diastasisSafe: true, consigne: "Finisseur isolation.", chargePhase4: "30–38 kg / 20–28 kg", emoji: "🦵", videoId: "1Tq3QdYUuHs" },
          { id: "cardio_final_s", nom: "LISS final (30 min zone 2)", sets: 1, reps: "30 min", repos: 0, kcal: 145, muscles: ["Cardio"], diastasisSafe: true, consigne: "Derniers samedis. Apprécier chaque séance.", emoji: "🏃", videoId: null },
          { id: "gainage_final", nom: "Gainage final — meilleure version de vous", sets: 3, reps: "30s→45s", repos: 30, kcal: 45, muscles: ["Core"], diastasisSafe: true, consigne: "Planche si validée kiné, sinon genoux. Progression depuis la semaine 1.", categorie: "core_diastasis", emoji: "🛡️", videoId: "yeKv5ML5yD4" },
        ],
      },
      DIMANCHE: {
        label: "Haut du corps — Affinage final",
        subtitle: "Volume + Pump + Étirements cérémoniels",
        duree: 60,
        kcalTotal: 480,
        exercices: [
          { id: "act_d4", nom: "Activation + Pull-apart + Face pull", sets: 3, reps: "15", repos: 15, kcal: 30, muscles: ["Core", "Épaules"], diastasisSafe: true, priorite: true, consigne: "Épaules parfaitement échauffées avant la séance haut du corps.", emoji: "🎋", videoId: "RUMrVJaYkEA" },
          { id: "tirage_final", nom: "Tirage lat — 5×10 pump final", sets: 5, reps: 10, repos: 75, kcal: 110, muscles: ["Grand dorsal"], diastasisSafe: true, consigne: "Volume pump. Charges modérées, contraction maximale à chaque rep.", chargePhase4: "44–50 kg", emoji: "🏋️", videoId: "CAwf7n6Luuc" },
          { id: "dev_couche_final", nom: "Développé couché + Écarté (superset pump)", sets: 4, reps: "10+12", repos: 75, kcal: 95, muscles: ["Pectoraux"], diastasisSafe: true, consigne: "Pump pectoraux. Finir avec un superbe pump.", chargePhase4: "2×15–18 kg / 2×8–10 kg", emoji: "💪", videoId: "VmB1G1K7v94" },
          { id: "epaules_3d_final", nom: "Épaules 3D (3 faisceaux) — circuit pump", sets: 4, reps: "12+12+12", repos: 60, kcal: 75, muscles: ["Épaules 3 faisceaux"], diastasisSafe: true, consigne: "Frontales + latérales + arrière sans repos. Finisseur épaules.", chargePhase4: "5–8 kg chaque", emoji: "🦅", videoId: "3VcKaXpzqRo" },
          { id: "bras_final", nom: "Biceps + Triceps PUMP (superset x4)", sets: 4, reps: "12+12", repos: 45, kcal: 65, muscles: ["Biceps", "Triceps"], diastasisSafe: true, consigne: "4 supersets pour un pump maximal des bras. Charges légères-modérées.", chargePhase4: "8–10 kg / 16–20 kg", emoji: "🔥", videoId: "ykJmrZ5v0Oo" },
          { id: "bilan_final_core", nom: "Bilan core final — toutes progressions", sets: 1, reps: "x", repos: 0, kcal: 30, muscles: ["Core complet"], diastasisSafe: true, consigne: "Démonstration de toute la progression core sur 16 semaines. Faire chaque exercice une fois.", categorie: "core_diastasis", emoji: "⭐", videoId: "4ZRimFD4lEM" },
          { id: "etirements_cloture", nom: "Étirements de clôture du programme (15 min)", sets: 1, reps: "15 min", repos: 0, kcal: 40, muscles: ["Tout le corps"], diastasisSafe: true, consigne: "Séance de clôture. Profiter de chaque étirement. Reconnaissance pour votre corps.", emoji: "🏆", videoId: null },
        ],
      },
      MERCREDI: {
        label: "Cardio actif",
        subtitle: "Sortie douce + Mobilité",
        duree: 60,
        kcalTotal: 260,
        repos: false,
        exercices: [
          { id: "cardio_m4", nom: "Marche nordique ou vélo (45 min)", sets: 1, reps: "45 min", repos: 0, kcal: 210, muscles: ["Cardio"], diastasisSafe: true, consigne: "Zone 2 préservée. Apprécier le mouvement.", emoji: "🚴" },
          { id: "mobilite_m4", nom: "Étirements globaux (15 min)", sets: 1, reps: "15 min", repos: 0, kcal: 50, muscles: ["Flexibilité"], diastasisSafe: true, consigne: "Corps entier. Préparer le S16 bilan.", emoji: "🧘" },
        ],
      },
      LUNDI: { label: "Repos actif", subtitle: "Récupération", duree: null, kcalTotal: 70, repos: true, exercices: [{ id: "repos_p4", nom: "Repos — Récupération optimale", sets: 1, reps: "-", repos: 0, kcal: 70, muscles: ["Récupération"], diastasisSafe: true, consigne: "Dernières semaines → priorité récupération.", emoji: "🌟" }] },
    },
  },
};

// Planning hebdomadaire
const PLANNING_SEMAINE = {
  LUNDI:    { type: "repos_actif",  label: "Repos actif",       duree: null, kcal: 70,  icon: "🌿", emoji: "🌿" },
  MARDI:    { type: "salle_haut",   label: "Haut du corps",     duree: 40,   kcal: 335, icon: "💪", emoji: "💪" },
  MERCREDI: { type: "cardio_doux",  label: "Cardio doux",       duree: 50,   kcal: 185, icon: "🚴", emoji: "🚴" },
  JEUDI:    { type: "salle_bas",    label: "Bas du corps",      duree: 40,   kcal: 283, icon: "🍑", emoji: "🍑" },
  VENDREDI: { type: "salle_full",   label: "Corps entier",      duree: 60,   kcal: 530, icon: "🔥", emoji: "🔥" },
  SAMEDI:   { type: "salle_bas2",   label: "Fessiers + Cardio", duree: 60,   kcal: 495, icon: "🏋️", emoji: "🏋️" },
  DIMANCHE: { type: "salle_haut2",  label: "Haut du corps +",   duree: 60,   kcal: 450, icon: "⭐", emoji: "⭐" },
};

const JOURS_ORDER = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];

// Déload automatique aux S4, S8, S12
const DELOAD_WEEKS = [4, 8, 12];
const BILAN_WEEKS = [4, 8, 12, 16];

// Obtenir la phase depuis la semaine courante
function getPhaseFromWeek(week) {
  if (week <= 4) return 1;
  if (week <= 8) return 2;
  if (week <= 12) return 3;
  return 4;
}

// Obtenir la clé de phase
function getPhaseKey(week) {
  return `phase${getPhaseFromWeek(week)}`;
}

// Vérifier si c'est une semaine de déload
function isDeloadWeek(week) {
  return DELOAD_WEEKS.includes(week);
}

// Vérifier si c'est une semaine de bilan kiné
function isBilanWeek(week) {
  return BILAN_WEEKS.includes(week);
}

// Obtenir le facteur de charge (déload = 80%)
function getChargeFactor(week) {
  return isDeloadWeek(week) ? 0.8 : 1.0;
}

// Obtenir les séances d'un jour pour la phase courante
function getSeanceForDay(jour, week) {
  const phaseKey = getPhaseKey(week);
  const phase = PROGRAMME[phaseKey];
  if (!phase || !phase.seances[jour]) return null;
  return phase.seances[jour];
}
