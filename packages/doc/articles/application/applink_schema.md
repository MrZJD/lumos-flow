# Applink & Universal Link & URL Scheme

## 了解URL & URI

[what is a URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)

* URI: Uniform Resource Identifier 统一资源描述符（包括URL URN URC）
* URL: Uniform Resource Locator 统一资源定位符（how to fetch resource）
  * `http://example.com/mypage.html`
* URN: Uniform Resource Name 统一资源名（resource name）
  * `urn:isbn:0451450523`
* DataURI(DataURL):
  * `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`

> 区别&联系：概念范围URI > URL, URL是一个URI，但是URI不一定是URL

```markdown
# URI Syntax
URI = scheme ":" ["//" authority] path ["?" query] ["#" fragment]

http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument

# URL 范式
URL = [Scheme]://[Domain]:[Port][Path][Parameters][Anchor]

Scheme = http
Domain = www.example.com
Port = 80
Path = /path/to/myfile.html
Parameters = ?key1=value1&key2=value2
Anchor = #SomewhereInTheDocument
```

## URI Scheme

> 如上syntax中代表协议的部分 http/https/mailto等

* [list of URI schemes](https://en.wikipedia.org/wiki/List_of_URI_schemes)

## 自定义URL Scheme => Applink

> 当系统遇到一个schema => 需要识别对应的location逻辑（mailto唤起邮件，tel唤起拨号）// 我们可以向系统注册一个schema，当遇到该协议时唤起我们的app

```html
<a href="tel:10086">打电话</a>
<a href="maito:10086@qq.com">打电话</a>
<a href="maito:10086@qq.com">打电话</a>
<a href="lark://applink.feishu.cn/client/mini_program/open">lark自定义schema</a>
```

## Universal Link

> 和applink相同，但是不通过协议触发（可以通过域名进行识别）

## refer

* [h5如何唤起APP](https://zhuanlan.zhihu.com/p/47661454)
