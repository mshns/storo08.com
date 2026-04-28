document.addEventListener("DOMContentLoaded", async function () {
  const selectWinnersBtn = document.getElementById("selectWinners");
  const winnersList = document.getElementById("winnersList");
  const loadingElement = document.getElementById("loading");
  const errorElement = document.getElementById("error");
  const participantsList = document.getElementById("participantsList");
  const participantsCount = document.getElementById("participantsCount");

  let currentParticipants = [];

  // Загружаем данные сразу при открытии страницы
  try {
    loadingElement.style.display = "block";
    errorElement.style.display = "none";
    selectWinnersBtn.disabled = true;

    // Загружаем данные с сервера
    const response = await fetch("https://storo08.up.railway.app/hu-challenge");

    if (!response.ok) {
      throw new Error("Не удалось загрузить данные турнира");
    }

    const data = await response.json();

    // Данные уже отфильтрованы и отсортированы на сервере
    currentParticipants = data;

    participantsCount.textContent = currentParticipants.length;

    // Показываем всех участников
    displayParticipants(currentParticipants);

    // Автоматический запуск через 5 секунд
    setTimeout(() => {
      if (currentParticipants.length >= 3) {
        simulateButtonClick();
      } else {
        errorElement.textContent = `Недостаточно участников (${currentParticipants.length})`;
        errorElement.style.display = "block";
      }
    }, 5000);
  } catch (error) {
    console.error("Error:", error);
    errorElement.textContent = error.message;
    errorElement.style.display = "block";
  } finally {
    loadingElement.style.display = "none";
  }

  // Анимация нажатия кнопки
  function simulateButtonClick() {
    // Анимация кнопки
    selectWinnersBtn.classList.add("click-animation");

    setTimeout(() => {
      selectWinnersBtn.classList.remove("click-animation");
      // Имитируем клик
      selectWinners();
    }, 500);
  }

  // Основная функция выбора победителей
  async function selectWinners() {
    try {
      if (currentParticipants.length < 3) {
        throw new Error("Недостаточно участников");
      }

      selectWinnersBtn.disabled = true;
      selectWinnersBtn.classList.add("selected"); // Делаем кнопку зеленой
      winnersList.innerHTML = "";

      // Выбираем 3 случайных победителя
      const winners = selectRandomWinners(currentParticipants, 3);
      const cards = document.querySelectorAll(".participant-card");

      // Основной цикл выбора победителей
      for (let i = 0; i < winners.length; i++) {
        // 1. Делаем все ячейки полупрозрачными
        cards.forEach((card) => {
          card.classList.add("semi-transparent");
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        const winnerUsername = winners[i];
        const winnerCard = document.querySelector(
          `.participant-card[data-username="${winnerUsername}"]`
        );

        if (winnerCard) {
          // 2. Возвращаем нормальную прозрачность всем перед выбором
          cards.forEach((card) => {
            card.classList.remove("semi-transparent");
          });

          await new Promise((resolve) => setTimeout(resolve, 300));

          // 3. Подсвечиваем текущего победителя
          winnerCard.classList.add("winner");

          // 4. Добавляем в список победителей сразу
          const li = document.createElement("li");
          li.textContent = winnerUsername;
          winnersList.appendChild(li);

          // Прокручиваем к победителю
          winnerCard.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // 5. Ждем перед следующим выбором
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      // 6. В конце возвращаем нормальную прозрачность
      cards.forEach((card) => {
        card.classList.remove("semi-transparent");
      });
    } catch (error) {
      console.error("Error:", error);
      errorElement.textContent = error.message;
      errorElement.style.display = "block";
    }
  }

  function selectRandomWinners(players, count) {
    const shuffled = [...players].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function displayParticipants(participants) {
    participantsList.innerHTML = "";
    participants.forEach((participant) => {
      const card = document.createElement("div");
      card.className = "participant-card";
      card.textContent = participant;
      card.dataset.username = participant;
      participantsList.appendChild(card);
    });
  }
});