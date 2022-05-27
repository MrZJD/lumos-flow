package lesson

import "fmt"

// in golang func is also first class
func HelloFunc() {
	fmt.Println("|-------- use func --------|")
	plus := func(a, b int) int {
		return a + b
	}

	memorize := func(calc func(a, b int) int, addiv int) func(int) int {
		result := addiv
		return func(addt int) int {
			result = calc(result, addt)
			return result
		}
	}

	plus2 := memorize(plus, 0)
	fmt.Println("plus2", plus2(1))
	fmt.Println("plus2", plus2(2))
	fmt.Println("plus2", plus2(3))
}

// 返回一个“返回int的函数”
func fibonacci() func() int {
	arg0 := -1
	arg1 := 0
	return func() int {
		next := arg0 + arg1

		// 第一个
		if next == -1 {
			next = 0
		} else if next == 0 {
			next = 1
		}

		arg0 = arg1
		arg1 = next

		return next
	}
}

func HelloFib() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}
