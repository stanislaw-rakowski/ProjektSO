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
