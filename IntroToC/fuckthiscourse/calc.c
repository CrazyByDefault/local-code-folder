#include <stdio.h>



int add(int a, int b){

	return (a + b);
}

int sub(int a, int b){
	return (a - b);
}

int mult(int a, int b){
	int i, x = 0;
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

int mod(int a, int b){
	int i, x = a;
	for(i = 0; x >= b; i++){
		x = sub(x, b);
	}

	return x;
}

int squareRoot(int a){
	int i, x;
	for(i = 1; mult(i, i) < a; i++);
	return i;

}

int power(int a, int b){
	int i, x = 1;
	for(i = 0; i < b; i++){
		x = mult(x, a);
	}

	return x;
}

int logg(int a, int b){
	int i;
	for(i = 1; power(b, i) < a; i++);
	return i;
}

void calcMenu(){
	printf("Menu:\n1:Add\n2:Multiply\n3:Divide\n4:Subtract\n5:Modulus\n6:Square\n7:Square Root\n8:Log\n9:Exit\n");
	int choice;
	scanf("%d", &choice);

	int a, b;
	switch(choice){

		case 1:
			printf("Enter first number\n");
			scanf("%d", &a);
			printf("\nEnter second number\n");
			scanf("%d", &b);
			printf("The result of the operation is %d\n\n\n", add(a, b));
			calcMenu();
			break;

		case 2:
			printf("Enter first number\n");
			scanf("%d", &a);
			printf("\nEnter second number\n");
			scanf("%d", &b);
			printf("The result of the operation is %d\n\n\n", mult(a, b));
			calcMenu();
			break;

		case 3:
			printf("Enter first number\n");
			scanf("%d", &a);
			printf("\nEnter second number\n");
			scanf("%d", &b);
			printf("The result of the operation is %d\n\n\n", divide(a, b));
			calcMenu();
			break;
		
		case 4:
			printf("Enter first number\n");
			scanf("%d", &a);
			printf("\nEnter second number\n");
			scanf("%d", &b);
			printf("The result of the operation is %d\n\n\n", sub(a, b));
			calcMenu();
			break;

		case 5:
			printf("Enter first number\n");
			scanf("%d", &a);
			printf("\nEnter second number\n");
			scanf("%d", &b);
			printf("The result of the operation is %d\n\n\n", mod(a, b));
			calcMenu();
			break;

		case 6:
			printf("Enter a number\n");
			scanf("%d", &a);
			printf("The result of the operation is %d\n\n\n", mult(a, a));
			calcMenu();
			break;

		case 7:
			printf("Enter a number\n");
			scanf("%d", &a);
			printf("The result of the operation is %d\n\n\n", squareRoot(a));
			calcMenu();
			break;

		case 8:
			printf("Enter first number\n");
			scanf("%d", &a);
			printf("\nEnter second number\n");
			scanf("%d", &b);
			printf("The result of the operation is %d\n\n\n", logg(a, b));
			calcMenu();
			break;

		default:
		break;
	}
}

int main(){

	calcMenu();
	return 0;

}