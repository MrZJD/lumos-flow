package lesson

import (
	"fmt"
	"time"
)

// error 为内建类型
// type error interface {
// 	Error() string
// }

type MyError struct {
	When time.Time
	What string
}

func (err *MyError) Error() string {
	return fmt.Sprintf("at %v, %s", err.When, err.What)
}

type ErrNegativeSqrt float64

func (e ErrNegativeSqrt) Error() string {
	return fmt.Sprintf("cannot Sqrt negative number: %v", float64(e)) // 这里直接输出e，会导致递归调用e.Error() 所以需要转为float后调用String()
}

func sqrtWithErr(x float64) (float64, error) {
	if x < 0 {
		return 0, ErrNegativeSqrt(x)
	}

	return x * x, nil
}

func run() error {
	return &MyError{
		time.Now(),
		"it didn't work",
	}
}

func HelloErr() {
	fmt.Println("|-------- hello error --------|")

	if err := run(); err != nil {
		fmt.Println(err)
	}

	fmt.Println(sqrtWithErr(2))
	fmt.Println(sqrtWithErr(-2))
}
