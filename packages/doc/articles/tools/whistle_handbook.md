# 使用whistle

## 开始

```bash
yarn add -g whistle
w2 start
```

1. 打开whistle工作台
2. 下载证书（Android / IOS各自配置信任证书）

## 常用代理规则

```shell
/path file://({ "code": 0 }) #cgi
/path file:///User/Document/local_map/mock.json #file
/path statusCode://500 #status code
/path reqDelay://10000 enable://abort # delay10s后abort
/path resSpeed
/path tpl://{tpl.json} #应用模板

^example.com/*** http://127.0.0.1:8080/$1 #map remote

/path jsAppend://{myJS} # 追加js, 支持content-type: text/html | text/javascript
/path cssAppend://{myCSS} # 追加css, 支持content-type: text/html | text/css

/path resCookies://{resCookies.json}
/path resHeaders://{headers.json}

/path weinre://test # 利用weinre调试

/path whistle.inspect://vConsole # npm i -g whistle.inspect
```

## 参考

* [常用代理规则](https://www.cnblogs.com/kaiye/p/10137592.html)
* [部分场景](https://www.jianshu.com/p/b84fe01c721b)
