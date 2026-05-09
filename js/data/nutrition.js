/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — NUTRITION DATA
═══════════════════════════════════════════════════ */

const NUTRITION_PHASES = {
  1: { kcal: 1700, proteines: 130, glucides: 160, lipides: 55, label: "Réparation" },
  2: { kcal: 1650, proteines: 140, glucides: 145, lipides: 52, label: "Activation" },
  3: { kcal: 1600, proteines: 150, glucides: 130, lipides: 50, label: "Intensification" },
  4: { kcal: 1550, proteines: 155, glucides: 115, lipides: 48, label: "Affinage" },
};

const REPAS_TYPES = {
  1: [
    {
      id: "ptdej_p1_1",
      moment: "Petit-déjeuner",
      emoji: "🌅",
      nom: "Bol protéiné vanille",
      ingredients: "200g yaourt grec 0% + 30g protéine vanille + 40g flocons d'avoine + 15g amandes + 1 banane",
      kcal: 430, proteines: 45, glucides: 52, lipides: 10
    },
    {
      id: "ptdej_p1_2",
      moment: "Petit-déjeuner",
      emoji: "🥚",
      nom: "Œufs brouillés complet",
      ingredients: "3 œufs entiers + 1 tranche pain complet + 1/2 avocat + tomates cerises",
      kcal: 420, proteines: 28, glucides: 28, lipides: 22
    },
    {
      id: "dejeuner_p1_1",
      moment: "Déjeuner",
      emoji: "🍗",
      nom: "Poulet riz légumes",
      ingredients: "150g poulet grillé + 80g riz cuit + 200g légumes vapeur + 1cs huile d'olive",
      kcal: 480, proteines: 42, glucides: 48, lipides: 12
    },
    {
      id: "dejeuner_p1_2",
      moment: "Déjeuner",
      emoji: "🐟",
      nom: "Saumon patate douce",
      ingredients: "150g saumon + 150g patate douce + salade verte + vinaigrette légère",
      kcal: 490, proteines: 38, glucides: 38, lipides: 18
    },
    {
      id: "diner_p1_1",
      moment: "Dîner",
      emoji: "🥩",
      nom: "Bœuf haché légumes",
      ingredients: "150g bœuf 5% + 200g légumes sautés + 60g quinoa cuit",
      kcal: 420, proteines: 38, glucides: 32, lipides: 14
    },
    {
      id: "collation_post",
      moment: "Collation post-séance",
      emoji: "🥤",
      nom: "Shake récupération",
      ingredients: "30g protéine whey + 200ml lait écrémé + 1 banane (à consommer dans les 30 min)",
      kcal: 320, proteines: 40, glucides: 35, lipides: 3
    },
    {
      id: "collation_p1",
      moment: "Collation",
      emoji: "🧀",
      nom: "Fromage blanc protéiné",
      ingredients: "200g fromage blanc 0% + 20g amandes + 100g fruits rouges",
      kcal: 220, proteines: 22, glucides: 15, lipides: 8
    },
  ],
  2: [
    {
      id: "ptdej_p2_1",
      moment: "Petit-déjeuner",
      emoji: "🫐",
      nom: "Pancakes protéinés",
      ingredients: "2 œufs + 30g protéine + 40g avoine + 100g myrtilles + sirop d'érable (5g)",
      kcal: 440, proteines: 42, glucides: 48, lipides: 10
    },
    {
      id: "dejeuner_p2_1",
      moment: "Déjeuner",
      emoji: "🦃",
      nom: "Bowl dinde & légumineuses",
      ingredients: "150g dinde + 100g lentilles cuites + 150g épinards + 1cs tahini",
      kcal: 455, proteines: 46, glucides: 38, lipides: 12
    },
    {
      id: "diner_p2_1",
      moment: "Dîner",
      emoji: "🍤",
      nom: "Crevettes & légumes",
      ingredients: "200g crevettes + 150g brocoli + 150g riz basmati + huile de sésame",
      kcal: 410, proteines: 42, glucides: 38, lipides: 10
    },
    {
      id: "collation_p2",
      moment: "Collation post-séance",
      emoji: "🥤",
      nom: "Shake massthène",
      ingredients: "35g protéine whey + 200ml lait + 30g flocons d'avoine + 1cs beurre de cacahuète",
      kcal: 390, proteines: 45, glucides: 35, lipides: 10
    },
  ],
  3: [
    {
      id: "ptdej_p3_1",
      moment: "Petit-déjeuner",
      emoji: "🥣",
      nom: "Overnight oats protéinés",
      ingredients: "50g avoine + 30g protéine + 200g yaourt grec + 100g fraises + 10g graines chia",
      kcal: 450, proteines: 48, glucides: 45, lipides: 10
    },
    {
      id: "dejeuner_p3_1",
      moment: "Déjeuner",
      emoji: "🥗",
      nom: "Salade power",
      ingredients: "150g thon au naturel + 3 œufs durs + 80g quinoa + légumes variés + vinaigrette citron",
      kcal: 440, proteines: 52, glucides: 32, lipides: 14
    },
    {
      id: "diner_p3_1",
      moment: "Dîner",
      emoji: "🍳",
      nom: "Omelette & patate douce",
      ingredients: "4 œufs + 120g patate douce + 100g champignons + 30g feta",
      kcal: 390, proteines: 38, glucides: 28, lipides: 14
    },
    {
      id: "collation_p3",
      moment: "Collation post-séance",
      emoji: "🥤",
      nom: "Shake récupération intense",
      ingredients: "40g protéine whey + 200ml lait + 1 banane + 10g miel",
      kcal: 360, proteines: 46, glucides: 40, lipides: 4
    },
  ],
  4: [
    {
      id: "ptdej_p4_1",
      moment: "Petit-déjeuner",
      emoji: "🍳",
      nom: "Œufs & avocat affinage",
      ingredients: "3 œufs + 1/2 avocat + 1 tranche pain protéiné + 100g tomates",
      kcal: 380, proteines: 32, glucides: 22, lipides: 20
    },
    {
      id: "dejeuner_p4_1",
      moment: "Déjeuner",
      emoji: "🐟",
      nom: "Poisson blanc & légumes",
      ingredients: "180g cabillaud + 300g légumes vapeur + 1cs huile d'olive + herbes aromatiques",
      kcal: 320, proteines: 42, glucides: 12, lipides: 10
    },
    {
      id: "diner_p4_1",
      moment: "Dîner",
      emoji: "🥩",
      nom: "Steak & salade green",
      ingredients: "150g steak 5% + grande salade verte + 100g haricots verts + vinaigrette légère",
      kcal: 350, proteines: 38, glucides: 12, lipides: 14
    },
    {
      id: "collation_p4",
      moment: "Collation",
      emoji: "🧀",
      nom: "Protéine & baies",
      ingredients: "200g fromage blanc 0% + 25g protéine + 100g baies mixtes",
      kcal: 250, proteines: 42, glucides: 18, lipides: 2
    },
  ],
};

const CONSEILS_NUTRITION = {
  1: {
    titre: "Phase 1 — Alimentation réparatrice",
    conseils: [
      "🥩 Priorité protéines : 130g/jour minimum pour soutenir la réparation musculaire",
      "🌾 Glucides modérés (160g) : favoriser les glucides complexes (avoine, riz complet, patate douce)",
      "💧 Hydratation 2,5L/jour minimum — aide à la récupération du plancher pelvien",
      "⏰ Collation post-séance obligatoire dans les 30 min (20–25g protéines)",
      "🚫 Éviter les aliments inflammatoires : sucres raffinés, alcool, ultra-transformés",
      "🌿 Anti-inflammatoires naturels : curcuma, gingembre, oméga-3 (saumon, sardines)"
    ],
    sources_proteines: ["Poulet", "Dinde", "Saumon", "Thon", "Œufs", "Yaourt grec 0%", "Fromage blanc 0%", "Protéine whey"]
  },
  2: {
    titre: "Phase 2 — Carburant pour la progression",
    conseils: [
      "⚡ Augmentation légère des protéines (140g) pour soutenir l'hypertrophie débutante",
      "🏋️ Pre-workout : glucides 2h avant la séance (40–50g) pour les séances intenses",
      "💪 Timing post-séance : 35–40g protéines + 40g glucides dans les 30 min",
      "🥑 Lipides de qualité : avocat, huile d'olive, amandes — essentiels pour les hormones",
      "📊 Réduction légère des glucides (-15g) pour initier la recomposition",
      "🧂 Électrolytes : sel, magnésium après les séances longues"
    ],
    sources_proteines: ["Bœuf maigre", "Poulet", "Saumon", "Crevettes", "Tofu ferme", "Skyr", "Cottage cheese", "Protéine whey/caséine"]
  },
  3: {
    titre: "Phase 3 — Intensification nutritionnelle",
    conseils: [
      "💪 Protéines prioritaires : 150g/jour pour soutenir les charges lourdes",
      "⚡ Cycles glucidiques légers : + glucides les jours d'entraînement intense (vendredi/samedi)",
      "🔥 Déficit calorique maintenu (-50 kcal vs P2) : recomposition active",
      "⏰ Timing précis : repas 3h avant séance, shake 30 min après",
      "💊 Suppléments utiles : créatine 3g/j, magnésium bisglycinate 300mg, vitamine D",
      "😴 Caséine le soir : 30g avant le coucher pour la synthèse protéique nocturne"
    ],
    sources_proteines: ["Thon", "Œufs", "Bœuf 5%", "Dinde", "Yaourt grec 0%", "Caséine", "Protéine whey"]
  },
  4: {
    titre: "Phase 4 — Affinage & Consolidation",
    conseils: [
      "📉 Réduction glucides accentuée (-15g vs P3) : priorité aux protéines pour préserver le muscle",
      "🥗 Légumes non-féculents illimités : densité nutritionnelle maximale, satiété",
      "💧 Hydratation 3L/jour : aide à l'élimination et à la définition",
      "🔄 Refeeds ponctuels : 1× par semaine, augmenter les glucides de 50g (maintien métabolique)",
      "🧬 Protéines au maximum : 155g/jour — protection musculaire absolue en fin de programme",
      "🏆 Préparation au programme de maintenance : habitudes durables installées"
    ],
    sources_proteines: ["Poisson blanc", "Steak maigre", "Blanc de poulet", "Protéine isolate", "Fromage blanc 0%", "Œufs"]
  },
};
