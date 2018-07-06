
cc.Class({
    extends: cc.Component,
    
    properties: {
        arrow: cc.Prefab,
        intervalTime: 1.5,//箭矢发射的时间间隔
        arrowCount: 5,//对象池中箭矢数量
    },

    onLoad () {

        this.initArrowPool();
        this.shotEvent();   
       
    },

    //初始化arrow对象池
    initArrowPool() {

        this.arrowPool = new cc.NodePool();//建立arrow对象池

        for(let i = 0; i < this.arrowCount; i++) {
            const arrow = cc.instantiate(this.arrow);
            this.arrowPool.put(arrow);
        }
          
    },

    getArrow() {
        let arrow = null;

        if(this.arrowPool.size() > 0) {
            arrow = this.arrowPool.get();
        } else {
            arrow = cc.instantiate(this.arrow);
        }

        return arrow;
    },

    putArrow(arrow) {
        this.arrowPool.put(arrow);
    },


    shotEvent() {
        this.schedule(() => {
        let arrow = this.getArrow();
        arrow.getComponent('Arrow').init();
        arrow.parent = this.node;
        },this.intervalTime, this);
    },
    
});