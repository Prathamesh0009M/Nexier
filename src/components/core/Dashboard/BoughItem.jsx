import React from 'react';

const BoughItem = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700">
      <div className="bg-purple-800 text-white text-center p-6 rounded-md shadow-md max-w-xs sm:max-w-md md:max-w-lg">
        <h1 className="text-xl font-bold">Service Unavailable</h1>
        <p className="mt-2">
          We apologize, but the service is currently unavailable due to some reason. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default BoughItem;
