package lesson

import (
	"fmt"
	"strconv"
	"strings"
)

func incre[T int | string](a T) T {
	var b interface{} = a

	// =====> 类型switch
	switch v := b.(type) {
	case int:
		fmt.Println("Oh, it's a int", v)
	case string:
		fmt.Println("Oh, it's a string", v)
	}

	// 如果int类型
	number, ok := b.(int)
	if ok {
		var result interface{} = number * 2
		return result.(T)
	}

	// 如果是string类型
	str, ok := b.(string)
	if ok {
		var result interface{} = str + str
		return result.(T)
	}

	return a
}

type IPAddr [4]byte

func (ip IPAddr) String() string {
	var ipStr [4]string

	for i, v := range ip {
		ipStr[i] = strconv.Itoa(int(v))
	}

	return strings.Join(ipStr[:], ".")
}

func HelloType() {
	fmt.Println("|-------- 类型推断 --------|")

	// 类似JS中的typeof

	var i interface{} = "hello"

	// t := i.(T)
	// t, ok := i.(T)

	s := i.(string)
	fmt.Println(s)

	s, ok := i.(string)
	fmt.Println(s, ok)

	f, ok := i.(float64)
	fmt.Println(f, ok)

	// f = i.(float64) // 报错(panic)
	fmt.Println("incre number 1", incre(1))
	fmt.Println("incre string 1", incre("hello"))

	hosts := map[string]IPAddr{
		"loopback":  {127, 0, 0, 1},
		"googleDNS": {8, 8, 8, 8},
	}
	for name, ip := range hosts {
		fmt.Printf("%v: %v\n", name, ip)
	}
}
