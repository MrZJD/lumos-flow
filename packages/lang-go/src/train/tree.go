package train

import (
	"fmt"
)

// https://tour.go-zh.org/concurrency/8
// 等价二叉树

type Tree struct {
	Left  *Tree
	Value int
	Right *Tree
}

func newTree(deep int) *Tree {
	node := Tree{
		Left:  nil,
		Value: 100,
		Right: nil,
	}

	for i := range make([]int, deep) {
		left := &Tree{
			Value: 10 + i,
		}
		node.Left = left
	}

	return &node
}

// Walk 步进 tree t 将所有的值从 tree 发送到 channel ch。
func Walk(t *Tree, ch chan int) {
	if t == nil {
		return
	}
	if t.Left != nil {
		Walk(t.Left, ch)
	}
	ch <- t.Value
	if t.Right != nil {
		Walk(t.Right, ch)
	}
}

func bootstrap(t *Tree, ch chan int) {
	Walk(t, ch)
	close(ch)
}

// Same 检测树 t1 和 t2 是否含有相同的值。
func Same(t1, t2 *Tree) bool {
	ch1 := make(chan int, 10)
	ch2 := make(chan int, 10)
	go bootstrap(t1, ch1)
	go bootstrap(t2, ch2)

	for {
		x, xOk := <-ch1
		y, yOk := <-ch2

		if !xOk && !yOk {
			break
		}

		if !xOk || !yOk {
			return false
		}

		if x != y {
			return false
		}
	}

	return true
}

func HelloTree() {
	fmt.Println("hello tree: ", Same(newTree(1), newTree(1)))
}
