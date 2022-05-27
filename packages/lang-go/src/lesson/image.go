package lesson

import (
	"image"
	"image/color"
)

type Image struct {
	w int
	h int
}

func (m *Image) Bounds() image.Rectangle {
	return image.Rect(0, 0, m.w, m.h)
}

func (m *Image) At(x, y int) color.Color {
	v := uint8(x * y)

	return color.RGBA{v, v, 255, 255}
}

func (m *Image) ColorModel() color.Model {
	return color.RGBAModel
}

// https://tour.go-zh.org/methods/25
func HelloImage() {}
