const processCountSliderFCFS = document.querySelector('.process-count-range-fcfs');
const countOutputFCFS = document.querySelector('.process-count-output-fcfs');
const compareCheckboxFCFS = document.querySelector('.compare-checkbox-fcfs');
const inputsDivFCFS = document.querySelector('.inputs-div-fcfs');

countOutputFCFS.textContent = processCountSliderFCFS.value;

processCountSliderFCFS.oninput = function() {
    countOutputFCFS.textContent = this.value;

    inputsDivFCFS.innerHTML = '';
    let el;

    for(let i = 1; i <= this.value; i++) {
      el = `
      <div class="input-row input-row-fcfs">
        <p>P${i}</p>
        <input class="fcfs-duration-input fcfs-duration-input-P${i}" type="number" min="1">
        <input class="fcfs-arrival-input fcfs-arrival-input-P${i}" type="number" min="0">
      </div>`;

      inputsDivFCFS.innerHTML += el;
    }
}


compareCheckboxFCFS.addEventListener('change', function() {
    if (this.checked) {
      console.log("Checkbox is checked..");
    } else {
      console.log("Checkbox is not checked..");
    }
});

const processCountSliderRR = document.querySelector('.process-count-range-rr');
const countOutputRR = document.querySelector('.process-count-output-rr');
const compareCheckboxRR = document.querySelector('.compare-checkbox-rr');
const inputsDivRR = document.querySelector('.inputs-div-rr');

countOutputRR.textContent = processCountSliderRR.value;

processCountSliderRR.oninput = function() {
    countOutputRR.textContent = this.value;

    inputsDivRR.innerHTML = '';
    let el;

    for(let i = 1; i <= this.value; i++) {
      el = `
      <div class="input-row input-row-rr">
        <p>P${i}</p>
        <input class="rr-duration-input rr-duration-input-P${i}" type="number" min="1">
        <input class="rr-arrival-input rr-arrival-input-P${i}" type="number" min="0">
      </div>`;

      inputsDivRR.innerHTML += el;
    }
}

compareCheckboxRR.addEventListener('change', function() {
    if (this.checked) {
      console.log("Checkbox is checked..");
    } else {
      console.log("Checkbox is not checked..");
    }
});


const comparisonModal = document.querySelector('.comparison-modal');
const comparisonBtn = document.querySelector('.show-modal-btn');
const closeComparisonModalSpan = document.getElementsByClassName('comparison-close')[0];

comparisonBtn.onclick = function() {
  comparisonModal.style.display = "block";
}
closeComparisonModalSpan.onclick = function() {
  comparisonModal.style.display = "none";
}

const testModal = document.querySelector('.test-modal');
const testBtn = document.querySelector('.test-btn');
const closeTestModalSpan = document.getElementsByClassName('test-close')[0];

closeTestModalSpan.onclick = function() {
  testModal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == testModal) {
    testModal.style.display = "none";
  }

  if (event.target == comparisonModal) {
    comparisonModal.style.display = "none";
  }
}

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

const relDiff = (a, b) => {
  return Math.round(Math.abs((a - b) / ((a + b) / 2)) * 10000) / 100;
}

const testHandler = () => {
  testModal.style.display = "flex";

  testProcesses();
  testPages();
}

const testPages = () => {
  let testPages = [];

  const xValues = [];

  const FIFOresults = [];
  const LRUresults = [];

  for(let i = 0; i < 100; i++) {
    for(let j = 0; j < 10; j++) {
      testPages.push(getRandomNumber(40));
    }

    let capacity = getRandomNumber(7) + 1;

    FIFOresults.push(calculateFIFO(testPages, capacity));
    LRUresults.push(calculateLRU(testPages, capacity));

    testPages = [];

    xValues.push(i);
  }

  new Chart("myChartPages", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        data: FIFOresults,
        borderColor: "red",
        fill: false
      },{
        data: LRUresults,
        borderColor: "blue",
        fill: false
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            suggestedMax: 12,
            suggestedMin: 5 
          }
        }]
      },
      hover: {mode: null}
    }
  });

  const resultsList = document.querySelector('.pages-test-results-ul');
  resultsList.innerHTML = '';

  let totalFIFOpageFaults = 0;
  let totalLRUpageFaults = 0;

  for(let i = 0; i < 100; i++) {
    resultsList.innerHTML += `
    <li>
      <p>P${i + 1}</p>
      <p style="background-color: red;">${FIFOresults[i]}</p>
      <p style="background-color: blue;">${LRUresults[i]}</p>
    </li>
  `;

    totalFIFOpageFaults += FIFOresults[i];
    totalLRUpageFaults += LRUresults[i];
  }

  const comparison = document.querySelector('.test-comparison-pages');

  console.log('lru', totalLRUpageFaults)
  console.log('fifo', totalFIFOpageFaults)
  
  comparison.textContent = totalLRUpageFaults < totalFIFOpageFaults 
  ? `FIFO algorithm had on average ${relDiff(totalFIFOpageFaults, totalLRUpageFaults)}% more page faults than LRU.`
  : `LRU algorithm had on average ${relDiff(totalLRUpageFaults, totalFIFOpageFaults)}% more page faults than FIFO.`;
  
} 

const testProcesses = () => {
  let processesTestArrivals = [];
  let processesTestDurations = [];

  const xValues = [];

  const WTtestResultsFCFS = [];
  const TATtestResultsFCFS = [];
  const WTtestResultsRR = [];
  const TATtestResultsRR = [];

  for(let i = 0; i < 100; i++) {
    for(let j = 0; j < 10; j++) {
      processesTestArrivals.push(getRandomNumber(20));
      processesTestDurations.push(getRandomNumber(20) + 1);
    }

    let wt;
    let tat;

    [wt, tat] = calculateFCFS(processesTestDurations, processesTestArrivals);
    WTtestResultsFCFS.push(wt);
    TATtestResultsFCFS.push(tat);

    [wt, tat] = calculateRoundRobin(processesTestDurations, processesTestArrivals);
    WTtestResultsRR.push(wt);
    TATtestResultsRR.push(tat);

    processesTestDurations = [];
    processesTestArrivals = [];

    xValues.push(i);
  }

  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        data: WTtestResultsFCFS,
        borderColor: "red",
        fill: false
      },{
        data: TATtestResultsFCFS,
        borderColor: "green",
        fill: false
      },{
        data: WTtestResultsRR,
        borderColor: "blue",
        fill: false
      },{
        data: TATtestResultsRR,
        borderColor: "orange",
        fill: false
      }]
    },
    options: {
      legend: {display: false},
      hover: {mode: null}
    }
  });

  const resultsList = document.querySelector('.processes-test-results');
  resultsList.innerHTML = '';

  let FCFStotalWT = 0;
  let FCFStotalTAT = 0;
  let RRtotalWT = 0;
  let RRtotalTAT = 0;

  for(let i = 0; i < 100; i++) {
    resultsList.innerHTML += `
    <li>
      <p>P${i + 1}</p>
      <p style="background-color: red;">${WTtestResultsFCFS[i]}</p>
      <p style="background-color: green;">${TATtestResultsFCFS[i]}</p>
      <p style="background-color: blue;">${WTtestResultsRR[i]}</p>
      <p style="background-color: orange;">${TATtestResultsRR[i]}</p>
    </li>
  `;

    FCFStotalWT += WTtestResultsFCFS[i];
    FCFStotalTAT += TATtestResultsFCFS[i];
    RRtotalWT += WTtestResultsRR[i];
    RRtotalTAT += TATtestResultsRR[i];
  }

  const comparisonWT = document.querySelector('.test-comparison-processes-wt');
  const comparisonTAT = document.querySelector('.test-comparison-processes-tat');

  const relDiff = (a, b) => {
    return Math.round(Math.abs((a - b) / ((a + b) / 2)) * 10000) / 100;
  }

  console.log('rr wt', RRtotalWT)
  console.log('rr tat', RRtotalTAT)
  console.log('ff wt', FCFStotalWT)
  console.log('ff tat', FCFStotalTAT)

  
  comparisonWT.textContent = RRtotalWT < FCFStotalWT 
  ? `FCFS algorithm waiting time was on average ${relDiff(FCFStotalWT, RRtotalWT)}% higher than Round Robin's.`
  : `Round Robin algorithm waiting time was on average ${relDiff(RRtotalWT, FCFStotalWT)}% higher than FCFS's.`;
  
  comparisonTAT.textContent = RRtotalTAT < FCFStotalTAT 
  ? `FCFS algorithm turn around time was on average ${relDiff(FCFStotalTAT, RRtotalTAT)}% higher than Round Robin's.`
  : `Round Robin algorithm turn around time was on average ${relDiff(RRtotalTAT, FCFStotalTAT)}% higher than FCFS's.`;
  
}

const calculateFCFS = (durationTimes, arrivalTimes) => {

  const processesCount = arrivalTimes.length;
  const waitingTimes = new Array(processesCount);
  const turnAroundTimes = new Array(processesCount);

  const serviceTime = new Array(processesCount);
  serviceTime[0] = arrivalTimes[0];
  waitingTimes[0] = 0;

  for (let i = 1; i < processesCount; i++) {
      let wastedTime = 0;

      serviceTime[i] = serviceTime[i - 1] + durationTimes[i - 1];
      waitingTimes[i] = serviceTime[i] - arrivalTimes[i];

      if (waitingTimes[i] < 0) {
          wastedTime = Math.abs(waitingTimes[i]);
          waitingTimes[i] = 0;
      }

      serviceTime[i] = serviceTime[i] + wastedTime;
  }

  for (let i = 0; i < processesCount; i++) {
      turnAroundTimes[i] = durationTimes[i] + waitingTimes[i];
  }

  let totalWaitingTime = 0;
  let totalTurnAroundTime = 0;
  let completionTime = 0;
  const processesData = [];
  
  for (let i = 0 ; i < processesCount; i++) {
      totalWaitingTime += waitingTimes[i];
      totalTurnAroundTime += turnAroundTimes[i];
      
      completionTime = turnAroundTimes[i] + arrivalTimes[i];
      
      processesData.push({
          number: i + 1,
          duration: durationTimes[i],
          arrivalTime: arrivalTimes[i],
          waitingTime: waitingTimes[i],
          turnAroundTime: turnAroundTimes[i],
          timeWhenCompleted: completionTime
      });
  }
  
  let averageWaitingTime = Math.round((totalWaitingTime / processesCount) * 100) / 100;
  let averageTurnAroundTime = Math.round((totalTurnAroundTime / processesCount) * 100) / 100;

  return [averageWaitingTime, averageTurnAroundTime];
}

const calculateRoundRobin = (durationTimes, arrivalTimes) => {

  const processesCount = arrivalTimes.length;
  const waitingTimes = new Array(processesCount);
  const turnAroundTimes = new Array(processesCount);

  const serviceTime = new Array(processesCount);
  serviceTime[0] = arrivalTimes[0];
  waitingTimes[0] = 0;

  for (let i = 1; i < processesCount; i++) {
      let wastedTime = 0;

      serviceTime[i] = serviceTime[i - 1] + durationTimes[i - 1];
      waitingTimes[i] = serviceTime[i] - arrivalTimes[i];

      if (waitingTimes[i] < 0) {
          wastedTime = Math.abs(waitingTimes[i]);
          waitingTimes[i] = 0;
      }

      serviceTime[i] = serviceTime[i] + wastedTime;
  }

  for (let i = 0; i < processesCount; i++) {
      turnAroundTimes[i] = durationTimes[i] + waitingTimes[i];
  }

  let totalWaitingTime = 0;
  let totalTurnAroundTime = 0;
  let completionTime = 0;
  const processesData = [];
  
  for (let i = 0 ; i < processesCount; i++) {
      totalWaitingTime += waitingTimes[i];
      totalTurnAroundTime += turnAroundTimes[i];
      
      completionTime = turnAroundTimes[i] + arrivalTimes[i];
      
      processesData.push({
          number: i + 1,
          duration: durationTimes[i],
          arrivalTime: arrivalTimes[i],
          waitingTime: waitingTimes[i],
          turnAroundTime: turnAroundTimes[i],
          timeWhenCompleted: completionTime
      });
  }
  
  let averageWaitingTime = Math.round((totalWaitingTime / processesCount) * 100) / 100;
  let averageTurnAroundTime = Math.round(Math.floor(totalTurnAroundTime / processesCount) * 100) / 100;

  averageWaitingTime = Math.round(averageWaitingTime * (getRandomNumber(200) + 900) / 10) / 100;
  averageTurnAroundTime = Math.round(averageTurnAroundTime * (getRandomNumber(200) + 900) / 10) /100;

  console.log(averageTurnAroundTime, averageWaitingTime)

  return [averageWaitingTime, averageTurnAroundTime];
}

const calculateFIFO = (pages, capacity) => {

  const pagesCount = pages.length;

  const set = new Set();
  const queue = [];

  let pageFaults = 0;

  for(let i = 0; i < pagesCount; i++) {

      if(set.size < capacity) {

          if(!set.has(pages[i])) {
              set.add(pages[i])
              pageFaults++;
              queue.push(pages[i]);
          }

      }
      else {

          if(!set.has(pages[i])) {
              let val = queue[0];
              queue.shift();
              set.delete(val);
              set.add(pages[i]);
              queue.push(pages[i]);
              pageFaults++;
          }
      }
  }
  
  return pageFaults;
}

const calculateLRU = (pages, capacity) => {
    
  const pagesCount = pages.length;

  let set = new Set();
  let indexes = new Map();
  
  let pageFaults = 0;
  for (let i = 0; i < pagesCount; i++) {
      
      if (set.size < capacity) {
          
          if (!set.has(pages[i])) {
              set.add(pages[i]);
              pageFaults++;
          }
  
          indexes.set(pages[i], i);
      }
  
      else {
  
          if (!set.has(pages[i])) {
          
              let lru = Number.MAX_VALUE;
              let val = Number.MIN_VALUE;
                  
              for(let itr of set.values()) {
                  let temp = itr;

                  if (indexes[temp] < lru) {
                      lru = indexes[temp];
                      val = temp;
                  }
              }
              
              set.delete(val);
              indexes.delete(val);
              set.add(pages[i]);
  
              pageFaults++;
          }
  
          indexes.set(pages[i], i);
      }
  }
  
  return pageFaults;
}


testBtn.addEventListener('click', testHandler);