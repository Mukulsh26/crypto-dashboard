

export const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
  };
  
  export const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };
  
  export const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };
  