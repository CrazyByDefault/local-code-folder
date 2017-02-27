#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// int n, sample_size;
FILE* samplesFile;



int main(int argc, char const *argv[]){
	int i, j;
	int n = atoi(argv[1]);
	int sample_size = atoi(argv[2]);
	clock_t t;
	samplesFile = fopen("samples.txt", "r");

	int array[n];
	char element[3];
	char line[3*n];


	for(i = 0; i < sample_size; i++){
		fgets(line, 3*n, samplesFile);
		printf("#LOOP1 %s\n", line);

		printf("#LOOP2 ");
		for(j = 0; j < n; j++){
			element[0] = line[3*j];
			element[1] = line[3*j+1];
			element[2] = line[3*j+2];

			array[j] = atoi(element);
			printf("%d ", array[j]);
		}
		fgets(line, 3*n, samplesFile);
		line[0] = '\0';
		printf("\n");

	}

}