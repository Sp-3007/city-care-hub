// Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="border-t-transparent border-solid border-4 border-blue-500 rounded-full animate-spin h-8 w-8" />
      <span className="ml-2">Loading places...</span>
    </div>
  );
};

export default Loading;
