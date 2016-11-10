#include <stdio.h>
int a[3];
int month[12]={31,28,31,30,31,30,31,31,30,31,30,31};
char *Monthname[]={"January","Febraury","March","April","May","June","July","August","September","October","November","December"};
char *threeMonths[4] = {"January		Febraury		March", "April		May		June", "July		August		September", "October		November		December"};
char *weekday[]={"Su","Mo","Tu","We","Th","Fr","Sa"};
int pChoice = 0, pYear = 0, pMonth = 0;

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

int moveRight(){
	if(pChoice == 0 || pYear == 0)return -1;
	
	if(pChoice == 1){
		pYear++;
		printYear();
		return 0;
	}

	if(pChoice == 2){
		if(pMonth == 0)return -1;
		if(pMonth != 12)pMonth++;
		else{
			pMonth = 1;
			pYear++;
		}
		printMonth();
		return 0;
	}
}


//Move left, similar to moveRight()
int moveLeft(){
	if(pChoice == 0 || pYear == 0)return -1;
	
	if(pChoice == 1){
		pYear--;
		printYear();
		return 0;
	}

	if(pChoice == 2){
		if(pMonth == 0)return -1;
		if(pMonth != 1)pMonth--;
		else{
			pMonth = 12;
			pYear--;
		}
		printMonth();
		return 0;
	}
}

int calendarMenu(){
	printf("Calendar Menu\n1:Display Year\n2:Display Month\n3:Move right\n4:Move left\n5:Exit\n");
	int choice;
	scanf("%d", &choice);

	switch(choice){
		
		case 1:
			if(!printYear())calendarMenu();
			return 0;

		case 2:
			if(!printMonth())calendarMenu();
			return 0;

		case 3:
			if(!moveRight())calendarMenu();
			return 0;

		case 4:
			if(!moveLeft())calendarMenu();
			return 0;

		case 5:
			return 0;
	}
}

int printMonth(){
	int i, j, k, m, y, blank;
	if(pChoice!=2){
		printf("Enter a month:\n");
		scanf("%d", &m);
		printf("Enter year:\n");
		scanf("%d", &y);
	}else {
		m = pMonth;
		y = pYear;
	}

	printf("\t%s\n", Monthname[m-1]);

	//printf("\n");	
	//printf("\t%s\n", threeMonths[p/4]);	
    

	for(int i=0;i<7;i++)printf("%s ",weekday[i]);
	int c=0;
    
    printf("\n");
 	
 		
	blank=fday(m,y);
	for(i=0;i<blank;i++){
		printf("   ");
		c=c+1;

 	}
 	for(i = 1; i <= (7-c); i++){
 		printf("%d  ", i);
 	}printf("\n");


 	
	for(j = 8 - c; j < month[m-1]; j++){
		if(j/10 == 0)printf(" ");
		printf("%d ", j);
		if ((j - 7 + c)%7 == 0)printf("\n");
	}printf("\n");

 	pChoice = 2;
 	pMonth = m;
 	pYear = y;
	return 0;


}

int printYear(){
	int i, y, j, k , p, blank,m,c,d;
	if(pChoice!=1){
		printf("Enter an year\n");
		scanf("%d",&y);
	}else{
		y = pYear;

	}
	
	

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
	 	pChoice = 1;
	 	pYear = y;
	 	return 0;
}


int main(){
	calendarMenu();
	
	    
	return 0;
}

