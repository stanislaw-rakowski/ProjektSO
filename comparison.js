const compareCheckboxFCFS = document.querySelector('.compare-checkbox-fcfs');
const compareCheckboxRR = document.querySelector('.compare-checkbox-rr');
const compareCheckboxFIFO = document.querySelector('.compare-checkbox-fifo');
const compareCheckboxLRU = document.querySelector('.compare-checkbox-lru');


// compareCheckboxFCFS.addEventListener('change', function() {
//     if (this.checked) {
//       console.log("Checkbox is checked..");
//     } else {
//       console.log("Checkbox is not checked..");
//     }
// });


// compareCheckboxRR.addEventListener('change', function() {
//     if (this.checked) {
//       console.log("Checkbox is checked..");
//     } else {
//       console.log("Checkbox is not checked..");
//     }
// });


const comparisonModal = document.querySelector('.comparison-modal');
const comparisonBtn = document.querySelector('.show-modal-btn');
const closeComparisonModalSpan = document.getElementsByClassName('comparison-close')[0];

closeComparisonModalSpan.onclick = function() {
  comparisonModal.style.display = 'none';
  document.body.style.position = '';
  document.body.style.bottom = '0';
}

window.addEventListener('click', (event) => {
    if (event.target == comparisonModal) {
      comparisonModal.style.display = 'none';
      document.body.style.position = '';
      document.body.style.bottom = '0';
    }
})

const algsDetailedInfo = {
  fcfs: `
  <li class="info-li">
    <h2>FCFS</h2>
    <p><b>First Come First Serve (FCFS)</b> is an operating system scheduling algorithm that automatically executes queued requests and processes in order of their arrival. It is the easiest and simplest CPU scheduling algorithm. In this type of algorithm, processes which requests the CPU first get the CPU allocation first. This is managed with a FIFO queue. The full form of FCFS is First Come First Serve.</p>

    <p>As the process enters the ready queue, its PCB (Process Control Block) is linked with the tail of the queue and, when the CPU becomes free, it should be assigned to the process at the beginning of the queue.</p>

    <h4>Characteristics of FCFS method</h4>
    <ul>
      <li>It supports non-preemptive and pre-emptive scheduling algorithm.</li>
      <li>Jobs are always executed on a first-come, first-serve basis.</li>
      <li>It is easy to implement and use.</li>
      <li>This method is poor in performance, and the general wait time is quite high.</li>
    </ul>

    <h4>Example of FCFS scheduling</h4>
    <p>A real-life example of the FCFS method is buying a movie ticket on the ticket counter. In this scheduling algorithm, a person is served according to the queue manner. The person who arrives first in the queue first buys the ticket and then the next one. This will continue until the last person in the queue purchases the ticket. Using this algorithm, the CPU process works in a similar manner.</p>
  </li>`,
  rr: `
  <li class="info-li">
    <h2>Round Robin</h2>
    <p>The name of this algorithm comes from the round-robin principle, where each person gets an equal share of something in turns. It is the oldest, simplest scheduling algorithm, which is mostly used for multitasking.</p>

    <p>In Round-robin scheduling, each ready task runs turn by turn only in a cyclic queue for a limited time slice. This algorithm also offers starvation free execution of processes.</p>
    
    <h4>Characteristics of Round-Robin Scheduling</h4>
    <p>Here are the important characteristics of Round-Robin Scheduling:</p>
    <ul>
      <li>Round robin is a pre-emptive algorithm</li>
      <li>The CPU is shifted to the next process after fixed interval time, which is called time quantum/time slice.</li>
      <li>The process that is preempted is added to the end of the queue.</li>
      <li>Round robin is a hybrid model which is clock-driven.</li>
      <li>Time slice should be minimum, which is assigned for a specific task that needs to be processed. However, it may differ OS to OS.</li>
      <li>It is a real time algorithm which responds to the event within a specific time limit.</li>
      <li>Round robin is one of the oldest, fairest, and easiest algorithm.</li>
      <li>Widely used scheduling method in traditional OS.</li>
    </ul>
  </li>`,
  fifo: `
  <li class="info-li">
    <h2>FIFO</h2>
    <p>FIFO is one of the simplest page replacement algorithms. A FIFO page replacement algorithm associates with each page the time when that page was brought into memory. At the point when a page must be replaced, the most experience door oldest page is selected. Note that it is not important to record the time when a page is acquired. We can create a FIFO queue to keep all pages in memory. We hit the page at the head of the queue. At the point when a page is brought into memory, we embed it on the tail of the queue.</p>
    <p>The FIFO page-replacement algorithm is easy to understand and program. However, its performance is not always good. On the one hand, the page replaced may be an initialization module that was used a long time ago and is no longer needed. On the other hand, it could contain a heavily used variable that was initialized early and is in constant use.</p>
  </li>
  `,
  lru: `
  <li class="info-li">
    <h2>LRU</h2>
    <p>A good approximation to the optimal algorithm is based on the observation that pages that have been heavily used in the last few instructions will probably be heavily used again in the next few. Conversely, pages that have not been used for ages will probably remain unused for a long time. This idea suggests a realizable algorithm: when a page fault occurs, throw out the page that has been unused for the longest time. This strategy is called LRU (Least Recently Used) paging.</p>

    <p>Although LRU is theoretically realizable, it is not cheap. To fully implement LRU, it is necessary to maintain a linked list of all pages in memory, with the most recently used page at the front and the least recently used page at the rear. The difficulty is that the list must be updated on every memory reference. Finding a page in the list, deleting it, and then moving it to the front is a very time consuming operation, even in hardware (assuming that such hardware could be built).</p>
  </li>`
}

const comparisonHandler = () => {
  comparisonModal.style.display = 'flex';
  document.body.style.position = 'fixed';
  document.body.style.bottom = `${window.scrollY}px`;

  const comparisonUl = document.querySelector('.comparison-ul');

  const FCFSinfo = compareCheckboxFCFS.checked ? algsDetailedInfo.fcfs : '';
  const RRinfo = compareCheckboxRR.checked ? algsDetailedInfo.rr : '';
  const FIFOinfo = compareCheckboxFIFO.checked ? algsDetailedInfo.fifo : '';
  const LRUinfo = compareCheckboxLRU.checked ? algsDetailedInfo.lru : '';

  if(FCFSinfo && RRinfo && FIFOinfo && LRUinfo) {
    comparisonUl.innerHTML = FCFSinfo + RRinfo + FIFOinfo + LRUinfo;
  } else {
    comparisonUl.innerHTML = `
    <p>Nothing to compare! Check a checkbox on an algorithm page to see the detailed info!</p>`;
  }
}

comparisonBtn.addEventListener('click', comparisonHandler);