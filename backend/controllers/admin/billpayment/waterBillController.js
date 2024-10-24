const { db } = require("../../../config/firebaseAdmin");

// Create Water Bill
exports.createWaterBill = async (req, res) => {
  const {
    userId,
    amount,
    lastDate,
    createDate,
    waterUsage,
    chargesPerLitre,
    status,
  } = req.body;

  // Check if all required fields are provided
  if (
    !userId ||
    !amount ||
    !lastDate ||
    !createDate ||
    !waterUsage ||
    !chargesPerLitre
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Step 1: Fetch all users and find the one that matches userId
    const userRef = db.collection("users");
    const userSnapshot = await userRef.get(); // Fetch all users

    let userData = null;

    // Iterate through the users to find a match
    userSnapshot.forEach((doc) => {
      const user = doc.data();
      if (user.userId === userId) {
        userData = { ...user, id: doc.id }; // Ensure userId is included
      }
    });

    // Step 2: Check if user was found
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 3: Create a new water bill in the "waterbill" collection
    const billData = {
      userId: userData.userId,
      amount,
      lastDate,
      createDate,
      waterUsage,
      chargesPerLitre,
      status: status || "unpaid",
      notification: true,
    };

    const billDocRef = await db.collection("waterbill").add(billData);

    // Step 4: Get the user's current billRefs or initialize it
    const billRefs = userData.billingInfo || {};

    // Step 5: Check if the waterbill array exists in billRefs, else initialize it
    const waterBillArray = billRefs.waterbill || [];
    waterBillArray.push(billDocRef.id); // Add the new water bill reference

    // Step 6: Update the user's billRefs with the updated waterbill array
    await userRef.doc(userData.id).update({
      billRefs: {
        ...billRefs,
        waterbill: waterBillArray, // Update or create waterbill array
      },
    });

    // Step 7: Respond with success
    res.status(201).json({
      message: "Water bill created successfully",
      billId: billDocRef.id,
    });
  } catch (error) {
    console.error("Error creating water bill:", error);
    res.status(500).json({ message: "Failed to create water bill" });
  }
};

exports.getUserWaterBills = async (req, res) => {
  const { userId } = req.params;

  console.log("user id is ", userId)

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

try {
 // Reference to the 'waterbill' collection
  const billsRef = db.collection("waterbill");


  const billsSnapshot = await billsRef.get();

  if (billsSnapshot.empty) {
    return res.status(404).json({ message: "No water bills found." });
  }

  const bills = [];

  // Iterate over all documents and check for matching userId
  billsSnapshot.forEach((doc) => {
    const billData = doc.data();
   
    // Check if the userId field matches the one you're looking for
    if (billData.userId === userId) {
      bills.push({ billId: doc.id, ...billData });
    }
  });

  // Check if any bills were found for the userId
  if (bills.length === 0) {
    return res
      .status(404)
      .json({ message: "No water bills found for this user." });
  }

  // Return the filtered bills for the user
  return res.status(200).json(bills);
} catch (error) {
  console.error("Error fetching water bills: ", error);
  return res
    .status(500)
    .json({ message: "An error occurred while fetching water bills." });
}

};