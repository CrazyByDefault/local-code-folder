/*
This is a  multi-process program to identify all the prime numbers less than a given number N. 

Usage - 
N and the number of process to be created is taken as input from the user from stdin.
All primes less than N are printed as output to stdout

@author Gitanjali Mannepalli

November 26, 2017

*/

#include <cstdio>
#include <iostream>
#include <fstream>
#include <sys/wait.h>
#include <fcntl.h>
#include <sys/shm.h>
#include <sys/stat.h>
#include <unistd.h>
#include <chrono>
#include <sys/time.h>
#include <sys/mman.h>

using namespace std;

void check_primes( void *ptr , int N, int i, int k){

	for ( int j = i; j <= N ; j += k ){

		int flag = 0;

		for (int l = 2 ; l*l <= j ; l++ ){

			if ( j%l == 0){ // l is a factor of j
				flag = 1;
				*((int *)ptr+j) = 0; // J is not prime 
				break;
			}

		
		}

		if ( flag == 0 ){

			// cout << j << " l" << endl;
			*((int *)ptr+j) = 1; // J is prime
		} 

	}


}

int main(){

	const char *name = "Primes";

	long N,k;

	// cin >> N >> k;
	N = 10000000; k = 16;

	const int size = N*sizeof(int);

	// struct timespec start, end;

	// clock_gettime(CLOCK_MONOTONIC, &start); /* mark start time */

	signal(SIGCHLD, SIG_IGN);

	pid_t pids[k];

	std::chrono::time_point<std::chrono::system_clock> start, end;
	start = std::chrono::system_clock::now();

	for (int i = 1 ; i <= k ; i++ ){

		pids[i-1] = fork();

		if (pids[i-1] == 0) {

			// cout << clock() << " :time" << i << "\n";
			// cout << "lol\n";

			int shm_fd = shm_open(name, O_CREAT | O_RDWR , 0666);
			void *ptr;

			ftruncate( shm_fd , size );
			
			ptr = mmap(0, size, PROT_WRITE, MAP_SHARED, shm_fd, 0);

			check_primes(ptr, N , i , k);

			return 0;

		}

	}

	for (int i = 0 ; i < k ; i++ ) wait(NULL); // wait till k processes end

	 end = std::chrono::system_clock::now();

	 std::chrono::duration<double> elapsed_seconds = end - start;

	 // cout << elapsed_seconds.count() << endl;
	
	// clock_gettime(CLOCK_MONOTONIC, &end); /* mark the end time */

	// cout << 1000*(end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec)/1000000 << endl;

	int shm_fd = shm_open(name, O_RDONLY , 0666);
	void *ptr;

	ftruncate( shm_fd , size );

	ptr = mmap(0, size, PROT_READ, MAP_SHARED, shm_fd, 0);

	ofstream myfile;
	myfile.open ("output_proc.txt");
	
	for ( int i = 2 ; i <= N ; i++ ){

		if ( *((int *)ptr + i) == 1 ) myfile << i << " "; 
	}

	myfile << endl;

	shm_unlink(name);

	cout << "process";
	return 0;
}