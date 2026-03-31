import { getPrize, renderData } from '../scripts/helpers/index.js';

const form = document.querySelector('.form');
const month = document.querySelector('.month');
const tableBody = document.querySelector('.table-body');
const message = document.querySelector('.message');
const renderFull = document.querySelector('.full');

const playerList = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  tableBody.innerHTML = '';
  playerList.length = 0;
  message.textContent = 'Загрузка данных. Пожалуйста, подождите.';
  renderFull.setAttribute('disabled', true);

  fetch(`https://storo08.up.railway.app/chase/${month.value}`)
    .then((response) => response.json())
    .then((data) => data.players)
    .then((players) => {
      let rakeTotalCount = 0;

      playerList.push(...players);

      players
        .filter((item) => item.points >= 1000)
        .sort((a, b) => b.points - a.points)
        .map((item) => {
          tableBody.append(renderData(item));
          rakeTotalCount += getPrize(item.points);
        });

      message.textContent = `Общая сумма Chase выплат: ${rakeTotalCount}`;
      renderFull.removeAttribute('disabled');
    })
    .catch(() => {
      tableBody.innerHTML = 'Что-то пошло не так. Попробуйте снова.';
    });
});

renderFull.addEventListener('click', () => {
  tableBody.innerHTML = '';
  playerList.map((item) => tableBody.append(renderData(item)));
});
