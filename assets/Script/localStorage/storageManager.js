import localStorage from './localStorage';

const _storageManager = {
  read(key) {
    const value = localStorage.read(key);
    if (value && value !== false) {
      return value;
    }
    return false; // return default setting
  },
  write(key, value) {
    localStorage.write(key, value);
  },
  init() {

  },
};

const storageManeger = {
  readObjectsCache() {

  },

  writeObjectsCache() {

  },

  readLevelsCache() {

  },

  writeLevelCache() {

  },

  save() {
    this.writeObjectsCache();
    this.writeLevelCache();
  },
};

export default storageManeger;
