package lesson

import "fmt"

func MyPointer() {
	i, j := 42, 2701

	p := &i // 取地址

	fmt.Println("--->", *p) // 寻址

	*p = 21 // 通过地址修改

	fmt.Println(i, j)
}
