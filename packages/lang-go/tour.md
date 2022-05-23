
## go mod

```shell
# 初始化项目
go mod init <YourProjectName> # ex.github.com/MrZJD/lang_go

# 安装包
go mod tidy
```


## 类型

```go
// bool
// string
// int int8 int16 int32 int64
// uint uint8 uint16 uint32 uint64 uintptr
// byte // = uint8
// rune // int32 // unicode码点
// float32 float64
// complex64 complex128

// ! int uint uintptr 具体长度和系统相关，32位系统为32
// int/float默认值为0
// bool默认值为false
// string默认值为""

// 类型转换 T(v)
var i = 32;
var f = float64(i);
```

## 变量&常量

```go
var c, python, java bool
var Pi = 3.14 // 省略类型
var a, b = 1, 2 // map声明
c := 3 // !仅在函数内部可以使用简洁声明

const Pi2 = 3.14 * 2; // 常量 // 不能使用:=
```

## 包

```golang
// 单导入
import "fmt"

// 分组导入
import (
  "fmt"
  "math"
)

// 导出
// 如果变量名/常量名/函数名等以大写字母开头，即为导出
var Pi = 3.14 // 省略类型
```

## 函数

```golang
func add(x int, y int) int {
	return x + y
}
// 连续相同参数的类型相同时可以合并类型声明
func add(x, y int) int {
	return x + y
}
// 返回多个值
func swap(x, y string) (string, string) {
	return y, x
}
```

## 流程控制

```golang
// if
// for
// switch
// defer // defer栈，FILO
```
