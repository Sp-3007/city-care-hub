const { admin, db } = require("../../../config/firebaseAdmin");

// Firestore database reference
const latestNewsRef = db.collection("latestnews");

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

// Controller to update view count
const updateViewCount = async (req, res) => {
  const { id } = req.params; // Get the news ID from the request parameters

  try {
    // Reference to the specific news document
    const newsDoc = latestNewsRef.doc(id);
    const newsItem = await newsDoc.get();

    if (!newsItem.exists) {
      return res.status(404).json({ message: "News item not found" });
    }

    // Increment the view count
    await newsDoc.update({
      views: admin.firestore.FieldValue.increment(1), // Increment the views field by 1
    });

    // Respond with a success message
    return res.status(200).json({
      message: "View count updated successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating view count.",
      error: error.message,
    });
  }
};



module.exports = { getLatestNews, updateViewCount };
