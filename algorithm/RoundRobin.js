const computeBtn = document.querySelector('.compute-btn-rr');
const processCountSlider = document.querySelector('.process-count-range-rr');
const randomizeBtn = document.querySelector('.random-data-btn-rr');
const clearInputsBtn = document.querySelector('.clear-btn-rr');
const quantumInput = document.querySelector('.quantum-input');


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

    const processes = [];
    const processesCount = arrivalTimes.length;

    for(let i = 0; i < processesCount; i++) {
        processes.push({
            id: i + 1,
            arrivalTime: arrivalTimes[i],
            durationTime: durationTimes[i],
            remainingTime: durationTimes[i],
            waitingTime: 0,
            completionTime: 0
        })
    }

    processes.sort((a, b) => {
        return a.arrivalTime - b.arrivalTime;
    })
    console.log('sorted processes', processes);

    const readyQueue = [];

    let toBeInserted = 0;
    let timeElapsed = 0;
    let processesLeft = processesCount;
    let i;

    while(processesLeft) {

        for(i = toBeInserted; (i < processesCount) && (processes[i].arrivalTime <= timeElapsed); i++) {
            readyQueue.push(processes[i]);
        }
    }





    // const queueUpdation = (queue, timer, arrival, n, maxProccessIndex) => {
    //     let zeroIndex;

    //     for(let i = 0; i < n; i++) {
    //         if(queue[i] === 0) {
    //             zeroIndex = i;
    //             break;
    //         }
    //     }

    //     queue[zeroIndex] = maxProccessIndex + 1;
    // }

    // const queueMaintainence = (queue, n) => {
    //     for(let i = 0; (i < n - 1) && (queue[i + 1] !== 0); i++) {
    //         let temp = queue[i];
    //         queue[i] = queue[i + 1];
    //         queue[i + 1] = temp;
    //     }
    // }

    // const checkNewArrival = (timer, arrival, n, maxProccessIndex, queue) => {
    //     if(timer <= arrival[n - 1]) {
    //         let newArrival = false;
    //         for(let j = maxProccessIndex + 1; j < n; j++) {
    //             if(arrival[j] <= timer) {
    //                 if(maxProccessIndex < j) {
    //                     maxProccessIndex = j;
    //                     newArrival = true;
    //                 }
    //             }
    //         }

    //         if(newArrival) {
    //             queueUpdation(queue, timer, arrival, n, maxProccessIndex);
    //         }
    //     }
    // }

    // const processesCount = unsortedArrivalTimes.length;
    // const arrivalTimes = [];
    // const durationTimes = [];

    // console.log(unsortedDurationTimes)
    // console.log(unsortedArrivalTimes)


    // let list = [];
    // for(let i = 0; i < processesCount; i++) {
    //     list.push({
    //         arr: unsortedArrivalTimes[i],
    //         dur: unsortedDurationTimes[i]
    //     })
    // }

    // list.sort((a, b) => {
    //     return a.arr - b.arr;
    // })

    // for(let i = 0; i < processesCount; i++) {
    //     arrivalTimes[i] = list[i].arr;
    //     durationTimes[i] = list[i].dur;
    // }

    // console.log(durationTimes)
    // console.log(arrivalTimes)


    // let timer = 0;
    // let maxProccessIndex = 0;

    // const tempDurationTimes = [...durationTimes];

    // const queue = new Array(processesCount).fill(0);
    // const complete = new Array(processesCount).fill(false);
    // const turn = new Array(processesCount).fill(0);
    // const wait = new Array(processesCount).fill(0);



    // while(timer < arrivalTimes[0]) {
    //     timer++;
    // }
    // queue[0] = 1;

    // whileLoop:
    // while(true) {
    //     let flag = true;
    //     for(let i = 0; i < processesCount; i++) {
    //         if(tempDurationTimes[i] != 0) {
    //             flag = false;
    //             break whileLoop;
    //         }
    //     }
    //     if(flag) {
    //         break whileLoop;
    //     }

    //     for(let i = 0; (i < processesCount) && (queue[i] !== 0); i++) {
    //         let ctr = 0;
    //         while((ctr < quantum) && (tempDurationTimes[queue[0] - 1] > 0)) {
    //             tempDurationTimes[queue[0] - 1] -= 1;
    //             timer += 1;
    //             ctr++;

    //             checkNewArrival(timer, arrivalTimes, processesCount, maxProccessIndex, queue);
    //         }

    //         if((tempDurationTimes[queue[0] - 1] === 0) && (complete[queue[0] - 1] === false)) {
    //             turn[queue[0] - 1] = timer;
    //             complete[queue[0] - 1] = true;
    //         }

    //         let idle = true;
    //         if(queue[processesCount - 1] === 0) {
    //             for(let i = 0; (i < processesCount) && (queue[i] !== 0); i++) {
    //                 if(complete[queue[i] - 1] === false) {
    //                     idle = false;
    //                 }
    //             }
    //         }
    //         else {
    //             idle = false;
    //         }

    //         if(idle) {
    //             timer++;
    //             checkNewArrival(timer, arrivalTimes, processesCount, maxProccessIndex, queue);
    //         }
    //         console.log('while loop')
    //         queueMaintainence(queue, processesCount);
    //     }
    // }

    // for(let i = 0; i < processesCount; i++) {
    //     turn[i] = turn[i] - arrivalTimes[i];
    //     wait[i] = turn[i] - durationTimes[i];
    // }

    // let totalWaitingTime = 0;
    // let totalTurnAroundTime = 0;
    // let completionTime = 0;
    // const processesData = [];
    
    // for (let i = 0 ; i < processesCount; i++) {
    //     totalWaitingTime += wait[i];
    //     totalTurnAroundTime += turn[i];
        
    //     completionTime = turn[i] + arrivalTimes[i];
        
    //     processesData.push({
    //         number: i + 1,
    //         duration: durationTimes[i],
    //         arrivalTime: arrivalTimes[i],
    //         waitingTime: wait[i],
    //         turnAroundTime: turn[i],
    //         timeWhenCompleted: completionTime
    //     });

    //     console.log(turn);
    //     console.log(wait);
    //     console.log(completionTime);
    // }
    
    // let averageWaitingTime = Math.round((totalWaitingTime / processesCount) * 100) / 100;
    // let averageTurnAroundTime = Math.round(Math.floor(totalTurnAroundTime / processesCount) * 100) / 100;

    // return [averageWaitingTime, averageTurnAroundTime, processesData];
}

computeBtn.addEventListener('click', computeHandler);

const getRandomNumber = () => {
    return Math.floor(Math.random() * 20);
}

randomizeBtn.addEventListener('click', () => {
    console.log('randomize');

    for(let i = 1; i <= processCountSlider.value; i++) {
        document.querySelector(`.rr-duration-input-P${i}`).value = getRandomNumber() + 1;
        document.querySelector(`.rr-arrival-input-P${i}`).value = getRandomNumber();
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
