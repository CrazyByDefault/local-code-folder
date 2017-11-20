#include <stdio.h>
#include <stdlib.h>

#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_RESET   "\x1b[0m"

struct Node {
	int value;
	struct Node *left;
	struct Node *right;
	enum color {red, black};
};

struct Node *root = NULL;

struct Node *newNode(int value) {
	struct Node *node;
	node = (struct Node*) malloc(sizeof(struct Node));
	node->value = value;
	node->left = NULL;
	node->right = NULL;
	return node;
}

void printTree(struct Node *root, int gap) {
	if (root == NULL) return;

	gap += 5;

	printTree(root->right, gap);

	int i;
	for (i = 5; i < gap; i++)
		printf(" ");

	if ((gap/5)%2 != 0) {
		printf("%d\n", root->value);
	} else {
		printf(ANSI_COLOR_RED "%d\n" ANSI_COLOR_RESET, root->value);
	}

	printTree(root->left, gap);
}

int main() {
	root = newNode(0);
	root->right = newNode(2);
	root->right->right = newNode(7);
	root->right->left = newNode(3);

	root->left = newNode(4);
	root->left->left = newNode(6);
	root->left->right = newNode(1);

	printTree(root, 0);
	return 0;
}