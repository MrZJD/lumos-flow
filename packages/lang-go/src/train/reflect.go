// 反射 => 在程序运行期对程序本身进行访问和修改的能力

package train

import (
	"fmt"
	"reflect"
)

// TypeOf 只能拿到类型定义相关的数据
// ValueOf 除了类型定义，还可以拿到实际的值 / 并且通过Type()拿到类型定义

// interface{}传递为指针时
// TypeOf / ValueOf出来的都是类型都是指针
// 需要通过Elem()访问指针所指向的数据定义

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

func reflectValue(a interface{}) {
	v := reflect.ValueOf(a) // 获取a的动态类型 => 值类型

	fmt.Println("Typeof v:", v)

	k := v.Kind()
	fmt.Println("Kind of v:", k)

	switch k {
	case reflect.Float64:
		fmt.Println("it's a float64")
	case reflect.Int:
		fmt.Println("it's a int")
	case reflect.Pointer:
		v.Elem().SetFloat(10)
		fmt.Println("case:", v.Elem().Float())
		// 地址
		fmt.Println(v.Pointer())
	}
}

// reflect和struct
type MyUser struct {
	Id   int    `json:"id" db:"user_id"`
	Name string `json:"name" db:"user_name"`
	Age  int
}

func (u MyUser) SayHello() {
	fmt.Println("i'm", u.Name)
}

func ParseStruct(o interface{}) {
	t := reflect.TypeOf(o)
	fmt.Println("Typeof:", t)
	fmt.Println("Typeof Name:", t.Name())

	v := reflect.ValueOf(o)
	fmt.Println("ValueOf:", v)

	fmt.Println("==============field")
	for i := 0; i < t.NumField(); i++ {
		f := t.Field(i)
		fmt.Printf("%s : %v", f.Name, f.Type)

		val := v.Field(i).Interface()
		fmt.Println(" val: ", val)
	}

	fmt.Println("==============method")
	for i := 0; i < t.NumMethod(); i++ { // 只统计export的方法
		m := t.Method(i)
		fmt.Println(m.Name)
		fmt.Println(m.Type)
	}

	// 修改结构体的值
	// // 1. 取字段
	// f := v.Elem().FieldByName("Name")
	// // 2. 判断类型
	// if f.Kind() == reflect.Array {
	// 	// 3. set string
	// 	f.SetString("xxxx")
	// }

	// 调用方法
	// // 1. 取方法
	// m := v.MethodByName("SayHello")
	// // 2. 构造参数
	// args := []reflect.Value{reflect.ValueOf("6666")}
	// // 3. 调用
	// m.Call(args)

	// 解析tag

}

func ParseTag(s interface{}) {
	v := reflect.ValueOf(s)

	t := v.Type()
	// f, _ := t.Elem().FieldByName("Id") // if s is struct ptr
	f, _ := t.FieldByName("Id") // if s is struct value

	fmt.Println("Tag:json", f.Tag.Get("json"))
	fmt.Println("Tag:db", f.Tag.Get("db"))
}

func HelloReflect() {
	// reflectType(1)
	// reflectType("123")

	// var x float64 = 1
	// reflectValue(1)
	// reflectValue(3.6)
	// reflectValue(x)

	// var y float64 = 3.1415
	// reflectValue(&y)
	// fmt.Println("after reflect modify:", y)

	u := MyUser{1, "zs", 20}

	// ParseStruct(u)
	ParseTag(u)
}
