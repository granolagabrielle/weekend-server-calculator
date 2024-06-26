const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));
app.use(express.json({ extended: true }));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];

// Here's a wonderful place to make some routes:

// GET /calculations

// add get to send calculation array
app.get('/calculations', (req, res) => {
  res.send(calculations);
});

// POST /calculations

// add post to post all calculations
app.post('/calculations', (req, res) => {
  console.log('processing post for /calculation', req.body);
  const newCalculation = req.body;
  let numOne = Number(newCalculation.numOne);
  let numTwo = Number(newCalculation.numTwo);
  let operator = newCalculation.operator;
  if (!newCalculation.numOne || !newCalculation.numTwo) {
    res.status(400).send({ error: 'first and second numbers are required' });
    return;
  } else if (operator === '+') {
    newCalculation.result = numOne + numTwo;
  } else if (operator === '-') {
    newCalculation.result = numOne - numTwo;
  } else if (operator === '*') {
    newCalculation.result = numOne * numTwo;
  } else if (operator === '/') {
    newCalculation.result = numOne / numTwo;
  } else {
    res.status(400).send({ error: 'operator must be selected' });
    // need to include return otherwise it wont load
    return;
  }
  calculations.push(newCalculation);
  console.log(calculations);
  res.sendStatus(201);
});

// app.delete to clear inputs
app.delete('/calculations', (req, res) => {
  calculations = [];
  res.sendStatus(201);
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
