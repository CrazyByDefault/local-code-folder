#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

FILE *samplesFile, *outputFile;

int median(int a, int b, int c){
	if(a < b && b < c)return b;
	if(c < b && b < a)return b;
	if(b < c && c < a)return c;
	if(a < c && c < b)return c;
	if(c < a && a < b)return a;
	if(b < a && a < c)return a;
}



int main(int argc, char const *argv[]){
	int i, j;
	int n = atoi(argv[1]);
	int sample_size = atoi(argv[2]);
	clock_t start_t, end_t;
	time_t bla;
	samplesFile = fopen("samples.txt", "r");
	outputFile = fopen("output3.txt", "w");

	int randomint[n];
	char element[3];
	int array[n];
	int outputArray[n];
	char line[3*n];
	int depth = 0;


	void quicksort(int first, int last){
		depth++;
		if(first < last){
			int lo = first, hi = last, mid = (last + first)/2;
			int pivot = median(lo, hi, mid);

			// printf("first = %d, hi = %d, pivot = %d \n", first, lo, pivot);
			//swap random thingy with last
			int x = array[pivot];
			array[pivot] = array[hi];
			array[hi] = x;

			while(lo < hi){
				while(array[lo] < array[pivot] && lo < hi) lo++;
				while(array[hi] >= array[pivot] && hi > lo) hi--;

				//Swap
				if(lo < hi){
					// printf("Swapping %d with %d\n", array[lo], array[hi]);
					int x = array[hi];
					array[hi] = array[lo];
					array[lo] = x;
				}
			}


			//Swap pivot into right position
			// printf("Swapping %d with pivot %d \n", array[hi], array[pivot]);
			x = array[hi];
			array[hi] = array[pivot];
			array[pivot] = x;

			quicksort(first, hi-1);
			quicksort(hi+1, last);
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
		start_t = clock();
		depth = 0;
		// printf("Calling quicksort\n");
		quicksort(0, n - 1);

		for(j = 0; j < n; j++){
			if(array[j]/10 == 0)sprintf(element, "%d  ", array[j]);
			else sprintf(element, "%d ", array[j]);
			// printf("%d ", randomint);
			strcat(outputArray, element);
		}
		end_t = clock();
		double t = ((double) (end_t - start_t))/CLOCKS_PER_SEC;
		t *= 1000;
		fprintf(outputFile, "%s - sort time - %fms \n", outputArray, t);
		outputArray[0] = '\0';
			
		
		
		// printf("\n");

	}

	fclose(outputFile);

	

}