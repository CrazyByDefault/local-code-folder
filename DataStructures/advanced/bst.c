#include <stdio.h>
#include <stdlib.h>

struct Node {
	int value;
	struct Node *left;
	struct Node *right;
};


void printTree(struct Node *root, int gap) {
	if (root == NULL) return;

	gap += 5;

	printTree(root->right, gap);

	int i;
	for (i = 5; i < gap; i++)
		printf(" ");
	
	printf("%d\n", root->value);

	printTree(root->left, gap);
}

struct Node *root = NULL;

struct Node *newNode(int value) {
	struct Node *node;
	node = (struct Node*) malloc(sizeof(struct Node));
	node->value = value;
	node->left = NULL;
	node->right = NULL;
	return node;
}

void insert(int x, struct Node* *pAddr) {
	printf("insert called\n");
	struct Node *parent = *pAddr;
	if (parent == NULL) {
		*pAddr = newNode(x);
		printf("Inserted\n");
	} 
	else{
		if (parent->value > x) {
			printf("Moved left\n");
			insert(x, &(parent->left));
		}
		else{
			printf("Moved right\n");
			insert(x, &(parent->right));
		}
	}
	printTree(root, 0);
}

int search(int value, struct Node *parent) {
	if (parent == NULL) return 0;
	else if (parent->value == value) return 1;
	else if (parent->value > value) search(value, parent->left);
	else if (parent-> value < value) search(value, parent->right);
}

void delete(int value) {
	int found = 0;
	while (!found) {
		if (parent == NULL) {
			printf("Doesn't exist in tree\n");
			break;
		}
		else if (parent->value == value) found = 1;
		else if (parent->value > value) parent = parent->left;
		else if (parent-> value < value) parent = parent->right;
	}

}


void menu(int choice) {

	int x;
	switch(choice){
		case 0:
			printf("Binary Search Tree\n");
			printf("1. Insert\n");
			printf("2. Search\n");
			printf("3. Delete\n");
			scanf("%d", &choice);
			menu(choice);
			break;

		case 1:
			printf("\nEnter value of node\n");
			scanf("%d", &x);
			printf("%d\n", x);
			insert(x, &root);
			// insertClassic(x);
			printTree(root, 0);
			menu(0);
			break;

		case 2:
			printf("\nEnter value of node to search\n");
			scanf("%d", &x);
			if (search(x, root)) printf("Found!\n");
			else printf("Not found :(\n");
			printTree(root, 0);
			menu(0);
			break;

		case 3:
			printf("\nEnter value of node to delete\n");
			scanf("%d", &x);
			delete(x);
			printTree(root, 0);
			menu(0);
			break;

		default:
			printf("\nEnter a valid number\n");
			menu(0);
			break;
	}
}

int main() {
	// int x;
	// scanf("%d", &x);

	// root = newNode(x);
	// root->left = newNode(x+1);
	// root->right = newNode(x-1);
	// printTree(root, 0);

	menu(0);

	return 0;
}