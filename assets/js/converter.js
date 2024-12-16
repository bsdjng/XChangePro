const apiKey = "14882d9d208907f2742b5895"; // Jouw API-sleutel
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`; // API URL met jouw sleutel
let rates = {};

// Haal wisselkoersen op bij het laden van de pagina
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result === "success") {
      rates = data.conversion_rates;

      // Vul de dropdowns met valutacodes
      const fromSelect = document.getElementById("from");
      const toSelect = document.getElementById("to");

      for (const currency in rates) {
        fromSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
        toSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
      }
    } else {
      console.error("Error fetching rates:", data.error_type);
      alert("Er is een fout opgetreden bij het ophalen van wisselkoersen.");
    }
  } catch (error) {
    console.error("Error fetching rates:", error);
    alert("Er is een fout opgetreden bij het verbinden met de API.");
  }
});

// Converteer valuta
function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("from").value;
  const toCurrency = document.getElementById("to").value;
  const resultElement = document.getElementById("result");

  if (isNaN(amount) || amount <= 0) {
    resultElement.textContent = "Voer een geldig bedrag in.";
    return;
  }

  if (rates[fromCurrency] && rates[toCurrency]) {
    const convertedAmount = (amount / rates[fromCurrency]) * rates[toCurrency];
    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
  } else {
    resultElement.textContent = "Kon de wisselkoers niet ophalen.";
  }
}
