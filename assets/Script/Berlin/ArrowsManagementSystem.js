const Settings = {

    arrowCount: 5,//箭矢数量
    arrowInit: false,

}

const ArrowManagementSystem = {

    init(arrowPrefab) {
        
        if(Settings.arrowInit)
        return;

        this.arrowPrefab = arrowPrefab;
        this.arrowPool = new cc.NodePool();//建立arrow的对象池

        const initCount = Settings.arrowCount;
        for(let i = 0; i < initCount; i++) {
            const arrow = cc.instantiate(arrowPrefab);
            this.arrowPool.put(arrow);
        }

        Settings.arrowInit = true;
    },

    getArrow() {
        let arrow = null;

        if(this.arrowPool.size() > 0) {
            arrow = this.arrowPool.get();
        } else {
            arrow = cc.instantiate(this.arrowPrefab);
        }

        return arrow;
    },

    putArrow() {
        this.arrowPool.put(arrow);
    }
};

export { ArrowManagementSystem };