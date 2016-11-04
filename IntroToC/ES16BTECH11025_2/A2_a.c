#include <stdio.h>

/*This program reverse a non-negative number given to it. If the number is of the form 200, 100, 2340, the output will be 002, 002, 0432 etc. If the input is of the form 00213, the output is of the form 312.
This is done using a flag, which stays 0 as numbers are extracted from the right. If the digits encountered from the right are zeroes, the flag stays 0 and a 0 is printed.
As soon as a non zero digit is encountered, the flag is set to 1.*/

//Function to reverse the number
int reverse(int n){
	//Decalre required integers
	int a, flag=0, x=0;

	do{
		//Get first digit from right
		a = n%10;

		//Check if it's zero. If it is a zero and no other non-zero numbers have been encountered from the right yet, print it.
		if(a==0 && flag==0)printf("%d",a);
		else flag=1;

		//Build the reversed number
		x = x*10 + a;
		n = n/10;
	}while(n>0);

	//Return the reversed number to main(){}
	return x;

}

void main(){

	//Declare a number to be accepted and accept it
	int n;
	printf("Enter number to be reversed: ");
	scanf("%d",&n);

	//Call reverse(n) and store it in x
	int x = reverse(n);

	printf("%d\n",x);
}
