cc.Class({
    extends: cc.Component,

    properties: {
       disappearTime: 1.5,//墙消失的时间
       refreshTime: 1.5,//墙恢复的时间
    },

    onBeginContact(contact, selfCollider, otherCollider){

        const otherBody = otherCollider.body.node.group;
        if(otherBody === 'player'){
            console.log('Contact!');
            //this.disappearWall();
            this.node.opacity = 0;//墙的透明度降低为0
            contact.disabled = true;
        }

    },

    onEndContact(contact, selfCollider, otherCollider){

        const otherBody = otherCollider.body.node.group;
        if(otherBody === 'player'){
            console.log('Contact!');
            //this.disappearWall();
            this.node.opacity = 255;//墙的透明度降低为0
            contact.disabled = false;
        }
    },

    /*disappearWall(){
        this.scheduleOnce(() =>{
            //Wall节点的位置改变
            this.node.active = false;
            console.log('Already Disappear!');
            this.refreshWall();

        },this.disappearTime);

    },*/

    /*refreshWall(){

        this.scheduleOnce(() => {
            console.log('Set out to refresh!');
            this.node.active = true;
        },this.refreshTime);
        
    }*/
});
