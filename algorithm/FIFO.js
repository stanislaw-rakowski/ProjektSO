const capacitySlider = document.querySelector('.process-count-range-fifo');
const pagesInput = document.querySelector('.fifo-pages-input');
const computeBtn = document.querySelector('.compute-btn-fifo');
const randomizeBtn = document.querySelector('.random-data-btn-fifo');
const clearInputsBtn = document.querySelector('.clear-btn-fifo');
const capacityOutput = document.querySelector('.process-count-output-fifo');

capacityOutput.textContent = capacitySlider.value;

capacitySlider.oninput = function() {
    capacityOutput.textContent = this.value;
}

const computeHandler = () => {
    const pagesInputArray = pagesInput.value.trim().split(' ');
    const pagesArray = pagesInputArray.map(value => parseInt(value, 10));
    
    pagesArray.forEach(element => {
        if(isNaN(element)) {
            window.alert('Invalid input!');
            throw 'Invalid input!';
        }
    });
            
    const pageFaults = calculateFIFO(pagesArray, capacitySlider.value);

    document.querySelector('.fifo-page-faults-result').textContent = pageFaults;
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

computeBtn.addEventListener('click', computeHandler);

const getRandomNumber = max => {
    return Math.floor(Math.random() * max);
}

randomizeBtn.addEventListener('click', () => {
    let randomPages = '';

    for(let i = 0; i < getRandomNumber(8) + 7; i++) {
        randomPages += `${getRandomNumber(21)} `
    }

    pagesInput.value = randomPages;
});

clearInputsBtn.addEventListener('click', () => {
    pagesInput.value = null;

    document.querySelector('.fifo-page-faults-result').textContent = '...';
});
