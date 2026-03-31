import { getPrize } from './helpers/index.js';

const form = document.querySelector('.form');
const login = document.querySelector('.login');
const month = document.querySelector('.month');
const message = document.querySelector('.message');

const date = new Date();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.textContent = 'Загрузка данных...';

  fetch(`https://storo08.up.railway.app/chase/${month.value}`)
    .then((response) => response.json())
    .then((data) => data.players)
    .then((players) => {
      const player = players.find(
        (item) => item.username.toLowerCase() === login.value.toLowerCase(),
      );

      if (player) {
        message.textContent = '';

        const rake = document.createElement('div');
        rake.classList.add('chase');
        rake.textContent = `Набрано рейка: $${player.points.toFixed(2)}`;
        message.append(rake);

        const prizeChase = document.createElement('div');
        prizeChase.classList.add('chase');
        prizeChase.textContent = `Chase выплата: $${getPrize(player.points)}`;
        message.append(prizeChase);
      } else {
        message.textContent = 'Игрок не найден. Проверьте введённый Login.';
      }
    })
    .catch(() => {
      message.textContent = 'Что-то пошло не так. Попробуйте снова.';
    });
});
