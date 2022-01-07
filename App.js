const processCountSlider = document.querySelector('.process-count-range');
const countOutput = document.querySelector('.process-count-output');
const compareCheckbox = document.querySelector('.compare-checkbox');
const inputsDiv = document.querySelector('.inputs-div');

countOutput.textContent = processCountSlider.value;

processCountSlider.oninput = function() {
    countOutput.textContent = this.value;

    inputsDiv.innerHTML = '';
    let el;

    for(let i = 1; i <= this.value; i++) {
      el = `
      <div class="input-row">
        <p>P${i}</p>
        <input class="duration-input duration-input-P${i}" type="number" min="1">
        <input class="arrival-input arrival-input-P${i}" type="number" min="0">
      </div>`;

      inputsDiv.innerHTML += el;
    }
}


compareCheckbox.addEventListener('change', function() {
    if (this.checked) {
      console.log("Checkbox is checked..");
    } else {
      console.log("Checkbox is not checked..");
    }
});

