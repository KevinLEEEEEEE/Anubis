import localStorage from './localStorage';

const _storageManager = {
  read(key) {
    const value = localStorage.read(key);
    return value;
  },
  write(key, value) {
    localStorage.write(key, value);
  },
};

const storageManeger = {
  inventoryCache: null,
  collectionCache: null,
  notchCache: null,

  readInventoryCache() {
    const inventoryCache = _storageManager.read('inventory') || [];

    this.inventoryCache = inventoryCache;

    // if false, then init localStorage

    return inventoryCache;
  },

  writeInventoryCache(list) {
    this.inventoryCache = list;
    this.save();
  },

  readLevelCollectionCache(level) {
    if (this.collectionCache === null) {
      this.collectionCache = _storageManager.read('collection') || {};
    }
    if (Reflect.has(this.collectionCache, level)) {
      return this.collectionCache[level];
    }
    return [];
  },

  writeLevelCollectionCache(level, list) {
    this.collectionCache[level] = list;
    this.save();
  },

  readLevelNotchCache(level) {
    if (this.notchCache === null) {
      this.notchCache = _storageManager.read('notch') || {};
    }
    if (Reflect.has(this.notchCache, level)) {
      return this.notchCache[level];
    }
    return [];
  },

  writeLevelNotchCache(level, list) {
    this.notchCache[level] = list;
    this.save();
  },

  readInfoCache() {

  },

  writeInfoCache() {

  },

  save() {
    _storageManager.write('inventory', this.inventoryCache);
    _storageManager.write('collection', this.collectionCache);
    _storageManager.write('notch', this.notchCache);
  },
};

export default storageManeger;
