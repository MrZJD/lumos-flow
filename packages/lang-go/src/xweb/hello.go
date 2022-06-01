package xweb

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/03.1.md

func HelloWeb() {
	http.HandleFunc("/", BasicForm)
	http.HandleFunc("/login", Login)
	http.HandleFunc("/upload", HandleUploadFile)

	fmt.Println("Serve at :9098")
	err := http.ListenAndServe(":9098", nil)
	if err != nil {
		log.Fatal("Listen and Serve:", err)
	}
}

func HelloXGin() {
	xg := NewXGin(9019)

	xg.Get("/hello", func(w http.ResponseWriter, r *http.Request) {
		type HelloData struct {
			List []int `json:"list"`
		}

		res := &XGinResponseBase{
			Code:    0,
			Message: "ok",
			Data: HelloData{
				List: []int{1, 2, 3, 4},
			},
		}

		resText, _ := json.Marshal(res)

		w.Write(resText)
	})

	xg.Serve()
}
