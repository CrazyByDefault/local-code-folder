package main

import "testing"

func BenchmarkSparta(b *testing.B) {
	for i := 0; i < b.N; i++ {
		sparta(90, 1)
		// fmt.Println(b.N)	
	}
}