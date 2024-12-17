// Example datetime data
var dates = [
    { x: new Date("2024-06-01").getTime(), y: 1000000 },
    { x: new Date("2024-06-02").getTime(), y: 1200000 },
    { x: new Date("2024-06-03").getTime(), y: 900000 },
    { x: new Date("2024-06-04").getTime(), y: 1500000 },
    { x: new Date("2024-06-05").getTime(), y: 1300000 },
    { x: new Date("2024-06-06").getTime(), y: 1700000 },
    { x: new Date("2024-06-07").getTime(), y: 1900000 },
    { x: new Date("2024-06-08").getTime(), y: 2100000 }
];

// ApexCharts options
var options = {
    series: [{
        name: 'XYZ MOTORS',
        data: dates
    }],
    chart: {
        type: 'area',
        stacked: false,
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
        text: 'Stock Price Movement',
        align: 'left'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
        },
    },
    yaxis: {
        labels: {
            formatter: function (val) {
                return (val / 1000000).toFixed(0) + "M";
            },
        },
        title: {
            text: 'Price'
        },
    },
    xaxis: {
        type: 'datetime',
    },
    tooltip: {
        shared: false,
        y: {
            formatter: function (val) {
                return (val / 1000000).toFixed(0) + "M";
            }
        }
    }
};

// Render the chart
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
