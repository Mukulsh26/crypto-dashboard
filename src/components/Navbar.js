import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <nav className="bg-blue-900 text-white dark:bg-gray-800 dark:text-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={handleHomeClick}
          className="text-lg font-semibold hover:text-gray-300 dark:hover:text-gray-400"
        >
          Home
        </button>

        <div className="hidden sm:block">
          <DarkModeToggle />
        </div>

        <button
          className="sm:hidden text-xl focus:outline-none"
          onClick={handleToggleMenu}
        >
          <span className="material-icons">menu</span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden bg-blue-800 text-white p-4">
          <div className="mb-4">
            {/* Add mobile-specific content if needed */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
