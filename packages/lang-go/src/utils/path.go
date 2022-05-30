package utils

import "path"

const BaseName = "/Users/bytedance/Documents/bytedance/lumos-flow/packages/lang-go"

func Rel(relRootPath string) string {
	return path.Join(BaseName, relRootPath)
}
