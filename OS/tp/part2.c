#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <limits.h>
#include <unistd.h>
#include <sys/types.h>
#include <fcntl.h>
#include <sys/shm.h>
#include <sys/stat.h>
#include <sys/mman.h>
#include <sys/wait.h>

/*
* Function to find number of digits in a number. 
* Used for pretty printing
*/

bool isPrime(int n)
{
    // Corner cases
    if (n <= 1)  return false;
    if (n <= 3)  return true;
 
    // This is checked so that we can skip 
    // middle five numbers in below loop
    if (n%2 == 0 || n%3 == 0) return false;
 
    for (int i=5; i*i<=n; i=i+6)
        if (n%i == 0 || n%(i+2) == 0)
           return false;
 
    return true;
}


int main(int argc, char const *argv[])
{	
	pid_t Mainpid = getpid();
	int n,k;
	int Enteredvalue = -6;
	printf("Enter Number N\n");
	scanf("%d",&n);
	printf("Enter No. of Children K\n");
	scanf("%d",&k);

	int totalcreated = 0;
	pid_t pid[k];

	int shm_fd;
	int *ptr;
	int status;
	// printf("%d\n",sizeof(bool) );
	const int SIZE = n*k*sizeof(int);
	printf("%d\n",SIZE );
	const char *name = "OS_Assignment";
	shm_fd = shm_open(name, O_CREAT | O_RDWR, 0666);
	if (shm_fd == -1) {
		printf("shared memory failed\n");
		exit(-1);
	}
	ftruncate(shm_fd,SIZE);
	int dada;
	for (dada = 0; dada < k; ++dada)
	{
		if (getpid() == Mainpid)
		{
			pid[dada] = fork();
			if (pid[dada] == 0) break;
			totalcreated++;
		}
	}
	ptr = mmap(0,SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, shm_fd, 0);
	if (ptr == MAP_FAILED) {
		printf("Map failed\n");
		return -1;
	}
	for (int i = 0; i < n*k; ++i)
	{
		ptr[i] = -1;
	}
	// for (int i = 0; i < k; ++i)
	// {
		if (pid[dada] < 0) { 
			fprintf(stderr, "Fork Failed\n");
			return 1;
		}
		if (pid[dada] == 0)
		{
			int i = dada;
			// printf("Enter Child %d %d\n",i,getpid() );
			shm_fd = shm_open(name,O_RDWR, 0666);
			if (shm_fd == -1) {
				printf("shared memory failed\n");
				exit(-1);
			}
			int *arr = (int *)malloc(n*sizeof(int));
			// // ptr = mmap(0,n*sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED, shm_fd, 0);
			// // printf("%d %d",ptr,ptr + i*n *six);
			// if (ptr == MAP_FAILED) {
			// 	printf("Map failed\n");
			// 	return -1;
			// }
			int count = i +1;
			// count++;
			// printf("%d ",count );
			/*for (int j = count*k; j <( count*k + 1) && j < n ; ++j)
			{
				// printf("Entered\n");
				// Enteredvalue = j*k + count ;
				if (isPrime(j)){
					printf("hiiiiiii\n");
					ptr[j - 1] = true;
					// printf("%d\n", j*k + count);
				}
				else{
					printf("hiiiiiiiiiiiiiiiiiiii\n");
					ptr[j - 1] = false;
				}
				// Enteredvalue = -6;
			}*/
			// for (int l = count*(n/k); l < (count*(n/k) + (n/k)) && l < n; ++l)
			// {
			// 	/* code */
			// 	if (isPrime(l+1))
			// 	{
			// 		/* code */
			// 		ptr[l] = true;
			// 	}
			// 	else
			// 		ptr[l] = false;
			// }
			// ptr = ptr + (4*(n/k)*i);
			// ptr += n*i;
			int j = 0;
			for (int l = 0; l*k + count < n ; ++l)
			{
				if (isPrime(l*k + count)){
					// *ptr = i*k + count;
					// *ptr = l*k + count;
					arr[l] = l*k + count;
					printf("%d ",arr[l]);
					// ptr++;
				}
				else
				{
					arr[l] = -1;
					// *ptr = -1;
				}
				j++;				
			}
			// ptr = mmap(0,n*sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED, shm_fd, 0);
			memcpy(i*n*sizeof(int) + mmap(0,n*sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED, shm_fd, 0),arr,n*sizeof(int));
			return 0;
		}
	// }

	for (int i = 0; i < k; ++i)
	{
		wait(&status);
		if (status != 0)
		{
			printf("ERROR OCCURERD IN CHILD PROCESS %d\nEXITING PARENT\n",i);
			printf("Enteredvalue: %d\n",Enteredvalue );
			exit(-1);
		}
		
	}

	printf("Children Ended\n");

	ptr = mmap(0,SIZE, PROT_READ, MAP_SHARED, shm_fd, 0);
	if (ptr == MAP_FAILED) {
		printf("Map failed\n");
		exit(-1);
	}

	/*for (int i = 0; i < n*k; ++i)
	{
		// // printf("hi\n")
		// for (int j = 0; j < k; ++j)
		// {
		// 	 code 
			if (ptr[i] != -1){
				printf("%d ",ptr[i]);
			}
		// };
	}*/
	for (int i = 0; i < k; ++i)
	{
		for (int j = 0; j < n; ++j)
		{
			// if (*(ptr+i*n+j) != -1)
			{
				printf("%d ",*(ptr+i*n+j) );
			}
		}
	}
	printf("\n");
	
	/* remove the shared memory segment */
	if (shm_unlink(name) == -1) {
		printf("Error removing %s\n",name);
		exit(-1);
	}

	if (getpid() == Mainpid)
	{
		printf("totalcreated : %d\n",totalcreated);
	}
	return 0;
}