import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center">
      <label
        htmlFor="dark-mode-toggle"
        className="flex items-center cursor-pointer"
        aria-checked={darkMode}
      >
        <div className="relative">
          <input
            type="checkbox"
            id="dark-mode-toggle"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="sr-only"
          />
          <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
              darkMode ? "translate-x-4" : ""
            }`}
          ></div>
        </div>
        <span className="ml-2 text-sm">{darkMode ? "Dark Mode" : "Light Mode"}</span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
