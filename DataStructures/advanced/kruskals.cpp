#include <stdio.h>
#include <stdlib.h>

struct set {
	int parent;
	int rank;
};

struct Edge {
    int src, dest, weight;
};

struct Graph {
    int numV, numE;
    struct Edge *edge;
};
 
// Creates a graph with numV vertices and numE edges
struct Graph *createGraph(int numV, int numE) {
    struct Graph *graph = new Graph;
    graph->numV = numV;
    graph->numE = numE;
 
    graph->edge = new Edge[numE];
 
    return graph;
}

struct Graph *mainGraph;
struct set *allSets;
int size, edges;

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

struct Edge *quicksort(struct Edge *e, int first, int last){

	if(first < last){
		int lo = first, hi = last, pivot = last;
		// printf("first = %d, hi = %d, pivot = %d \n", first, lo, pivot);

		while(lo < hi){
			while(e[lo].weight < e[pivot].weight && lo < hi) lo++;
			while(e[hi].weight >= e[pivot].weight && hi > lo) hi--;

			//Swap
			if(lo < hi){
				// printf("Swapping %d with %d\n", e[lo], e[hi]);
				struct Edge x = e[hi];
				e[hi] = e[lo];
				e[lo] = x;
			}
		}


		//Swap pivot into right position
		// printf("Swapping %d with pivot %d \n", e[hi], e[pivot]);
		struct Edge x = e[hi];
		e[hi] = e[pivot];
		e[pivot] = x;

		quicksort(e, first, hi-1);
		quicksort(e, hi+1, last);
	}
	return e;
}

void kruskals(struct Graph *graph) {
    int numV = graph->numV;
    struct Edge result[numV];  
    int e = 0;  
    int i = 0;  
 
    graph->edge = quicksort(graph->edge, 0, graph->numE);
 
    
    struct set *allSets = (struct set*) malloc(numV*sizeof(struct set));
 
    
    for (int v = 0; v < numV; ++v) {
        allSets[v].parent = v;
        allSets[v].rank = 0;
    }
 
    while (e < numV - 1) {
        struct Edge next_edge = graph->edge[i++];
 
        int x = findSet(next_edge.src);
        int y = findSet(next_edge.dest);
 
        if (x != y) {
            result[e++] = next_edge;
            setUnion(x, y);
        }
    }
 
    printf("Following are the edges in the constructed MST\n");
    for (i = 0; i < e; ++i)
        printf("%d -- %d == %d\n", result[i].src, result[i].dest, result[i].weight);
    return;
}

int main() {
	printf("Enter number of vertices\n");
	scanf("%d", &size);
	printf("Enter number of edges\n");
	scanf("%d", &edges);
	mainGraph = createGraph(size, edges);

	printf("Enter source vertex, dest vertes and weight for each edge - \n");
	for(int i = 0; i < edges; i++) {
		scanf("%d %d %d", &mainGraph->edge[i].src, &mainGraph->edge[i].dest, &mainGraph->edge[i].weight);
	}


	struct set tmp[edges];
	allSets = tmp;

	int i;
	for (i = 0; i < edges; i++){
		makeSet(i);
	}

	kruskals(mainGraph);

	return 0;
}