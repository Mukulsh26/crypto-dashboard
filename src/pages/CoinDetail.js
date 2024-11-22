import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chart from "../components/Chart";
import { fetchCoinDetails, fetchCoinPriceHistory } from "../utils/api"; // Import the API functions

const CoinDetail = () => {
  const { id } = useParams();
  const [coinDetail, setCoinDetail] = useState(null);
  const [priceHistory, setPriceHistory] = useState({ prices: [], labels: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1d");

  // Fetch coin details only once when the id changes
  useEffect(() => {
    const fetchCoinDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCoinDetails(id);
        setCoinDetail(data);
      } catch (err) {
        setError("Failed to fetch coin details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCoinDetail();
    }
  }, [id]);

  useEffect(() => {
    const fetchPriceHistory = async (coinId, timeframe) => {
      setLoading(true);
      try {
        const data = await fetchCoinPriceHistory(coinId, timeframe);
        setPriceHistory(data);
      } catch (err) {
        setError("Failed to fetch price history.");
      } finally {
        setLoading(false);
      }
    };

    if (coinDetail) {
      fetchPriceHistory(id, selectedTimeframe); // Only fetch price history if coin details are available
    }
  }, [id, selectedTimeframe, coinDetail]); // Re-fetch price history only when `id` or `selectedTimeframe` changes

  // Handle timeframe change for price history
  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="coin-detail bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-6">
      {coinDetail && (
        <>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {coinDetail.name}
          </h2>
          <img src={coinDetail.image.large} alt={coinDetail.name} className="w-20 h-20 mr-2" />
          <div className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            <p><strong>Symbol:</strong> {coinDetail.symbol}</p>
            <p><strong>Market Cap:</strong> ${coinDetail.market_data.market_cap.usd}</p>
            <p><strong>Current Price:</strong> ${coinDetail.market_data.current_price.usd}</p>
            <p><strong>All-time High:</strong> ${coinDetail.market_data.high_24h.usd}</p>
            <p><strong>Description:</strong> {coinDetail.description.en}</p>
          </div>

          <div className="flex justify-center mb-6">
            {["1d", "7d", "1m", "3m", "1y"].map((timeframe) => (
              <button
                key={timeframe}
                className={`bg-blue-500 text-white p-2 mx-2 ${
                  selectedTimeframe === timeframe ? "bg-blue-700" : ""
                }`}
                onClick={() => handleTimeframeChange(timeframe)}
              >
                {timeframe === "1d" && "1 Day"}
                {timeframe === "7d" && "7 Days"}
                {timeframe === "1m" && "1 Month"}
                {timeframe === "3m" && "3 Months"}
                {timeframe === "1y" && "1 Year"}
              </button>
            ))}
          </div>

          <div className="text-center">
            <Chart data={priceHistory.prices} labels={priceHistory.labels} />
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetail;
