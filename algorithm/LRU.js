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
    const pagesInputArray = pagesInput.value.trim().split(' ');
    const pagesArray = pagesInputArray.map(value => parseInt(value, 10));
    pagesArray.forEach(element => {
        if(isNaN(element)) {
            window.alert('Invalid input!');
            throw 'Invalid input!';
        } 
    });
        
    const pageFaults = calculateLRU(pagesArray, capacitySlider.value);

    document.querySelector('.lru-page-faults-result').textContent = pageFaults;
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

    document.querySelector('.lru-page-faults-result').textContent = '...';
});
