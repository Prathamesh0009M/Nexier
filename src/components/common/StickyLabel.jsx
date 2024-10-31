// src/components/StickyLabel.js
import React from 'react';

const StickyLabel = () => {
  return (
    <div className="sticky-label fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-t-3xl text-center z-50 shadow-lg w-full sm:w-auto sm:mb-6 sm:px-8 sm:rounded-full sm:left-auto sm:right-4 sm:translate-x-0 transition-all duration-500">
      <p className="text-base sm:text-lg font-bold tracking-wider">
        Prathamesh Jadhav's Production
      </p>
    </div>
  );
};

export default StickyLabel;
