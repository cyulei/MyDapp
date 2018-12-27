# Free Talk DApp
[TOC]

## 简介
这款DApp可以无论你是谁你都可以在上面进行发帖和留言，留下你珍贵的言论将伴随区块链永久记录在区块链上。留言的展示形式是弹幕形式，你可以看到大家的留言。

想要了解更多请观看项目演示视频：[FreeTalkDappDemo][1]

## 项目结构
```
.
├── client 前端
├── contracts 智能合约文件
│   ├── SimpleStorage.sol
│   └── Migrations.sol
├── migrations 部署用到的脚本
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── test 编写的测试
│   └── simplestorage.js
│   └── TestSimpleStorage.sol
└── truffle.js

```
## 开发环境与工具
- Windows 10
- Node.js v10.13.0
- Truffle
- React

## 项目安装与运行
 - 将代码clone到本地
 
 ```bash
> git clone https://github.com/cyulei/MyDapp.git
 ```
 - 可以使用 `Geth` 或者 `TestRPC` 作为 Truffle 开发的客户端
 > 这里我使用的是 `TestRPC`，它在执行交易时是实时返回，而不等待默认的出块时间，可以快速验证你新写的代码，当出现错误时，也能即时反馈。启动 `TestRPC` 后，会默认创建10个帐号，Available Accounts是帐号列表，Private Keys是相对应的帐号密钥。

```bash 
> npm install -g ethereumjs-testrpc  //安装TestRPC
//运行TestRPC
> testrpc
```
- 合约的部署
> 这里在代码中我默认部署到 `TestRPC` 的默认端口localhost:8545
```bash 
> truffle migrate
```
- 运行前端

```bash
> cd client          //进入client文件夹
> npm run start      //运行前端
```
- 最后访问localhost:3000可以看到完整界面
> 这里需要配合Google浏览器的 `MetaMask` 插件，选择区块链测试环境是localhost:8545，在里面导入 `TestRPC` 给的默认账号进行交易

下面是运行后的完整界面图

![完整界面图][2]

## 选题背景
在国内有很多可以发表自己言论这类的应用，比如像微博，贴吧，甚至是微信公众号, qq空间等，在国外有 Twitter ,   Facebook 等只要是有涉及人类的社交，就可以提供留言以及发表自己想法功能。

但是，这些言论被用户发送上传到网络上，会由一个中心化的机构去存储和管理，所以避免不了如果存储的服务器被攻击，可能会导致数据丢失。而且在国家的法律规定下，一些言论是无法在该国的网络环境下显示给大众的，意味着中心化的机构是有权利去对这些言论进行更改或者删除等操作。

区块链是实现了去中心化的思想，区块链是由所有网络节点共享，如果能够将用户的言论存储在区块链上，每一个网络节点都会有这个言论的记录，所以不会有中心化的机构干涉去删除一些言论。其实现在有一些 Dapp 已经实现了在以太坊上的类似 Twitter 的应用，所以我也想做一个支持言论自由的区块链应用。

## 选题构思
我希望能实现的应用保持纯粹，就是一个用户与用户之间的言论交流所以这个Dapp想实现一个用户可以发表自己的帖子，没有中心化的管理机构去管理应用上面的帖子，也就意味着没有人可以删除用户发表的帖子。

另外一个想实现的功能就是其他用户或者本用户也可以在已经发表的帖子下面留言，并且留言也是无法被删除的。

最后结合React框架做一个前端界面方便用户的交互，并且留言形式使用了弹幕发送的形式增添一些趣味性。

## 项目测试
- 测试发帖功能
> 点击下方按钮 `按下发帖即送屠龙宝刀` 开始发帖

1.输入空白会有提示

![测试为空][3]

2.进行发帖，弹出交易

![发帖][4]

3.发帖成功

![发帖][5]

- 测试留言功能
> 点击帖子旁边 `点击留言` 进行留言

1.输入空白会有提示

![Liuyan][6]

2.进行留言

![liuyan][7]

3.留言成功

![liuyan][8]

- 测试分页功能

1.三个帖子为1页

![page1][9]

2.正常分页

![page2][10]

- 测试弹幕功能
1.弹幕会有不同颜色和速度

![b1][11]

2.每次刷新改变颜色和速度

![b2][12]

## 项目参考
- React 的 UI 组件库：[rsuitejs][13]
- 一个简单的弹幕组件: [react-barrage][14]


  [1]: https://www.bilibili.com/video/av39120015/
  [2]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/full.png
  [3]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/sendpost1.png
  [4]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/sendpost2.png
  [5]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/sendpost3.png
  [6]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/sendmessage1.png
  [7]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/sendmessage2.png
  [8]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/sendmessage3.png
  [9]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/page1.png
  [10]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/page2.png
  [11]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/b1.png
  [12]: https://raw.githubusercontent.com/cyulei/MyDapp/master/photo/b2.png
  [13]: https://rsuitejs.com/
  [14]: https://github.com/forthealllight/react-barrage