#include<stdio.h>
#include<stdlib.h>
#include<limits.h>

struct node {
	struct node *parent;
	int value;
	int degree;
	struct node *sibling;
	struct node *child; 
};

struct heap {
	struct node *head;
};

struct heap *mainHeap;

struct node *reverseList(struct node *head) {
    struct node *tmp;
    if (head == NULL || head->sibling == NULL) {
        return head;
    }

    tmp = reverseList(head->sibling);
    head->sibling->sibling = head;
    head->sibling = NULL; 

    return tmp;
}

struct heap *makeBinHeap() {
	struct heap *temp;
	temp = (struct heap*) malloc(sizeof(struct heap));
	temp->head = NULL;
	return temp;
}

void linkBinTrees(struct node *kid, struct node *newParent) {
	kid->parent = newParent;
	kid->sibling = newParent->child;
	newParent->child = kid;
	newParent->degree = newParent->degree + 1;
}

struct node *binHeapMerge(struct heap* *A, struct heap* *B) {
	// printf("CALL: binHeapMerge() - \n");
	struct node *head1 = (*A)->head, *head2 = (*B)->head, *head = NULL;

	if (head1 == NULL && head2 != NULL) return head2;
	else if (head2 == NULL && head1 != NULL) return head1;
	else if (head1 != NULL && head2 != NULL) {
		if (head1->degree < head2->degree){
			head = head1;
			head1 = head1->sibling;
		} else {
			head = head2;
			head2 = head2->sibling;
		}
	}
	else return NULL;

	printf("%d, %d\n", (*A)->head->value, (*B)->head->value);

	struct node *tmp = head;
	while(head1 != NULL && head2 != NULL) {
		if (head1->degree < head2->degree) {
			// printf("Add from head1\n");
			tmp->sibling = head1;
			head1 = head1->sibling;
		} else {
			// printf("Add from head2\n");
			tmp->sibling = head2;
			head2 = head2->sibling;
		}
		tmp = tmp->sibling;
	}
	if (head1 != NULL) tmp->sibling = head1;
	else if (head2 != NULL) tmp->sibling = head2;

	tmp = head;
	while (tmp != NULL) {
		printf("%d\n", tmp->value);
		tmp = tmp->sibling;
	}

	// printf("EXIT: binHeapMerge()\n");
	return head;
}

struct heap *binHeapUnion(struct heap* *A, struct heap* *B) {
	// printf("CALL: binHeapUnion()\n");
	struct heap *H = makeBinHeap();
	struct node *px, *x, *nx;

	H->head = binHeapMerge(A, B);
	free(*A); free(*B);
	if (H->head == NULL) return H;

	px = NULL;
	x = H->head;
	nx = x->sibling;

	while(nx != NULL){
		if ((x->degree != nx->degree) || (nx->sibling != NULL && nx->sibling->degree == x->degree)){
			// printf("Block 1\n");
			px = x;
			x = nx;
		} else {
			if (x->value <= nx->value) {
				// printf("Block 2\n");
				x->sibling = nx->sibling;
				linkBinTrees(nx, x);
			} else {
				// printf("Block 3\n");
				if(px == NULL) H->head = nx;
				else px->sibling = nx;
				linkBinTrees(x, nx);
				x = nx;
			}
		}
		nx = x->sibling;
	}
	// printf("EXIT: binHeapUnion()\n");
	return H;
}

void binHeapInsert(int value) {
	// printf("CALL: binHeapInsert()\n");
	struct heap *temp = makeBinHeap();
	struct node *x = (struct node*) malloc(sizeof(struct node));

	x->parent = NULL;
	x->value = value;
	x->child = NULL;
	x->sibling = NULL;
	x->degree = 0;
	temp->head = x;

	mainHeap = binHeapUnion(&mainHeap, &temp);
	// printf("EXIT: binHeapInsert()\n");
}

struct node *binHeapFindMin() {
	struct heap *H = mainHeap;
	struct node *y = NULL;
	struct node *x = H->head;
	int min = INT_MAX;
	while(x != NULL){
		if(x->value < min) {
			min = x->value;
			y = x;
		}
		x = x->sibling;
	}

	return y;
}

void binHeapDeleteMin() {
	struct heap *tmpHeap = makeBinHeap();
	struct node *minNode = binHeapFindMin();
	struct node *tmpNode = mainHeap->head;
	// printf("CALL: binHeapDeleteMin()\n");

	if (tmpNode == minNode) {
		tmpNode->sibling = minNode->sibling;
		minNode->sibling = NULL;

		tmpHeap->head = reverseList(minNode->child);
		free(minNode);

		mainHeap = binHeapUnion(&tmpHeap, &mainHeap);
		// printf("EXIT: binHeapDeleteMin()\n");
		return;
	}
	while(tmpNode->sibling != minNode) tmpNode = tmpNode->sibling;

	tmpNode->sibling = minNode->sibling;
	minNode->sibling = NULL;

	tmpHeap->head = reverseList(minNode->child);
	free(minNode);

	mainHeap = binHeapUnion(&tmpHeap, &mainHeap);
	// printf("EXIT: binHeapDeleteMin()\n");
}

void printHeap(struct heap *H) {
	struct node *head;
	head = H->head;
	// if (head == NULL) printf("Null?\n");
	while(head != NULL) {
		printf("(%d, %d)\t", head->value, head->degree);
		head = head->sibling;
	}
	printf("\n");
}

//Menu
void menu(int choice) {

	int x;
	switch(choice){
		case 0:
			printf("Binomial Heap\n");
			printf("1. Insert\n");
			printf("2. SearchMin\n");
			printf("3. DeleteMin\n");
			scanf("%d", &choice);
			menu(choice);
			break;

		case 1:
			printf("\nEnter value of node\n");
			scanf("%d", &x);
			// printf("%d\n", x);
			binHeapInsert(x);
			// insertClassic(x);
			printHeap(mainHeap);
			menu(0);
			break;

		case 2:
			// printf("\nEnter value of node to search\n");
			// scanf("%d", &x);
			printf("%d\n", binHeapFindMin()->value);
			menu(0);
			break;

		case 3:
			// printf("\nEnter value of node to delete\n");
			// scanf("%d", &x);
			binHeapDeleteMin();
			printHeap(mainHeap);
			menu(0);
			break;

		default:
			printf("\nEnter a valid number\n");
			menu(0);
			break;
	}
}

int main(){
	mainHeap = makeBinHeap();

	menu(0);
	return 0;
}
