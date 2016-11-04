#include <stdio.h>
#include <math.h>

int md[2][12] = {
 		
 		//Normal year -
		{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},

		//Leap year -
		{31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
	};
int l;

int daysSince(int d, int m, int y){

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

int dayOfWeek(int d, int m, int y){
	return (daysSince(d, m, y) - 1)%7;
}

void main(){



	char *monthNames[12] = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};

	int pos;
	scanf("%d", &pos);
	int x = pos*20 + pos;
	int m;
	scanf("%d", &m);
	
	int y;
	scanf("%d", &y);

	
	if(y%4 == 0)l = 1;
	if(y%100 ==0 && y%400 != 0)l = 0;

	int i, d=1;

	printf("\n \x1B[A\e[%dC %s\n", x, monthNames[m]);
	for(i = dayOfWeek(1, m, y); d <=md[l][m-1]; i++){

		if(i == 7){
			printf("\n");
			i = 0;
			x = pos*20 + pos;
		}else{
		
			x = x + i*2;
			printf("\x1B[A\e[%dC %d", x, d);
			d++;
		}
	}

	
}