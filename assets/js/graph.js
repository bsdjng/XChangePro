const API_URL = "https://api.frankfurter.app";
let chart; // Globale variabele voor de grafiek

// Fetch supported currencies en vul dropdown
async function fetchCurrencies() {
  const response = await fetch(`${API_URL}/currencies`);
  const currencies = await response.json();

  const select = document.getElementById("base-currency");
  for (const [code, name] of Object.entries(currencies)) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `${code} - ${name}`;
    select.appendChild(option);
  }
}

// Fetch exchange rates voor een specifieke base currency en datumbereik
async function fetchExchangeRates(base, period) {
  let url;
  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date();

  if (period === "30d") {
    startDate.setDate(startDate.getDate() - 30);
  } else if (period === "1y") {
    startDate.setFullYear(startDate.getFullYear() - 1);
  }

  url = `${API_URL}/${startDate.toISOString().split("T")[0]}..${endDate}?base=${base}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.rates;
}

// Initialiseer de grafiek
async function initChart() {
  const ctx = document.getElementById("exchangeChart").getContext("2d");
  const base = "EUR"; // Standaardvaluta
  const rates = await fetchExchangeRates(base, "30d");

  const dates = Object.keys(rates);
  const currencyRates = Object.values(rates).map((rate) => rate.USD);

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "USD Exchange Rate",
          data: currencyRates,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
  
// Update de grafiek
async function updateChart(period) {
  const base = document.getElementById("base-currency").value;
  const rates = await fetchExchangeRates(base, period);

  const dates = Object.keys(rates);
  const currencyRates = Object.values(rates).map((rate) => rate.USD);

  chart.data.labels = dates;
  chart.data.datasets[0].data = currencyRates;
  chart.update();
}

// Initieer de pagina
window.onload = async () => {
  await fetchCurrencies(); // Vul de currency dropdown
  await initChart(); // Initialiseer de grafiek
};
