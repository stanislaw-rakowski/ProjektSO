const processCountSlider = document.querySelector('.process-count-range');
const countOutput = document.querySelector('.process-count-output');
const compareCheckbox = document.querySelector('.compare-checkbox');
const computeBtn = document.querySelector('.compute-btn');

countOutput.textContent = processCountSlider.value;

processCountSlider.oninput = function() {
    countOutput.textContent = this.value;
}


compareCheckbox.addEventListener('change', function() {
    if (this.checked) {
      console.log("Checkbox is checked..");
    } else {
      console.log("Checkbox is not checked..");
    }
});

computeBtn.addEventListener('click', () => {
    console.log('compute')
});