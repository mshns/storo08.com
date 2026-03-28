document.addEventListener("DOMContentLoaded", () => {
  const subtitleList = document.querySelector(".subtitle-list");
  const items = document.querySelectorAll(".subtitle-list .subtitle-item");
  let currentIndex = 0;
  const transitionInDuration = 1000; // 1 секунда для расширения
  const transitionOutDuration = 2000; // 2 секунды для сужения
  const displayDuration = 17000; // 17 секунд для показа элемента

  if (!subtitleList || items.length === 0) return;

  // Установить первый элемент как видимый
  items[currentIndex].classList.add("visible");

  function animate() {
    // Расширение до 100%
    subtitleList.style.transition = `width ${transitionInDuration}ms ease-in-out`;
    subtitleList.style.width = "100%";
    setTimeout(() => {
      // Задержка на показ элемента
      setTimeout(() => {
        // Сужение до 0%
        subtitleList.style.transition = `width ${transitionOutDuration}ms ease-in-out`;
        subtitleList.style.width = "0%";
        // После завершения анимации переключаем элемент
        setTimeout(() => {
          items[currentIndex].classList.remove("visible");
          currentIndex = (currentIndex + 1) % items.length;
          items[currentIndex].classList.add("visible");
          // Перезапуск анимации
          animate();
        }, transitionOutDuration);
      }, displayDuration);
    }, transitionInDuration);
  }
  // Запуск анимации
  animate();
});
