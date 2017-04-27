// 使用一个文件单独运行的程序必须放在package main下面，否则在go run运行时会报错：”go run: cannot run non-main package“
package main
import "fmt"
func main() {
  fmt.Println("Hello, world. 你好,世界!")
}