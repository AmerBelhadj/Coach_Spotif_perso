/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — INDEXEDDB STORAGE
═══════════════════════════════════════════════════ */

const DB_NAME = 'CoachDiastasisDB';
const DB_VERSION = 1;

const DB = {
  db: null,

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        // Séances complétées
        if (!db.objectStoreNames.contains('seances')) {
          const seancesStore = db.createObjectStore('seances', { keyPath: 'id', autoIncrement: true });
          seancesStore.createIndex('date', 'date', { unique: false });
          seancesStore.createIndex('semaine', 'semaine', { unique: false });
        }

        // Sets loggués
        if (!db.objectStoreNames.contains('sets')) {
          const setsStore = db.createObjectStore('sets', { keyPath: 'id', autoIncrement: true });
          setsStore.createIndex('seanceId', 'seanceId', { unique: false });
          setsStore.createIndex('exerciceId', 'exerciceId', { unique: false });
          setsStore.createIndex('date', 'date', { unique: false });
        }

        // Mesures corporelles
        if (!db.objectStoreNames.contains('mesures')) {
          const mesuresStore = db.createObjectStore('mesures', { keyPath: 'id', autoIncrement: true });
          mesuresStore.createIndex('date', 'date', { unique: false });
          mesuresStore.createIndex('semaine', 'semaine', { unique: false });
        }

        // Nutrition journalière
        if (!db.objectStoreNames.contains('nutrition')) {
          const nutritionStore = db.createObjectStore('nutrition', { keyPath: 'id', autoIncrement: true });
          nutritionStore.createIndex('date', 'date', { unique: false });
        }

        // Profil (unique)
        if (!db.objectStoreNames.contains('profil')) {
          db.createObjectStore('profil', { keyPath: 'id' });
        }

        // Photos
        if (!db.objectStoreNames.contains('photos')) {
          const photosStore = db.createObjectStore('photos', { keyPath: 'id', autoIncrement: true });
          photosStore.createIndex('date', 'date', { unique: false });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };

      request.onerror = (e) => reject(e.target.error);
    });
  },

  // Generic CRUD
  async add(storeName, data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.add({ ...data, createdAt: new Date().toISOString() });
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async put(storeName, data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put({ ...data, updatedAt: new Date().toISOString() });
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async get(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async getByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const index = store.index(indexName);
      const req = index.getAll(value);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  async clear(storeName) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  // Specific methods
  async getProfil() {
    return this.get('profil', 'main');
  },

  async saveProfil(profil) {
    return this.put('profil', { ...profil, id: 'main' });
  },

  async getMesuresByWeek(semaine) {
    return this.getByIndex('mesures', 'semaine', semaine);
  },

  async getNutritionByDate(date) {
    const all = await this.getByIndex('nutrition', 'date', date);
    return all[0] || null;
  },

  async getSeancesByWeek(semaine) {
    return this.getByIndex('seances', 'semaine', semaine);
  },

  async getSetsBySeance(seanceId) {
    return this.getByIndex('sets', 'seanceId', seanceId);
  },

  async exportAll() {
    const [seances, sets, mesures, nutrition, profil, photos] = await Promise.all([
      this.getAll('seances'),
      this.getAll('sets'),
      this.getAll('mesures'),
      this.getAll('nutrition'),
      this.getAll('profil'),
      this.getAll('photos'),
    ]);
    return { seances, sets, mesures, nutrition, profil, photos, exportedAt: new Date().toISOString() };
  },
};
