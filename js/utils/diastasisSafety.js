/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — MODULE SÉCURITÉ DIASTASIS
═══════════════════════════════════════════════════ */

const DiastasisSafety = {
  // Vérification complète d'un exercice
  check(exercice, diastasisWidth = 2.0, kineValidated = false) {
    // Exercice explicitement interdit
    if (exercice.forbidden) {
      return { safe: false, level: 'danger', message: 'Exercice interdit pour le diastasis', showAlternative: true };
    }

    // Vérification planche complète
    if (exercice.prerequisKine && !kineValidated) {
      return {
        safe: false,
        level: 'danger',
        message: '⚠️ Planche complète — validation kiné requise (bilan S4/S8/S12)',
        showAlternative: true,
        alternative: 'Planche sur genoux'
      };
    }

    // Diastasis large > 2.5 cm
    if (diastasisWidth > 2.5 && exercice.categorie === 'core_diastasis') {
      return {
        safe: true,
        level: 'warning',
        message: `Diastasis ${diastasisWidth}cm — Engagement transverse MAXIMAL requis. Surveiller la tension de la ligne blanche.`
      };
    }

    // Exercice safe
    if (exercice.diastasisSafe) {
      return { safe: true, level: 'ok', message: 'Exercice validé diastasis-safe' };
    }

    return { safe: false, level: 'warning', message: 'Surveiller les sensations', showAlternative: false };
  },

  // Obtenir l'alternative à un exercice interdit
  getAlternative(exerciceId) {
    return EXERCICES_INTERDITS.find(e => e.id === exerciceId);
  },

  // Alertes diastasis pour la séance du jour
  getSessionAlerts(seance, diastasisWidth, kineValidated) {
    const alerts = [];

    if (!seance) return alerts;

    // Alerte générale si diastasis > 2 cm
    if (diastasisWidth > 2.0) {
      alerts.push({
        level: 'warning',
        icon: '⚠️',
        title: `Diastasis ${diastasisWidth} cm détecté`,
        message: 'Engagement transverse obligatoire à chaque exercice. Stopper si douleur ou sensation de pression vers le bas.'
      });
    }

    // Vérifier exercices de la séance
    const risqueExos = seance.exercices?.filter(ex => ex.categorie === 'core_diastasis') || [];
    if (risqueExos.length > 0) {
      alerts.push({
        level: 'ok',
        icon: '✅',
        title: `${risqueExos.length} exercice(s) core diastasis-safe`,
        message: 'Respiration 360° + activation transverse avant chaque mouvement de core.'
      });
    }

    return alerts;
  },

  // Rappels permanents diastasis
  getPermanentReminders() {
    return [
      { icon: '💨', text: 'Expirer à l\'effort — jamais de blocage respiratoire' },
      { icon: '🫁', text: 'Activer le transverse AVANT chaque exercice de core' },
      { icon: '🛑', text: 'Stopper si douleur, pression vers le bas ou "dôme" visible' },
    ];
  },

  // Signes d'alerte à surveiller
  getStopSigns() {
    return [
      'Douleur ou inconfort dans le bas-ventre',
      'Sensation de pression vers le bas (plancher pelvien)',
      '"Dôme" ou bombement visible sur la ligne blanche',
      'Fuites urinaires pendant l\'effort',
      'Douleur lombaire qui s\'intensifie',
    ];
  },

  // Alerte bilan kiné
  getBilanAlert(currentWeek) {
    if (!isBilanWeek(currentWeek)) return null;

    return {
      level: 'warning',
      icon: '👩‍⚕️',
      title: `Bilan kiné — Semaine ${currentWeek}`,
      message: `C'est la semaine du bilan kinésithérapeute ! Évaluation diastasis obligatoire avant de continuer.`
    };
  },
};
