import React from "react";
import { Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import Dashboard from "./pages/Dashboard";
import CoinDetail from "./pages/CoinDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </div>
    </DarkModeProvider>
  );
}

export default App;
