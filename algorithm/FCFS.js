const computeBtn = document.querySelector('.compute-btn');
const processCountSlider = document.querySelector('.process-count-range');
const randomizeBtn = document.querySelector('.random-data-btn');
const clearInputsBtn = document.querySelector('.clear-btn');


const computeHandler = () => {
    console.log('compute')
    console.log(processCountSlider.value);

    const durationTimesArray = [];
    const arrivalTimesArray = [];

    let durationTime;
    let arrivalTime;

    for(let i = 1; i <= processCountSlider.value; i++) {
        durationTime = parseInt(document.querySelector(`.duration-input-P${i}`).value, 10)
        arrivalTime = parseInt(document.querySelector(`.arrival-input-P${i}`).value, 10)
        
        if(isNaN(durationTime) || isNaN(arrivalTime)) {
            window.alert('All inputs must be filled!');
            throw 'All inputs must be filled!';
        }

        durationTimesArray.push(durationTime);
        arrivalTimesArray.push(arrivalTime);
    }

    console.log(durationTimesArray);
    console.log(arrivalTimesArray);

    const [averageWaitingTime, averageTurnAroundTime] = calculateFCFS(durationTimesArray, arrivalTimesArray);

    document.querySelector('.waiting-time-result').textContent = averageWaitingTime;
    document.querySelector('.turn-around-result').textContent = averageTurnAroundTime;
}

const calculateFCFS = (durationTimes, arrivalTimes) => {

    function findWaitingTime(processesCount, durations, waitingTimes)
    {
        waitingTimes[0] = 0;
   
        for (let i = 1; i < processesCount; i++) {
            waitingTimes[i] = durations[i - 1] + waitingTimes[i - 1];
        }
    }
     
    function findTurnAroundTime(processesCount, durations, waitingTimes, turnAroundTimes)
    {
        for (let i = 0; i < processesCount; i++) {
            turnAroundTimes[i] = durations[i] + waitingTimes[i];
        }
    }
     
    function findavgTime(arrivals, processesCount, durations)
    {
        const waitingTimes = new Array(processesCount);
        const turnAroundTimes = new Array(processesCount);
        
        let totalWaitingTime = 0;
        let totalTurnAroundTime = 0;
   
        findWaitingTime(processesCount, durations, waitingTimes);
   
        findTurnAroundTime(processesCount, durations, waitingTimes, turnAroundTimes);
   
        for (let i = 0; i < processesCount; i++) {
            totalWaitingTime += waitingTimes[i];
            totalTurnAroundTime += turnAroundTimes[i];
            console.log(i+1, durations[i], waitingTimes[i], turnAroundTimes[i]);
        }

        let averageWaitingTime = Math.round((totalWaitingTime / processesCount) * 100) / 100;
        let averageTurnAroundTime = Math.round(Math.floor(totalTurnAroundTime / processesCount) * 100) / 100;
        console.log(averageWaitingTime);
        console.log(averageTurnAroundTime);

        return [averageWaitingTime, averageTurnAroundTime];
    }

    const result = findavgTime(arrivalTimes, arrivalTimes.length, durationTimes);
    return result;
}

computeBtn.addEventListener('click', computeHandler);

const getRandomNumber = () => {
    return Math.floor(Math.random() * 20) + 1;
}

randomizeBtn.addEventListener('click', () => {
    console.log('randomize');
    console.log(getRandomNumber())

    for(let i = 1; i <= processCountSlider.value; i++) {
        document.querySelector(`.duration-input-P${i}`).value = getRandomNumber();
        document.querySelector(`.arrival-input-P${i}`).value = getRandomNumber();
    }
});

clearInputsBtn.addEventListener('click', () => {
    console.log('clear');

    for(let i = 1; i <= processCountSlider.value; i++) {
        document.querySelector(`.duration-input-P${i}`).value = null;
        document.querySelector(`.arrival-input-P${i}`).value = null;
    }

    document.querySelector('.waiting-time-result').textContent = '...';
    document.querySelector('.turn-around-result').textContent = '...';
});
