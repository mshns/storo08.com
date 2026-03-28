import { data } from "../run/data.js";

document.addEventListener("DOMContentLoaded", () => {
  const labels = data.chart.map((_, index) => index + 1);
  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "TWISTER BOOST RUN €10K на RedStar",
          data: data.chart,
          borderColor: "rgb(50, 200, 50, 0.75)",
          borderWidth: 5,
          tension: 0,
          pointStyle: "rect", // Квадратные точки
          pointBackgroundColor: "rgb(50, 200, 50)", // Цвет заливки
          pointBorderWidth: 2, // Толщина границы
          pointRadius: 6, // Размер точек
          fill: {
            target: "origin", // Заливка от оси Y=0
            above: "rgba(50, 200, 50, 0.25)", // Зелёный для значений > 0
            below: "rgba(255, 50, 50, 0.25)", // Красный для значений < 0
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 20,
      },

      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "— Профит € —",
            color: "white",
            font: {
              size: 14,
              family: "Play",
              weight: 700,
            },
            align: "end", // Выравниваем по правому краю
          },
          grid: {
            color: function (context) {
              if (context.tick.value === 0) {
                return "rgba(255, 255, 255, 0.5)";
              }
              return "rgba(255, 255, 255, 0.1)";
            },
            lineWidth: function (context) {
              if (context.tick.value === 0) {
                return 2;
              }
              return 1;
            },
          },
          border: {
            color: "rgba(255, 255, 255, 0.8)",
            width: 2,
            dash: [0],
          },
          ticks: { color: "white", font: { size: 14 }, z: 1 },
        },
        x: {
          title: {
            display: true,
            text: "— Дни челленджа —",
            color: "white",
            font: {
              size: 14,
              family: "Play",
              weight: 700,
            },
            align: "end", // Выравниваем по правому краю
          },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          border: {
            color: "rgba(255, 255, 255, 0.8)",
            width: 2,
            dash: [0],
          },
          ticks: { color: "white", font: { size: 14 }, z: 1 },
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "white",
            font: { size: 62, family: "Play", weight: 700 },
            padding: 0,
            boxWidth: 0,
          },
        },
        datalabels: {
          color: "white",
          font: { size: 14, family: "Play", weight: 400 },
          align: "top",
        },
      },
    },
    plugins: [ChartDataLabels],
  });
});
