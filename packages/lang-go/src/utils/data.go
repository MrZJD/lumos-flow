// 一些常用函数的rename

package utils

import (
	"regexp"
	"strconv"
)

func ParseInt(numStr string) (int, error) {
	return strconv.Atoi(numStr)
}

// 是否是正整数
func IsInt(str string) (bool, error) {
	return regexp.MatchString("^[0-9]+$", str)
}

// 是否是中文字符
func IsChinese(str string) (bool, error) {
	return regexp.MatchString("^\\p{Han}+$", str)
	// or unicode.Is(rangeTab *RangeTable, r rune) bool
}

// 是否是email
func IsEmail(str string) (bool, error) {
	return regexp.MatchString(`^([\w\.\_]{2,10})@(\w{1,})\.([a-z]{2,4})$`, str)
}

// 是否是email
func IsPhone(str string) (bool, error) {
	return regexp.MatchString(`^(1[3|4|5|8][0-9]\d{4,8})$`, str)
}

// 是否是有效身份证号
func IsCertID(str string) (bool, error) {
	valid, _ := regexp.MatchString(`^(\d{15})$`, str)

	if valid {
		return valid, nil
	}

	return regexp.MatchString(`^(\d{17})([0-9]|X)$`, str)
}

// 切片中是否包含指定元素
func Contains[T string | int](arr []T, target T) (bool, int) {
	for i, v := range arr {
		if v == target {
			return true, i
		}
	}
	return false, -1
}
