// Constants
const GREEN_TIME = 30; // seconds
const RED_TIME = 30; // seconds

// Elements
const redLight = document.querySelector('#red-light');
const yellowLight = document.querySelector('#yellow-light');
const greenLight = document.querySelector('#green-light');
const startGreenButton = document.querySelector('#start-green-button');
const startRedButton = document.querySelector('#start-red-button');
const intervalsList = document.querySelector('#intervals');

// Variables
let isGreenLight = false;
let nextIntervals = [];
let greenStartTime = null;
let redStartTime = null;

// Functions
function updateLight(color) {
  redLight.style.boxShadow = '';
  yellowLight.style.boxShadow = '';
  greenLight.style.boxShadow = '';
  switch (color) {
    case 'red':
      redLight.style.boxShadow = '0 0 30px 10px red';
      break;
    case 'yellow':
      yellowLight.style.boxShadow = '0 0 30px 10px yellow';
      break;
    case 'green':
      greenLight.style.boxShadow = '0 0 30px 10px green';
      break;
  }
}

function calculateTimeLeft(startTime, colorTime) {
  const now = Date.now();
  const elapsedTime = Math.floor((now - startTime) / 1000); // in seconds
  const timeLeft = colorTime - elapsedTime;
  return timeLeft;
}

function setColor() {
  const now = Date.now();
  if (isGreenLight) {
    const timeLeft = calculateTimeLeft(greenStartTime, GREEN_TIME);
    if (timeLeft <= 0) {
      isGreenLight = false;
      updateLight('yellow');
      setTimeout(() => {
        startRed();
      }, 2000);
    } else {
      updateLight('green');
    }
  } else {
    const timeLeft = calculateTimeLeft(redStartTime, RED_TIME);
    if (timeLeft <= 0) {
      isGreenLight = true;
      nextIntervals = [];
      intervalsList.innerHTML = '';
      greenStartTime = Date.now();
      updateLight('green');
    } else if (timeLeft <= 5) {
      updateLight('yellow');
    } else {
      updateLight('red');
    }
  }
}

function startGreen() {
  isGreenLight = true;
  greenStartTime = Date.now();
  setColor();
  setInterval(() => {
    setColor();
  }, 1000);
}

function startRed() {
  isGreenLight = false;
  redStartTime = Date.now();
  setColor();
  setInterval(() => {
    setColor();
  }, 1000);
}

// Event listeners
startGreenButton.addEventListener('click', startGreen);
startRedButton.addEventListener('click', startRed);
