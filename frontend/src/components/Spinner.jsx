// components/Spinner.js
import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="animate-spin inline-block w-8 h-8 border-4 border-t-blue-600 border-transparent rounded-full" role="status">
        {/* Empty div for the spinner */}
      </div>
      <span className="mt-2 text-blue-600">Loading...</span> {/* Stationary text */}
    </div>
  );
};

export default Spinner;
