背包系统说明：

1. 游戏加载时，背包系统会请求存档信息，若有信息则跳转步骤2，否则跳转步骤3

2. 若接收到存档信息，则按照数组初始化所有物品，并在物品栏内显示

3. 若未接收到信息，则初始化存档为空

4. 若获得物件，则立即将物件放入背包，同时显示背包界面，时间由“duration”决定，在指定时间后背包关闭

5. 若在短时间内获得两个物品，则会重置计时器，即，背包的自动关闭将在获取最后一个物品的“duration”毫秒后执行

6. 若在非按钮控制期，检测到鼠标置于区域内，则暂停即使，直至鼠标离开

7. 点击背包按钮显示/关闭背包，注意，背包按钮对背包具有最高控制权限，任何时候一旦点击背包按钮，就会立即执行
    反向操作，即，开启的背包会关闭或者关闭的背包会开启，在这种情况下，点4的“duration”失效
