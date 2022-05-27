package lesson

import (
	"fmt"
	"strings"
)

type Vertex2 struct {
	Lat, Long float64
}

var m map[string]Vertex2

// map[string]T

func HelloMap() {
	fmt.Println("|-------- map --------|")
	m = make(map[string]Vertex2)
	m["Bell"] = Vertex2{
		40.68, -74.12,
	}
	fmt.Println(m["Bell"])

	m2 := make(map[string]int)

	m2["z"] = 1
	m2["j"] = 2
	m2["d"] = 3

	fmt.Println("m2 is", m2)

	delete(m2, "z")
	fmt.Println("m2 is", m2)

	// 检测key是否存在
	elem, ok := m2["z"] // ok = true/false标记是否存在
	fmt.Println("z in m2 is", elem, ok)
}

func WordCount(s string) map[string]int {
	result := make(map[string]int)

	for _, v := range strings.Split(s, " ") {
		_, flag := result[v]

		if flag {
			result[v] += 1
		} else {
			result[v] = 1
		}
	}

	return result
}
