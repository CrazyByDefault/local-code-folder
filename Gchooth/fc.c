#include <stdio.h>
long prod(int x, int y);
int div(int x, int y);
int mod(int x, int y);
float sqrrt(float x);
int pw(int x, int y);
int ln(int x);

int main(){
	int option,num1,num2;
	float num;
	long a;
	//print menu
	do{
		printf("Menu:\n1.Add\n2.Multiply\n3.Divide\n4.Substract\n5.Modulus\n6.Square\n7.Square root\n8.Log\n9.Exit\nEnter the option, Please\n");
		scanf("%d",&option);//take input from user	
		switch(option){
		case 1:
			printf("enter two numbers\n");
			scanf("%d %d",&num1,&num2);
			printf("The sum is %d\n",num1+num2);
			break;
		case 2:
			printf("enter two numbers\n");
			scanf("%d %d",&num1,&num2);
			a=prod(num1,num2);
			printf("The product is %lu\n",a);
			break;
		case 3:
			printf("enter two numbers\n");
			scanf("%d %d",&num1,&num2);
			num1=div(num1,num2);
			printf("The quotient is %d\n",num1);
			break;
		case 4:
			printf("enter two numbers\n");
			scanf("%d %d",&num1,&num2);
			printf("The difference is %d\n",num1-num2);
			break;
		case 5:
			printf("enter two numbers\n");
			scanf("%d %d",&num1,&num2);
			num1=mod(num1,num2);
			printf("The remainder is %d\n",num1);
			break;
		case 6:
			printf("enter a number\n");
			scanf("%d",&num1);
			num2=prod(num1,num1);
			printf("The square of %d is %d\n",num1,num2);
			break;
		case 7:
			printf("enter a number\n");
			scanf("%f", &num);
			num=sqrrt(num);
			printf("The square root is %.2f\n",num);
			break;
		case 8:
			printf("enter a number\n");
			scanf("%d", &num1);
			num2=ln(num1);
			printf("log of %d is %d\n",num1,num2);
			break;
		default:
			printf("Enter a valid option\n");

		}
	}
	while(option!=9);
}
//function to find product
long prod(int x, int y){
	int i;
	long ans;
	for(i=0;i<y;i++){
		ans=ans+x;		
	}

	return ans;
}
//function to divide
int div(int x, int y){
	int i=0;
	while(x>=y){
		x=x-y;
		i++;
	}
	return i;
}
//function to find mod
int mod(int x, int y){
	while(x>=y){
		x=x-y;
	}
	return x;
}
//function to find squareroot
float sqrrt(float x){
	float n=0.001,m;
	for(m=0;m<x;m=m+n){
		if(prod(m,m)>x){
			m=m-n;
			m=m-1;
			break;
		}
	}
return m;
}
//exponential function
int pw(int x, int y){
	int power=1,i=0;
	for(i;i<y;i++){
	power=prod(power,x);
	}
	return power;
}
//log of a number
int ln(int x){
	int i,y;
	for(i=1;i<=x;i++){
		if(pw(2,i)<x&&pw(2,i+1)>=x){
			y=i+1;
			break;
		}
	}
	return y;
}