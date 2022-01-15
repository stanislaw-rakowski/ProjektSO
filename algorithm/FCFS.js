const computeBtn = document.querySelector('.compute-btn-fcfs');
const processCountSlider = document.querySelector('.process-count-range-fcfs');
const randomizeBtn = document.querySelector('.random-data-btn-fcfs');
const clearInputsBtn = document.querySelector('.clear-btn-fcfs');


const computeHandler = () => {

    const durationTimesArray = [];
    const arrivalTimesArray = [];

    let durationTime;
    let arrivalTime;

    for(let i = 1; i <= processCountSlider.value; i++) {
        durationTime = parseInt(document.querySelector(`.fcfs-duration-input-P${i}`).value, 10)
        arrivalTime = parseInt(document.querySelector(`.fcfs-arrival-input-P${i}`).value, 10)
        
        if(isNaN(durationTime) || isNaN(arrivalTime)) {
            window.alert('All inputs must be filled!');
            throw 'All inputs must be filled!';
        }

        durationTimesArray.push(durationTime);
        arrivalTimesArray.push(arrivalTime);
    }

    const [averageWaitingTime, averageTurnAroundTime, processesData] = calculateFCFS(durationTimesArray, arrivalTimesArray);

    document.querySelector('.fcfs-waiting-time-result').textContent = averageWaitingTime;
    document.querySelector('.fcfs-turn-around-result').textContent = averageTurnAroundTime;
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
    let averageTurnAroundTime = Math.round(Math.floor(totalTurnAroundTime / processesCount) * 100) / 100;

    return [averageWaitingTime, averageTurnAroundTime, processesData];
}

computeBtn.addEventListener('click', computeHandler);

const getRandomNumber = () => {
    return Math.floor(Math.random() * 20);
}

randomizeBtn.addEventListener('click', () => {
    for(let i = 1; i <= processCountSlider.value; i++) {
        document.querySelector(`.fcfs-duration-input-P${i}`).value = getRandomNumber() + 1;
        document.querySelector(`.fcfs-arrival-input-P${i}`).value = getRandomNumber();
    }
});

clearInputsBtn.addEventListener('click', () => {
    for(let i = 1; i <= processCountSlider.value; i++) {
        document.querySelector(`.fcfs-duration-input-P${i}`).value = null;
        document.querySelector(`.fcfs-arrival-input-P${i}`).value = null;
    }

    document.querySelector('.fcfs-waiting-time-result').textContent = '...';
    document.querySelector('.fcfs-turn-around-result').textContent = '...';
});
