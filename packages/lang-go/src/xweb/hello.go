package xweb

import (
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
