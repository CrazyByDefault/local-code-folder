#include<stdio.h>
#include<math.h>

void main(){
	int n, x = 0, i=0;
	scanf("%d", &n);
	printf("\n");
	n = n-1;
	while(n>=1){

		int p = pow(10,i);
		x = x + (n%5)*p;
		n = n/5;

		i++;
	}
	x = x*2;
	printf("%d\n", x);
}