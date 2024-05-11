function onReady() {
  console.log('client.js is sourced!');
  fetchCalculations();
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
      let resultHistory = document.getElementById('history-list');
      resultHistory.innerHTML = '';
      for (let calculation of calculationsFromServer) {
        resultHistory.innerHTML += `
          <li>${calculation.firstNumber} ${calculation.secondNumber} = ${calculation.result}</li>`;
      }
    })
    .catch(function (error) {
      console.log(error);
      alert('something bad happened! check console for more details');
    });
}

// function to calculate
function calculateTotal() {
  const firstNumber = document.getElementById('first-number').value;
  const secondNumber = document.getElementById('second-number').value;
  axios({
    method: 'POST',
    url: '/calculations',
    data: {
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      //   operator,
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

// equal button function
function equalButton(event) {
  event.preventDefault();
  let equalButton = document.getElementById('equal-button');
  equalButton = event.target;
  console.log('equal button clicked');
  calculateTotal();
}

// plus button
// function operatorButton(event) {
//   event.preventDefault();

// }

// let plusButton = document.getElementById('plus-button');
//   plusButton = event.target;
//   for () {
//     plusButton.style.backgroundColor = 'cornflowerblue';
//   console.log('plus button was clicked');
// }

// subtraction button
// function subtractionButton(event)
// function operatorButton(event) {
//     event.preventDefault();
//     let plusButton = document.getElementById('plus-button');
//     plusButton = event.target;
//     plusButton.style.backgroundColor = 'cornflowerblue';
//     console.log('plus button was clicked');
//   }
// division button

// multiply button
