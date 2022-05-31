package train

import (
	"fmt"
	"os"
	"reflect"
	"strconv"
	"strings"

	"github.com/MrZJD/lang_go/src/utils"
)

type Config struct {
	Mysql  MysqlCfg  `ini:"mysql"`
	Server ServerCfg `ini:"server"`
}

type MysqlCfg struct {
	Username string  `ini:"username"`
	Passwd   string  `ini:"passwd"`
	Database string  `ini:"database"`
	Host     string  `ini:"host"`
	Port     int     `ini:"port"`
	Timeout  float32 `ini:"timeout"`
}

type ServerCfg struct {
	Ip   string `ini:"ip"`
	Port int    `ini:"port"`
}

var cfg = Config{
	Mysql: MysqlCfg{
		Username: "root",
		Passwd:   "admin",
		Database: "test",
		Host:     "192.168.10.10",
		Port:     8000,
		Timeout:  1.2,
	},
	Server: ServerCfg{
		Ip:   "10.238.2.2",
		Port: 8080,
	},
}

func stringify(o interface{}) error {
	t := reflect.TypeOf(o)
	v := reflect.ValueOf(o)

	file, err := os.Create(utils.Rel("test/config.ini"))

	if err != nil {
		return err
	}

	defer file.Close()

	// 第一层为field
	for i, len := 0, t.NumField(); i < len; i++ {
		f := t.Field(i)
		curr := reflect.ValueOf(v.Field(i).Interface())

		tagName := f.Tag.Get("ini")

		file.WriteString(fmt.Sprintf("[%v]\n", tagName))

		for j, jlen := 0, f.Type.NumField(); j < jlen; j++ {
			subf := f.Type.Field(j)
			subv := curr.Field(j).Interface()

			file.WriteString(fmt.Sprintf("%s = %v\n", subf.Tag.Get("ini"), subv))
		}

		if len-i > 1 {
			file.WriteString("\n")
		}
	}
	return nil
}

func getSectionName(line string) string {
	return line[1 : len(line)-1]
}

func parseLine(line string) (string, string) {
	arr := strings.Split(line, "=")
	return strings.TrimSpace(arr[0]), strings.TrimSpace(arr[1])
}

func setValue(rfv reflect.Value, val string) {
	switch rfv.Type().Kind() {
	case reflect.String:
		rfv.SetString(val)
	case reflect.Int:
		i, _ := utils.ParseInt(val)
		rfv.SetInt(int64(i))
	case reflect.Float32:
		i, _ := strconv.ParseFloat(val, 32)
		rfv.SetFloat(i)
	}
}

func findField(sv reflect.Type, tagName string) string {
	for i, len := 0, sv.NumField(); i < len; i++ {
		f := sv.Field(i)

		if f.Tag.Get("ini") == tagName {
			return f.Name
		}
	}

	return tagName
}

func parse(data []byte, result interface{}) {
	v := reflect.ValueOf(result)

	if v.Kind() != reflect.Pointer { // result传入的类型是指针
		return
	}
	if v.Elem().Kind() != reflect.Struct { // result对应的值是结构体
		return
	}

	line := strings.Split(string(data), "\n")

	var sv reflect.Value

	for _, current := range line {
		current = strings.TrimSpace(current)

		if len(current) == 0 || current[0] == ';' || current[0] == '#' {
			continue
		}

		if utils.StartWith(current, "[") && utils.EndWith(current, "]") {
			name := getSectionName(current)
			fieldName := findField(v.Elem().Type(), name)

			sv = v.Elem().FieldByName(fieldName) // section
			continue
		}

		key, val := parseLine(current)

		if len(key) == 0 || len(val) == 0 {
			continue
		}

		st := sv.Type()
		for i, sublen := 0, st.NumField(); i < sublen; i++ {
			subF := st.Field(i)
			keyName := subF.Tag.Get("ini")

			if keyName == key {
				setValue(sv.FieldByName(subF.Name), val)
			}
		}
	}
}

func HelloReflectSeq() {
	// stringify(cfg)

	data, err := os.ReadFile(utils.Rel("test/config.ini"))

	if err != nil {
		return
	}

	var config Config

	parse(data, &config)

	fmt.Println("config:", config)
	fmt.Println("config:", cfg)
}
