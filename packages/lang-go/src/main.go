package main

import (
	"fmt"

	"github.com/MrZJD/lang_go/src/lesson"
)

func main() {
	lesson.Hello()

	fmt.Println("Sqrt 2", lesson.Sqrt(2))

	lesson.MyPointer()

	lesson.HelloStruct()
	lesson.HelloArr()
	lesson.HelloMap()

	fmt.Println(lesson.WordCount("hello world of golang"))

	lesson.HelloFunc()
	lesson.HelloFib()
	lesson.HelloMethod()
	lesson.HelloType()
	lesson.HelloErr()
	lesson.HelloIO()
	lesson.HelloGoRoutine()
}
