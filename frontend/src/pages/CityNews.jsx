import React, { useEffect, useState } from "react";

const CityNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null); // State to hold selected news details

  // Fetch news from backend
  const fetchNews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/citynews", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setNewsItems(data.newsItems);
      } else {
        throw new Error("Failed to fetch news.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleViewMore = async (news) => {
    try {
      // Send a request to increment views on the backend
      const response = await fetch(`http://localhost:5000/api/citynews/${news.id}/views`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to update views');
      }

      // Instead of updating selectedNews with new data, just set it to the current news item
      setSelectedNews(news); // Set the selected news item to display details


    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleBack = () => {
    setSelectedNews(null); // Reset the selected news to null to go back to the news list
  };

  return (
    <div className="text-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Latest News</h1>

      {loading ? (
        <p>Loading news...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : selectedNews ? (
        <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-2xl">
          <img
            src={selectedNews.photo}
            alt={selectedNews.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="flex justify-between mt-4">
            <p className="text-gray-600">
              {new Date(selectedNews.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
              })}
            </p>
            <p className="text-gray-600">
              Captured by: {selectedNews.capturedBy || "Unknown"}
            </p>
          </div>
          <h2 className="text-3xl font-bold text-blue-500 mt-4">
            {selectedNews.title}
          </h2>
          <p className="mt-4 text-gray-600">{selectedNews.description}</p>
          <p className="mt-4 text-gray-600">
            Total Views: {selectedNews.views}
          </p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 text-white bg-blue-200 rounded-lg transition-colors duration-300 hover:bg-blue-600"
          >
            Back to News
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
            >
              <img
                src={news.photo}
                alt={"img"}
                className="w-full h-60 object-cover rounded-t-lg shadow-md"
              />
              <div className="flex justify-between mt-2">
                <p className="text-gray-600">
                  {new Date(news.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <p className="text-gray-600">
                  Captured by: {news.capturedBy || "Unknown"}
                </p>
              </div>
              <h2 className="text-xl font-semibold text-blue-500 mt-2">
                {news.title}
              </h2>
              <p className="mt-2 text-gray-600">
                {news.description.slice(0, 100)}...
              </p>
              <button
                onClick={() => handleViewMore(news)}
                className="mt-4 px-4 py-2 text-white bg-blue-200 rounded-lg block mx-auto transition-colors duration-300 hover:bg-blue-600"
              >
                View More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityNews;
