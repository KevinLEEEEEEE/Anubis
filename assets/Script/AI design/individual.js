import newBehaviorTree from './SM&BT/behaviorTree';
import stateMachine from './SM&BT/stateMachine';
import { btNode as $ } from './config/btNode';

const bt = {
  structure: [
    [
      { name: 'root', type: $.SELECTOR, parent: null },
    ],
    [
      { name: 'goToCourt', type: $.SEQUENCE, parent: 'root' },
      { name: 'goDataing', type: $.SELECTOR, parent: 'root' },
    ],
    [
      { name: 'isValentinesDay', type: $.CONDITION, parent: 'goToCourt' },
      { name: 'toGoToCourt', type: $.ACTION, parent: 'goToCourt' },
      { name: 'toPlayBasketball', type: $.ACTION, parent: 'goToCourt' },
      { name: 'buyFlower', type: $.SELECTOR, parent: 'goDataing' },
      { name: 'meetGirlFriend', type: $.SEQUENCE, parent: 'goDataing' },
    ],
    [
      { name: 'goHomeAndDrawMoney', type: $.SEQUENCE, parent: 'buyFlower' },
      { name: 'goFlowerShopAndBuy', type: $.SEQUENCE, parent: 'buyFlower' },
      { name: 'toFindGirlFriend', type: $.ACTION, parent: 'meetGirlFriend' },
      { name: 'isGirlFriendStillThere', type: $.CONDITION, parent: 'meetGirlFriend' },
      { name: 'isGirlFriendHasNoFlower', type: $.CONDITION, parent: 'meetGirlFriend' },
      { name: 'toSendFlower', type: $.ACTION, parent: 'meetGirlFriend' },
    ],
    [
      { name: 'isGirlFriendHasNoFlower', type: $.CONDITION, parent: 'goHomeAndDrawMoney' },
      { name: 'isMyselfHasNoFlower', type: $.CONDITION, parent: 'goHomeAndDrawMoney' },
      { name: 'isMySelfHasNoMoney', type: $.CONDITION, parent: 'goHomeAndDrawMoney' },
      { name: 'toGoHome', type: $.ACTION, parent: 'goHomeAndDrawMoney' },
      { name: 'toDrawMoney', type: $.ACTION, parent: 'goHomeAndDrawMoney' },
      { name: 'isGirlFriendHasNoFlower', type: $.CONDITION, parent: 'goFlowerShopAndBuy' },
      { name: 'isMyselfHasNoFlower', type: $.CONDITION, parent: 'goFlowerShopAndBuy' },
      { name: 'toWalkToFlowerShop', type: $.ACTION, parent: 'goFlowerShopAndBuy' },
      { name: 'toBuyFlowers', type: $.ACTION, parent: 'goFlowerShopAndBuy' },
    ],
  ],
  knowledge: {
    isValentinesDay: true,
    isGirlFriendHasNoFlower: true,
    isMyselfHasNoFlower: false,
    isMySelfHasNoMoney: false,
    isGirlFriendStillThere: true,
  },
  condition: {
    isValentinesDay() {
      return !this.knowledge.isValentinesDay;
    },
    isGirlFriendHasNoFlower() {
      return this.knowledge.isGirlFriendHasNoFlower;
    },
    isMyselfHasNoFlower() {
      return this.knowledge.isMyselfHasNoFlower;
    },
    isMySelfHasNoMoney() {
      return this.knowledge.isMySelfHasNoMoney;
    },
    isGirlFriendStillThere() {
      return this.knowledge.isGirlFriendStillThere;
    },
  },
  action: {
    toGoToCourt() {
      console.log('GoToCourt');
      return true;
    },
    toPlayBasketball() {
      console.log('PlayBasketball');
      return true;
    },
    toGoHome() {
      console.log('GoHome');
      return true;
    },
    toDrawMoney() {
      console.log('DrawMoney');
      return true;
    },
    toWalkToFlowerShop() {
      console.log('WalkToFlowerShop');
      return true;
    },
    toBuyFlowers() {
      console.log('BuyFlowers');
      return true;
    },
    toFindGirlFriend() {
      console.log('FindGirlFriend');
      return true;
    },
    toSendFlower() {
      console.log('SendFlower');
      this.say();
      return true;
    },
  },
};

const sm = {
  init: 'solid',
  transitions: [
    { name: 'melt', from: 'solid', to: 'liquid' },
    { name: 'freeze', from: 'liquid', to: 'solid' },
    { name: 'vaporize', from: 'liquid', to: 'gas' },
    { name: 'condense', from: 'gas', to: 'liquid' },
  ],
  methods: {
    onBeforeMelt() { console.log('onBeforeMelt'); },
    onLeaveSolid() { console.log('onLeaveSolid'); },
    onMelt() { this.say(); },
    onEnterLiquid() { console.log('onEnterLiquid'); },
    onAfterMelt() { console.log('onAfterMelt'); },
    onFreeze() { console.log('I froze'); },
    onVaporize() { console.log('I vaporized'); },
    onCondense() { console.log('I condensed'); },
  },
};

cc.Class({
  extends: cc.Component,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on('mousedown', this.click, this);
    // this.behaviorTree = newBehaviorTree(bt, this);
    // this.behaviorTree(null, true);
    this.stateMachine = stateMachine(sm, this);
    this.stateMachine.melt();
    console.log(this.stateMachine.state);
  },

  init(config) {
    this.config = config;
    console.log(config);
  },

  click() {
    this.node.emit('iEmergencyReq', {
      type: 'attack',
    });
  },

  say() {
    this.test = 2;
    console.log(this.test);
    cc.log('onMelt');
  },

});
