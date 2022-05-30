// 反射 => 在程序运行期对程序本身进行访问和修改的能力

package train

import (
	"fmt"
	"reflect"
)

func reflectType(a interface{}) {
	t := reflect.TypeOf(a) // 获取a的静态类型

	fmt.Println("TypeOf a:", t)

	k := t.Kind()
	fmt.Println("Kind of a:", k)
	switch k {
	case reflect.Int:
		fmt.Println("it's a int")
	case reflect.String:
		fmt.Println("it's a string")
	}
}

func HelloReflect() {
	reflectType(1)
	reflectType("123")
}
