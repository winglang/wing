// build with:
// go build -o libwrr-go.so -buildmode=c-shared wrr-go.go

package main

import "C"

import (
	"github.com/traefik/yaegi/interp"
	"github.com/traefik/yaegi/stdlib"
)

//export Execute
func Execute(program string, workdir string) {
	i := interp.New(interp.Options{GoPath: workdir})
	i.Use(stdlib.Symbols)
	_, err := i.EvalPath(program)
	if err != nil {
		panic(err)
	}
}

func main() {
	/* no-op */
}
