#include <iostream>
#include <string.h>

using namespace std;

// int foo(int a, int b = 5) { return a+b; }

int foo(int a) { return a*5; }

int main(){
	std::cout << foo(5);
	return 0;
}