package train

import (
	"fmt"
	"time"
)

// go A()
// go B()
// go C()
// output: ABCABCABC

func say(ch chan int, waitCh chan int, idx int, loop int, p string) {
	count := 0
	for range waitCh {
		fmt.Print(p)
		ch <- 1 // 写入下一个管道
		count++
		if count >= loop {
			break
		}
	}
}

func HelloABC() {
	chA := make(chan int)
	chB := make(chan int)
	chC := make(chan int)

	loop := 3

	go say(chA, chC, 0, loop, "A")
	go say(chB, chA, 1, loop, "B")
	go say(chC, chB, 2, loop, "C")

	chC <- 1

	time.Sleep(time.Second)
}
