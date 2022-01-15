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
  comparisonModal.style.display = "none";
}

window.addEventListener('click', (event) => {
    if (event.target == comparisonModal) {
      comparisonModal.style.display = "none";
    }
})

const comparisonHandler = () => {
    comparisonModal.style.display = "block";

    const comparisonUl = document.querySelector('.comparison-ul');
}

comparisonBtn.addEventListener('click', comparisonHandler);