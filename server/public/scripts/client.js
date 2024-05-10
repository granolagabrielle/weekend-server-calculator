function onReady() {
  console.log('client.js is sourced!');
}

onReady();

// function to post calculations
function fetchCalculations() {
  axios({
    method: 'GET',
    url: '/calculations',
  })
    .then(function (response) {
      console.log(response);
      let calculationsFromServer = response.data;
      let resultHistory = document.getElementById('resultHistory');
      resultHistory.innerHTML = '';
      for (let calculation of calculationsFromServer) {
        resultHistory.innerHTML += `
    <ul>
        <li>${calculation.firstNumber} + ${calculation.secondNumber} = result</li>
    </ul>`;
      }
    })
    .catch(function (error) {
      console.log(error);
      alert('something bad happened! check console for more details');
    });
}

// function to calculate
function calculateTotal() {
  axios({
    method: 'POST',
    url: '/calculations',
    data: {
      firstNumber,
      secondNumber,
      operator,
    },
  })
    .then(function (response) {
      fetchCalculations();
      document.getElementById('first-number').value = '';
      document.getElementById('second-number').value = '';
    })
    .catch(function (response) {
      console.log('error POSTing calculations', error);
    });
}
