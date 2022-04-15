# 业务逻辑流程 - 可视化

* [Mermaid官网](https://mermaid-js.github.io/mermaid/#/)
* [Github Mermaid](https://github.com/mermaid-js/mermaid)
* [Mermaid CLI](https://github.com/mermaid-js/mermaid-cli)

## 依赖

```bash
# "dependencies": {
#   "@commitlint/cli": "^13.1.0",
#   "@mermaid-js/mermaid-cli": "^8.12.1"
# }

yarn install
```

**安装vscode plugins**

* Mermaid Markdown Syntax Highlighting
* Mermaid Preview

**步骤**

1. 熟悉语法
2. 在projects下新建所属项目
3. 新建 & 编写 [业务逻辑.md]
4. perview MMD
5. markdown to html // generate PNG(mmdc)

## Start

`diagram/demo` 目录下存放演示demo，不熟悉语法的可以从这里看起

## Template

`template/*` 目录下存放常用模版

## Projects

`projects/*` 业务逻辑

## 修改Mermaid渲染的默认配置

`vscode => 首选项 => 配置 => 工作区 => mermaid`

`.vscode/setting.json`

```json
{
  "mermaid": {
    "sequence": {
      "showSequenceNumbers": true
    }
  }
}
```
