#include<stdio.h>
#include<stdlib.h>

struct node {
	int value;
	struct node *next;
};

struct node *head = NULL;

//Add element at the end
void addEnd(){
	struct node *p;
	p = (struct node*) malloc(sizeof(struct node));
	printf("Enter a value\n");
	int x;
	scanf("%d", &x);
	p->value = x;

	if(head == NULL){
		head = p;
	}
	else{
		struct node *tmp;
		for(tmp = head; tmp->next != NULL; tmp = tmp->next);
		tmp->next = p;
	}

	p->next = NULL;	
}

//Add at the front of the list
void addFront(){
	struct node *p;
	p = (struct node*) malloc(sizeof(struct node));
	printf("Enter value\n");
	scanf("%d", &(p->value));

	if(head == NULL){
		head = p;
	}else{
		p->next = head;
		head = p;
	}	
}

//Search for required element and insert after.
void insertSomewhere(){
	struct node *p;
	p = (struct node*) malloc(sizeof(struct node));
	printf("Enter value of new node\n");
	scanf("%d", &(p->value));
	if(head == NULL){
		printf("List empty, can't insert after element.\n");
		return;

	}else{
		printf("Enter value to insert after\n");
		int x, flag = 0;
		scanf("%d", &x);

		struct node *tmp;

		//search for element
		for(tmp = head;tmp->next != NULL; tmp = tmp->next){
			if (tmp->value == x){
				flag = 1;
				break;
			}
		}

		if(flag){
			p->next = tmp->next;
			tmp->next = p;			
		}else{
			printf("Element not found\n");
		}
	}	
}

//Deletes last occurrence
void deleteLastOccurrence(){
	printf("Enter value to delete last occurrence of\n");
	int x, flag = 0;
	scanf("%d", &x);

	//List size 0
	if(head == NULL){

		printf("List empty!\n");

	}else if(head->next == NULL){
		//List size 1

		if(head->value == x){
			free(head);
			head = NULL;
		}else printf("Not found!\n");

	}else{
		//List size > 1

		struct node *tmp, *toLastKnown;
		for(tmp = head; tmp->next != NULL; tmp = tmp->next){

			if((tmp->next)->value == x){
				toLastKnown = tmp;
				flag = 1;
			}
		}

		if(flag){
			//delete if found
			tmp = toLastKnown->next;
			toLastKnown->next = (toLastKnown->next)->next;
			free(tmp);

		}else printf("Not found\n");

	}
}

//recursively delete all nodes
void deleteAll(struct node *p){
	if(p != NULL){
		if(p->next != NULL)deleteAll(p->next);
		free(p);
	}
	head = NULL;
}

//Print all nodes
void printList(){
	if(head == NULL){
		printf("\nList empty\n\n");
	}else{
		struct node *tmp;
		printf("\n");
		for(tmp = head; tmp != NULL; tmp = tmp->next){
			printf("(%d)-> ", tmp->value);
		}
		printf("NULL\n\n");
	}	
}

//Menu
void listMenu(){
	printf("1. Insert a node at the end of the list \n2. Insert a node at the beginning of the list \n3. Insert a node after a node that contains the first occurrence of a specific value. \n4. Delete a node that contains the last occurrence of a specific value. \n5. Delete all elements of the list. \n6. Print all elements in the list. \n7. Exit.\n");
	int choice;
	scanf("%d", &choice);
	printf("\n");

	switch(choice){
		
		case 1:
			addEnd();
			printList();
			listMenu();
			break;

		case 2:
			addFront();
			printList();
			listMenu();
			break;

		case 3:
			insertSomewhere();
			printList();
			listMenu();
			break;

		case 4:
			deleteLastOccurrence();
			printList();
			listMenu();
			break;			

		case 5:
			deleteAll(head);
			listMenu();
			break;

		case 6:
			printList();
			listMenu();
			break;

		case 7:
			deleteAll(head);
			break;

		default:
			printf("Enter number between 1 and 7.\n");
			break;
	}
}

int main(){
	listMenu();
	return 0;
}
