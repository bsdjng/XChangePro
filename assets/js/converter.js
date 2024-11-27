// Lijst met valuta
const currencies = [
  "USD - US Dollar",
  "EUR - Euro",
  "GBP - British Pound",
  "JPY - Japanese Yen",
  "AUD - Australian Dollar",
  "CAD - Canadian Dollar",
  "CHF - Swiss Franc",
  "CNY - Chinese Yuan",
  "SEK - Swedish Krona",
  "NZD - New Zealand Dollar",
];

// Dynamisch filteren en tonen voor een invoerveld en lijst
function setupDropdown(inputId, dropdownId) {
  const inputElement = document.getElementById(inputId);
  const dropdownElement = document.getElementById(dropdownId);

  inputElement.addEventListener("input", () => {
    const query = inputElement.value.toLowerCase();

    // Filter de valuta op basis van de invoer
    const filteredCurrencies = currencies.filter((currency) =>
      currency.toLowerCase().includes(query)
    );

    // Verwijder bestaande items
    dropdownElement.innerHTML = "";

    // Toon gefilterde valuta in de lijst
    if (filteredCurrencies.length > 0) {
      dropdownElement.classList.remove("hidden");
      filteredCurrencies.forEach((currency) => {
        const li = document.createElement("li");
        li.textContent = currency;

        // Voeg een klikgebeurtenis toe aan elk item
        li.addEventListener("click", () => {
          inputElement.value = currency;
          dropdownElement.classList.add("hidden");
        });

        dropdownElement.appendChild(li);
      });
    } else {
      dropdownElement.classList.add("hidden");
    }
  });

  // Verberg de lijst wanneer je buiten klikt
  document.addEventListener("click", (e) => {
    if (
      !inputElement.contains(e.target) &&
      !dropdownElement.contains(e.target)
    ) {
      dropdownElement.classList.add("hidden");
    }
  });
}

// Setup voor beide velden
setupDropdown("from", "from-list");
setupDropdown("to", "to-list");
