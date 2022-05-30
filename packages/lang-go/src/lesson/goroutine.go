package lesson

import (
	"fmt"
	"time"
)

// 1. go 发起一个 routine
// 2. 利用channel进行routine间的数据交换 (关键词 chan)
// ch := make(chan int)

// ch <- v // 将值v发送到管道ch
// v <- ch // 消费管道ch中的值赋给v

// 3. with buffer: 管道是带缓冲的
// 当缓冲区满的时候会阻塞写入
// 当缓冲区为空时会阻塞读取

// 4. close channel (resolve / reject channel)
// 通常不需要手动关闭
// 发送方可以通过close(ch)发送关闭信号
// 读取方 v, ok := <- ch // 通过ok bool来判断管道是否关闭

// 5. 多个channel的流程控制
// 5.1 select ?=> Promise.race // 谁先到执行到，都到了随机执行

func say(s string) {
	fmt.Println(s)
}

func sum(s []int, c chan int) {
	result := 0
	for _, v := range s {
		result += v
	}
	c <- result
}

func bullet(s int, c chan int) {
	loop := make([]int, s)
	for i := range loop {
		time.Sleep(time.Second * 1)
		c <- i
	}
	close(c)
}

func selectRoutine() {
	tick := time.NewTicker(time.Second * 1)
	boom := time.After(time.Second * 5)
	for {
		select { // 选择一个有数据的channel进行执行，当都没有数据时执行default // 如果没有default则会阻塞select语句 // 如果有多个管道有数据，则随机执行一个
		case <-tick.C:
			fmt.Println("tick.")
		case <-boom:
			fmt.Println("boom!")
			tick.Stop()
			return
		default:
			fmt.Println(".........")
			time.Sleep(time.Millisecond * 500)
		}
	}
}

func HelloGoRoutine() {
	fmt.Println("|-------- Hello Go Routine --------|")

	// 1. just go
	go say("hello")
	go say("world")             // hello world的执行输出顺序不固定
	time.Sleep(1 * time.Second) // 这里如果注释掉所有routine

	// 2. with channel
	// 计算累加
	c := make(chan int)

	s := []int{1, 2, 3, 4, 5, 6}
	go sum(s[:3], c)
	go sum(s[3:], c)
	x, y := <-c, <-c // 将管道中的第一个值给x, 第二个值给y // 会阻塞操作
	fmt.Println(x, y, x+y)

	// 3. with buffer
	cBuf := make(chan int, 5)

	// 4. close channel
	go bullet(10, cBuf)

	// 利用range来判断channel是否关闭
	for i := range cBuf {
		fmt.Println("channel data:", i)
	}

	// 5. select
	selectRoutine()
}
