import React, { useState, useEffect } from "react";
import LeftNavBar from "../../components/Admin/LeftNavBar ";
import TopNavBar from "../../components/Admin/TopNavBar";
import AddNews from "../../components/Admin/Managenews/Addnews";
import ParticularNewsPage from "../../components/Admin/Managenews/ParticularNewsPage";
import { getAuthToken } from "../../config/FirebaseAuthToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNewsPage = () => {
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null); 
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    const authToken = await getAuthToken();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/admin/news", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
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

  const handleDeleteNews = async (newsId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (!confirmation) return;

    const authToken = await getAuthToken();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/news/${newsId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        toast.success("News successfully deleted!", {
          position: "top-right",
          autoClose: 3000,
          style: { backgroundColor: "#8BC34A", color: "#FFFFFF" }, // Custom styles for the toast
        });
        fetchNews(); 
      } else {
        toast.error("Failed to delete news.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Error deleting news.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleGoBack = () => {
    setIsAddingNews(false);
    setSelectedNews(null);
    fetchNews();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavBar />
      <div className="flex">
        <LeftNavBar />
        <div className="flex-grow flex flex-col items-center bg-gray-100 p-6 mt-3">
          <ToastContainer />
          <div className="max-w-4xl w-full bg-lightblue-100 shadow-lg rounded-lg p-6 mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 text-center flex-grow">
              {isAddingNews
                ? "Add New News"
                : selectedNews
                ? "News Details"
                : "Latest News"}
            </h2>
            {!isAddingNews && !selectedNews ? (
              <button
                onClick={() => setIsAddingNews(true)}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200 ml-4"
              >
                Add New News
              </button>
            ) : (
              <button
                onClick={handleGoBack}
                className="bg-gray-600 text-white px-3 py-1.5 rounded-md shadow-md hover:bg-gray-700 transition-all duration-200 ml-4"
              >
                {selectedNews ? "Go to All News" : "View All News"}
              </button>
            )}
          </div>

          {isAddingNews ? (
            <AddNews onNewsAdded={handleGoBack} />
          ) : selectedNews ? (
            <ParticularNewsPage news={selectedNews} onGoBack={handleGoBack} />
          ) : (
            <>
              {loading ? (
                <p>Loading news...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {newsItems.map((news) => (
                    <div
                      key={news.id}
                      className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col max-w-xs mx-auto" // Adjusted width
                      style={{ height: "420px" }}
                    >
                      <img
                        src={news.photo}
                        alt={news.title}
                        className="object-cover w-full h-48" // Fixed height for image
                      />
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <p>
                            {new Date(news.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                            })}
                          </p>
                          <p>{news.views} views</p>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {news.title}
                        </h3>
                        <p
                          className="text-gray-600 text-sm mb-2 line-clamp-3" // Added class for line clamping
                        >
                          {news.description}
                        </p>
                        <div className="flex justify-between mt-2">
                          <button
                            onClick={() => setSelectedNews(news)}
                            className="bg-blue-600 text-white text-sm px-3 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
                            style={{ minWidth: "100px" }}
                          >
                            View More
                          </button>
                          <button
                            onClick={() => handleDeleteNews(news.id)}
                            className="bg-red-500 text-white text-sm px-3 py-2 rounded-md hover:bg-red-700 transition-all duration-200"
                            style={{ minWidth: "100px" }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNewsPage;
