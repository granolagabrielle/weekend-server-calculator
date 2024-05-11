const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));
app.use(express.json({ extended: true }));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];
// let plusButton = document.getElementById('plus-button');
// let subtractButton = document.getElementById('subtract-button');
// let multiplyButton = document.getElementById('multiply-button');
// let divideButton = document.getElementById('divide-button');

// Here's a wonderful place to make some routes:

// GET /calculations

// add get to grab all previous calculations
app.get('/calculations', (req, res) => {
  for (let calculation of calculations) {
    calculation.result = Number(calculation.firstNumber) + Number(calculation.secondNumber);
    console.log(calculation.result);
  }
  res.send(calculations);
});

// POST /calculations

// add post to post all calculations
app.post('/calculations', (req, res) => {
  console.log('processing post for /calculation', req.body);
  const newCalculation = req.body;
  if (!newCalculation.firstNumber || !newCalculation.secondNumber) {
    res.status(400).send({ error: 'first and second numbers are required' });
    return;
  }
  calculations.push(newCalculation);
  res.status(201).send(newCalculation);
});






// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
};

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
};

module.exports = app;
