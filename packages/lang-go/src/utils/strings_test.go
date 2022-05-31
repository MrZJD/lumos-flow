package utils

import "testing"

func TestStartWith(t *testing.T) {
	testcase := []struct {
		result bool
		expect bool
	}{
		{StartWith("abc123", "a"), true},
		{StartWith("abc123", "ab"), true},
		{StartWith("abc123", "abc"), true},
		{StartWith("abc123", "abc1"), true},
		{StartWith("abc123", "abc12"), true},
		{StartWith("abc123", "abc123"), true},
		{StartWith("abc123", "abc1234"), false},
		{StartWith("abc123", "123"), false},
		{StartWith("abc123", "123456"), false},
	}

	for i, test := range testcase {
		if test.result != test.expect {
			t.Errorf("testcase fail: %d", i)
		}
	}
}

func TestEndWith(t *testing.T) {
	testcase := []struct {
		result bool
		expect bool
	}{
		{EndWith("abc123", "a"), false},
		{EndWith("abc123", "ab"), false},
		{EndWith("abc123", "abc"), false},
		{EndWith("abc123", "abc1"), false},
		{EndWith("abc123", "abc12"), false},
		{EndWith("abc123", "abc123"), true},
		{EndWith("abc123", "abc1234"), false},
		{EndWith("abc123", "123"), true},
		{EndWith("abc123", "123456"), false},
		{EndWith("abc123", "3"), true},
		{EndWith("abc123", "23"), true},
		{EndWith("abc123", "123"), true},
		{EndWith("abc123", "c123"), true},
		{EndWith("abc123", "bc123"), true},
		{EndWith("abc123", "abc123"), true},
	}

	for i, test := range testcase {
		if test.result != test.expect {
			t.Errorf("testcase fail: %d", i)
		}
	}
}
