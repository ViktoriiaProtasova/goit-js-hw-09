import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
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
const inputEl = document.querySelector('#datetime-picker');
const fpInputEl = document.querySelector('[type="datetime-local"]');
console.log(fpInputEl);

const startBtn = document.querySelector('[data-start]');

startBtn.setAttribute('disabled', 'disabled');
startBtn.addEventListener('click', onStart);
inputEl.addEventListener('input', inputHandler);

function inputHandler() {
  if (fp.selectedDates[0] < fp._initialDate) {
    window.alert('Please choose a date in the future');
    startBtn.setAttribute('disabled', 'disabled');
  } else {
    startBtn.removeAttribute('disabled');
  }
}

let timerId = null;

function onStart() {
  startBtn.setAttribute('disabled', 'disabled');
  fpInputEl.setAttribute('readonly', 'readonly');

  let remainingTime = fp.selectedDates[0].getTime() - new Date().getTime();
  if (remainingTime <= 0) {
    clearInterval(timerId);
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
