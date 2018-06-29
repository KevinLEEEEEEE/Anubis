import {Global} from './Global'

const {ccclass, property} = cc._decorator;

@ccclass
export default class globalActive extends cc.Component { 
    
    @property(cc.Prefab)
    bulletPrefab = null;

    onLoad () {
        Global.init(this.bulletPrefab); //初始化对象池
    }
}
