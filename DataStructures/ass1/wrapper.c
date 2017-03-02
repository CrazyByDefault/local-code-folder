#include <stdio.h>
#include <stdlib.h>
#include <string.h>
/*This file generates as many random arrays of any size specified, and stores it to a file. It then compiles and runs the individual quicksort.c files with relevant arguments (array size and sample size).*/

int main(){
	FILE* samplesFile, *outputReader1, *outputReader2, *outputReader3, *outputReader2_rand;
	samplesFile = fopen("samples.txt", "w");
	time_t t;
	int i, j; 
	float avg1 = 0, avg2 = 0, avg3 = 0, avg_rand = 0;
	int n;
	int sample_size;
	char line[8];

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
	printf("Compiling quicksort last...\n");
	if(!system("gcc -w -o QS_last QS_last.c")){

		printf("Compiled.\nRunning quicksort last...\n\n");
		char qs1_call[300];
		sprintf(qs1_call, "./QS_last %d %d", n, sample_size);

		int qs1_ret = system(qs1_call);

	}else{
		printf("Error compiling QS_last. Exiting...\n");
		return -1;
	}


	printf("Compiling quicksort random...\n");
	if(!system("gcc -w -o QS_random QS_random.c")){

		printf("Compiled.\nRunning QS_random...\n\n");
		char qs1_call[300];
		sprintf(qs1_call, "./QS_random %d %d", n, sample_size);

		int qs1_ret = system(qs1_call);

	}else{
		printf("Error compiling quicksort random. Exiting...\n");
		return -1;
	}

	printf("Compiling quicksort median...\n");
	if(!system("gcc -w -o QS_med3 QS_med3.c")){

		printf("Compiled.\nRunning QS_med3...\n\n");
		char qs1_call[300];
		sprintf(qs1_call, "./QS_med3 %d %d", n, sample_size);

		int qs1_ret = system(qs1_call);

	}else{
		printf("Error compiling quicksort median. Exiting...\n");
		return -1;
	}

	outputReader1 = fopen("output1.txt", "r");
	outputReader2 = fopen("output2.txt", "r");
	outputReader2_rand = fopen("randoms.txt", "r");
	outputReader3 = fopen("output3.txt", "r");

	for(i = 0; i < sample_size; i++){
		fgets(line, 8, outputReader1);
		avg1 = avg1 + atof(line);

		fgets(line, 8, outputReader2);
		avg2 = avg2 + atof(line);

		fgets(line, 8, outputReader3);
		avg3 = avg3 + atof(line);

		fgets(line, 8, outputReader2_rand);
		avg_rand = avg_rand + atof(line);
	}

	avg1 /= sample_size;
	avg2 /= sample_size;
	avg3 /= sample_size;
	avg_rand /= sample_size;

	printf("Avg time taken for QS_last is %f\n", avg1);
	printf("Avg time taken for QS_rand (Excluding Random Pivot Generation) is %f\n", avg2);
	printf("Avg time taken for QS_rand (Including Random Pivot Generation) is %f\n", (avg2+avg_rand));
	printf("Avg time taken for QS_med3 is %f\n", avg3);

	
	return 0;
}