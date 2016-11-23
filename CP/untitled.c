#include <stdio.h>
#include <math.h>

int area(int a, int b){
	return a*b;
}

int area(int r){
	return (22/7)*r*r;
}

int area(int a, int b, int c){
	int s = (a+b+c)/2;
	int x = pow(s*(s-a)*(s-b)*(s-c), 0.5);
	return x;
}

int main(){

	int choice, a, b, c, r;
	printf("Type in your choice\n");
	scanf("%d", &choice);

	switch(choice){
		case 1:
			
			scanf("%d", &a);
			printf("\n");
			scanf("%d", &b);
			printf("%d\n", area(a, b));
			break;


		case 2:
			
			scanf("%d", &r);
			printf("%d\n", area(r));
			break;

		case 3:
			
			scanf("%d", &a);
			printf("\n");
			scanf("%d", &b);
			printf("\n");
			scanf("%d", &c);
			printf("%d\n", area(a, b, c));
			break;

		default:
			printf("Invalid input\n");
			break;
	}

	return 0;
}