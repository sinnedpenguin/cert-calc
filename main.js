// BUG: Displayed saved data not being listed in chronological order // Being displayed in order they were stored in the local storage
// SOLUTION: Modified the displayedSavedData() to first extract all the data from the local storage, sort them by date, and then display them in the sorted order (Line 52)

// BUG: Empty input boxes returns NaN // parseInt function returns NaN since it's unable to parse the input as an integer
// SOLUTION: Added Number.isInteger method to displayedSavedData() to check whether each input value can be parsed as an integer. If it can, the value is added to the total variable, otherwise it is ignored (Line 52)

document.addEventListener('DOMContentLoaded', function() {
  let data = {
    total: 0,
    current: 0,
    uk: 0,
    ir: 0,
    au: 0,
    currentDate: new Date()
  };

  let current = document.querySelector('.current');
  let ukInput = document.querySelector(".uk");
  let irInput = document.querySelector(".ir");
  let auInput = document.querySelector(".au");

  document.querySelector('.date').textContent = data.currentDate.toLocaleString(); 
  setInterval(function() {
    let currentDate = new Date();
    document.querySelector('.date').textContent = currentDate.toLocaleString();
  }, 1000);

  function updateCurrent() {
    if (ukInput.value !== "" && irInput.value !== "" && auInput.value !== "") {
      let currentValue = parseInt(ukInput.value) + parseInt(irInput.value) + parseInt(auInput.value);
      current.textContent = currentValue.toLocaleString();
    } else {
      current.textContent = "0";
    }
  }

  function save() {
    let data = {
      uk: ukInput.value,
      ir: irInput.value,
      au: auInput.value,
      current: current.textContent,
      date: new Date().toISOString()
    };
  
    let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
    savedData.push(data);
    localStorage.setItem('savedData', JSON.stringify(savedData));
    displaySavedData();
  }
  
  function displaySavedData() {
    let parent = document.querySelector('.saved-data');
    parent.innerHTML = '';
  
    let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
    savedData.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  
    for (let i = 0; i < savedData.length; i++) {
      let data = savedData[i];
  
      let div = document.createElement('div');
      let date = new Date(data.date).toLocaleDateString();
      let uk = data.uk;
      let ir = data.ir;
      let au = data.au;
      let total = 0;
  
      if (Number.isInteger(parseInt(uk))) {
        total += parseInt(uk);
      }
  
      if (Number.isInteger(parseInt(ir))) {
        total += parseInt(ir);
      }
  
      if (Number.isInteger(parseInt(au))) {
        total += parseInt(au);
      }
  
      div.textContent = `${date}. UK: ${uk}, IR: ${ir}, AU: ${au}, Total: ${total} `;
  
      let button = document.createElement('button');
      button.textContent = 'X';
      button.addEventListener('click', function() {
        savedData.splice(i, 1);
        localStorage.setItem('savedData', JSON.stringify(savedData));
        displaySavedData();
      });
  
      div.appendChild(button);
      parent.appendChild(div);
    }
  
    let totalSaved = document.querySelector('.total');
    let totalUK = 0;
    let totalIR = 0;
    let totalAU = 0;
  
    for (let i = 0; i < savedData.length; i++) {
      let data = savedData[i];
  
      if (Number.isInteger(parseInt(data.uk))) {
        totalUK += parseInt(data.uk);
      }
  
      if (Number.isInteger(parseInt(data.ir))) {
        totalIR += parseInt(data.ir);
      }
  
      if (Number.isInteger(parseInt(data.au))) {
        totalAU += parseInt(data.au);
      }
    }
  
    let totalAll = totalUK + totalIR + totalAU;
    let computed = totalAll * 25;
    totalSaved.textContent = `UK: ${totalUK}, IR: ${totalIR}, AU: ${totalAU}, Total: ${totalAll}, Computed: ₱${computed.toLocaleString()}`;
  }  

  document.querySelector('.save-button').addEventListener('click', save);
  document.querySelectorAll('.inputs input').forEach(input => {
    input.addEventListener('input', updateCurrent);
  });

  displaySavedData();
});
