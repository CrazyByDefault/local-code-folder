#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#define t 3
#define max_keys 2*t - 1
#define min_keys t - 1

struct node {
	bool leaf;
	int n;
	int key[max_keys];
	struct node *child[max_keys + 1];
};

struct Tree {
	struct node *root;
};

struct Tree *tree = NULL;
// int output;

struct node *search(int key, struct node *x){
	int i = 0;
	while(i < x->n && key > x->key[i]) i++;

	if (key == x->key[i]) 
		return x;

	else if (!x->leaf)
		return search(key,x->child[i]);

	else return NULL;
}

void printTree(struct node *x, int blanks) {
	if(!x) return;
	printf("\n");
	int i;
	for (i = 0; i < blanks; i++) {
		printf("  ");
	}
	for (i = 0; i < x->n; i++) {
		// output++;
		printf("%d ", x->key[i]);
	}
	for (i = 0; i <= x->n; i++) {
		printTree(x->child[i], blanks+5);
	}
	printf("\n");
}

void printNode(struct node *x) {
	int i;
	printf("Node - ");
	for (i = 0; i < x->n; i++) {
		printf("%d ", x->key[i]);
	}
	printf("\n");
}

struct node *newNode() {
	struct node *x;
	x = (struct node*) malloc(sizeof(struct node));
	
	return x;
}

struct Tree *bTreeCreate() {
	struct node *x = newNode();
	struct Tree *tempTree = (struct Tree*) malloc(sizeof(struct Tree));
	x->leaf = true;
	x->n = 0;
	tempTree->root = x;

	return tempTree;
}

 

void bTreeSplitChild(struct node *x, int i) {
	
	struct node *z = newNode();
	struct node *y = newNode();
	y = x->child[i];
	z->leaf = y->leaf;
	z->n = t-1;

	int j;
	for(j = 0; j < t-1; j++) {
		z->key[j] = y->key[j+t];
	}
	if (y->leaf == false) {
		for (j = 0; j < t; j++) {
			z->child[j] = y->child[j+t];
		}
	}
	y->n = t-1;

	for (j = x->n; j >= i; j--) {
		x->child[j+1] = x->child[j];
	}
	x->child[i+1] = z;

	for (j = x->n; j >= i; j--) {
		x->key[j+1] = x->key[j];
	}
	// printf("%d\n", i);
	x->key[i] = y->key[min_keys];

	x->n = x->n + 1;
	
	
	
	
}

void bTreeInsertNonfull(struct node *x, int k) {
	
	// printf("X "); printNode(x);
	int i = x->n - 1;
	if(x->leaf) {
		while(i >= 0 && k < x->key[i]) {
			x->key[i+1] = x->key[i];
			i--;
		} i++;
		x->key[i] = k;
		x->n = x->n + 1;
	} else {
		while(i >= 0 && k < x->key[i]) i--;
		i++;
		printf("%d\n", i);

		if (x->child[i]->n == 2*t - 1) {
			bTreeSplitChild(x, i);

			if(k > x->key[i]) i++;
		}
		bTreeInsertNonfull(x->child[i], k);
	}
	// printNode(x);
	
}

void bTreeInsert(int k) {
	
	struct node *r = tree->root;
	if(r == NULL) return;

	if(r->n == 2*t - 1) {
		struct node *s = newNode();
		tree->root = s;
		s->leaf = false;
		s->n = 0;
		s->child[0] = r;

		bTreeSplitChild(s, 0);
		bTreeInsertNonfull(s, k);
	} else bTreeInsertNonfull(r, k);
	
}

int bTreeLeftMax(struct node *x) {
	if(x->leaf) return x->key[x->n - 1];
	else return bTreeLeftMax(x->child[x->n]);
}

int bTreeRightMin(struct node *x) {
	if(x->leaf) return x->key[0];
	else return bTreeRightMin(x->child[0]);
}

void bTreeMerge(struct node *x, int index, struct node *p, struct node *n) {
	p->n = max_keys;
	int i = 0;

	for(i = t; i < max_keys; i++)
		p->key[i] = n->key[i - t];

	p->key[t - 1] = x->key[index];

	if(n->leaf == false) {
		for (i = t; i < 2*t; i++)
			p->child[i] = n->child[i - t];
	}

	// Update root
	for (i = index + 1; i < x->n; i++) {
		x->key[i - 1] = x->key[i];
		x->child[i] = x->child[i+1];
	}
	x->n--;
	if(x->n == 0 && tree->root == x)tree->root = p;
	free(n);
}

void bTreeBorrowLeft(struct node *x, int index, struct node *p, struct node *n) {
	n->n++;
	int i;

	for (i = n->n - 1; i > 0; i--)
		n->key[i] = n->key[i - 1];
	n->key[0] = x->key[index];
	x->key[index] = p->key[p->n - 1];
	if(p->leaf != false)
		for(i = n->n; i > 0; i--)
			n->child[i] = n->child[i-1];
	n->child[0] = p->child[p->n];
	p->n--;
}

void bTreeBorrowRight(struct node *x, int index, struct node *p, struct node *n) {
	n->n++;

	n->key[n->n-1] = x->key[index];
	x->key[index] = p->key[0];

	int i;
	for(i = 0; i < p->n-1; i++)
		p->key[i] = p->key[i+1];

	if(p->leaf == false){
		n->child[n->n] = p->child[0];
		for(i = 0; i < p->n; i++)
			p->child[i] = p->child[i+1];
	}
	p->n--;
}

void bTreeDelete(int k, struct node *x) {
	int i = 0;
	if(x == NULL) {
		printf("Not found :(\n");
		return;
	}
	while(i < x->n && k > x->key[i]) i++; //Find pos of k

	if(x->leaf) {
		if(x->key[i] == k) {
			for (i; i < x->n; i++) x->key[i] = x->key[i+1];

			x->n--;
		} else {
			printf("Not found\n");
			return;
		}
	} else {
		// k isn't in leaf
		struct node *px = NULL, *nx = NULL;

		if( x->n > i && k == x->key[i]) {
			px = x->child[i];
			nx = x->child[i+1];

			if(px->n > t - 1) { // from left
				int a = bTreeLeftMax(px);
				x->key[i] = a;
				bTreeDelete(a, px);
			} else if(nx->n > t - 1) { // from right
				int a = bTreeRightMin(nx);
				x->key[i] = a;
				bTreeDelete(a, nx);
			} else { // both have t-1, merge
				bTreeMerge(x, i, px, nx);
				bTreeDelete(k, px);
			}
		}
		else { // next level
			px = x->child[i];
			struct node *left = NULL;

			if (x->n > i) nx = x->child[i + 1];
			if (i > 0) left = x->child[i - 1];

			if (t-1 == px->n) {
				if (left != NULL && left->n > t-1) bTreeBorrowLeft(x, i-1, left, px);
				else if (nx != NULL && nx->n > t-1) bTreeBorrowRight(x, i+1, nx, px);
				else if (left != NULL) {
					bTreeMerge(x, i-1, left, px);
					px = left;
				} else bTreeMerge(x, i+1, nx, px);
			}
			bTreeDelete(k, px);
		}
	}
}


void menu(int choice) {
	int x, y;
	// scanf("%d", &x);
	// bTreeInsert(x);
	// output = 0;
	// printTree(tree->root, 0);
	// printf("%d\n\n\n", output);
	// menu(0);
	switch(choice){
		case 0:
			printf("B-Tree\n");
			printf("1. Insert\n");
			printf("2. Search\n");
			printf("3. Delete\n");
			scanf("%d", &choice);
			menu(choice);
			break;

		case 1:
			printf("\nEnter values of key to insert\n");
			scanf("%d", &x);
			bTreeInsert(x);
			printTree(tree->root, 0);
			menu(0);
			break;

		case 2:
			printf("\nEnter node to search\n");
			scanf("%d", &x);
			if(search(x, tree->root)) printf("Found!\n");
			else printf("Not found\n");
			// search()
			printTree(tree->root, 0);
			menu(0);
			break;

		case 3:
			printf("\nEnter key to delete\n");
			scanf("%d", &x);
			bTreeDelete(x, tree->root);
			printTree(tree->root, 0);
			menu(0);
			break;

		default:
			printf("\nEnter a valid number\n");
			menu(0);
			break;
	}
}

int main() {
	// printf("Hi\n");
	tree = bTreeCreate();

	menu(0);

	return 0;
}