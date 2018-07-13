const _Global = {
  player: {
    position: cc.v2(0, 0),
  },
};

const Global = {
  setPlayerPosition(position) {
    _Global.player.position = position;
  },
  getPlayerPosition() {
    return _Global.player.position;
  },
};

export default Global;
