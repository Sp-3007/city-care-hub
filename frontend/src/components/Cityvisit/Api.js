// src/api.js
import axios from "axios";

export const fetchPlaces = async (bounds, category) => {
  const url = `https://travel-advisor.p.rapidapi.com/${category}/list-in-boundary`;

  try {
    const response = await axios.get(url, {
      params: {
        bl_latitude: bounds.bl_latitude,
        bl_longitude: bounds.bl_longitude,
        tr_latitude: bounds.tr_latitude,
        tr_longitude: bounds.tr_longitude,
        limit: "30",
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_TRAVEL_API_KEY,
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    });
    
    return response.data.data; // Return the data directly
  } catch (error) {
    console.error("Error fetching places:", error);
    return []; // Return an empty array on error
  }
};
