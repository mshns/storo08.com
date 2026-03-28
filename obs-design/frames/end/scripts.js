const sliderElement = document.querySelector('.slider');
const soonElement = document.querySelector('.soon');
const urls = [
  "storo08.ru",
  "t.me/storo08",
  "vk.com/storo08",
  "youtube.com/storo08stream",
  "twitch.tv/storo08",
  "trovo.live/storo08",
  "kick.com/storo08"
];

let index = 0;
let typingSpeed = 100; // Скорость печатания (мс)

function typeText(element, text, callback) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, typingSpeed);
    } else {
      callback(); // Когда текст напечатан, вызываем callback для перехода к следующему
    }
  }

  type();
}

function changeText() {
  const currentText = urls[index];
  typeText(sliderElement, currentText, () => {
    index = (index + 1) % urls.length; // Переключение на следующий адрес
    setTimeout(changeText, 1000); // Пауза перед сменой текста
  });
}

function typeSoonText() {
  typeText(soonElement, "Спасибо за просмотр", () => {
    setTimeout(typeSoonText, 5000); // Пауза перед повтором
  });
}

changeText(); // Запуск анимации печатания с первого URL
typeSoonText(); // Запуск анимации для текста "Стрим скоро начнётся"
