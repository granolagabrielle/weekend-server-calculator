function onReady() {
  console.log('client.js is sourced!');
  fetchCalculations();
}

onReady();

let operator = '';

function setOperator(event) {
  operator = event.target.id;
  console.log('operator', operator);
}

// function to post calculations
function fetchCalculations() {
  axios({
    method: 'GET',
    url: '/calculations',
  })
    .then(function (response) {
      console.log(response);
      let calcHistory = response.data;
      console.log(calcHistory);
      renderCalculations(calcHistory);
    })
    .catch(function (error) {
      console.log(error);
      alert('something bad happened! check console for more details');
    });
}

// function to render calculations
function renderCalculations(calculationData) {
  let resultHistory = document.getElementById('history-list');
  resultHistory.innerHTML = '';
  let resultHere = document.getElementById('result-here');
  resultHere.innerHTML = '';
  for (let i = 0; i < calculationData.length; i++) {
    resultHere.innerHTML = `${calculationData[calculationData.length - 1].result}`;
  }
  for (let calculation of calculationData) {
    resultHistory.innerHTML += `
      <li>${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}</li>`;
  }
}

// function to calculate
function calculateTotal(event) {
  event.preventDefault();
  const numOne = document.getElementById('first-number').value;
  const numTwo = document.getElementById('second-number').value;
  axios({
    method: 'POST',
    url: '/calculations',
    data: {
      numOne,
      numTwo,
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

function deleteHistory() {
  axios({
    method: 'DELETE',
    url: '/calculations',
  })
    .then(function (response) {
      fetchCalculations();
    })
    .catch(function (error) {
      console.log('error deleting history', error);
    });
}

// function to clear inputs
function clearInputs() {
  document.getElementById('first-number').value = '';
  document.getElementById('second-number').value = '';
}

// // equal button function
// function equalButton(event) {
//   event.preventDefault();
//   let equalButton = document.getElementById('equal-button');
//   equalButton = event.target;
//   console.log('equal button clicked');
//   calculateTotal();
// }

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
