# 缓存场景的应用

* 访问外部接口，网络原因可能导致延时不太稳定

## 缓存逻辑

**方案1**

1. 先读取缓存
2. 有缓存 直接返回 -> 开异步任务更新缓存
3. 没有缓存 -> 异步任务更新缓存 -> 返回缓存结果

**方案2**

1. 请求只读缓存
2. 开一个定时脚本更新缓存(只写)

**方案3**

1. SSR渲染结果缓存
2. next.js => CDN缓存
3. jupiter => 网关缓存

## 结构设计

**1. 缓存key**

> 用户生成缓存命中规则，通常配置为uri

**2. TTL过期时间**

> 用于设置最大的过期时间，如果缓存在有效期内则可用，否则需要更新缓存

**3. 缓存Store**

* Redis
* File
* Memory
* CDN
