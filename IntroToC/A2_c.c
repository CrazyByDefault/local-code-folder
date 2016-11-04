#include <stdio.h>

void main(){
	//Declare, initialize and accept all variables as required
	int d, m, y;

	printf("Enter the day: ");
	scanf("%d", &d);
	printf("\n");

	printf("Enter the month: ");
	scanf("%d", &m);
	printf("\n");
	
	printf("Enter the year: ");
	scanf("%d", &y);
	printf("\n");

	int days;

	int month, date;
	int l=0;

	int md[2][12] = {
 		
 		//Normal year -
		{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},

		//Leap year -
		{31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
	};

	char *names[7] = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};

	//Add all days until last year
	days = (y-1)*365 + (y-1)/4 - (y-1)/100 + (y-1)/400;

	//Check if the year given is a leap year or not
	if(y%4 == 0)l = 1;
	if(y%100 ==0 && y%400 != 0)l = 0;

	//Run a loop for that year, till we reach the given day
	for(month = 1; month <=m; month++){
		printf("Month %d \n", month);

		if(month == m){
			//If the current month is reached, 
			days = days + d -1;
			printf("Found!\n");
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

	printf("%s \n", names[x]);


}