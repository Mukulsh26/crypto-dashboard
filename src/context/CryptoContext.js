import React, { createContext, useState, useEffect } from "react";
import { fetchCryptoList } from "../utils/api";


const CryptoContext = createContext();


export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const data = await fetchCryptoList();
        setCoins(data);
      } catch (err) {
        setError("Failed to fetch cryptocurrencies.");
      } finally {
        setLoading(false);
      }
    };

    loadCoins();
  }, []);

  return (
    <CryptoContext.Provider value={{ coins, loading, error }}>
      {children}
    </CryptoContext.Provider>
  );
};

// Hook to use crypto data context
export const useCryptoData = () => useContext(CryptoContext);
