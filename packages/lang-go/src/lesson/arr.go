package lesson

import "fmt"

func HelloArr() {
	fmt.Println("|-------- use slice --------|")

	// [n]T
	// n无法省略，必须指定大小
	// 默认值为nil
	var a [2]string
	a[0] = "hello"
	a[1] = "world"
	fmt.Println(a)

	pmis := [6]int{2, 3, 5, 7, 9, 11}
	fmt.Println(pmis)

	// ----> slice
	// 默认值为nil
	s1 := pmis[1:4] // 切片的内存是共享的
	fmt.Println("Slice:", s1)

	// 直接创建切片
	// 可以身略切片大小
	s2 := []int{2, 3, 4, 5, 6}
	fmt.Println("Slice2:", s2)

	s3 := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, true},
		{4, false},
	}
	fmt.Println(s3)

	// 简写
	s4 := s2[3:] // 忽略下届
	s5 := s2[:3]
	s6 := s2[:]
	fmt.Println(s4, s5, s6)

	s5 = s5[:5] // 扩充到5,但是不能超出原长度

	fmt.Printf("len=%d cap=%d %v\n", len(s5), cap(s5), s5)
}
