package utils

func StartWith(s string, str string) bool {
	if len(str) > len(s) {
		return false
	}

	for i, c := range str {
		if rune(s[i]) != c {
			return false
		}
	}

	return true
}

func EndWith(s string, str string) bool {
	alen := len(s)
	elen := len(str)
	if elen > alen {
		return false
	}

	start := alen - elen
	for i, c := range str {
		if rune(s[i+start]) != c {
			return false
		}
	}
	return true
}
