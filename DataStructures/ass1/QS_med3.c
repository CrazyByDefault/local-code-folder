#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

FILE *samplesFile, *outputFile;

//Function to find the median of 3 numbers. Not very efficient, should improve
int median(int a, int b, int c){
	if(a < b && b < c)return b;
	else if(c < b && b < a)return b;
	else if(b < c && c < a)return c;
	else if(a < c && c < b)return c;
	else if(c < a && a < b)return a;
	else if(b < a && a < c)return a;
}



int main(int argc, char const *argv[]){
	//Define variables we need
	int i, j, n = atoi(argv[1]), sample_size = atoi(argv[2]);
	clock_t start_t, end_t;
	time_t bla;
	samplesFile = fopen("samples.txt", "r");
	outputFile = fopen("output3.txt", "w");

	char element[3];
	int array[n];
	char line[3*n];
	


	void quicksort(int first, int last){
		if(first < last){
			int lo = first, hi = last, mid = (last + first)/2;
			int pivot = median(lo, hi, mid);

			
			//swap chosen pivot with last
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
			x = array[hi];
			array[hi] = array[pivot];
			array[pivot] = x;

			quicksort(first, hi-1);
			quicksort(hi+1, last);
		}
	}

	for(i = 0; i < sample_size; i++){

		//Extract the first array from samples.txt as a string
		fgets(line, 3*n, samplesFile);

		//Turn the string into an int array
		for(j = 0; j < n; j++){
			element[0] = line[3*j];
			element[1] = line[3*j+1];
			element[2] = line[3*j+2];

			array[j] = atoi(element);
			
		}
		fgets(line, 3*n, samplesFile); //Somehow prevents the IO buffer from misbehaving.
		
		line[0] = '\0';

		//Call quicksort on the extracted array and time it.
		start_t = clock();
		quicksort(0, n - 1);
		end_t = clock();
		double t = ((double) (end_t - start_t))/CLOCKS_PER_SEC;
		t *= 1000;

		// Print time take to output3.txt
		fprintf(outputFile, "%f\n", t);

	}

	fclose(outputFile);

}