#include <stdio.h>

/*Declare, initialize and accept all variables as required
int d, m, y;*/

int md[2][12] = {
 		
 		//Normal year -
		{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},

		//Leap year -
		{31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
	};

char *dayNames[7] = {"Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"};
char *monthNames[12] = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};

//Determine if year is a leap year
int l=0;

int dayOfWeek(d, m, y){
	return (daysSince(d, m, y) - 1)%7;
}

int daysSince(d, m, y){

	int days;

	int month, date;
	
	//Add all days until last year
	days = (y-1900)*365 + (y-1900)/4 - (y-1900)/100 + (y-1900)/400;

	//Check if the year given is a leap year or not
	

	//Run a loop for that year, till we reach the given day
	for(month = 1; month <=m; month++){
		

		if(month == m){
			//If the current month is reached, 
			days = days + d -1;
			
			break;
		}
		else{

			//Run a loop till the last day of the month, as specified in md[][]
			for(date = 1; date <= md[l][month-1]; date++){
				days++;
			}
		}
	}

	/*Check which day of the week it is
	int x = days%7;

	printf("%s \n", names[x]);*/

	return days;

}

void displayYear(){
	int y;

	printf("Enter the year\n");



}

void printMonth(m, y, pos){

	int x = pos*20 + pos;
	printf("\n \x1B[A\e[%dC %s\n", x, monthNames[m]);

	int i, d=1;

	for(i = dayOfWeek(1, m, y); d <=md[l][m-1]; i++){
		
		x = x +(i%7)*2;
		printf("\x1B[A\e[%dC%d", x, d);
		d++;
	}


}


int calendarMenu(){
	printf("Calendar Menu\n1:Display Year\n2:Display Month\n3:Move right\n4:Move left\n5:Exit");
	int choice;
	scanf("%d", &choice);
	return choice;
}

int main(){

	int choice = calendarMenu();
	switch(choice){
		
		case 1:
			displayYear();
			break;

		case 2:
			displayMonth();
			break;

		case 3:
			moveRight();
			break;

		case 4:
			moveLeft();
			break;

		case 5:
			return 0;
	}
	

	if(y%4 == 0)l = 1;
	if(y%100 ==0 && y%400 != 0)l = 0;

	if(d < 0 || d > md[l][m - 1] || m < 0 || m > 12 || y < 1900 || y > 2016){
		printf("Please enter a valid date.\n");
		return -1;
	}

	int days = daysSince();
}