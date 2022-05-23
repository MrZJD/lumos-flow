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
}
