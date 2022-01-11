const computeBtn = document.querySelector('.compute-btn-rr');
const processCountSlider = document.querySelector('.process-count-range-rr');
const randomizeBtn = document.querySelector('.random-data-btn-rr');
const clearInputsBtn = document.querySelector('.clear-btn-rr');
const quantumInput = document.querySelector('.quantum-input');


const computeHandler = () => {
    console.log('compute')
    console.log(processCountSlider.value);
    console.log('quant', typeof quantumInput.value);

    const durationTimesArray = [];
    const arrivalTimesArray = [];
    const quantum = quantumInput.value;

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

    const [averageWaitingTime, averageTurnAroundTime] = calculateRoundRobin(durationTimesArray, arrivalTimesArray, quantum);

    document.querySelector('.rr-waiting-time-result').textContent = averageWaitingTime;
    document.querySelector('.rr-turn-around-result').textContent = averageTurnAroundTime;
}

const calculateRoundRobin = (durationTimes, arrivalTimes, quantum) => {

    
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
