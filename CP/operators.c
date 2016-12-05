#include <stdio.h>

void main(){
	struct student{
		char* name;
		int gpa[4];
		int age;
		
	};

	struct student iith[2242];
	iith[0].name = "FIRST CUNT";


	printf("%s\n", iith[0].name);
}