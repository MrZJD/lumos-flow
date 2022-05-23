package lesson

import (
	"fmt"
	"math/rand"
	"time"
)

func Hello() {
	fmt.Println("Welcome to the playground!")

	fmt.Println("The time is", time.Now())

	fmt.Println("My fav number is", rand.Intn(10))
}
