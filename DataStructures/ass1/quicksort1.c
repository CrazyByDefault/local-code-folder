#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

FILE *samplesFile, *outputFile;



int main(int argc, char const *argv[]){
	int i, j;
	int n = atoi(argv[1]);
	int sample_size = atoi(argv[2]);
	clock_t t;
	samplesFile = fopen("samples.txt", "r");
	outputFile = fopen("output.txt", "w");

	
	char element[3];
	int array[n];
	int outputArray[n];
	char line[3*n];
	int depth = 0;

	void quicksort(int first, int last){
		depth++;
		printf("\nDEPTH = %d \n", depth);

		if(first != last){
			int lo = first, hi = last, pivot = last;
			int i, j;
			
			printf("first = lo = %d, hi = %d, pivot = %d\n", lo, hi, pivot);
			for(i = first; i < hi; i++)printf("%d ", array[i]);
			printf("\[%d\]\n", array[pivot]);
			if(lo >= hi)return;
			
			while(lo < hi){
				while(array[lo] < array[pivot] && lo < hi) lo++;
				while(array[pivot] <= array[hi] && hi > lo) hi--;

				//Swap array[lo] and array[hi]
				if(lo < hi){
					printf("Swapping %d and %d \n", array[lo], array[hi]);
					int x = array[lo];
					array[lo] = array[hi];
					array[hi] = x;
				}
			}
			printf("lo = %d, hi = %d, pivot = %d\n", lo, hi, pivot);

			//when lo = hi
			
			printf("Swapping pivot %d with %d \n", array[pivot], array[hi]);
			int x = array[pivot];
			array[pivot] = array[hi];
			array[hi] = x;

			if(first < hi)quicksort(first, hi-1);
			if(hi < last)quicksort(hi, last);

		}

	}

	for(i = 0; i < sample_size; i++){
		fgets(line, 3*n, samplesFile);

		for(j = 0; j < n; j++){
			element[0] = line[3*j];
			element[1] = line[3*j+1];
			element[2] = line[3*j+2];

			array[j] = atoi(element);
			
		}
		fgets(line, 3*n, samplesFile);
		
		line[0] = '\0';
		// t = clock();
		depth = 0;
		printf("Calling quicksort\n");
		quicksort(0, n - 1);

		for(j = 0; j < n; j++){
			if(array[j]/10 == 0)sprintf(element, "%d  ", array[j]);
			else sprintf(element, "%d ", array[j]);
			// printf("%d ", randomint);
			strcat(outputArray, element);
		}
		fprintf(outputFile, "%s\n", outputArray);
		outputArray[0] = '\0';
			
		
		// t = clock() - t;
		// printf("\n");

	}

	fclose(outputFile);

	

}