#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int a[1000];


int nextFree() {
	int i;
	for (i = 1; i < 1000; i++) {
		if(a[i] == INT_MIN) return i;
	}
}

int lastUsed() {
	int i;
	for(i = 999; i > 0; i--)
		if(a[i] != INT_MIN) return i;
}

void insert(int value) {
	int i = nextFree(), inserted = 0;
	a[i] = value;

	while(!inserted) {
		if (a[i/2] > a[i]) {
			// Swap
			// printf("Swap\n");
			a[i/2] = a[i] + a[i/2];
			a[i] = a[i/2] - a[i];
			a[i/2] = a[i/2] - a[i];
			i = i/2;
		} else {
			inserted = !inserted;
			// printf("inserted\n");
		}
	}
}

int search(int value, int i) {

	if (a[i] > value) return 0;

	if (a[i] == value) return 1;
	else {
		if(search(value, 2*i)) return 1;
		else return search(value, 2*i + 1);
	}
}

void delete() {
	int i = lastUsed(), deleted = 0, x;

	if(i > 0) {
		a[1] = a[i];
		a[i] = INT_MIN;
	}

	i = 1;
	while(!deleted) {
		// printf("Loop\t");
		if(a[2*i] == INT_MIN && a[2*i + 1] == INT_MIN) deleted = !deleted;
		else {
			if (a[2*i] != INT_MIN && a[2*i + 1] == INT_MIN && a[i] < a[2*i]) {
				a[2*i] = a[i] + a[2*i];
				a[i] = a[2*i] - a[i];
				a[2*i] = a[2*i] - a[i];
				i = 2*i;
				// printf("Moved left\n");
			} else if(a[2*i + 1] != INT_MIN && a[2*i] == INT_MIN && a[i] < a[2*i + 1]) {
				a[2*i+1] = a[i] + a[2*i+1];
				a[i] = a[2*i+1] - a[i];
				a[2*i+1] = a[2*i+1] - a[i];
				i = 2*i+1;
				// printf("Moved right\n");
			} else if(a[2*i] != INT_MIN && a[2*i+1] != INT_MIN){
				x = a[2*i] < a[2*i+1] ? 2*i : 2*i + 1; //Select smaller child
				a[x] = a[i] + a[x];
				a[i] = a[x] - a[i];
				a[x] = a[x] - a[i];
				i = x;
				// printf("Swapped\n");
			} else deleted = !deleted;
		}
	}
}

void printTree(int x, int gap) {
	if (a[x] == INT_MIN) return;

	gap += 5;

	printTree(2*x, gap);

	int i;
	for (i = 5; i < gap; i++)
		printf(" ");

	printf("%d\n", a[x]);

	printTree(2*x + 1, gap);
}

void menu(int choice) {

	int x;
	switch(choice){
		case 0:
			printf("MinHeap\n");
			printf("1. Insert\n");
			printf("2. DeleteMin\n");
			printf("3. FindMin\n");
			scanf("%d", &choice);
			menu(choice);
			break;

		case 1:
			printf("\nEnter value of node\n");
			scanf("%d", &x);
			printf("%d\n", x);
			insert(x);
			// insertClassic(x);
			printTree(1, 0);
			menu(0);
			break;

		case 2:
			delete();
			printTree(1, 0);
			menu(0);
			break;

		case 5:
			printf("%d\n", a[1]);
			menu(0);
			break;

		default:
			printf("\nEnter a valid number\n");
			menu(0);
			break;
	}
}

int main() {
	int i;
	for (i = 0; i < 1000; i++)
		a[i] = INT_MIN;

	menu(0);

	return 0;
}