{
  const dataTypes = {
    'int32': 'number',
    'int64': 'number',
    'string': 'string',
    'bool': 'boolean',
  };
}

start
  = doc

doc
  = a:space b:message c:space { return [a, b, c].join('') }

message
  = 'message' name:identifer content:block { return `export class ${name} {${content}}` }

block
  = space '{' content:express+ '}' { return '\n' + content.join('\n') + '\n' }

express
  = type:dataType name:identifer operator [0-9]+ ';'? space {
    return `\t${name}: ${type};`;
  }

dataType
  = space d:('int32' / 'string' / 'boolean') space { return dataTypes[d] || d; }

operator
  = space '=' space { return '='; }

identifer
  = space name:[a-zA-Z0-9]+ space { return name.join(''); }

space
  = [\t\n\r ]*