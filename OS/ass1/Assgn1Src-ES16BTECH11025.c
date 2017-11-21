#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>
#include <sys/mman.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(){
	pid_t pid;
	int prv, i;
	int x, *n;

	int memd;

	memd = shm_open("/shared_object", O_CREAT+O_RDWR, 0666);

	switch(pid = fork()){
		case -1:
			return 1;
			break;

		case 0:
			scanf("%d", &x);
			if(x < 1){
				printf("ERROR: Enter a number greater than 1.\n");
				exit(0);
			}
			n = (int*) malloc(sizeof(int));

			for (i = 0; x != 1; i++){
				n[i] = x;
				if(x%2 == 0){
					x = x/2;				
				} else {
					x = 3*x + 1;
				}
			}
			n[i] = 1;

			ftruncate(memd, i*sizeof(int));
			memcpy(mmap(NULL, i*sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED, memd, 0), n, (i+1)*sizeof(int));

			exit(i);
			break;

		default:
			wait(&prv);
			prv = WEXITSTATUS(prv);
			
			if(!prv) return 1;

			n = mmap(NULL, prv*sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED, memd, 0);
			for (i = 0; i <= prv; i++){
				printf("%d\t", n[i]);
			}
			printf("\n");
			break;
	}

	shm_unlink("/shared_object");

	return 0;
}