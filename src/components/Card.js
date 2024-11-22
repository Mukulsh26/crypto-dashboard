import React from "react";
import { useNavigate } from "react-router-dom"; 

const Card = ({ coin }) => {
  const navigate = useNavigate(); 

  const handleCardClick = () => {
    navigate(`/coin/${coin.id}`); 
  };

  return (
    <div
      className="card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{coin.name}</h3>
        <span className="text-gray-500">{coin.symbol.toUpperCase()}</span>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">Price: ${coin.current_price}</p>
        <p className="text-green-500">
          24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
        <p className="text-gray-500">Market Cap: ${coin.market_cap}</p>
      </div>
    </div>
  );
};

export default Card;
