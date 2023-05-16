import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({ timeout: 4000 });

const options = {
  enableTime: true,
  time_24hr: true,
  disableMobile: 'true',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.setAttribute('disabled', 'disabled');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);
const inputEl = fp.input;
const startBtn = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');
const fieldElements = document.querySelectorAll('.field');
const valueElements = document.querySelectorAll('.value');
const labelElements = document.querySelectorAll('.label');
let timerId = null;

timerEl.style.display = 'flex';
timerEl.style.gap = '20px';

fieldElements.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
});

valueElements.forEach(el => {
  el.style.fontSize = '30px';
});

labelElements.forEach(el => {
  el.style.fontSize = '11px';
  el.style.textTransform = 'uppercase';
  el.style.fontWeight = '700';
});

startBtn.setAttribute('disabled', 'disabled');
startBtn.addEventListener('click', onStart);
inputEl.addEventListener('input', inputHandler);

function inputHandler() {
  if (fp.selectedDates[0] < fp._initialDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    startBtn.setAttribute('disabled', 'disabled');
  } else {
    startBtn.removeAttribute('disabled');
  }
}

function onStart() {
  startBtn.setAttribute('disabled', 'disabled');
  inputEl.setAttribute('disabled', 'disabled');
  Notiflix.Notify.success('The timer has successfully started');

  let remainingTime = fp.selectedDates[0].getTime() - new Date().getTime();

  if (remainingTime <= 0) {
    clearInterval(timerId);
    inputEl.removeAttribute('disabled');
    return;
  }

  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    const daysRemaining = document.querySelector('[data-days]');
    const hoursRemaining = document.querySelector('[data-hours]');
    const minutesRemaining = document.querySelector('[data-minutes]');
    const secondsLeft = document.querySelector('[data-seconds]');

    daysRemaining.innerText = `${addLeadingZero(days)}`;
    hoursRemaining.innerText = `${addLeadingZero(hours)}`;
    minutesRemaining.innerText = `${addLeadingZero(minutes)}`;
    secondsLeft.innerText = `${addLeadingZero(seconds)}`;

    remainingTime -= 1000;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
