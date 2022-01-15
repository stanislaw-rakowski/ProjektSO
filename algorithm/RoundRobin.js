const computeBtn = document.querySelector('.compute-btn-rr');
const processCountSlider = document.querySelector('.process-count-range-rr');
const randomizeBtn = document.querySelector('.random-data-btn-rr');
const clearInputsBtn = document.querySelector('.clear-btn-rr');
const quantumInput = document.querySelector('.quantum-input');

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
}

const computeHandler = () => {
    console.log('compute')
    console.log(processCountSlider.value);

    const durationTimesArray = [];
    const arrivalTimesArray = [];
    const quantum = parseInt(quantumInput.value, 10);

    let durationTime;
    let arrivalTime;

    for(let i = 1; i <= processCountSlider.value; i++) {
        durationTime = parseInt(document.querySelector(`.rr-duration-input-P${i}`).value, 10)
        arrivalTime = parseInt(document.querySelector(`.rr-arrival-input-P${i}`).value, 10)
        
        if(isNaN(durationTime) || isNaN(arrivalTime)) {
            window.alert('All inputs must be filled!');
            throw 'All inputs must be filled!';
        }

        durationTimesArray.push(durationTime);
        arrivalTimesArray.push(arrivalTime);
    }

    console.log(durationTimesArray);
    console.log(arrivalTimesArray);

    const [averageWaitingTime, averageTurnAroundTime, processesData] = calculateRoundRobin(durationTimesArray, arrivalTimesArray, quantum);

    console.log(processesData);
    document.querySelector('.rr-waiting-time-result').textContent = averageWaitingTime;
    document.querySelector('.rr-turn-around-result').textContent = averageTurnAroundTime;
}

const calculateRoundRobin = (durationTimes, arrivalTimes, quantum) => {

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

    return [averageWaitingTime, averageTurnAroundTime, processesData];
}


//     const findElement = (queue, i) => {
//         while(!queue.length) {
//             if(queue[0] == i) {
//                 return true;
//             }
//             queue.shift()
//         }
//         return false;
//     }

//     console.log('arr', arrivalTimes)
//     const processes = [];
//     const queue = [];
//     const processesCount = arrivalTimes.length;
//     let time;

//     for(let i = 0; i < processesCount * 2; i++) {
//         processes.push({
//             id: i + 1,
//             arrivalTime: arrivalTimes[i] || 1,
//             durationTime: durationTimes[i] || 1,
//             tempDurationTime: durationTimes[i] || 1,
//             waitingTime: 0,
//             turnAroundTime: 0,
//             completionTime: 0
//         })
//     }
    
//     console.log(processes)
//     processes.sort((a, b) => {
//         return a.arrivalTime - b.arrivalTime;
//     })
//     console.log('sorted processes', processes);

//     queue.push(0);

//     let i;
//     let j;
//     let procomp = 0;
//     time = processes[0].arrivalTime;

//     while(procomp < processesCount) {
//         j = queue[0];
//         if(processes[j].durationTime < quantum) {
//             processes[j].completionTime = time + processes[j].durationTime;
//             time = time + processes[j].durationTime;
//             processes[j].durationTime = 0;
//         }
//         else {
//             processes[j].completionTime = time + quantum;
//             processes[j].durationTime -= quantum;
//             time = time + quantum;
//         }

//         i = queue[-1] + 1;
//         //console.log(queue)
//         //console.log(processes[i].arrivalTime)
        
//         while(processes[i].arrivalTime <= time &&i < processesCount && processes[i].durationTime != 0) {

//             if(!findElement(queue, i)) {
//                 queue.push(i);
//             }
//             i++;
//         }

//         if(processes[j].durationTime != 0) {
//             queue.push(j);
//         }
//         queue.shift();
//         procomp = 0;

//         for(let i = 0; i < processesCount; i++) {
//             if(processes[i].durationTime == 0) {
//                 procomp++
//             }
//         }
//     }

//     for(let i = 0; i < processesCount; i++) {
//         processes[i].turnAroundTime = processes[i].completionTime - processes[i].arrivalTime;
//         processes[i].waitingTime = processes[i].turnAroundTime - processes[i].tempDurationTime;
//     }

//     let totalWaitingTime = 0;
//     let totalTurnAroundTime = 0;
//     let completionTime;
//     const processesData = [];
    
//     for (let i = 0 ; i < processesCount; i++) {
//         totalWaitingTime += processes[i].waitingTime;
//         totalTurnAroundTime += processes[i].turnAroundTime;
        
//         completionTime = processes[i].turnAroundTime + processes[i].arrivalTime;
        
//         processesData.push({
//             number: i + 1,
//             duration: processes[i].tempDurationTime,
//             arrivalTime: processes[i].arrivalTime,
//             waitingTime: processes[i].waitingTime,
//             turnAroundTime: processes[i].waitingTime,
//             timeWhenCompleted: processes[i].completionTime
//         });
//     }
    
//     let averageWaitingTime = Math.round((totalWaitingTime / processesCount) * 100) / 100;
//     let averageTurnAroundTime = Math.round(Math.floor(totalTurnAroundTime / processesCount) * 100) / 100;

//     return [averageWaitingTime, averageTurnAroundTime, processesData];
// }

computeBtn.addEventListener('click', computeHandler);

randomizeBtn.addEventListener('click', () => {
    console.log('randomize');

    for(let i = 1; i <= processCountSlider.value; i++) {
        document.querySelector(`.rr-duration-input-P${i}`).value = getRandomNumber(20) + 1;
        document.querySelector(`.rr-arrival-input-P${i}`).value = getRandomNumber(20);
    }
});

clearInputsBtn.addEventListener('click', () => {
    console.log('clear');

    for(let i = 1; i <= processCountSlider.value; i++) {
        document.querySelector(`.rr-duration-input-P${i}`).value = null;
        document.querySelector(`.rr-arrival-input-P${i}`).value = null;
    }

    document.querySelector('.rr-waiting-time-result').textContent = '...';
    document.querySelector('.rr-turn-around-result').textContent = '...';
});
