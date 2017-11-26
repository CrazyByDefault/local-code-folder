#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_RESET   "\x1b[0m"

struct Node {
	int value;
	struct Node *parent;
	struct Node *left;
	struct Node *right;
	bool red;
};

struct Node *root = NULL;

struct Node *newNode(int value) {
	struct Node *node;
	node = (struct Node*) malloc(sizeof(struct Node));
	node->value = value;
	node->left = NULL;
	node->right = NULL;
	node->parent = NULL;
	return node;
}

int search(int value, struct Node *parent) {
	if (parent == NULL) return 0;
	else if (parent->value == value) return 1;
	else if (parent->value > value) search(value, parent->left);
	else if (parent-> value < value) search(value, parent->right);
}

struct Node *getParent(struct Node *n) {
	return n->parent;
}

struct Node *getGrandp(struct Node *n) {
	struct Node *p = getParent(n);
	if (p == NULL)
		return NULL; // No parent means no grandparent
	return getParent(p);
}

struct Node *getSibling(struct Node *n) {
	struct Node *p = getParent(n);
	if (p == NULL)
		return NULL; // No parent means no sibling
	if (n == p->left)
		return p->right;
	else
		return p->left;
}

struct Node *getUncle(struct Node *n) {
	struct Node *p = getParent(n);
	struct Node *g = getGrandp(n);
	if (g == NULL)
		return NULL; // No grandparent means no uncle

	return getSibling(p);
}

void rotLeft(struct Node *n) {
	// printf("CALL: rotLeft()\n");
	if(getParent(n)) {
		if(getParent(n)->left == n) getParent(n)->left = n->right;
		else getParent(n)->right = n->right;
	}
	n->right->parent = n->parent;
	n->parent = n->right;
	n->right = n->right->left;
	n->parent->left = n;
	if(n->right)n->right->parent = n;
	// printf("EXIT: rotLeft()\n");
}

void rotRight(struct Node *n) {
	// printf("CALL: rotRight()\n");
	if(getParent(n)) {
		if(getParent(n)->right == n) getParent(n)->right = n->left;
		else getParent(n)->left = n->left;
	}
	n->left->parent = n->parent;
	n->parent = n->left;
	n->left = n->left->right;
	n->parent->right = n;
	if(n->left) n->left->parent = n;
	// printf("EXIT: rotRight()\n");
}

void repairTree(struct Node *n);

void redParent(struct Node *n) {
	getParent(n)->red = false;
	if (getUncle(n)) getUncle(n)->red = false;
	getGrandp(n)->red = true;
	repairTree(getGrandp(n));
}

void redParentBlackUncle(struct Node *n) {
	struct Node *p = getParent(n);
	struct Node *gp = getGrandp(n);

	if (gp->left != NULL && n == gp->left->right) {
		rotLeft(p);
		n = n->left;
	} else if (gp->right != NULL && n == gp->right->left) {
		rotRight(p);
		n = n->right;
	}

	p->red = false;
	gp->red = true;
	if(n == p->left)rotRight(gp);
	else rotLeft(gp);
}

void repairTree(struct Node *n) {
	if (getParent(n) == NULL) {
		n->red = false;
	} else if (getParent(n)->red == false) {
		return;
	} else if (getUncle(n) && getUncle(n)->red) redParent(n);
	else redParentBlackUncle(n);
}

void recurseIns(struct Node *x, struct Node *n) {
	if(x != NULL && n->value < x->value) {
		if (x->left != NULL) {
			recurseIns(x->left, n);
			return;
		} else x->left = n;
	} else if(x != NULL) {
		if(x->right != NULL) {
			recurseIns(x->right, n);
			return;
		} else x->right = n;
	}

	n->parent = x;
	n->left = NULL; n->right = NULL;
	n->red = true;
}

struct Node *insert(struct Node *x, struct Node *n) {
	recurseIns(x, n);
	repairTree(n);

	x = n;
	while(getParent(x) != NULL) x = getParent(x);
	return x;
}


void printTree(struct Node *root, int gap) {
	if (root == NULL) return;

	gap += 5;

	printTree(root->right, gap);

	int i;
	for (i = 5; i < gap; i++)
		printf(" ");

	if (!root->red) {
		printf("%d\n", root->value);
	} else {
		printf(ANSI_COLOR_RED "%d\n" ANSI_COLOR_RESET, root->value);
	}

	printTree(root->left, gap);
}

void menu(int choice) {

	int x;
	switch(choice){
		case 0:
			printf("Red-Black Tree\n");
			printf("1. Insert\n");
			printf("2. Search\n");
			scanf("%d", &choice);
			menu(choice);
			break;

		case 1:
			printf("\nEnter value of node\n");
			scanf("%d", &x);
			printf("%d\n", x);
			root = insert(root, newNode(x));
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