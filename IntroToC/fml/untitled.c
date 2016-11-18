#include <stdio.h>
#include <string.h>

void main(){
	char balls[500];

	int n;
	scanf("%d", &n);

	scanf("%s", balls);
	
	printf("\n%c\n%d\n", balls[n], strlen(balls));
}