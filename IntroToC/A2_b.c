#include <stdio.h>

//Decalre and initialie an array to store the prime factors in
int n[11] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

//Remove recurrences of a prime once it is found in the number
int removeFac(int x, int f){
	while(x%f==0)x = x/f;

	return x;
}

//Check if a number is prime or not
int prime(int x){
	int i, flag = 1;

	for(i = 3; i < x/2; i++){
		if(x%i==0){
			flag = 0;
			break;
		}
	}
	return flag;
}

//Find prime factors of an input x, and store them in the array n[]
void primeFac(int x){
	int i, c = 0;
	for(i = 2; i<= x; i++){
		if(prime(i)){
			if(x%i==0){
				n[c] = i;
				c++;
				x = removeFac(x, i);
			}

		}
	}
}


int main(){
	//Declare s, number to be checked
	int s;
	
	printf("Enter a number: ");
	//Accept the number
	scanf("%d", &s);
	printf("\n");

	if(s<1){
		printf("Print a valid number\n");
		return 1;
	}

	printf("The prime factors are: ");
	
	//Call the function which determines the prime factors
	if(s==1)printf("1");
	primeFac(s);

	//Print the factors stored in the array n[]
	int i;
	for(i = 0; i < 11; i++){
		if(n[i] != 0)printf("%d ", n[i]);
	}

	printf("\n");
	return 0;
}