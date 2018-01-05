#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <math.h>
#include <string.h>
#include <sys/mman.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <time.h>

int isPrime(unsigned int n) {
	if (n < 2) return 0;
	if (n < 4) return 1;
	if (n % 2 == 0) return 0;

	const unsigned int iMax = (int)sqrt(n) + 1;
	unsigned int i;
	for (i = 3; i <= iMax; i += 2)
		if (n % i == 0)
			return 0;

	return 1;
}


int main(){
	printf("Enter number to find roots upto - ");
	int N; scanf("%d", &N);

	if(N <= 2) printf("Enter a number greater than 2\n");

	printf("\nEnter k\n");
	int k; scanf("%d", &k);
	// int N = 10000000; int k = 16;

	int memd;
	memd = shm_open("/shared_object", O_CREAT+O_RDWR, 0666);
	ftruncate(memd, k*N*sizeof(int)); //We'll be writing a 2D array to te shared memory, one for each process

	pid_t pid[k];
	int prv, i, j;

	for(i = 0; i < k; i++){
		pid[i] = fork();
		if(pid[i] == 0) break;
	}

	switch(pid[i]) {
		case -1:
			return -1;
			break;

		case 0: // children
			printf("\n");
			int p, q, *primes, r = 0, d, num = 0;
			primes = (int *) malloc(N*sizeof(int));

			for(p = i+1; p < N; p += k) {
				for(p = i+1; p < N; p += k) {
					if(isPrime(p)) primes[r] = p;
					r++;
				}
			}

			memcpy(i*N*sizeof(int) + mmap(NULL, k*N*sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED, memd, 0), primes, (N+1)*sizeof(int));
			exit(num);

			break;

		default: // parent
			while ((wait(NULL)) > 0);

			int *n = mmap(NULL, k*N*sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED, memd, 0);
			FILE *fp;
			fp = fopen ("ProcPrimes.txt","w");
			for(i = 0; i < k; i++) {
				for (j = 0; j < N; j++){
					if(*(n + i*N + j) != 0) fprintf(fp, "%d\n", *(n + i*N + j));
				}
			}
			/* close the file*/  
			// fprintf(fp, "\n");
			fclose (fp);
			break;
	}

	// scanf("%d", &k);
	shm_unlink("/shared_object");

	printf("Contents written to ProcPrimes.txt\n");

	return 0;
}