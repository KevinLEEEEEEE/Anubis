import logger from '../utils/logger';

const LocalStorage = cc.Class({
  read(key) {
    try {
      const value = JSON.parse(cc.sys.localStorage.getItem(key));
      return value;
    } catch (e) {
      logger.ERROR(e);
      return undefined;
    }
  },
  write(key, value) {
    try {
      cc.sys.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      logger.ERROR(e);
    }
  },
});

export default new LocalStorage();
