const Ls = cc.Class({
  ctor() {
    this.hi = 1;
  },
  sets() {
    cc.sys.localStorage.setItem('hi', this.hi);
    console.log(this.hi);
  },
});

export default new Ls();
