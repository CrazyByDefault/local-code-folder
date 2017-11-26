#include <stdio.h>

void binarySearch(int *a, int sp, int ep, int x) {
	int mid = (sp + ep)/2;

	if(sp >= ep){
		printf("Not found :(\n");
		return;
	}
	if(a[mid] == x){
		printf("FOUND!!\n");
	} else {
		if(a[mid] > x) binarySearch(a, sp, mid-1, x);
		else binarySearch(a, mid+1, ep, x);
	}
}

int main() {
	int i, x;
	printf("Enter size of array\n");
	scanf("%d", &x);

	int n[x];
	printf("ENter numbers asshole\n");
	for(i = 0; i < x; i++)
		scanf("%d", &n[i]);

	binarySearch(n, 0, x-1, 4);

	

	return 0;
}