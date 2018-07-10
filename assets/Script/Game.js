import localStorage from './localStorage/localStorage';
import st from './config/storageType';
import logger from './utils/logger';

const _Game = cc.Class({
  ctor() {
    logger.INFO('****** Game private init start ******');

    this.inventoryCache = this._read(`${st.INVENTORY}Cache`) || [];
    this.collectionCache = this._read(`${st.COLLECTION}Cache`) || {};
    this.notchCache = this._read(`${st.NOTCH}Cache`) || {};
    this.infoCache = this._read(`${st.INFO}Cache`) || {};

    logger.DEBUG('inventoryCache: ', this.inventoryCache);
    logger.DEBUG('collectionCache: ', this.collectionCache);
    logger.DEBUG('notchCache: ', this.notchCache);
    logger.DEBUG('infoCache: ', this.infoCache);
    logger.INFO('****** Game private init end ******');
  },

  // --------------------------------------------------------------------------------------------

  getCache(key, level) {
    const camelizedKey = `${key}Cache`;

    if (level !== undefined) {
      const levelName = `level${level}`;
      if (Reflect.has(this[camelizedKey], levelName)) {
        return this[camelizedKey][levelName];
      }
      return [];
    }

    return this[camelizedKey];
  },

  setCache(key, value, level) { // the local cache is the same as the cache on disk
    const camelizedKey = `${key}Cache`;

    if (level !== undefined) {
      const levelName = `level${level}`;
      this[camelizedKey][levelName] = value;
    } else {
      this[camelizedKey] = value;
    }

    this.saveCache(camelizedKey); // save after set local cache automatically
  },

  saveCache(...keys) {
    keys.forEach((key) => {
      this._write(key);
    });
  },

  // --------------------------------------------------------------------------------------------

  _read(key) {
    return localStorage.read(key);
  },

  _write(key) {
    localStorage.write(key, this[key]);
  },
});

const Game = cc.Class({
  ctor() {
    this._Game = new _Game();
  },

  // --------------------------------------------------------------------------------------------

  save() {
    // manually save all local caches
    this._Game.saveCache(st.INVENTORY, st.COLLECTION, st.NOTCH, st.INFO);
  },

  saveAndQuit() {
    this.save();
    this.quit();
  },

  quit() {
    logger.INFO('quit game successfully');
  },

  pause() {
    logger.INFO('pause game');
  },

  resume() {
    logger.INFO('resume game');
  },

  restart() {
    logger.INFO('restart the game');

    this._Game = new Game();
  },

  // --------------------------------------------------------------------------------------------

  getInventoryCache() {
    const inventoryCache = this._Game.getCache(st.INVENTORY);
    // set default cache type as Array

    // if restarted, run this will read stored cache from disk and overwrite the old
    return inventoryCache;
  },

  setInventoryCache(inventoryCache) {
    this._Game.setCache(st.INVENTORY, inventoryCache); // update cache in _Game
  },

  getCollectionCache(level) {
    const collectionCache = this._Game.getCache(st.COLLECTION, level);

    return collectionCache;
  },

  setCollectionCache(collectionCache, level) {
    this._Game.setCache(st.COLLECTION, collectionCache, level);
  },

  getNotchCache(level) {
    const notchCache = this._Game.getCache(st.NOTCH, level);

    return notchCache;
  },

  setNotchCache(notchCache, level) {
    this._Game.setCache(st.NOTCH, notchCache, level);
  },

  getInfoCache() {
    const infoCache = this._Game.getCache(st.INFO);

    return infoCache;
  },

  setInfoCache(infoCache) {
    this._Game.setCache(st.INFO, infoCache);
  },
});

export default new Game();
