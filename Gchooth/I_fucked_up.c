#include <stdio.h>

int add(int a, int b);
int sub(int a, int b);
long multiply(int a, int b);
int divide(int a, int b);
int modulo(int a, int b);
float root(float x);
int power(int a, int b);
int logarithm(int a, int b);




void menu(){
	printf("Menu:\n1:Add\n2:Multiply\n3:Divide\n4:Subtract\n5:Modulus\n6:Square\n7:Square Root\n8:Log\n9:Exit\n");
	int input, x, y;
	float f;
	scanf("%d", &input);

	switch(input){
		case 1:
		printf("Enter first number\n");
		scanf("%d", &x);
		printf("\nEnter second number\n");
		scanf("%d", &y);
		printf("The result of the operation is %d\n", add(x, y));
		menu();
		break;

		case 2:
		
		printf("Enter first number\n");
		scanf("%d", &x);
		printf("\nEnter second number\n");
		scanf("%d", &y);
		printf("The result of the operation is %lu\n", multiply(x, y));
		menu();
		break;

		case 3:
		
		printf("Enter first number\n");
		scanf("%d", &x);
		printf("\nEnter second number\n");
		scanf("%d", &y);
		printf("The result of the operation is %d\n", divide(x, y));
		menu();
		break;
		
		case 4:
		
		printf("Enter first number\n");
		scanf("%d", &x);
		printf("\nEnter second number\n");
		scanf("%d", &y);
		printf("The result of the operation is %d\n", sub(x, y));
		menu();
		break;

		case 5:
		
		printf("Enter first number\n");
		scanf("%d", &x);
		printf("\nEnter second number\n");
		scanf("%d", &y);
		printf("The result of the operation is %d\n", modulo(x, y));
		menu();
		break;

		case 6:
			
		printf("Enter a number\n");
		scanf("%d", &x);
		printf("The result of the operation is %lu\n", multiply(x, x));
		menu();
		break;

		case 7:
			
		printf("Enter a number\n");
		scanf("%f", &f);
		printf("The result of the operation is %f\n", root(f));
		menu();
		break;

		case 8:
		
		printf("Enter first number\n");
		scanf("%d", &x);
		printf("\nEnter second number\n");
		scanf("%d", &y);
		printf("The result of the operation is %d\n", logarithm(x, y));
		menu();
		break;
	}


}

int add(int a, int b){
	return (a + b);
}

int sub(int a, int b){
	return (a - b);
}

long multiply(int a, int b){
	int i;
	long x = 0;
	for(i = 0; i < a; i++){
		x = add(x, b);
	}

	return x;
}

int divide(int a, int b){
	int i, x = a;
	for(i = 0; x >= b; i++){
		x = sub(x, b);
	}

	return i;
}

int modulo(int a, int b){
	int i, x = a;
	for(i = 0; x >= b; i++){
		x = sub(x, b);
	}

	return x;
}

float root(float x){
	float n = 0.001, m;

	for(m = 0;m < x; m = m + n){
		if(multiply(m , m) > x){
			m = m - (n + 1);
			break;
		}
	}

	return m;
}

int power(int a, int b){
	int i, x = 1;
	for(i = 0; i < b; i++){
		x = multiply(x, a);
	}

	return x;
}

int logarithm(int a, int b){
	int i;
	for(i = 1; power(b, i) < a; i++);
	return i;
}


void main(){
	menu();

}