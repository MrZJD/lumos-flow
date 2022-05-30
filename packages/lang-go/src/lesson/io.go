package lesson

import (
	"fmt"
	"io"
	"os"
	"strings"
)

type MyReader struct{}

// 无限流A
func (r MyReader) Read(b []byte) (int, error) {
	for i := range b {
		b[i] = 'A'
	}

	return 1, nil
}

type rot13Reader struct {
	r io.Reader
}

func rot13(b byte) byte {
	if b >= 'A' && b <= 'Z' {
		b = 'A' + (b-'A'+13)%26
	} else if b >= 'a' && b <= 'z' {
		b = 'a' + (b-'a'+13)%26
	}
	return b
}

func (rot *rot13Reader) Read(b []byte) (int, error) {
	result := make([]byte, cap(b))
	n, err := rot.r.Read(result)

	if err != nil {
		return 0, err
	}

	for i := 0; i < n; i++ {
		b[i] = rot13(result[i])
	}
	return n, nil
}

func HelloIO() {
	fmt.Println("|-------- hello io --------|")

	r := strings.NewReader("hello reader!")

	b := make([]byte, 8)
	for {
		n, err := r.Read(b)

		fmt.Printf("n = %v, err = %v, b = %v\n", n, err, b)
		fmt.Printf("b[:n] = %q\n", b[:n])

		if err != nil {
			break
		}
	}

	feedA := MyReader{}
	count := 0
	for {
		n, err := feedA.Read(b)

		fmt.Printf("n = %v, err = %v, b = %v\n", n, err, b)
		fmt.Printf("b[:n] = %q\n", b[:n])

		count++

		if count > 5 {
			break
		}

		if err != nil {
			break
		}
	}

	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	x := rot13Reader{s}
	io.Copy(os.Stdout, &x)
	fmt.Println("")
}
