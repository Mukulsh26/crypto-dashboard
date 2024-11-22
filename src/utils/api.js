import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";


export const fetchCryptoList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd", 
        order: "market_cap_desc",
      },
    });
    return response.data; 
  } catch (error) {
    throw new Error("Failed to fetch cryptocurrencies.");
  }
};



export const fetchCoinDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch coin details.");
  }
};


export const fetchCoinPriceHistory = async (id, timeframe) => {
  let days;
  switch (timeframe) {
    case "1d":
      days = 1;
      break;
    case "7d":
      days = 7;
      break;
    case "1m":
      days = 30;
      break;
    case "3m":
      days = 90;
      break;
    case "1y":
      days = 365;
      break;
    default:
      days = 1;
  }
  try {
    const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: "usd",
        days,
      },
    });
    const prices = response.data.prices.map(([timestamp, price]) => price);
    const labels = response.data.prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString());
    return { prices, labels };
  } catch (error) {
    throw new Error("Failed to fetch price history.");
  }
};
