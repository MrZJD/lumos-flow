package utils

func IsOr[T interface{}](condition bool, a T, b T) T {
	if condition {
		return a
	} else {
		return b
	}
}
