import localStorage from './localStorage';
import objectList from '../config/objectList';

const _storageManager = {
  read(key) {
    const value = localStorage.read(key);
    console.log(value);
    return value;
    // if (value !== false) {
    //   console.log(value);
    //   return value;
    // }
    // return false; // return default setting
  },
  write(key, value) {
    localStorage.write(key, value);
  },
  init(key, value) {

  },
};

const storageManeger = {
  objectCache: [],

  readObjectsCache() {
    const objectCache = _storageManager.read('inventory');

    // if false, then init localStorage

    return objectCache;
    // return [
    //   {
    //     type: objectList.key,
    //     match: 'L01D01',
    //   },
    // ];
  },

  writeObjectsCache(item) {
    this.objectCache.push(item);
    this.save();
  },

  readLevelsCache() {

  },

  writeLevelCache() {

  },

  readInfoCache() {

  },

  writeInfoCache() {

  },

  save() {
    _storageManager.write('inventory', this.objectCache);
  },
};

export default storageManeger;
