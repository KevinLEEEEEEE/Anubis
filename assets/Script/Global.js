import infoBar from './playerInfoBar';

const GlobalSettings = {
  bulletCount: 10,
  init: false,
};

const Global = {

  init(bulletPrefab) {
    if (GlobalSettings.init) return;

    this.bulletPrefab = bulletPrefab;

    this.bulletPool = new cc.NodePool();

    const initCount = GlobalSettings.bulletCount;

    for (let i = 0; i < initCount; i += 1) {
      const bullet = cc.instantiate(bulletPrefab);
      this.bulletPool.put(bullet);
    }

    GlobalSettings.init = true; // 比较简陋的方法，确保只能初始化一次，若有更好的方法及时联系我哦~
  },

  getBullet() {
    let bullet = null;

    if (this.bulletPool.size() > 0) {
      bullet = this.bulletPool.get();
    } else {
      bullet = cc.instantiate(this.bulletPrefab);
    }

    return bullet;
  },

  putBullet(bullet) {
    this.bulletPool.put(bullet);
  },
};


const InfoSettings = {
  HP: 5,
  XP: 1000,
};

const Info = {

  getHP() {
    return InfoSettings.HP;
  },

  setHP(hp) {
    const tmpHP = InfoSettings.HP + hp;
    InfoSettings.XP = (tmpHP <= 5) ? tmpHP : 5;
    infoBar.updateData();
  },
  getXP() {
    return InfoSettings.XP;
  },

  setXP(xp) {
    const tmpXP = InfoSettings.XP + xp;
    InfoSettings.XP = (tmpXP >= 0) ? tmpXP : 0;
    infoBar.updateData();
  },
};

export { Global, Info };
