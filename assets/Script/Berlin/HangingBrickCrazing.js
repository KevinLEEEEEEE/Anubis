// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        crzaingTime: 1.5,//player站在悬浮砖上悬浮砖会碎裂的时间
        refreshTime: 2,//悬浮砖恢复的时间
    },

    onLoad () {
        this.isBreak = false;
        this.crazingAnim = this.getComponent(cc.Animation);
    },

    onBeginContact(contact, selfCollider, otherCollider){

        //此时悬浮砖已经碎裂，在悬浮砖恢复之前，player再碰撞无效果
        if(this.isBreak === true){
            contact.disabled = true;
            return;
        }

        const otherBody = otherCollider.body;
        if(otherBody.node.group === 'player'){
            console.log("Contact!");
            this.delyBreak();
        }
    },

    //计时this.crazingTime的时间悬浮砖碎裂
    delyBreak(){
        this.scheduleOnce(() => {
            this.isBreak = true;
            //Animation
            this.crazingAnim.play("Crazing");
            this.delyRefresh();
        },this.crzaingTime);
    },

    //计时this.refreshTime的时间悬浮砖恢复原状
    delyRefresh(){
        this.scheduleOnce(() => {
            //显示初始图片
            this.isBreak = false;
        },this.refreshTime);
    }

    
});
