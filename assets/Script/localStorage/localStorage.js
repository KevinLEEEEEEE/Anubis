const Ls = cc.Class({
  ctor() {
    // init
  },
  read(key) {
    try {
      const value = JSON.parse(cc.sys.localStorage.getItem(key));
      return value;
    } catch (e) {
      return false;
    }
  },
  write(key, value) {
    try {
      cc.sys.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
});

export default new Ls();
