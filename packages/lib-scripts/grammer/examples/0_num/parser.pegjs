{
  function makeInteger(o) {
    // return parseInt(o.join(""), 10);
    return o;
  }

  const cnInteger = {
    '0': '零',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
    '7': '七',
    '8': '八',
    '9': '九',
  };

  function toCNInteger(o) {
    return o.map(i => cnInteger[i] || i).join('');
  }
}

start
  = integer

integer "integer"
  = digits:[0-9]+ { return toCNInteger(digits); }

