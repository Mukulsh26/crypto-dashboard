import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import { fetchCryptoList, fetchCoinPriceHistory } from "../utils/api";
import Chart from "../components/Chart";
import { useDarkMode } from "../context/DarkModeContext";

const Dashboard = () => {
  const [coins, setCoins] = useState([]); // To store all fetched coins
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [selectedCoin, setSelectedCoin] = useState(null); // Selected coin for price history
  const [priceHistory, setPriceHistory] = useState({ prices: [], labels: [] }); // For coin price history

  const { darkMode } = useDarkMode(); // Dark mode context

  // Function to fetch all coins (no pagination)
  const fetchCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCryptoList(); // Fetch all coins data in one API call
      setCoins(data); // Set all coins to the state
    } catch (err) {
      setError("Failed to fetch cryptocurrency data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch price history for a selected coin
  const fetchPriceHistory = async (coinId, timeframe) => {
    setLoading(true);
    try {
      const { prices, labels } = await fetchCoinPriceHistory(coinId, timeframe);
      setPriceHistory({ prices, labels });
    } catch (err) {
      console.error("Failed to fetch price history:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all coins data on component mount
  useEffect(() => {
    fetchCoins(); // Fetch all coins on initial render
  }, []);

  // Fetch price history for the selected coin when selected
  useEffect(() => {
    if (selectedCoin) {
      fetchPriceHistory(selectedCoin.id, "1d"); // Default timeframe to "1d"
    }
  }, [selectedCoin]);

  // Filter coins based on search query
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Change timeframe for price history
  const handleTimeframeChange = (timeframe) => {
    if (selectedCoin) {
      fetchPriceHistory(selectedCoin.id, timeframe);
    }
  };

  // Select a coin to view its price history
  const handleCardClick = (coin) => {
    setSelectedCoin(coin);
  };

  return (
    <div
      className={`dashboard min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-600"
      } text-white p-6`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 text-center">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCoins.map((coin) => (
            <Card
              key={coin.id}
              coin={coin}
              onClick={() => handleCardClick(coin)}
              className={`dark:bg-gray-800 dark:border-gray-700 ${
                darkMode ? "dark:bg-gray-800" : ""
              }`}
            />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}

        {error && <div className="text-center text-red-500 font-semibold">{error}</div>}

        {selectedCoin && (
          <>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-semibold dark:text-white">
                Price History for {selectedCoin.name}
              </h3>
              <div className="mb-6 text-center">
                {/* Timeframe buttons */}
                <button
                  className="bg-blue-500 text-white p-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={() => handleTimeframeChange("1d")}
                >
                  1 Day
                </button>
                <button
                  className="bg-blue-500 text-white p-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={() => handleTimeframeChange("7d")}
                >
                  7 Days
                </button>
                <button
                  className="bg-blue-500 text-white p-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={() => handleTimeframeChange("1m")}
                >
                  1 Month
                </button>
                <button
                  className="bg-blue-500 text-white p-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={() => handleTimeframeChange("3m")}
                >
                  3 Months
                </button>
                <button
                  className="bg-blue-500 text-white p-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={() => handleTimeframeChange("1y")}
                >
                  1 Year
                </button>
              </div>

              <div className="w-full h-[500px]">
                <Chart data={priceHistory.prices} labels={priceHistory.labels} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
