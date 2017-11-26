#include <stdio.h>
#include <stdlib.h>

struct set {
	int parent;
	int rank;
};

struct set *allSets; int size;

void makeSet(int i) {
	allSets[i].parent = i;
	allSets[i].rank = 1;
}

int findSet(int x) {
	if (x != allSets[x].parent) allSets[x].parent = findSet(allSets[x].parent);
	return allSets[x].parent;
}

int setUnion(int x, int y) {
	x = findSet(x);
	y = findSet(y);

	if (allSets[x].rank > allSets[y].rank) allSets[y].parent = x;
	else {
		allSets[x].parent = y;
		if (allSets[x].rank == allSets[y].rank) allSets[y].rank++;
	}
}

void printSets() {
	int i;
	for(i = 0; i < size; i++) {
		printf("%d %d  ", allSets[i].parent, allSets[i].rank);
	} printf("\n");
	for(i = 0; i < size; i++) {
		printf("%d\t", i);
	}
}

void menu(int choice) {

	int x, y;
	switch(choice){
		case 0:
			printf("Disjoint Set\n");
			printf("1. Union\n");
			printf("2. Find\n");
			scanf("%d", &choice);
			menu(choice);
			break;

		case 1:
			printf("\nEnter values of the vertices to join\n");
			scanf("%d %d", &x, &y);
			setUnion(x, y);
			printSets();
			menu(0);
			break;

		case 2:
			printf("\nEnter vertex\n");
			scanf("%d", &x);
			printf("%d\n", findSet(x));
			printSets();
			menu(0);
			break;

		default:
			printf("\nEnter a valid number\n");
			menu(0);
			break;
	}
}

int main() {
	printf("Enter number of vertices\n");
	scanf("%d", &size);
	struct set tmp[size];
	allSets = tmp;
	int i;
	for (i = 0; i < size; i++){
		makeSet(i);
	}

	menu(0);

	return 0;
}