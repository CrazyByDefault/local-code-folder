#include <iostream>
#include <atomic>
#include <thread>
#include <vector>
#include <ctime>
#include <chrono>
#include <fstream>
#include <sstream>
#include <cstdlib>
using namespace std;

std::atomic_flag lock = ATOMIC_FLAG_INIT;
std::ostringstream *bufArr, *avgTimeBuf;
int n,k;
int csSeed, remSeed;
double average = 0;
void testCS(int loc,int k);
atomic<bool> *waiting;

int count = 0;
int main(int argc, char const *argv[])
{
	ifstream inputfile;
	inputfile.open("inp-params.txt");

	ofstream logfile;
	logfile.open("TAS-bounded-Log.txt");

	ofstream waitingfile;
	waitingfile.open("Average_times.txt",std::ofstream::app);

	
	inputfile>>n>>k>>csSeed>>remSeed;

	bufArr = new std::ostringstream[n];
	avgTimeBuf = new std::ostringstream[n];
	waiting = new atomic<bool>[n];

	for (int i = 0; i < n; ++i)
	{
		waiting[i] = false;
	}

	// key = false;

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

	waitingfile<<endl<<"---------TAS_Bounded---------"<<endl;

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
	int j;
	atomic<bool> key;
	for (int i = 0; i < k; ++i)
	{
		/*reqTime*/
		// cout<<"y"<<loc+1<<endl;
		time(&timer);
		strftime(reqTime, sizeof(reqTime), "%H:%M:%S", localtime(&timer));
		bufArr[loc]<<i+1<<"th CS request by Thread "<<loc+1<<" at "<<reqTime<<endl;
		avgCal = timer;

		/*
		*  Code Entering CS
		*/
		waiting[loc] = true;
		key = true;
		while(waiting[loc] && key)
			key = lock.test_and_set(std::memory_order_acquire);
		waiting[loc] = false;
		// cout<<++count<<endl;
		// cout<<"w"<<loc+1<<endl;
		/*enterTime*/		
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
		j = (loc  + 1)%n;

		while((j != loc) && !waiting[j])
			j = (j + 1)%n;

		if (j == i)
		{
			lock.clear(std::memory_order_release); 
		}
		else
		{
			waiting[j] = false;
		}
		
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