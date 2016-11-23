#include <stdio.h>
#include <string.h>

//initialize everything
char a[10000], b[10000], ans[10000];
int alen, blen, l;

void zeroArrays(){
	int i;
	for(i = 0; i < 10000; i++){
		a[i] = '0';
		b[i] = '0';
		
		ans[i] = '0';
	}
}


//reverse arrays after accepting, if necessary
void reverseArrays(){
	int i, c[10000];
	for(i = 0; i < 10000; i++){
		c[i] = '0';
	}

	for(i = 0; i < alen; i++){
		c[i] = a[i];
	}
	for(i = alen; i > 0; i--){
		a[alen-i] = c[i-1];
	}printf("Reverse of a is %s\n", a);

	for(i = 0; i < blen; i++){
		c[i] = b[i];
	}
	for(i = blen; i > 0; i--){
		b[blen-i] = c[i-1];
	}printf("Reverse of b is %s\n", b);

	a[alen] = '0';
	b[blen] = '0';

}


//reverse ans
void reverseAns(){
	int i, c[10000];
	for(i = 0; i < 10000; i++){
		c[i] = '0';
	}

	int l = strlen(ans);

	for(i = 0; i < l; i++){
		c[i] = ans[i];
	}
	for(i = l; i > 0; i--){
		ans[l-i] = c[i-1];
	}
}


//function to add
void add(int l){
	int i, c[10000];


	for(i = 0; i < 10000; i++){
		c[i] = '0';
	}

	for(i = 0; i <= l; i++){
		ans[i] = ((a[i] + b[i] + c[i] - 3*'0')%10) + '0';
		c[i+1] = ((a[i] + b[i] + c[i] -3*'0')/10) + '0';
	}
	if(ans[i-1] == '0')ans[i-1] = '\0';
	else ans[i+1] = '\0';


}


//function to mult
void mult(int l){
	int i, j, c[10000];

	for(i = 0; i < 10000; i++){
		c[i] = '0';
	}

	for(i = 0; i < alen; i++){
		for(j = 0; j < blen; j++){
			ans[j+i] = ((b[j] - '0')*(a[i] - '0') + (c[i] - '0'))%10 + '0';
			c[i+1] = ((b[j] - '0')*(a[i] - '0') + (c[i] - '0'))/10 + '0';
		}
	}

	if(ans[alen+blen-1] == '0' && ans[alen+blen] == '0')ans[alen+blen-1] = '\0';
	else ans[alen+blen] = '\0';

}


//function to divide
void divide(int l){
	int c[10000];
	if(alen < blen){
		ans[0] = '0';
		ans[1] = '\0';

	}else{
		int i, j = 0, x = 0;

		for(i = 0; i < blen; i++)j = 10*j + (a[i] - '0');
		for(i = 0; i < blen; i++)x = 10*x + (b[i] - '0');

		for(i = blen - 1; i < alen; i++){
			ans[i - blen + 1] = j/x + '0';
			c[i - blen + 1] = j%x; 
			j = c[i - blen + 1]*10 + a[i+1] - '0';

		}
		if(ans[alen-blen+1] == '0' && ans[alen - blen] == '0')ans[alen-blen] = '\0';
		else ans[alen-blen+1] = '\0';

	}


}


//function to subtract
void sub(){
	int i, c[10000];


	for(i = 0; i < 10000; i++){
		c[i] = '0';
	}

	for(i = 0; i <= l; i++){

		if((a[i] - b[i] - c[i] + '0') < 0)ans[i] = (10 + (a[i] - b[i] - c[i] + '0')%10) + '0';
		else ans[i] = ((a[i] - b[i] - c[i] + '0')%10) + '0';
		if((a[i] - b[i]) < 0)c[i+1] = '1';
		
	}
	if(ans[i-1] == '0')ans[i-1] = '\0';
	else ans[i+1] = '\0';

}


//function to call the correct operation and then itself
void calcMenu(){
	zeroArrays();
	printf("Menu:\n1:Add\n2:Multiply\n3:Divide\n4:Subtract\n5:Exit\n");
	int choice;
	scanf("%d", &choice);

	switch(choice){

		case 1:
			
			printf("Enter first number\n");
			scanf("%s", a);
			printf("\nEnter second number\n");
			scanf("%s", b);

			alen = strlen(a);
			blen = strlen(b);
			if(alen > blen)l = alen;
			else l = blen;
			reverseArrays();
			
			add(l);
			reverseAns();
			printf("The result of the operation is %s\n\n\n", ans);
			calcMenu();
			break;

		case 2:
			//scanf("%d", &choice);
			printf("Enter first number\n");
			scanf("%s", a);
			printf("\nEnter second number\n");
			scanf("%s", b);

			alen = strlen(a);
			blen = strlen(b);
			if(alen > blen)l = alen;
			else l = blen;
			reverseArrays();
			
			mult(l);
			reverseAns();
			printf("The result of the operation is %s\n\n\n", ans);
			calcMenu();
			break;

		case 3:
			//scanf("%d", &choice);
			printf("Enter first number\n");
			scanf("%s", a);
			printf("\nEnter second number\n");
			scanf("%s", b);

			alen = strlen(a);
			blen = strlen(b);
			if(alen > blen)l = alen;
			else l = blen;
			

			divide(l);
						
			printf("The result of the operation is %s\n\n\n", ans);
			calcMenu();
			break;
		
		case 4:
			//scanf("%d", &choice);
			printf("Enter first number\n");
			scanf("%s", a);
			printf("\nEnter second number\n");
			scanf("%s", b);

			alen = strlen(a);
			blen = strlen(b);
			if(alen > blen)l = alen;
			else l = blen;
			reverseArrays();

			sub();
			reverseAns();
			printf("The result of the operation is %s\n\n\n", ans);
			calcMenu();
			break;

		default:
		break;
	}
}

//main, to call the menu.
int main(){
	calcMenu();
	
	return 0;
}			