#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
	FILE* samplesFile;
	samplesFile = fopen("samples.txt", "w");
	time_t t;
	int i, j;
	int n;
	int sample_size;

	printf("Enter size of array you want to test\n");
	scanf("%d", &n);

	printf("Choose number of arrays (sample size) -\n");
	scanf("%d", &sample_size);
	

	printf("Generating %d random arrays of size %d each, and storing it in samples.txt\n", sample_size, n);




	srand((unsigned) time(&t));

	char array[3*n], element[4], writeToFile[3*n + 100];
	array[0] = '\0';
	for(i = 0; i < sample_size; i++){
		for(j = 0; j < n; j++){
			int randomint = rand()%100;
			if(randomint/10 == 0)sprintf(element, "%d  ", randomint);
			else sprintf(element, "%d ", randomint);
			// printf("%d ", randomint);
			strcat(array, element);
		}
		fprintf(samplesFile, "%s\n", array);
		array[0] = '\0';
		
	}
	fclose(samplesFile);

	/*This block of code compiles and runs quicksort1 with the argumnet size, as accepted from the user.*/
	printf("Compiling quicksort1...\n");
	if(!system("gcc -w -o quicksort1 quicksort1.c")){

		printf("Compiled.\nRunning quicksort1...\n\n");
		char qs1_call[300];
		sprintf(qs1_call, "./quicksort1 %d %d", n, sample_size);

		int qs1_ret = system(qs1_call);

	}else{
		printf("Error compiling quicksort1. Exiting...\n");
		return -1;
	}


	printf("Compiling quicksort2...\n");
	if(!system("gcc -w -o quicksort2 quicksort2.c")){

		printf("Compiled.\nRunning quicksort2...");
		char qs1_call[300];
		sprintf(qs1_call, "./quicksort2 %d %d", n, sample_size);

		int qs1_ret = system(qs1_call);

	}else{
		printf("Error compiling quicksort2. Exiting...\n");
		return -1;
	}

	
	return 0;
}