import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="ml-4 text-blue-500 font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;
