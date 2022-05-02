const inputContainer = document.querySelector('.input-container');
const coundtdownForm = document.querySelector('.form');
const dateEl = document.querySelector('.date-picker');

const countdownEl = document.querySelector('.countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.querySelector('.complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.querySelector('.button-3');

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countdownTitle = '';
let countdownDate = '';
let countdownValue;
let countdownActive;
let savedCountdown;

// Set Date Minimum
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Take valuse from form input
const updateCountdown = function (e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  // Get number version of date
  if (countdownDate === '') {
    alert('Please select a date for the countdown.');
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// Populate countdown

const updateDOM = function () {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    inputContainer.classList.add('hidden');

    if (distance < 0) {
      countdownEl.classList.add('hidden');
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.classList.remove('hidden');
    } else {
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.classList.add('hidden');
      countdownEl.classList.remove('hidden');
    }
  }, second);
};

// Reset All Values
const reset = function () {
  inputContainer.classList.remove('hidden');
  countdownEl.classList.add('hidden');
  completeEl.classList.add('hidden');
  clearInterval(countdownActive);
  countdownTitle = '';
  countdownDate = '';
  document.getElementById('title').value = '';
  document.querySelector('date-picker').value = '';
  localStorage.removeItem('countdown');
};

const restorePreviousCountdown = function () {
  if (localStorage.getItem('countdown')) {
    inputContainer.classList.add('hidden');
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// Event Listener
coundtdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
restorePreviousCountdown();
