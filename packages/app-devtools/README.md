# Chrome Devtools Arch

> 根据node-inspector & [chrome://inspect/#devices](chrome://inspect/#devices)进行功能发散


**讨论两个问题**

1. 前端集成devtools?
2. devtools的技术架构是怎么样的？

## Frontend

- [GoogleSource - devtools-frontend](https://chromium.googlesource.com/devtools/devtools-frontend)
- [Github - chrome-devtools-frontend](https://github.com/ChromeDevTools/devtools-frontend)

```bash
# 获取tools
mkdir google
cd google
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

# 将tools bin设置环境变量
vim ~/.bash_profile
export PATH=$PATH:/path/depot_tools
source ~/.bash_profile
 
## 下载源码
cd ../
fetch devtools-frontend
 
## 编译
cd devtools-frontend
gn gen out/Default
autoninja -C out/Default

## out/Default包含了前端页面产物
## 引入至项目工程下即可
```

## Devtools Protocol

- [DOC - Chrome Devtools Protocol](https://chromedevtools.github.io/devtools-protocol/)

## Frontend Host（Injection）

- whistle weinre

功能：
1. 与devtools server通信
2. 响应CDP Request
3. 根据文档变更信息发送CDP Event

实现参考：[Github - devtools-backend/lib/frontend/remoteDebugger.js](https://github.com/christian-bromann/devtools-backend/blob/master/lib/frontend/remoteDebugger.js)

## 参考

* [devtools-backend](https://github.com/christian-bromann/devtools-backend)
