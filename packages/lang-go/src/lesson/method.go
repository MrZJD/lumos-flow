package lesson

import (
	"fmt"

	myutils "github.com/MrZJD/lang_go/src/utils"
)

// go没有类，但是可以为结构体定义方法。有点类似原型

type Person struct {
	name   string
	sexual string
	age    int
}

// v为值传递
func (v Person) sayHello() {
	fmt.Println("my name is", v.name, "and i'm", myutils.IsOr(v.sexual == "male", "boy", "girl"), v.age, "years old.")
}

// v为引用传递
func (v *Person) grow() {
	v.age += 1
}

func growFn(v *Person) {
	v.age += 1
}

// v is anthor value. you should return it
func (v Person) growByVal() Person {
	v.age += 1
	return v
}

func growByValFn(v Person) Person {
	v.age += 1
	return v
}

func HelloMethod() {
	fmt.Println("|-------- hello method --------|")

	p := Person{
		name:   "zjd",
		sexual: "male",
		age:    20,
	}

	p.sayHello() // 20
	p.grow()
	p.sayHello()             // 21
	p.growByVal().sayHello() // 22
	p.sayHello()             // 21

	growFn(&p)
	p.sayHello() // 22

	growByValFn(p).sayHello() // 23
	p.sayHello()              // 22
}
