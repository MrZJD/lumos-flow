package lesson

import (
	"fmt"
	"time"
)

func say(s string) {
	fmt.Println(s)
}

func HelloGoRoutine() {
	fmt.Println("|-------- Hello Go Routine --------|")

	go say("hello")
	go say("world")             // hello world的执行输出顺序不固定
	time.Sleep(1 * time.Second) // 这里如果注释掉所有routine
}
