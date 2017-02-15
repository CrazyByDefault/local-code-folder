#include <stdio.h>
#include <stdbool.h>


int main(){
	int n, taxis;
	scanf("%d", &n);

	int a[n], i, j;
	int c4 = 0, c3 = 0, c2 = 0, c1 = 0;

	for(i = 0; i<n; i++){
		scanf("%d", &a[i]);
		if(a[i] = 4)c4++;
		if(a[i] = 3)c3++;
		if(a[i] = 2)c2++;
		if(a[i] = 1)c1++;
	}printf("\n");

	if(c3>c1){
		taxis = c4 + c3 + c2 + (c1-c3)/2 + 
	}

	int taxis = c4 + abs(c3-c1);
	taxis += c2

	for(i = 0; i<n; i++){w
		printf("%d", a[i]);
	}
}