{
  const DataType = {
    'i32': 'number',
    'i64': 'number',
    'string': 'string',
    'bool': 'boolean'
  };
}

start
  = doc

doc
  = a:divider b:(struct / service)* c:divider { return [a, b.join('\n'), c].join('') }

// 结构体
struct
  = divider 'struct' space name:identifer '{' list:props* '}' divider {
    return `interface ${name} {\n${list.join('\n')}\n}`
  }

// 属性
props
  = divider pos ':' space d:pdesciptor space t:datatype space n:identifer annotation? ';'? divider {
    return `\t${n}${d === 'optional' ? '?:' : ':'} ${t};`;
  }

// 属性描述符
pdesciptor
  = ('optional' / 'required')

service
  = divider 'service' space name:identifer '{' list:methods* '}' divider {
    return `interface ${name} {\n${list.join('\n')}\n}`;
  }

// 方法
methods
  = divider r:identifer space name:identifer space '(' list:args* ')' annotation? ';'? divider {
    return `\t${name}(${list.join(', ')}): ${r};`
  }

// 入参
args
  = space pos ':' space d:datatype space n:identifer {
    return `${n}: ${d}`;
  }

// 类型定义
datatype
  = d:('i32' / 'i64' / 'string' / datatypeArr / identifer) {
    return DataType[d] || d;
  }

datatypeArr
  = 'list<' x:identifer '>' { return `${x}[]` }

// 注解
annotation
  = '(' annotaioni ')' { return '' }

// 注解项
annotaioni
  = space namespace:identifer '.' desciptor:identifer '=' desc:text ','? space

// position
pos
  = [1-9][0-9]*

// text文本
text
  = [\'\"][^\n\r\'\"]*[\'\"]

// 标记符
identifer
  = space name:[a-zA-Z0-9]+ space { return name.join(''); }

// 空格制表
space
  = [\t\n ]*

// 空格制表换行
divider
  = [\t\n\r ]*
