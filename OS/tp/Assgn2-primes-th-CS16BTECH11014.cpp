#include <cstdio>
#include <iostream>
#include <fstream>
#include <pthread.h>
#include <vector>
#include <chrono>
#include <fcntl.h>
#include <sys/shm.h>
#include <sys/time.h>
#include <sys/stat.h>
#include <unistd.h>

using namespace std;

long N,k;
int primes[5000000];

void *checkPrimes(void *param){

	int i = *((int *)param) + 1;
	// cout << N << " " << k << " " << endl;

	for ( int j = i; j <= N ; j += k ){

		int flag = 0;

		for (int l = 2 ; l*l <= j ; l++ ){

			if ( j%l == 0){ // l is a factor of j
				flag = 1;
				*(primes+(j)) = 0; // J is not prime 
				break;
			}

		
		}

		if ( flag == 0 ){

			// cout << j << " l" << endl;
			*(primes+(j)) = 1; // J is prime
			// primes.push_back(j);
		} 

	}

	pthread_exit(0);
}

int main(){
	
	// cin >> N >> k;
	N = 10000000; k = 16;

	pthread_t tid[k];
	pthread_attr_t attr;

	// struct timespec start, end;

	// clock_gettime(CLOCK_MONOTONIC, &start); /* mark start time */

	std::chrono::time_point<std::chrono::system_clock> start, end;
	start = std::chrono::system_clock::now();


	for (int i = 0 ; i < k ; i++ ){

		// pthread_attr_init(&attr);
		pthread_create(&tid[i], NULL , checkPrimes , (void *)&i);
	}

	for (int i = 0 ; i < k ; i++ ) pthread_join(tid[i], NULL); 


	 end = std::chrono::system_clock::now();

	 std::chrono::duration<double> elapsed_seconds = end - start;

	// cout << elapsed_seconds.count() << endl;

	// clock_gettime(CLOCK_MONOTONIC, &end); /* mark the end time */

	// cout << 1000*(end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec)/1000000 << endl; // number of millisecond passed


	ofstream myfile;
	myfile.open ("output_th.txt");

	for ( int i = 2 ; i <= N ; i++ ){

		if (primes[i] == 1) myfile << i << " ";
		
	}

	myfile << endl;

	myfile.close();

	// delete [] prime_check;
	cout << "threads";
	return 0;
}