package xweb

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/MrZJD/lang_go/src/utils"
)

// 最简单的form解析
func BasicForm(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	for k, v := range r.Form {
		fmt.Println("input: ", k, v)
	}

	text := "hello golang! " + r.Form.Get("user")

	w.Write([]byte(text))
}

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		cont, err := ioutil.ReadFile(utils.Rel("static/login.html"))

		if err != nil {
			w.Write([]byte(err.Error()))
		} else {
			w.Write(cont)
		}

	} else {
		r.ParseForm()

		user := r.Form.Get("username")
		pswd := r.Form.Get("password")

		fmt.Println("username:", user)
		fmt.Println("password:", pswd)

		if user == "zjd" && pswd == "1234" {
			w.Write([]byte("登录成功"))
		} else {
			w.Write([]byte("用户名或密码错误"))
		}
	}
}

// 2. XSS
// -> 过滤非法字符
// template.HTMLEscapeString
// template.HTMLEscape

// 3. 处理重复提交
// -> 高消费操作需要处理暴力情况(Redis存储上一次处理的时间)

// 处理客户端的file
func HandleUploadFile(w http.ResponseWriter, r *http.Request) {
	// 解析form multipart/form-data
	r.ParseMultipartForm(32 << 20)
	file, handler, err := r.FormFile("uploadFile")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Fprintf(w, "%v", handler.Header)
	// 写入文件
	f, err := os.OpenFile(utils.Rel("test/"+handler.Filename), os.O_WRONLY|os.O_CREATE, 0666) // 此处假设当前目录下已存在test目录
	if err != nil {
		fmt.Println("---> write file", utils.Rel("test/"+handler.Filename), err)
		return
	}
	defer f.Close()
	io.Copy(f, file)

	w.Write([]byte("Upload Success"))
}

// 客户端发起一个上传文件请求
func PostFile(filename string, url string) error {
	bodyBuf := &bytes.Buffer{}
	bodyWriter := multipart.NewWriter(bodyBuf)

	// 创建一个file的字段
	fileWriter, err := bodyWriter.CreateFormFile("uploadFile", filename)
	if err != nil {
		fmt.Println("error write to buffer")
		return err
	}

	// 打开一个本地文件
	fh, err := os.Open(filename)
	if err != nil {
		fmt.Println("error opening file")
		return err
	}
	defer fh.Close()

	// io pipeline
	_, err = io.Copy(fileWriter, fh) // fh -> fileWriter
	if err != nil {
		return err
	}

	contentType := bodyWriter.FormDataContentType()
	bodyWriter.Close()

	resp, err := http.Post(url, contentType, bodyBuf)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	resp_body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Println(resp.Status)
	fmt.Println(string(resp_body))
	return nil
}
