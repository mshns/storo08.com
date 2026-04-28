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

    // Исключаем организаторов на фронте
    const excludedPlayers = ["sanchess08", "FreeNavalny"];
    
    currentParticipants = data.filter(username => !excludedPlayers.includes(username));

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
    selectWinnersBtn.classList.add("click-animation");

    setTimeout(() => {
      selectWinnersBtn.classList.remove("click-animation");
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
      selectWinnersBtn.classList.add("selected");
      winnersList.innerHTML = "";

      const winners = selectRandomWinners(currentParticipants, 3);
      const cards = document.querySelectorAll(".participant-card");

      for (let i = 0; i < winners.length; i++) {
        cards.forEach((card) => {
          card.classList.add("semi-transparent");
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        const winnerUsername = winners[i];
        const winnerCard = document.querySelector(
          `.participant-card[data-username="${winnerUsername}"]`
        );

        if (winnerCard) {
          cards.forEach((card) => {
            card.classList.remove("semi-transparent");
          });

          await new Promise((resolve) => setTimeout(resolve, 300));

          winnerCard.classList.add("winner");

          const li = document.createElement("li");
          li.textContent = winnerUsername;
          winnersList.appendChild(li);

          winnerCard.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

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