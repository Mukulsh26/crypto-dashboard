import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";

export const useCryptoData = () => {
  return useContext(CryptoContext);
};
