#include <stdio.h>

int a[6][7], b[6][7], c[6][7];

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
	return (daysSince(d, m, y) - 1)%7 + 2;
}

void zeroArrays(){
	int i, j;
	for(i = 0; i < 6; i++){
		for (int j = 0; j < 7; j++)
		{
			a[i][j] = 0;
			b[i][j] = 0;
			c[i][j] = 0;
		}
	}
}

void printMonth(int m, int y){
	int i, j, c = dayOfWeek(1, m, y), r = 0, flag = 0;
	printf("\t%s\n", monthNames[m-1]);

	for(i = 0; i < 7; i++)printf("%s ", dayNames[i]);
	printf("\n");

	for(i = 1; i <= md[l][m - 1]; i++){
		a[r][c] = i;

		c++;
		c = c%7;
		if(c%7 == 0)r++;
		
	}

	for (i = 0; i < 6; i++){
		for(j = 0; j < 7; j++){

			if(a[i][j] == 0)printf("   ");
			else if(a[i][j]/10 == 0)printf("%d  ", a[i][j]); 
			else printf("%d ", a[i][j]);


		}printf("\n");

		
	}

}

int main(){
	zeroArrays();
	int m, y;
	//scanf("%d", &d);
	//printf("\n");
	scanf("%d", &m);
	printf("\n");
	scanf("%d", &y);
	printf("\n");

	if(y%4 == 0)l = 1;
	if(y%100 ==0 && y%400 != 0)l = 0;

	if(/*d < 0 || d > md[l][m - 1] ||*/ m < 0 || m > 12 || y < 1900 || y > 2016){
		printf("Please enter a valid date.\n");
		return -1;
	}

	printMonth(m, y);
}