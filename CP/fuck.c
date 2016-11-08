#include <stdio.h>

void main(){
	printf("\n");
	int pos;
	
	int i;
	scanf("%d", &pos);
	printf("Hello world\nFuck this shit\nYour mom is a whore\n");
	
	for(i = 1; i <= 31; i++){		
		int x = i%7;
		int space = pos*20 + pos;
		printf("\x1B[C\e[%dC", space);
		int s = 1;
		//printf("\x1B[A\e[%dC", s);
		for(x = i%7; x < 7; x++){
			
			
			if(!(i/10))printf(" ");
			printf("%d ", i+1);
			i++;
		}

		printf("\x1B[B\e[1C");
		//s++;
		
		
		//printf("\x1B[A\e[10C");
			
			
	}printf("\n");
} 