/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — MAIN APP CONTROLLER
═══════════════════════════════════════════════════ */

const App = {
  currentPage: 'dashboard',
  pages: {
    dashboard: { title: 'Tableau de bord', component: DashboardPage },
    seance:     { title: 'Séance',          component: SeancePage },
    progression:{ title: 'Progression',     component: ProgressionPage },
    nutrition:  { title: 'Nutrition',        component: NutritionPage },
    suivi:      { title: 'Suivi',            component: SuiviPage },
    profil:     { title: 'Profil',           component: ProfilPage },
  },

  async init() {
    // Init DB
    await DB.init();
    // Init Store
    await Store.init();

    // Check if first launch
    const profil = Store.profil;
    if (!profil) {
      await this._firstLaunch();
    }

    // Hide splash, show app
    await this._hideSplash();

    // Setup navigation
    this._setupNav();

    // Setup header buttons
    this._setupHeader();

    // Render initial page
    await this.navigate('dashboard');
  },

  async _firstLaunch() {
    // Create default profil
    await Store.saveProfil({
      prenom: 'Coach',
      poidsInitial: 75,
      poidsObjectif: 60,
      dateDebut: HELPERS.today(),
      diastasisInitial: 2.5,
      suiviKine: false,
      kineValidated: false,
    });
  },

  async _hideSplash() {
    return new Promise(resolve => {
      setTimeout(() => {
        const splash = HELPERS.el('splash');
        const mainApp = HELPERS.el('main-app');
        if (splash) {
          splash.style.opacity = '0';
          splash.style.transition = 'opacity 0.4s ease';
          setTimeout(() => {
            splash.style.display = 'none';
            if (mainApp) mainApp.classList.remove('hidden');
            resolve();
          }, 400);
        } else {
          if (mainApp) mainApp.classList.remove('hidden');
          resolve();
        }
      }, 1800);
    });
  },

  _setupNav() {
    HELPERS.qsa('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page) this.navigate(page);
      });
    });
  },

  _setupHeader() {
    HELPERS.el('btn-theme')?.addEventListener('click', () => Store.toggleTheme());
    HELPERS.el('btn-notif')?.addEventListener('click', () => this._requestNotifications());
    HELPERS.el('btn-back')?.addEventListener('click', () => this.navigate('dashboard'));
  },

  async navigate(pageName) {
    const pageDef = this.pages[pageName];
    if (!pageDef) return;

    this.currentPage = pageName;

    // Update header
    const titleEl = HELPERS.el('page-title');
    const subtitleEl = HELPERS.el('page-subtitle');
    const backBtn = HELPERS.el('btn-back');

    if (titleEl) titleEl.textContent = pageDef.title;
    if (subtitleEl) {
      if (pageName === 'dashboard') {
        subtitleEl.textContent = `S${Store.currentWeek} / 16 — Phase ${Store.currentPhase}`;
      } else {
        subtitleEl.textContent = '';
      }
    }
    if (backBtn) backBtn.style.display = (pageName !== 'dashboard') ? 'flex' : 'none';

    // Update bottom nav
    HELPERS.qsa('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageName);
    });

    // Render page
    const content = HELPERS.el('page-content');
    if (content) {
      content.innerHTML = '';
      content.scrollTop = 0;
      await pageDef.component.render(content);
    }

    HELPERS.vibrate([10]);
  },

  async _requestNotifications() {
    if (!('Notification' in window)) {
      UI.toast('Notifications non supportées sur cet appareil', 'warning');
      return;
    }

    if (Notification.permission === 'granted') {
      UI.toast('Notifications déjà activées ✅', 'success');
      return;
    }

    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      UI.toast('Notifications activées ! 🔔', 'success');
      new Notification('Coach Diastasis', {
        body: '💪 Rappels de séance activés !',
        icon: 'assets/icons/icon-192.png',
      });
    } else {
      UI.toast('Notifications refusées', 'warning');
    }
  },
};

// Boot
document.addEventListener('DOMContentLoaded', () => {
  App.init().catch(err => {
    console.error('App init error:', err);
    const splash = HELPERS.el('splash');
    if (splash) {
      splash.innerHTML = `
        <div style="text-align:center;color:white;padding:32px">
          <div style="font-size:48px;margin-bottom:16px">⚠️</div>
          <h2>Erreur de chargement</h2>
          <p style="opacity:0.7;margin-top:8px">Veuillez recharger la page</p>
          <button onclick="location.reload()" style="margin-top:16px;padding:12px 24px;background:var(--color-accent);border:none;border-radius:12px;color:white;font-size:15px;cursor:pointer">
            🔄 Recharger
          </button>
        </div>
      `;
    }
  });
});
