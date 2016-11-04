#include <stdio.h>

void main(){
	printf("\n");
	int pos;
	
	int i;
	scanf("%d", &pos);
	
	for(i = 1; i <= 31; i++){		
		int x = i%7;
		int space = pos*20 + pos;
		printf("\x1B[C\e[%dC", space);
		for(x = i%7; x < 7; x++){
			if(!(i/10))printf(" ");
			printf("%d ", i);
			i++;
		}printf("\n");
		
		
		//printf("\x1B[A\e[10C");
			
			
		}printf("\n");
}