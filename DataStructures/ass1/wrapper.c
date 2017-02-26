#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int main(){
	FILE* samplesFile;
	samplesFile = fopen("samples.txt", "w");
	time_t t;
	int x; 
	int i, j;
	int n;

	printf("Enter size of array you want to test\n");	
	scanf("%d", &n);

	printf("Choose number of arrays (sample size) -\n1. 10\n2. 100\n3. 1000\n4. 10000\n5. 100000\n");
	scanf("%d", &x);
	int sample_size = pow(10, x);

	printf("Generating %d random arrays of size %d each, and storing it in samples.txt\n", sample_size, n);

	system("touch samples.txt");
	system("> samples.txt");



	srand((unsigned) time(&t));

	char array[3*n], element[4], writeToFile[3*n + 100];
	array[0] = '\0';
	for(i = 0; i < sample_size; i++){
		for(j = 0; j < n; j++){
			int randomint = rand()%100;
			sprintf(element, "%d ", randomint);
			// printf("%d ", randomint);
			strcat(array, element);
		}
		fprintf(samplesFile, "%s\n", array);
		array[0] = '\0';
		
	}

	/*This block of code compiles and runs quicksort1 with the argumnet size, as accepted from the user.*/
	printf("Compiling quicksort1...\n");
	if(!system("gcc -w -o quicksort1 quicksort1.c")){

		printf("Compiled.\nRunning quicksort1...");
		char qs1_call[300];
		sprintf(qs1_call, "./quicksort1 %d", n);

		int qs1_ret = system(qs1_call);

	}else{
		printf("Error compiling quicksort1. Exiting...\n");
		return -1;
	}

	return 0;
}