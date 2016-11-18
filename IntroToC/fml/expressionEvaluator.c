#include <stdio.h>
#include <string.h>

char a[10000];

//Checks if a char is a number or the correct type of bracket. Returns 1 if everything is ok, 0 if not.
int isDigit(char c, int i){
	switch(i){
		case -1:
			if(c == '0' || c == '1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9' || c == ')'){
				return 1;
			}else return 0;

		case 1:
			if(c == '0' || c == '1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9' || c == '('){
				return 1;
			}else return 0;
	}
}


int arrayChecker(){
	int i, flag = 0, ob = 0, cb = 0;
	int l = strlen(a);

	for(i = 0; i < l; i++){

		if(a[i] == '(')ob++;
		if(a[i] == ')')cb++;
		if(a[i] == '*' || a[i] == '/' || a[i] == '+' || a[i] == '-'){

			if(!isDigit(a[i-1], -1) || !isDigit(a[i+1], 1)){
				flag = 1;
			}
		}
	}


	if(ob != cb){
		printf("Opening and cosing brackets do not match.\n");
		return -1;
	}else if(flag){
		printf("Invalid operation.\n");
		return -1;
	}else return 0;

}


int main(){
	scanf("%s", a);
	if(!arrayChecker()){

		//evaluate();
		
		printf("Expression valid.\n");
		return 0;
	
	}else return -1;

}