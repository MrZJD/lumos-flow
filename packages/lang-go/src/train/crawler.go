package train

import (
	"fmt"
	"sync"
	"time"
)

type Fetcher interface {
	Fetch(url string) (body string, urls []string, err error)
}

type FetcherMutex struct {
	urls map[string]bool
	mut  sync.Mutex
}

var pool = FetcherMutex{
	urls: make(map[string]bool),
}

func crawl(url string, depth int, fetcher Fetcher) {
	if depth <= 0 {
		return
	}

	pool.mut.Lock()

	if pool.urls[url] {
		pool.mut.Unlock()
		return
	}

	pool.urls[url] = true
	pool.mut.Unlock()

	body, urls, err := fetcher.Fetch(url)

	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("found: %s %q\n", url, body)

	for _, u := range urls {
		go crawl(u, depth-1, fetcher)
	}
}

type Response struct {
	body string
	urls []string
}

type MyFetcher map[string]*Response

func (fetcher MyFetcher) Fetch(url string) (body string, urls []string, err error) {
	if res, ok := fetcher[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

// 模拟数据
var fetcher = MyFetcher{
	"https://golang.org/": &Response{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &Response{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &Response{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &Response{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}

func HelloCrawler() {
	crawl("https://golang.org/", 4, fetcher)

	time.Sleep(time.Second * 5)
}
