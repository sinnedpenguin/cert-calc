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
      date: new Date().toLocaleString()
    };

    localStorage.setItem(data.date, JSON.stringify(data));
    displaySavedData();
  }

  function displaySavedData() {
    let parent = document.querySelector('.saved-data');
    parent.innerHTML = '';
  
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let data = JSON.parse(localStorage.getItem(key));
  
      let div = document.createElement('div');
      let date = new Date(data.date).toLocaleDateString();
      let uk = data.uk;
      let ir = data.ir;
      let au = data.au;
      let total = parseInt(data.uk) + parseInt(data.ir) + parseInt(data.au);
  
      div.textContent = `${date}. UK: ${uk}, IR: ${ir}, AU: ${au}, Total: ${total} `;
  
      let button = document.createElement('button');
      button.textContent = 'X';
      button.dataset.key = key; 
      button.addEventListener('click', function() {
        localStorage.removeItem(this.dataset.key);
        displaySavedData();
      });
  
      div.appendChild(button);
      parent.appendChild(div);

      let totalSaved = document.querySelector('.total');
      let totalUK = 0;
      let totalIR = 0;
      let totalAU = 0;
      for (let i = 0; i < localStorage.length; i++) {
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        totalUK += parseInt(data.uk);
        totalIR += parseInt(data.ir);
        totalAU += parseInt(data.au);
        let totalAll = parseInt(totalUK) + parseInt(totalIR) + parseInt(totalAU);
        let computed = (parseInt(totalUK) + parseInt(totalIR) + parseInt(totalAU)) * 25;
        totalSaved.textContent = `UK: ${totalUK}, IR: ${totalIR}, AU: ${totalAU}, Total: ${totalAll}, Computed: ₱${computed.toLocaleString()}`;

      }
    }
  };

  document.querySelector('.save-button').addEventListener('click', save);
  document.querySelectorAll('.inputs input').forEach(input => {
    input.addEventListener('input', updateCurrent);
  });

  displaySavedData();
});
