const capacitySlider = document.querySelector('.process-count-range-lru');
const pagesInput = document.querySelector('.lru-pages-input');
const computeBtn = document.querySelector('.compute-btn-lru');
const randomizeBtn = document.querySelector('.random-data-btn-lru');
const clearInputsBtn = document.querySelector('.clear-btn-lru');
const capacityOutput = document.querySelector('.process-count-output-lru');

capacityOutput.textContent = capacitySlider.value;

capacitySlider.oninput = function() {
    capacityOutput.textContent = this.value;
}

const computeHandler = () => {
    console.log('compute')
    console.log(capacitySlider.value);

    const pagesInputArray = pagesInput.value.trim().split(' ');
    const pagesArray = pagesInputArray.map(value => parseInt(value, 10));
    pagesArray.forEach(element => {
        if(isNaN(element)) {
            window.alert('Every page must be a number!');
            throw 'Every page must be a number!';
        } 
    });
    
    console.log(pagesArray);
        
    // const [averageWaitingTime, averageTurnAroundTime] = calculateRoundRobin(durationTimesArray, arrivalTimesArray, quantum);

    // document.querySelector('.rr-waiting-time-result').textContent = averageWaitingTime;
    // document.querySelector('.rr-turn-around-result').textContent = averageTurnAroundTime;
}

// const calculateFIFO = (pages, capacity) => {

    
// }

computeBtn.addEventListener('click', computeHandler);

const getRandomNumber = max => {
    return Math.floor(Math.random() * max);
}

randomizeBtn.addEventListener('click', () => {
    console.log('randomize');

    let randomPages = '';

    for(let i = 0; i < getRandomNumber(8) + 7; i++) {
        randomPages += `${getRandomNumber(21)} `
    }

    pagesInput.value = randomPages;
});

clearInputsBtn.addEventListener('click', () => {
    console.log('clear');

    pagesInput.value = null;

    document.querySelector('.lru-page-faults-result').textContent = '...';
});
