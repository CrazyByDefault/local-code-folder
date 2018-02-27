package main

import(
	"fmt"
	"sync"
)

// Task struct def
type Task struct {
	polynomial []int
	cases []int
	result []int
}

// Computation struct def
type Computation struct {
	taskID int
	x int
}

var allTasks []Task
var computeQueue chan Computation
var done chan struct{}
var wg sync.WaitGroup

// InitDegree - Task struct initialization with degree
func (t *Task) InitDegree(degree int) {
	t.polynomial = make([]int, degree+1)
	// fmt.Println(len(t.polynomial))
}

// InitCases - Task struct initialization with cases
func (t *Task) InitCases(cases int) {
	t.cases = make([]int, cases)
}

func addToComputeQueue(taskID int) <-chan Computation {
	// computeQueue = make(chan Computation, len(allTasks[taskID].polynomial)*len(allTasks[taskID].cases))
	t := allTasks[taskID]

	wg.Add(1)	
	go func() {
		defer wg.Done()

		for i := 0; i < len(t.polynomial); i++ {
			// fmt.Println(len(t.polynomial))
			for j := 0; j < len(t.cases); j++ {
			// fmt.Println(len(t.cases))
				var c Computation
				c.taskID = taskID
				c.x = t.cases[j]

				computeQueue <- c
			}
		}
		fmt.Println("Add: Goroutine exiting")
	}()
	// close(computeQueue)
	wg.Wait()
	return computeQueue
}

func sq(done <-chan struct{}, in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)		
		for n := range in {
			select {
			case out <- n * n:
			case <-done:
				return				
			}
		}
	}()
	return out
}

// Merges multiple channels and sends their output on one channel
func merge(done <-chan struct{}, cs ...<-chan int) <-chan int {
	var wg sync.WaitGroup
	out := make(chan int)

	output := func(c <-chan int) {
		defer wg.Done()
		for n := range c {
			select {
			case out <- n:
			case <-done:
				return
			}
		}
	}

	wg.Add(len(cs))
	for _, c := range cs {
		go output(c)
	}

	go func() {
		wg.Wait()
		close(out)
	}()

	return out
}

// ComputeUnit - Pipeline wrapper, takes in a "computation", which is one P(x) to be evaluated
// and write results to the corresponding Tasks array
func ComputeUnit() {
	compute := func() {
		defer wg.Done()
		fmt.Println("Goroutine spawned")
		for n := range computeQueue {
			select {
			case <-done:
				return
			default:
				poly := allTasks[n.taskID].polynomial
				x := n.x
	
				fmt.Println(poly)
				fmt.Println(x)
			}
		}
	}

	wg.Add(1)
	go compute()

	wg.Wait()

	fmt.Println("Compute Exiting")
}

// func main() {
// 	defer close(done)

// 	var n, d, p int
	
// 	// Number of polynomials
// 	fmt.Println("Enter number of polynomials")
// 	fmt.Scanf("%d", &n)

// 	allTasks = make([]Task, n)

// 	// Accepting the polynomial, d = degree
// 	for i := 0; i < n; i++ {
// 		fmt.Println("Enter degree")
// 		fmt.Scanf("%d", &d)

// 		allTasks[i].InitDegree(d)

// 		// Accept poly coeffs
// 		fmt.Println("Enter coeffs")
// 		for j := 0; j <= d; j++ {
// 			fmt.Scanf("%d ", &allTasks[i].polynomial[j])
// 			// fmt.Println(allTasks[i].polynomial[j])
// 		}

// 		// Accept number of test cases
// 		fmt.Println("Enter numebr of cases")
// 		fmt.Scanf("%d", &p)

// 		allTasks[i].InitCases(p)

// 		// Accept test cases
// 		for j := 0; j < p; j++ {
// 			fmt.Println("Enter cases")
// 			fmt.Scanf("%d", &allTasks[i].cases[j])
// 		}
// 		addToComputeQueue(i)
// 		ComputeUnit()
// 	}

// 	done <- struct{}{}

// }