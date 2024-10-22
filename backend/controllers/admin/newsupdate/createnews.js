// controllers/newsController.js
const { admin, db } = require("../../../config/firebaseAdmin");

// Firestore database reference
const latestNewsRef = db.collection("latestnews");

// Controller to add news (already present)
const addNews = async (req, res) => {
  try {
    const { title, description, capturedBy, date } = req.body;
    const photoUrl = req.photoUrl || "";

    const newsData = {
      title,
      description,
      capturedBy,
      date,
      views: 0,
      photo: photoUrl,
    };

    const newNews = await latestNewsRef.add(newsData);
    return res.status(201).json({
      message: "News added successfully!",
      newsId: newNews.id,
      newsData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding news.",
      error: error.message,
    });
  }
};

// Controller to fetch latest news
const getLatestNews = async (req, res) => {
  try {
    const newsSnapshot = await latestNewsRef.orderBy("date", "desc").get();
    const newsItems = newsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      message: "News fetched successfully!",
      newsItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching news.",
      error: error.message,
    });
  }
};

// Controller to delete a specific news item by ID
const deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id; // Get the news ID from the URL

    // Delete the document with the specific ID
    await latestNewsRef.doc(newsId).delete();

    return res.status(200).json({
      message: "News successfully deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting news.",
      error: error.message,
    });
  }
};

module.exports = { addNews, getLatestNews, deleteNews };
