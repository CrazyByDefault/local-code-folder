#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <time.h>
#include <string.h>
#include <math.h>
#include <sys/types.h>

int *n;

struct threadParams {
	int k, N, i;
};

struct threadParams params;

// int isPrime(unsigned int n) {
// 	if (n < 2) return 0;
// 	if (n < 4) return 1;
// 	if (n % 2 == 0) return 0;

// 	const unsigned int iMax = (int)sqrt(n) + 1;
// 	unsigned int i;
// 	for (i = 3; i <= iMax; i += 2)
// 		if (n % i == 0)
// 			return 0;

// 	return 1;
// }

void *computePrimes(void *x) {
	int i = (int) x;
	int k = params.k; int N = params.N;

	int p, q, *primes, r = 0, d;
	primes = (int *) malloc(N*sizeof(int));

	for(p = i+1; p < N; p += k) {
		d = 0;
		for(q = 2; q < p; q++) {
			if (p%q == 0) d++;
		}
		if(d==0){
			r++;
			primes[r] = p;			
		}
	}
	memcpy(i*N + n, primes, N*sizeof(int));
}

int main(){	
	clock_t start_t, end_t;
	int i, j;

	printf("Enter number to find roots upto - ");
	int N; scanf("%d", &N);

	if(N <= 2) printf("Enter a number greater than 2\n");

	printf("\nEnter k\n");
	int k; scanf("%d", &k);
	// int N = 10000000; int k = 16;

	pthread_t tid[k];
	n = (int *) malloc(k*N*sizeof(int));

	start_t = clock();

	params.k = k;
	params.N = N;

	for (i = 0; i < k; i++) {
		pthread_create(&tid[i], NULL, computePrimes, (void*) i);
	}

	for (i = 0; i < k; i++) {
		pthread_join(tid[i], NULL);
	}
	end_t = clock();

	// FILE *fp;
	// fp = fopen ("ThreadPrimes.txt","w");
	// for(i = 0; i < k; i++) {
	// 	for (j = 0; j < N; j++){
	// 		if(*(n + i*N + j) != 0) fprintf(fp, "%d ", *(n + i*N + j));
	// 	}
	// }
	// /* close the file*/  
	// fprintf(fp, "\n");
	// fclose (fp);

	double t = ((double) (end_t-start_t))/CLOCKS_PER_SEC;
	t *= 1000;
	// printf("Contents written to ThreadPrimes.txt, time taken - %f\n", t);

	return 0;
}