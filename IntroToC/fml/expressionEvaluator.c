#include <stdio.h>
#include <string.h>

char a[10000];
int ops = 0;

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

		case 2:
			if(c == '1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9' || c == '('){
				return 1;
			}else return 0;

		case 0:
			if(c == '0' || c == '1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9'){
				return 1;
			}else return 0;
	}
}


int arrayChecker(){
	int i, flag = 0, ob = 0, cb = 0;
	int l = strlen(a);

	for(i = 0; i < l; i++){

		if(a[i] != '0' && a[i] != '1' && a[i] != '2' && a[i] != '3' && a[i] != '4' && a[i] != '5'
			&& a[i] != '6' && a[i] != '7' && a[i] != '8' && a[i] != '9' && a[i] != '(' && a[i] != ')'
			&& a[i] != '*' && a[i] != '/' && a[i] != '+' && a[i] != '-'){

			flag = 2;

		}
		if(a[i] == '('){
			if(!isDigit(a[i+1], 1))flag = 1;
			if(a[i-1] != '*' && a[i-1] != '/' && a[i-1] != '+' && a[i-1] != '-' && a[i-1] != '(' && isDigit(a[i-1], 0))flag = 1;
			ob++;
		}
		if(a[i] == ')'){
			if(!isDigit(a[i-1], -1))flag = 1;
			if(a[i+1] != '*' && a[i+1] != '/' && a[i+1] != '+' && a[i+1] != '-' && a[i+1] != ')' && isDigit(a[i+1], 0))flag = 1;
			cb++;		
		}
		if(a[i] == '*' || a[i] == '+' || a[i] == '-'){

			if(!isDigit(a[i-1], -1) || !isDigit(a[i+1], 1)){
				flag = 1;
			}
		}

		if(a[i] == '/'){

			if(!isDigit(a[i-1], -1) || !isDigit(a[i+1], 2)){
				flag = 1;
			}

		}

	}


	if(ob != cb){
		printf("Opening and closing brackets do not match.\n");
		return -1;
	}else if(flag == 1){
		printf("Invalid operation.\n");
		return -1;
	}else if(flag == 2){
		printf("Invalid characters in expression - use only digits, operators or brackets.\n");
		return -1;
	}else return 0;

}

void evaluate(int q, int l){
	printf("IT ENTERED EVALUATE with q = %d and l = %d!\n", q, l);
	int i, p = 0, o = 0;

	for(i = q; i < l; i++){
		if(a[i] == 'x')continue;

		int flag = 0;

		if(a[i] == '('){
			flag = 1;
			for(i = i+1; flag > 0; i++){
				if(a[i] == '(')flag++;
				if(a[i] == ')')flag--;
			}

		}if(a[i] == '*' || a[i] == '/')p++;

	}
	printf("IT CALCULATED P - %d\n", p);

	for(i = q; i < l; i++){
		if(a[i] == 'x')continue;

		if(a[i] == '('){
			int j, flag = 1;

			for(j = i+1; flag; j++){
				if(a[j] == '(')flag++;
				if(a[j] == ')')flag--;
			}

			a[i] = 'x';
			a[j-1] = 'x';
			evaluate(i+1, j);
			break;
		}

		if((a[i] == '*' || a[i] == '/') && p>0){
			printf("Found a * or /\n");
			if(a[i+1] == '(')continue;
			int n = 0, m = 0, x, y, z;

			for(x = i-1; isDigit(a[x], 0); x--){
				int place = i - 1 - x, tens = 1, u;

				for(u = 0; u < place; u++){
					tens = tens*10;
				}
				n = n + tens*(a[x] - '0');
			}

			for(y = i+1; (isDigit(a[y], 0) || a[y] == 'x'); y++){
				if(a[y] != 'x')m = 10*m + (a[y] - '0');
			}

			printf("n = %d and m = %d\n", n, m);

			if(a[i] == '*'){
				z = n*m;
			}

			if(a[i] == '/'){
				z = n/m;
			}

			for(n = y-1; n > x; n--){
				if(z > 0)a[n] = z % 10 + '0';
				else a[n] = 'x';
				z = z / 10;
			}

			p--;

			printf("%s\n", a);
			//break;
		}

		if((a[i] == '+' || a[i] == '-') && p == 0){
			printf("Found a + or -\n");
			if(a[i+1] == '(')continue;
			int n = 0, m = 0, x, y, z;

			for(x = i-1; isDigit(a[x], 0); x--){
				int place = i - 1 - x, tens = 1, u;

				for(u = 0; u < place; u++){
					tens = tens*10;
				}
				n = n + tens*(a[x] - '0');
			}

			for(y = i+1; (isDigit(a[y], 0) || a[y] == 'x'); y++){
				if(a[y] != 'x')m = 10*m + (a[y] - '0');
			}
			
			printf("n = %d and m = %d\n", n, m);

			if(a[i] == '+'){
				z = n+m;
			}

			if(a[i] == '-'){
				z = n-m;
			}

			for(n = y-1; n > x; n--){
				if(z > 0)a[n] = z % 10 + '0';
				else a[n] = 'x';
				z = z / 10;
			}

		}

		printf("%s\n", a);
		// break;
		
		

	}

	do{
		ops = 0;
		for(i = q; i < l; i++)
			if(a[i] == '*' || a[i] == '/' || a[i] == '+' || a[i] == '-')ops++;

		printf("Total number of operators are %d\n", ops);
		if(!ops)break;
		evaluate(q, l);
	}while(ops > 0);
}


int main(){
	

	scanf("%[^\n]s", a);
	int l = strlen(a);
	int i;
	

	

	if(!arrayChecker()){

		evaluate(0, l);
		
		for(i = 0; i < l; i++){

			if(a[i] == '\0')break;
			if(a[i] != 'x')printf("%c", a[i]);

		}
		printf("\n");
		return 0;
	
	}else return -1;

}