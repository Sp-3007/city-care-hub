// utils/auth.js
import { auth } from './firebase'; // Import Firebase auth

export const getAuthToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(); // Fetch JWT token for the current user
      return token;
    } else {
      throw new Error('User is not authenticated');
    }
  } catch (error) {
    console.error('Error fetching auth token:', error);
    throw error;
  }
};
