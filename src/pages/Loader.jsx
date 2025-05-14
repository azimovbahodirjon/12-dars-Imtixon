import React from "react";
import { FaSpinner } from "react-icons/fa";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-10 rounded-xl shadow-xl flex flex-col items-center space-y-6">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
        <span className="text-gray-800 font-semibold text-xl">
          Loading, please wait...
        </span>
        <div className="w-20 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

export default Loader;
