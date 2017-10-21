#include <stdio.h>

int main() {
	// This code prints a histogram of 5 numbers.
	int vowels[5] = {5, 8, 7, 3, 1};
	int i, j, max = 0;

	for(i = 0; i < 5; i++) {
		if (vowels[i] > max) max = vowels[i];
	}

	for (i = max; i > 0; i--) {
		for(j = 0; j < 5; j++) {
			if (vowels[j] < i) printf("  ");
			else printf("* ");
		}
		printf("\n");
	}
	printf("A E I O U\n");
	
	return 0;
}