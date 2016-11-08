#include <stdio.h>

int a[12][6][7];

int prevChoice = 0, prevMonth = 0, prevYear = 0;

int md[2][12] = {
 		
 		//Normal year -
		{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},

		//Leap year -
		{31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
	};

char *dayNames[7] = {"Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"};
char *monthNames[12] = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
char *threeMonths[4] = {"January		     February   	     March", "April		       May 		     June", "July		     August	   	   September", "October	  	     November	    	   December"};

//Determine if year is a leap year
int l=0;



int dayOfWeek(int d, int m, int y){
	int days;

	int month, date;

	char *names[7] = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};

	//Add all days until last year
	days = (y-1900)*365 + (y-1900)/4 - (y-1900)/100 + (y-1900)/400;

	//Check if the year given is a leap year or not
	if(y%4 == 0)l = 1;
	if(y%100 ==0 && y%400 != 0)l = 0;

	//Run a loop for that year, till we reach the given day
	for(month = 1; month <=m; month++){
		

		if(month == m){
			//If the current month is reached, 
			days = days + d;
			
			break;
		}
		else{

			//Run a loop till the last day of the month, as specified in md[][]
			for(date = 1; date <= md[l][month-1]; date++){
				days++;
			}
		}
	}

	//Check which day of the week it is
	int x = days%7;
	return x;

	//printf("%s \n", names[x]);
}

void zeroArray(){
	int i, j, k;
	for(k = 0; k < 12; k++){
		for(i = 0; i < 6; i++){
			for (int j = 0; j < 7; j++){
				a[k][i][j] = 0;
				/*b[i][j] = 0;
				c[i][j] = 0;*/
			}
		}
	}
}

int printMonth(){
	int m, y;

	if(prevChoice != 2){
		printf("Enter the month\n");
		scanf("%d", &m);
		printf("Enter the year\n");
		scanf("%d", &y);
		printf("\n");
		prevMonth = m;
		prevYear = y;
	}else{
		m = prevMonth;
		y = prevYear;
	}

	if(y%4 == 0)l = 1;
	if(y%100 ==0 && y%400 != 0)l = 0;

	if(m < 0 || m > 12 || y < 1900 || y > 2016){
		printf("Please enter a valid date.\n");
		return -1;
	}

	int i, j, c = dayOfWeek(1, m, y), r = 0;
	
	printf("\t%s\n", monthNames[m-1]);
	for(i = 0; i < 7; i++)printf("%s ", dayNames[i]);
	printf("\n");

	for(i = 1; i <= md[l][m - 1]; i++){
		a[m-1][r][c] = i;

		c++;
		c = c%7;
		if(c%7 == 0)r++;
		
	}


	for (i = 0; i < 6; i++){
		for(j = 0; j < 7; j++){

			if(a[m-1][i][j] == 0)printf("   ");
			else if(a[m-1][i][j]/10 == 0)printf("%d  ", a[m-1][i][j]); 
			else printf("%d ", a[m-1][i][j]);


		}printf("\n");

		
	}
	zeroArray();
	prevChoice = 2;
	return 0;
}

int printYear(){
	int y;

	if(prevChoice != 1){
		printf("Enter the year\n");
		scanf("%d", &y);
		printf("\n");
		prevYear = y;
	}else y = prevYear;

	if(y%4 == 0)l = 1;
	if(y%100 ==0 && y%400 != 0)l = 0;


	if(y < 1900 || y > 2016){
		printf("Please enter a valid date.\n");
		return -1;
	}

	int i, j, k;

	for(k = 0; k < 12; k++){
		int c = dayOfWeek(1, k + 1, y), r = 0;
		

		for(i = 1; i <= md[l][k]; i++){
			a[k][r][c] = i;

			c++;
			c = c%7;
			if(c%7 == 0)r++;
		
		}
	}
	int balls = 0;
	for(k = 0; k < 10; k += 3){
		// printf("K = %d\n", k);
		printf("\t\t\t      %d\n", y);
		printf("\t%s\n", threeMonths[balls]);
		balls++;
		for(j = 0; j < 3; j++){
			for(i = 0; i < 7; i++)printf("%s ", dayNames[i]);
			printf("  ");
		}
		printf("\n");
		for (i = 0; i < 6; i++){

			for(j = 0; j < 7; j++){

				if(a[k][i][j] == 0)printf("   ");
				else if(a[k][i][j]/10 == 0)printf("%d  ", a[k][i][j]); 
				else printf("%d ", a[k][i][j]);


			} //Switch to next month, same line here
			printf("  ");

			for(j = 0; j < 7; j++){

				if(a[k+1][i][j] == 0)printf("   ");
				else if(a[k+1][i][j]/10 == 0)printf("%d  ", a[k+1][i][j]); 
				else printf("%d ", a[k+1][i][j]);


			}
			printf("  ");

			for(j = 0; j < 7; j++){

				if(a[k+2][i][j] == 0)printf("   ");
				else if(a[k+2][i][j]/10 == 0)printf("%d  ", a[k+2][i][j]); 
				else printf("%d ", a[k+2][i][j]);


			}
			printf("\n");

			
		}printf("\n\n");
	}
	zeroArray();
	prevChoice = 1;
	return 0;
}


int moveRight(){
	if(prevChoice == 0 || prevYear == 0)return -1;
	
	if(prevChoice == 1){
		prevYear++;
		printYear();
		return 0;
	}

	if(prevChoice == 2){
		if(prevMonth == 0)return -1;
		if(prevMonth != 12)prevMonth++;
		else{
			prevMonth = 1;
			prevYear++;
		}
		printMonth();
		return 0;
	}
}

int moveLeft(){
	if(prevChoice == 0 || prevYear == 0)return -1;
	
	if(prevChoice == 1){
		prevYear--;
		printYear();
		return 0;
	}

	if(prevChoice == 2){
		if(prevMonth == 0)return -1;
		if(prevMonth != 1)prevMonth--;
		else{
			prevMonth = 12;
			prevYear--;
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



int main(){
	zeroArray();
	return calendarMenu();

}