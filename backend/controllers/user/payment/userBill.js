const { db } = require("../../../config/firebaseAdmin");

exports.getUserWaterBills = async (req, res) => {
  const { userId } = req.params;

  console.log("The user ID is:", userId);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Fetch the user document directly by its ID (userId)
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
       console.log("THe main error is here ");
      return res.status(404).json({ message: "User not found." });
    }

    // Get the user data from the document
    const userData = userDoc.data();


    // Extract billRefs related to water bills
    const billRefs = userData?.billRefs?.waterbill || [];

    if (billRefs.length === 0) {
      return res
        .status(200)
        .json({ waterBills : [] });
    }

    // Fetch the water bills using the references in billRefs
    const waterBills = [];
    for (const billRef of billRefs) {
      const billSnapshot = await db.collection("waterbill").doc(billRef).get();
      if (billSnapshot.exists) {
        waterBills.push({ billId: billSnapshot.id, ...billSnapshot.data() });
      }
    }

    // Return the water bills to the client
    res.status(200).json({ waterBills });
  } catch (error) {
    console.error("Error fetching user data or water bills:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching water bills." });
  }
};





exports.updateBillStatus = async (req, res) => {
  const { billId } = req.params; // Extract billId from the URL parameters
  const { status } = req.body; // Get the status from the request body

  // Check if the status is provided
  if (!status) {
    return res.status(400).json({ message: "Status is required." });
  }

  try {
    // Reference to the specific water bill document
    const billRef = db.collection("waterbill").doc(billId);

    // Update the status of the bill
    await billRef.update({ status });

    return res
      .status(200)
      .json({ message: "Bill status updated successfully." });
  } catch (error) {
    console.error("Error updating bill status:", error);
    return res.status(500).json({ message: "Failed to update bill status." });
  }
};