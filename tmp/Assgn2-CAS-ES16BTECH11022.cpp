#include <iostream>
#include <atomic>
#include <thread>
#include <vector>
#include <ctime>
#include <chrono>
#include <fstream>
#include <sstream>
#include <cstdbool>
#include <cstdlib>
using namespace std;

std::atomic<bool> lock;
std::ostringstream *bufArr, *avgTimeBuf;
int csSeed, remSeed; 
double average = 0;
void testCS(int loc,int k);
	
int main(int argc, char const *argv[])
{
	lock = false;
	
	ifstream inputfile;
	inputfile.open("inp-params.txt");

	ofstream logfile;
	logfile.open("CAS-Log.txt");

	ofstream waitingfile;
	waitingfile.open("Average_times.txt",std::ofstream::app);

	int n,k;
	inputfile>>n>>k>>csSeed>>remSeed;

	bufArr = new std::ostringstream[n];
	avgTimeBuf = new std::ostringstream[n];

	std::vector<std::thread> v;
	for (int i = 0; i < n; ++i)
	{
		v.emplace_back(testCS,i,k);
	}

	for (int i = 0; i < n; ++i)
	{
		v[i].join();
	}

	for (int i = 0; i < n; ++i)
	{
		logfile<<bufArr[i].str();
	}

	waitingfile<<endl<<"---------CAS---------"<<endl;

	for (int i = 0; i < n; ++i)
	{
		waitingfile<<"Thread "<<i<<" "<<avgTimeBuf[i].str();
	}
	waitingfile<<average/n<<endl;

	return 0;
}

void testCS(int loc,int k){
	time_t timer;
	char reqTime[10];	
	char enterTime[10];	
	char exitTime[10];
	double averageTime = 0;
	bool expected = false;
	int avgCal = 0;
	// bool setto = true;
	for (int i = 0; i < k; ++i)
	{
		/*reqTime*/
		time(&timer);
		strftime(reqTime, sizeof(reqTime), "%H:%M:%S", localtime(&timer));
		bufArr[loc]<<i+1<<"th CS request by Thread "<<loc+1<<" at "<<reqTime<<endl;
		avgCal = timer;

		/*
		*  Code Entering CS
		*/
		/*enterTime*/		
		while(true){
			expected = false;
			if (atomic_compare_exchange_weak(&lock,&expected,true))
			{
				break;
			};
		}

		time(&timer);
		strftime(enterTime, sizeof(enterTime), "%H:%M:%S", localtime(&timer));
		bufArr[loc]<<i+1<<"th CS Entry by Thread "<<loc+1<<" at "<<enterTime<<endl;
		averageTime += timer - avgCal;

		/*Sleep for Random Time*/
		srand(csSeed);
		std::this_thread::sleep_for(std::chrono::milliseconds(rand()%10));

		/*
		*  Code Exiting CS
		*/
		lock = false;

		/*exitTime*/		
		time(&timer);
		strftime(exitTime, sizeof(exitTime), "%H:%M:%S", localtime(&timer));
		bufArr[loc]<<i+1<<"th CS Exit by Thread "<<loc+1<<" at "<<exitTime<<endl;

		/*Sleep for Random Time*/
		srand(remSeed);
		std::this_thread::sleep_for(std::chrono::milliseconds(rand()%10));
	}
	avgTimeBuf[loc]<<averageTime/k<<endl;
	average += averageTime/k;

}