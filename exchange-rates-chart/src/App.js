
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import "./App.css"; // CSS file for styling

const API_URL = "https://api.frankfurter.app";

// Navbar Component
const Navbar = () => {
  return (
    <nav>
      <h2>Exchange Rates</h2>
    </nav>
  );
};

// Chart Component
const Chart = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [chartData, setChartData] = useState([]);
  const [period, setPeriod] = useState("30d");

  // Fetch supported currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await axios.get(`${API_URL}/currencies`);
      setCurrencies(Object.entries(response.data));
    };
    fetchCurrencies();
  }, []);

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date();

      if (period === "30d") {
        startDate.setDate(startDate.getDate() - 30);
      } else if (period === "1y") {
        startDate.setFullYear(startDate.getFullYear() - 1);
      }

      const start = startDate.toISOString().split("T")[0];
      const response = await axios.get(
        `${API_URL}/${start}..${endDate}?base=${baseCurrency}`
      );

      const rates = response.data.rates;
      const data = Object.keys(rates).map((date) => ({
        date,
        USD: rates[date]?.USD || 0,
      }));
      setChartData(data);
    };
    fetchExchangeRates();
  }, [baseCurrency, period]);

  return (
    <div>
      {/* Currency Dropdown */}
      <label htmlFor="base-currency">Base Currency:</label>
      <select
        id="base-currency"
        value={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
      >
        {currencies.map(([code, name]) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>

      {/* Time Period Buttons */}
      <div>
        <button onClick={() => setPeriod("30d")}>Last 30 Days</button>
        <button onClick={() => setPeriod("1y")}>Last Year</button>
      </div>

      {/* Recharts Line Chart */}
      <LineChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="USD" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="page-content">
        <h2>Exchange Rates Chart</h2>
        <Chart />
      </div>
    </div>
  );
};


export default App;

