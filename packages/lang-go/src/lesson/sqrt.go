package lesson

import (
	"math"
)

func Sqrt(x float64) float64 {
	z := float64(1.1)

	for {
		z -= (math.Pow(z, 2) - x) / math.Pow(z, 2)

		if math.Abs(math.Pow(z, 2)-x) < 0.0001 {
			return z
		}
	}
}
