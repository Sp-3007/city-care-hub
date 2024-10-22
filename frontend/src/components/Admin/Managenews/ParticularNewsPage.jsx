import React from 'react';

const ParticularNewsPage = ({ news, onGoBack }) => {
  return (
    <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 mb-6">
      <img src={news.photo} alt={news.title} className="w-full h-64 object-cover mb-6" />
      <div className="flex justify-between mb-2">
        <p className="text-gray-500">{new Date(news.date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
        })}</p>
        <p className="text-gray-500">{news.views} views</p>
      </div>
      <h2 className="text-3xl font-bold text-blue-600 mb-4">{news.title}</h2>
      <p className="text-gray-700 mb-4">{news.description}</p>
      <p className="text-gray-500 mb-4">Captured By: {news.capturedBy}</p>
      <button
        onClick={onGoBack}
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
      >
        Go Back to All News
      </button>
    </div>
  );
};

export default ParticularNewsPage;
