#include <stdio.h>
#include <stdlib.h>
#include <limits.h>


struct Graph {
    int numV, numE;
    
    int adjList[100][100];
};

struct node {
	int weight;
	int vertex;
};
 
// Creates a graph with numV vertices and numE edges
struct Graph *createGraph(int numV, int numE) {
    struct Graph *graph = new Graph;
    graph->numV = numV;
    graph->numE = numE;

    for (int i = 1; i < numV+1; i++) {
    	for (int j = 1; i < numV+1; i++) {
    		graph->adjList[i][j] = 0;
    	}
    }
 
 
    return graph;
}

void addEdge(struct Graph *g, int u, int v, int w) {
	g->adjList[u][v] = w;
	g->adjList[v][u] = w;
}

struct Graph *mainGraph;
int size, edges;
struct node a[1000];


int nextFree() {
	int i;
	for (i = 1; i < 1000; i++) {
		if(a[i].weight == INT_MIN) return i;
	}
}

int lastUsed() {
	int i;
	for(i = 999; i > 0; i--)
		if(a[i].weight != INT_MIN) return i;
}

void insert(int w, int v) {
	int i = nextFree(), inserted = 0;
	a[i].weight = w;
	a[i].vertex = v;

	while(!inserted) {
		if (a[i/2].weight > a[i].weight) {
			// Swap
			// printf("Swap\n");
			struct node tmp = a[i/2];
			a[i/2] = a[i];
			a[i] = tmp;
			i = i/2;
		} else {
			inserted = !inserted;
			// printf("inserted\n");
		}
	}
}

int search(int value, int i) {

	if (a[i].weight > value) return 0;

	if (a[i].weight == value) return 1;
	else {
		if(search(value, 2*i)) return 1;
		else return search(value, 2*i + 1);
	}
}

void removeMin() {
	int i = lastUsed(), deleted = 0, x;

	if(i > 0) {
		a[1] = a[i];
		a[i].weight = INT_MIN;
	}

	i = 1;
	while(!deleted) {
		// printf("Loop\t");
		if(a[2*i].weight == INT_MIN && a[2*i + 1].weight == INT_MIN) deleted = !deleted;
		else {
			if (a[2*i].weight != INT_MIN && a[2*i + 1].weight == INT_MIN && a[i].weight < a[2*i].weight) {
				struct node tmp = a[2*i];
				a[2*i] = a[i];
				a[i] = tmp;
				i = 2*i;
				// printf("Moved left\n");
			} else if(a[2*i + 1].weight != INT_MIN && a[2*i].weight == INT_MIN && a[i].weight < a[2*i + 1].weight) {
				struct node tmp = a[2*i+1];
				a[2*i+1] = a[i];
				a[i] = tmp;
				i = 2*i+1;
				// printf("Moved right\n");
			} else if(a[2*i].weight != INT_MIN && a[2*i+1].weight != INT_MIN){
				x = a[2*i].weight < a[2*i+1].weight ? 2*i : 2*i + 1; //Select smaller child
				struct node tmp = a[x];
				a[x] = a[i];
				a[i] = tmp;
				i = x;
				// printf("Swapped\n");
			} else deleted = !deleted;
		}
	}
}

void printTree(int x, int gap) {
	if (a[x].weight == INT_MIN) return;

	gap += 5;

	printTree(2*x, gap);

	int i;
	for (i = 5; i < gap; i++)
		printf(" ");

	printf("(%d %d)\n", a[x].vertex, a[x].weight);

	printTree(2*x + 1, gap);
}

void prims(struct Graph *g) {
	int src = 1;

	int k[g->numV + 1];
	int parent[g->numV + 1];
	int inMST[g->numV + 1];

	for (int i = 1; i < g->numV+1; i++) {
		k[i] = INT_MAX;
		parent[i] = -1;
		inMST[i] = 0;
	}

	insert(0, src);
	k[src] = 0;

	while (a[1].weight != INT_MIN) {
		int u = a[1].vertex;
		removeMin();
		inMST[u] = 1;

		for(int i = 1; i < g->numV+1; i++) {
			if (g->adjList[u][i] == 0) continue;

			int weight = g->adjList[u][i];

			if(inMST[i] == 0 && k[i] > weight) {
				// update key of v
				k[i] = weight;
				insert(k[i], i);
				parent[i] = u;
			}
		}
	}

	for (int i = 1; i < g->numV+1; i++)
	    printf("%d - %d\n", parent[i], i);
}

int main() {
	printf("Enter number of vertices\n");
	scanf("%d", &size);
	printf("Enter number of edges\n");
	scanf("%d", &edges);
	mainGraph = createGraph(size, edges);

	int i;
	for (i = 0; i < 1000; i++)
		a[i].weight = INT_MIN;

	printf("Enter source vertex, dest vertes and weight for each edge - \n");
	int u, v, w;
	for(int i = 0; i < edges; i++) {
		scanf("%d %d %d", &u, &v, &w);
		addEdge(mainGraph, u, v, w);
	}

	// for (i = 0; i < edges; i++){
	// 	makeSet(i);
	// }

	prims(mainGraph);

	

	return 0;
}