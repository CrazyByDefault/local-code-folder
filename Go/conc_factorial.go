package main

import (
	"fmt"
)

// BigInt stores the number by converting into number with given base
// and its digits are stored in an int slice in reverse order
type BigInt struct {
	n    []int
	base int
}

// Init function initializes a BigInt with a given number
// The second parameter is the size of the int slice that stores digits
func (i *BigInt) Init(n int, sz int) *BigInt {
	i.base = int(1e9)     // Set base of the BigInt
	i.n = make([]int, sz) // Initialize the size of the digits slice
	// Add the number to the BigInt Slice array
	j := 0
	for n > 0 {
		i.n[j] = n % i.base
		n /= i.base
		j++
	}
	return i
}

// Print function prints the BigInt number in user readable form with decimal base
func (n *BigInt) Print() {
	n.Trim() // Trim zeros at start of number or end of digits slice (As stored in reverse array)
	l := len(n.n)
	fmt.Print(n.n[l-1]) // Print first digit (last in slice) without formattimg
	for i := l - 2; i >= 0; i-- {
		fmt.Printf("%09d", n.n[i]) // Print other digits by appending required zeros
	}
}

// Trim function removes zeroes at the start of the number
// Since didgits are stored in reverse order,
// it remoces zeros from the end of slice
func (n *BigInt) Trim() {
	for {
		if len(n.n) != 0 && n.n[len(n.n)-1] == 0 {
			n.n = n.n[:len(n.n)-1]
		} else {
			break
		}
	}
}

// Multiply function multiplies two BigInts and returns another BigInt
func Multiply(a *BigInt, b *BigInt) BigInt {
	var c BigInt                 // c to store the answer
	c.Init(0, len(a.n)+len(b.n)) // Number of digits in product is sum of number of digits in numbers
	for i := 0; i < len(a.n); i++ {
		var carry int64 // carry for the next digit
		carry = 0
		for j := 0; j < len(b.n) || carry > 0; j++ {
			var s int64                 // calculate current digit
			s = int64(c.n[i+j]) + carry // add carry to the sum to already existing digit
			if j < len(b.n) {
				s += int64(a.n[i] * b.n[j]) // add the product to the number
			}
			c.n[i+j] = int(s % int64(c.base)) // replace the current digit with calculated
			carry = s / int64(c.base)         // calculate carry for the next digit
		}
	}
	c.Trim() // Trim the zeros at start of number (or end of slice)
	return c
}

// Mult is the receiver form for multiply
// a.Mult(b) will multiply b to a, i.e. a = a*b
func (N *BigInt) Mult(n int) {
	var M BigInt
	M.Init(n, 1)
	ans := Multiply(N, &M)
	N.n = ans.n
}

var totThreads int

func oddThread(c1 chan BigInt, n int) {
	var oddTotal BigInt
	oddTotal.Init(1, 1)
	for i := 1; i <= n; i += 2 {
		var x BigInt
		x.Init(i, 1)
		oddTotal = Multiply(&oddTotal, &x)
	}
	c1 <- oddTotal
}

func evenThread(c2 chan BigInt, n int) {
	var evenTotal BigInt
	evenTotal.Init(1, 1)
	for i := 2; i <= n; i += 2 {
		var x BigInt
		x.Init(i, 1)
		evenTotal = Multiply(&evenTotal, &x)
	}
	c2 <- evenTotal
}

func kThread(retChannel chan BigInt, n int, k int) {
	var kTotal BigInt
	kTotal.Init(1, 1)
	for i := (k-1)*(n/totThreads) + 1; i <= k*(n/totThreads); i++ {
		var x BigInt
		x.Init(i, 1)
		kTotal = Multiply(&kTotal, &x)
	}
	retChannel <- kTotal
}

func main() {
	var n, k int
	var total BigInt
	total.Init(1, 1)
	retChannel := make(chan BigInt, k)

	fmt.Println("Enter number to calculate factorial of: ")
	fmt.Scanf("%d", &n)
	fmt.Println("Enter number of threads you want to use: ")
	fmt.Scanf("%d", &totThreads)

	for i := 1; i <= totThreads; i++ {
		go kThread(retChannel, n, i)
	}

	for i := 1; i <= totThreads; i++ {
		semiTotal := <-retChannel
		total = Multiply(&total, &semiTotal)
	}

	total.Print()

}
