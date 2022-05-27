package lesson

import "fmt"

type Animal interface {
	born()
}

type Dog struct {
	age int
}

func (d Dog) born() {
	d.age++
}

type Cat struct {
	age int
}

func (c *Cat) born() {
	// animal可能会有空指针异常
	if c == nil {
		fmt.Println("<nil>")
		return
	}

	c.age++
}

// interface 也可以作为值进行传递
func animalBorn(a Animal) {
	a.born()
}

// 空接口 - 可保存任何类型的值。（因为每个类型都至少实现了零个方法。）
type Any interface{}

func HelloInterface() {
	var animal Animal
	d := Dog{0}
	c := Cat{0}

	animal = d
	animal = &c

	// animal = c // panic! c not impl Animal

	animal.born()
	animalBorn(animal)
	// animal可能会有空指针异常
}
