#include <stdio.h>
int a[3];
int month[12]={31,28,31,30,31,30,31,31,30,31,30,31};

int fday(int x, int y){
	int s=0,i;
	
	for(i=0;i<x;i++){
	if((y%4==0)&&y%100!=0||y%400==0)
		month[2]=29;
	s=s+month[i];
	}
	s=((y-1)*365+(y-1)/4-(y-1)/100+(y-1)/400+s+1)%7;
return s;
}
int main(){
	int i, y, j, k , p, blank,m,c,d;
	printf("enter year\n");
	scanf("%d",&y);
	char *Monthname[]={"January","Febraury","March","April","May","June","July","August","September","October","November","December"};
	char *threeMonths[4] = {"January		Febraury		March", "April		May		June", "July		August		September", "October		November		December"};
	char *weekday[]={"Su","Mo","Tu","We","Th","Fr","Sa"};
	
	

	 	for(p = 0; p < 12; p +=3){

		 	
			// printf("\n");	
			printf("\t%s\n", threeMonths[p/4]);	
		    for(m=1;m<=3;m++){

		    	for(int i=0;i<7;i++)printf("%s ",weekday[i]);
		    	printf("\t\t");
		    }
		 	printf("\n");
		 	for(m=p;m<p+3;m++){
		 		int c=0;
		 		blank=fday(m,y);
		 		for(i=0;i<blank;i++){
		 			printf("   ");
		 			c=c+1;
		 		}
		 		for(i=1;i<=7-c;i++){
		 			printf(" %d ",i);
		 			
		 		}a[m-1]=7-c;
		 		printf("\t\t");
		 	}printf("\n");

	 		for(k = 0; k < 6; k++){
	 			 	for(m = p; m<p+3;m++){
	 					for(j = a[m] + 1; j<a[m] + 8; j++){
	 			 			if(!(j/10))printf(" ");
	 	
	 			 			if(j <= month[m])printf("%d ", j);
	 			 			else printf("   ");
	 	
	 			 		}
	 			 		a[m] = j;
	 			 		printf("\t\t");
	 			 	}printf("\n");
	 			}
	 		}

	 	printf("\n");
	    
	return 0;
}

