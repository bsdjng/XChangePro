document.addEventListener("DOMContentLoaded", () => {
    const chartContainer = document.getElementById('currencyChart');
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

            // Destroy the existing chart if it exists
            if (chart) {
                chart.destroy();
            }

            // Create a new ApexCharts instance
            const options = {
                series: [{
                    name: `${base} to ${target} Exchange Rate`,
                    data: data.map(item => ({ x: new Date(item.date).getTime(), y: item.rate }))
                }],
                chart: {
                    type: 'area',
                    height: 350,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                title: {
                    text: `${base} to ${target} Exchange Rate`,
                    align: 'left',
                    style: {
                        fontFamily: 'Syne, san-serif',
                        color: '#007bff',
                        fontWeight: 'bold',
                    }
                },
                xaxis: {
                    type: 'datetime',
                    title: {
                        text: 'Date',
                        style: {
                            fontFamily: 'Syne, san-serif',
                            color: '#007bff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        },

                    },


                },
                yaxis: {
                    title: {
                        text: 'XChangePro Rate',
                        style: {
                            fontFamily: 'Syne, san-serif',
                            color: '#007bff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        },

                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    }
                },
                tooltip: {
                    x: {
                        format: 'yyyy-MM-dd'
                    }
                }
            };

            chart = new ApexCharts(chartContainer, options);
            chart.render();
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

    // Initialize dropdowns and default graph
    populateCurrencyDropdowns().then(() => updateGraph('USD', 'EUR', 30));
});
