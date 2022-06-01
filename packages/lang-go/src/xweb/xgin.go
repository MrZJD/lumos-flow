// 一个比较简单的封装net/http的结构
package xweb

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type XGin struct {
	Port    int
	handler map[string]*XGinHandler
}

type XGinContext struct{}

type XGinHandler struct {
	Method    string
	Pathname  string
	ServeHTTP func(http.ResponseWriter, *http.Request)
}

type XGinResponseBase struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func (xg *XGin) Serve() {
	err := http.ListenAndServe(fmt.Sprintf(":%v", xg.Port), xg)

	if err != nil {
		log.Fatal("Error: listen", err.Error())
	}
}

func (xg *XGin) Match(method string, path string) *XGinHandler {
	h, ok := xg.handler[path]
	if !ok {
		return nil
	}
	if h.Method != method {
		return nil
	}
	return h
}

// 实现http.Handler接口
func (xg *XGin) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h := xg.Match(r.Method, r.URL.Path)

	if h == nil {
		resText, _ := json.Marshal(&XGinResponseBase{
			Code:    -1,
			Message: fmt.Sprintf("route not found: %s", r.URL.Path),
		})
		w.Write(resText)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	h.ServeHTTP(w, r)
}

func (xg *XGin) Get(path string, fn func(http.ResponseWriter, *http.Request)) {
	xg.handler[path] = &XGinHandler{
		Method:    "GET",
		Pathname:  path,
		ServeHTTP: fn,
	}
}

func Post() {}

func Group() {}

func Use() {}

// 实例化XGin服务
func NewXGin(port int) *XGin {
	return &XGin{
		Port:    port,
		handler: make(map[string]*XGinHandler),
	}
}
