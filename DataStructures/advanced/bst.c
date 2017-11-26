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

	struct Node *parent = *pAddr;
	if (parent == NULL) *pAddr = newNode(x);

	else {
		if (parent->value > x) insert(x, &(parent->left));
		else insert(x, &(parent->right));
	}
	// printTree(root, 0);
}

struct Node *searchMin(struct Node* node) {
	struct Node *current = node;
	
	while (current->left != NULL)
		current = current->left;

	return current;
}

int search(int value, struct Node *parent) {
	if (parent == NULL) return 0;
	else if (parent->value == value) return 1;
	else if (parent->value > value) search(value, parent->left);
	else if (parent-> value < value) search(value, parent->right);
}

struct Node *delete(struct Node *node, int value) {
	
	if (node == NULL) return node;

	if (node->value > value) node->left = delete(node->left, value);
	else if (node->value < value) node->right = delete(node->right, value);

	else {
		if (node->left == NULL) {
			struct Node *temp = node->right;
			free(node);
			return temp;
		}
		else if (node->right == NULL) {
			struct Node *temp = node->left;
			free(node);
			return temp;
		}

		struct Node *temp = searchMin(node->right);
		node->value = temp->value;
		node->right = delete(node->right, temp->value);

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
			root = delete(root, x);
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

	menu(0);

	return 0;
}