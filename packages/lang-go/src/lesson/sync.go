package lesson

import (
	"fmt"
	"sync"
	"time"
)

type SafeCounter struct {
	v   map[string]int
	mux sync.Mutex
}

func (c *SafeCounter) Inc(key string) {
	c.mux.Lock() // 这里会互斥routine,避免多协程同时写入时的竞态
	c.v[key]++
	c.mux.Unlock()
}

func (c *SafeCounter) Val(key string) int {
	c.mux.Lock()
	defer c.mux.Unlock() // defer 函数退出前执行
	return c.v[key]
}

func HelloSync() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Val("somekey"))
}
