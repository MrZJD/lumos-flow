package lesson

import "fmt"

type Vertex struct {
	X int
	Y int
}

func HelloStruct() {
	v := Vertex{1, 2}
	fmt.Println(v)
	fmt.Println(v.X)
	v.X = 4
	p := &v
	fmt.Println((*p).X) // 指针访问
	fmt.Println(p.X)    // 直接也可以

	v2 := Vertex{X: 3, Y: 4} // 指定赋值
	fmt.Println(v2)
}
