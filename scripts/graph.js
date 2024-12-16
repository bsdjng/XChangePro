document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('currencyChart').getContext('2d');

    let chart;

    async function fetchCurrencies() {
        const response = await fetch('https://api.frankfurter.app/currencies');
        if (!response.ok) {
            throw new Error("Failed to fetch currencies");
        }
        return await response.json();
    }

    async function populateCurrencyDropdowns() {
        try {
            const currencies = await fetchCurrencies();
            const baseDropdown = document.getElementById('baseCurrency');
            const targetDropdown = document.getElementById('targetCurrency');

            Object.entries(currencies).forEach(([code, name]) => {
                const optionBase = document.createElement('option');
                optionBase.value = code;
                optionBase.textContent = `${code} - ${name}`;
                baseDropdown.appendChild(optionBase);

                const optionTarget = document.createElement('option');
                optionTarget.value = code;
                optionTarget.textContent = `${code} - ${name}`;
                targetDropdown.appendChild(optionTarget);
            });

            baseDropdown.value = 'USD';
            targetDropdown.value = 'EUR';
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    async function fetchCurrencyData(base, target, days) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        const formattedEnd = endDate.toISOString().split('T')[0];
        const formattedStart = startDate.toISOString().split('T')[0];

        const response = await fetch(`https://api.frankfurter.app/${formattedStart}..${formattedEnd}?from=${base}&to=${target}`);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        return Object.entries(data.rates).map(([date, rate]) => ({ date, rate: rate[target] }));
    }

    async function updateGraph(base, target, days) {
        try {
            const data = await fetchCurrencyData(base, target, days);

            const labels = data.map(item => item.date);
            const rates = data.map(item => item.rate);

            if (chart) {
                chart.destroy();
            }

            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `${base} to ${target} Exchange Rate`,
                        data: rates,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Exchange Rate'
                            }
                        }
                    }
                }
            });
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    document.getElementById('currencyForm').addEventListener('submit', event => {
        event.preventDefault();

        const baseCurrency = document.getElementById('baseCurrency').value;
        const targetCurrency = document.getElementById('targetCurrency').value;
        const days = parseInt(document.getElementById('days').value, 10);

        updateGraph(baseCurrency, targetCurrency, days);
    });

    // base values
    populateCurrencyDropdowns().then(() => updateGraph('USD', 'EUR', 30));
});
