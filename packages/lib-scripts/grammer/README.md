# PEG - 语法解析器

> 通过声明语法描述规则 -> 自动生成解析器（String -> Token / Grammer -> AST）

## 语法描述规则

`"literal"` `'literal'` -> 匹配指定字符串，追加`i`大小写不敏感
`.` -> 匹配一个字符
`[chars]` -> 匹配限定范围内的一个字符

`(expression)` -> match one sub expression & return result
`expression *` -> match 0 / 1+
`expression +` -> match 1+
`expression ?` -> match 0 or 1

```js
{
  // initializer
  // js code
  // declare all variables & functions
}

rule "human rule name"
  = parsing expression
```

