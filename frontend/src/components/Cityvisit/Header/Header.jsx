import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa"; // Search icon

const Header = ({ setCoords }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY; // API key from .env

  useEffect(() => {
    if (query.length > 2) {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${GEOAPIFY_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.features) {
            setSuggestions(data.features.slice(0, 7));
            setShowSuggestions(true);
          } else {
            setShowSuggestions(false);
          }
        })
        .catch((error) => console.error("Error fetching suggestions:", error));
    } else {
      setShowSuggestions(false);
    }
  }, [query, GEOAPIFY_API_KEY]);

  const handleSuggestionClick = (place) => {
    try {
      const lat = place.geometry.coordinates[1];
      const lon = place.geometry.coordinates[0];

      // Ensure valid coordinates
      if (!isNaN(lat) && !isNaN(lon)) {
        setCoords({ lat, lng: lon });
        setQuery(place.properties.formatted); // Update input with selected place name
        setShowSuggestions(false); // Close suggestion box
      } else {
        console.error("Invalid coordinates:", { lat, lon });
      }
    } catch (error) {
      console.error("Error setting coordinates:", error);
    }
  };

  // Close suggestion box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-end items-center bg-transparent relative">
      <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mt-1 mr-2" >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-blue-500 w-full"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto w-full"
            style={{ right: 0, left: "auto" }} // Aligns with the input
          >
            {suggestions.map((place) => (
              <div
                key={place.properties.place_id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(place)}
              >
                {place.properties.formatted}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
