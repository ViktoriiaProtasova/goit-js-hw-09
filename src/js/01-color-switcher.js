const toStartEl = document.querySelector('[data-start]');
const toStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerID = null;

const onStartClick = () => {
  timerID = setInterval(
    () => (bodyEl.style.backgroundColor = getRandomHexColor()),
    1000
  );
  toStartEl.setAttribute('disabled', 'disabled');
};

const onStopClick = () => {
  clearInterval(timerID);
  toStartEl.removeAttribute('disabled');
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

toStartEl.addEventListener('click', onStartClick);
toStopEl.addEventListener('click', onStopClick);
